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

    // Parse and validate categories
    let categories: string[];
    try {
      categories = JSON.parse(categoriesJson);
      if (!Array.isArray(categories) || categories.length === 0) {
        return NextResponse.json(
          { error: "Seleziona almeno una categoria" },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Formato categorie non valido" },
        { status: 400 }
      );
    }

    // Validate and upload logo if provided
    let logoId: string | null = null;
    if (logoFile && logoFile.size > 0) {
      // 1. Sprawdź MIME type
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/webp",
      ];

      if (!allowedTypes.includes(logoFile.type)) {
        return NextResponse.json(
          {
            error: "Formato file non supportato. Usa PNG, JPG, SVG o WebP.",
          },
          { status: 400 }
        );
      }

      // 2. Sprawdź rozmiar (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (logoFile.size > maxSize) {
        return NextResponse.json(
          { error: "File troppo grande. Dimensione massima: 5MB" },
          { status: 400 }
        );
      }

      // 3. Sprawdź rozszerzenie nazwy pliku
      const fileName = logoFile.name.toLowerCase();
      if (!fileName.match(/\.(png|jpg|jpeg|svg|webp)$/)) {
        return NextResponse.json(
          { error: "Estensione file non valida" },
          { status: 400 }
        );
      }

      // Upload to Directus
      try {
        const logoFormData = new FormData();
        logoFormData.append("file", logoFile);

        const uploadedFiles = await directus.request(uploadFiles(logoFormData));

        if (uploadedFiles && uploadedFiles.id) {
          logoId = uploadedFiles.id;
        }
      } catch (error) {
        console.error("Logo upload error:", error);
        return NextResponse.json(
          { error: "Errore durante il caricamento del logo" },
          { status: 500 }
        );
      }
    }

    // Create submission in Directus
    try {
      const submission = await directus.request(
        createItem("standard_submissions", {
          producer_name: producerName,
          shop_url: shopUrl,
          categories: categories,
          region: region,
          logo: logoId,
          submission_status: "pending",
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
      console.error("Directus submission error:", error);
      return NextResponse.json(
        { error: "Errore durante il salvataggio della richiesta" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
