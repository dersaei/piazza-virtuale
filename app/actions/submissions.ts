// app/actions/submissions.ts
"use server";

import directus from "@/lib/directus";
import { createItem, uploadFiles } from "@directus/sdk";

// ID folderu "logo" z Directus File Library
const LOGO_FOLDER_ID = "6117a847-6c58-489e-8b9e-61991620ad24";

/**
 * Type for form submission state
 */
export type FormSubmissionState = {
  success: boolean;
  message: string;
} | null;

/**
 * Server Action for Standard Submission Form
 * Handles form submission with file upload (logo)
 */
export async function submitStandardForm(
  _prevState: FormSubmissionState,
  formData: FormData
): Promise<FormSubmissionState> {
  try {
    // Extract form data
    const producer_name = formData.get("producer_name") as string;
    const shop_url = formData.get("shop_url") as string;
    const categoriesJson = formData.get("categories") as string;
    const region = formData.get("region") as string;
    const logo = formData.get("logo") as File | null;
    const privacy_accepted = formData.get("privacy_accepted") as string;

    // Validation
    if (!privacy_accepted || privacy_accepted !== "on") {
      return {
        success: false,
        message:
          "Devi accettare l'Informativa Privacy per poter inviare la richiesta.",
      };
    }

    if (!producer_name || !shop_url || !categoriesJson || !region) {
      return {
        success: false,
        message: "Per favore, compila tutti i campi obbligatori.",
      };
    }

    // Parse categories
    let categories: string[] = [];
    try {
      categories = JSON.parse(categoriesJson);
      if (!Array.isArray(categories) || categories.length === 0) {
        return {
          success: false,
          message: "Seleziona almeno una categoria.",
        };
      }
    } catch {
      return {
        success: false,
        message: "Errore nella selezione delle categorie.",
      };
    }

    // Validate and upload logo if provided
    let logoId: string | null = null;
    if (logo && logo.size > 0) {
      // Validate file type
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/webp",
      ];
      if (!allowedTypes.includes(logo.type)) {
        return {
          success: false,
          message:
            "Formato file non valido. Formati accettati: PNG, JPEG, JPG, WebP, SVG.",
        };
      }

      // Validate file size
      const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
      if (logo.size > MAX_FILE_SIZE) {
        return {
          success: false,
          message:
            "Errore: Il file logo è troppo grande. Dimensione massima: 1MB.",
        };
      }

      // Validate file extension
      const fileName = logo.name.toLowerCase();
      if (!fileName.match(/\.(png|jpg|jpeg|svg|webp)$/)) {
        return {
          success: false,
          message: "Estensione file non valida.",
        };
      }

      // Upload to Directus
      try {
        const logoFormData = new FormData();
        // IMPORTANT: folder MUST be before file!
        logoFormData.append("folder", LOGO_FOLDER_ID);
        logoFormData.append("file", logo);

        const uploadedFiles = await directus.request(uploadFiles(logoFormData));

        // Extract ID from response
        if (uploadedFiles?.data?.id) {
          logoId = uploadedFiles.data.id;
        } else if (uploadedFiles?.id) {
          logoId = uploadedFiles.id;
        }
      } catch (error) {
        console.error("Logo upload error:", error);
        return {
          success: false,
          message: "Errore durante il caricamento del logo.",
        };
      }
    }

    // Create submission in Directus
    await directus.request(
      createItem("standard_submissions", {
        producer_name: producer_name,
        shop_url: shop_url,
        categories: categories,
        region: region,
        logo: logoId,
        submission_status: "pending",
        submitted_at: new Date().toISOString(),
      })
    );

    return {
      success: true,
      message:
        "Grazie! La tua richiesta è stata inviata con successo. Ti contatteremo presto.",
    };
  } catch (error) {
    console.error("Standard submission error:", error);
    return {
      success: false,
      message:
        "Si è verificato un errore. Per favore riprova più tardi o contattaci direttamente.",
    };
  }
}

/**
 * Server Action for Premium Inquiry Form
 * Handles premium subscription inquiries
 */
export async function submitPremiumInquiry(
  _prevState: FormSubmissionState,
  formData: FormData
): Promise<FormSubmissionState> {
  try {
    // Extract form data
    const producer_name = formData.get("producer_name") as string;
    const contact_name = formData.get("contact_name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const privacy_accepted = formData.get("privacy_accepted") as string;

    // Validation
    if (!privacy_accepted || privacy_accepted !== "on") {
      return {
        success: false,
        message:
          "Devi accettare l'Informativa Privacy per poter inviare la richiesta.",
      };
    }

    if (!producer_name || !contact_name || !email) {
      return {
        success: false,
        message: "Per favore, compila tutti i campi obbligatori.",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Per favore, inserisci un indirizzo email valido.",
      };
    }

    // Create premium inquiry in Directus
    await directus.request(
      createItem("premium_inquiries", {
        producer_name,
        contact_name,
        email,
        message: message || null,
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
    );

    return {
      success: true,
      message:
        "Grazie! La tua richiesta premium è stata inviata con successo. Ti contatteremo presto per discutere i dettagli.",
    };
  } catch (error) {
    console.error("Premium inquiry error:", error);
    return {
      success: false,
      message:
        "Si è verificato un errore. Per favore riprova più tardi o contattaci direttamente.",
    };
  }
}

/**
 * Server Action for Contact Form
 * Handles general contact messages
 */
export async function submitContactForm(
  _prevState: FormSubmissionState,
  formData: FormData
): Promise<FormSubmissionState> {
  try {
    // Extract form data
    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const privacy_accepted = formData.get("privacy_accepted") as string;

    // Validation
    if (!privacy_accepted || privacy_accepted !== "on") {
      return {
        success: false,
        message:
          "Devi accettare l'Informativa Privacy per poter inviare il messaggio.",
      };
    }

    if (!full_name || !email || !subject || !message) {
      return {
        success: false,
        message: "Per favore, compila tutti i campi obbligatori.",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Per favore, inserisci un indirizzo email valido.",
      };
    }

    // Validate field lengths
    if (full_name.length > 200) {
      return {
        success: false,
        message: "Nome e cognome troppo lungo (max 200 caratteri).",
      };
    }

    if (subject.length > 300) {
      return {
        success: false,
        message: "Oggetto troppo lungo (max 300 caratteri).",
      };
    }

    if (message.length > 5000) {
      return {
        success: false,
        message: "Messaggio troppo lungo (max 5000 caratteri).",
      };
    }

    // Create contact message in Directus
    await directus.request(
      createItem("contact_messages", {
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
    );

    return {
      success: true,
      message:
        "Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message:
        "Si è verificato un errore durante l'invio del messaggio. Per favore riprova più tardi.",
    };
  }
}
