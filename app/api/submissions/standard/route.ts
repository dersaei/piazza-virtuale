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
      console.log(
        "📸 Logo file received:",
        logoFile.name,
        logoFile.size,
        "bytes"
      );

      // 1. Check MIME type
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

      // 2. Check file size (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (logoFile.size > maxSize) {
        return NextResponse.json(
          { error: "File troppo grande. Dimensione massima: 5MB" },
          { status: 400 }
        );
      }

      // 3. Check file extension
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

        console.log("⬆️  Uploading to Directus...");
        const uploadedFiles = await directus.request(uploadFiles(logoFormData));

        console.log("=== DIRECTUS UPLOAD RESPONSE ===");
        console.log("Type:", typeof uploadedFiles);
        console.log("Is Array:", Array.isArray(uploadedFiles));
        console.log("Full response:", JSON.stringify(uploadedFiles, null, 2));

        // Handle both object and array responses
        if (Array.isArray(uploadedFiles)) {
          if (uploadedFiles.length > 0 && uploadedFiles[0].id) {
            logoId = uploadedFiles[0].id;
            console.log("✅ Logo ID from array:", logoId);
          } else {
            console.log("❌ Array is empty or no ID!");
          }
        } else if (
          uploadedFiles &&
          typeof uploadedFiles === "object" &&
          "id" in uploadedFiles
        ) {
          logoId = uploadedFiles.id;
          console.log("✅ Logo ID from object:", logoId);
        } else {
          console.log("❌ Could not extract logo ID from response!");
        }
      } catch (error) {
        console.error("❌ Logo upload error:", error);
        return NextResponse.json(
          { error: "Errore durante il caricamento del logo" },
          { status: 500 }
        );
      }
    }

    // Create submission in Directus
    try {
      const submissionData = {
        producer_name: producerName,
        shop_url: shopUrl,
        categories: categories,
        region: region,
        logo: logoId,
        submission_status: "pending",
        submitted_at: new Date().toISOString(),
      };

      console.log("📝 Creating submission with data:");
      console.log("  - producer_name:", producerName);
      console.log("  - logo ID:", logoId);
      console.log("  - region:", region);

      const submission = await directus.request(
        createItem("standard_submissions", submissionData)
      );

      console.log("✅ Submission created successfully!");
      console.log("Submission ID:", submission.id);

      return NextResponse.json(
        {
          success: true,
          message: "Richiesta inviata con successo",
          data: submission,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("❌ Directus submission error:", error);
      return NextResponse.json(
        { error: "Errore durante il salvataggio della richiesta" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Submission error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
