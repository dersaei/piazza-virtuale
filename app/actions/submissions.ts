// app/actions/submissions.ts
"use server";

import "server-only";
import {
  createStandardSubmission,
  createPremiumInquiry,
  createContactMessage,
} from "@/lib/data";

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

    // Validate field lengths
    if (producer_name.length > 200) {
      return {
        success: false,
        message: "Nome del produttore troppo lungo (max 200 caratteri).",
      };
    }

    if (shop_url.length > 500) {
      return {
        success: false,
        message: "URL troppo lungo (max 500 caratteri).",
      };
    }

    if (region.length > 100) {
      return {
        success: false,
        message: "Nome regione troppo lungo (max 100 caratteri).",
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

    // Delegate to Data Access Layer
    const result = await createStandardSubmission(
      {
        producer_name,
        shop_url,
        categories,
        region,
      },
      logo
    );

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Errore sconosciuto.",
      };
    }

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

    // Validate field lengths
    if (producer_name.length > 200) {
      return {
        success: false,
        message: "Nome del produttore troppo lungo (max 200 caratteri).",
      };
    }

    if (contact_name.length > 200) {
      return {
        success: false,
        message: "Nome di contatto troppo lungo (max 200 caratteri).",
      };
    }

    if (email.length > 254) {
      return {
        success: false,
        message: "Email troppo lunga (max 254 caratteri).",
      };
    }

    if (message && message.length > 5000) {
      return {
        success: false,
        message: "Messaggio troppo lungo (max 5000 caratteri).",
      };
    }

    // Delegate to Data Access Layer
    const result = await createPremiumInquiry({
      producer_name,
      contact_name,
      email,
      message: message || null,
    });

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Errore sconosciuto.",
      };
    }

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

    // Delegate to Data Access Layer
    const result = await createContactMessage({
      full_name,
      email,
      subject,
      message,
    });

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Errore sconosciuto.",
      };
    }

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
