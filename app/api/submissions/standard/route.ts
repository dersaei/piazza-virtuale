// app/api/submissions/standard/route.ts
import { NextRequest, NextResponse } from "next/server";
import directus from "@/lib/directus";
import { createItem, uploadFiles } from "@directus/sdk";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const producerName = formData.get("producer_name") as string;
    const shopUrl = formData.get("shop_url") as string;
    const categoriesJson = formData.get("categories") as string;
    const region = formData.get("region") as string;
    const logoFile = formData.get("logo") as File | null;

    // Validate required fields
    if (!producerName || !shopUrl || !categoriesJson || !region) {
      return NextResponse.json(
        { error: "Campi obbligatori mancanti" },
        { status: 400 }
      );
    }

    let categories: string[];
    try {
      categories = JSON.parse(categoriesJson);
    } catch {
      return NextResponse.json(
        { error: "Formato categorie non valido" },
        { status: 400 }
      );
    }

    // Upload logo if provided
    let logoId: string | null = null;
    if (logoFile && logoFile.size > 0) {
      try {
        const logoFormData = new FormData();
        logoFormData.append("file", logoFile);

        const uploadedFiles = await directus.request(uploadFiles(logoFormData));

        if (uploadedFiles && uploadedFiles.id) {
          logoId = uploadedFiles.id;
        }
      } catch (error) {
        console.error("Logo upload error:", error);
        // Continue without logo if upload fails
      }
    }

    // Create submission in Directus
    const submission = await directus.request(
      createItem("standard_submissions", {
        producer_name: producerName,
        shop_url: shopUrl,
        categories: categories,
        region: region,
        logo: logoId,
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Richiesta inviata con successo",
        data: submission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
