// app/actions/submissions.ts
"use server";

import "server-only";
import {
  createStandardSubmission,
  createPremiumInquiry,
  createContactMessage,
} from "@/lib/data";
import {
  standardSubmissionSchema,
  premiumInquirySchema,
  contactFormSchema,
  formatZodError,
} from "@/lib/validation/schemas";
import { z } from "zod";

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

    // Parse categories
    let categories: string[] = [];
    try {
      categories = JSON.parse(categoriesJson);
    } catch {
      return {
        success: false,
        message: "Errore nella selezione delle categorie.",
      };
    }

    // Validate using Zod schema
    const validationResult = standardSubmissionSchema.safeParse({
      producer_name,
      shop_url,
      categories,
      region,
      privacy_accepted,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: formatZodError(validationResult.error),
      };
    }

    // Delegate to Data Access Layer
    const result = await createStandardSubmission(
      {
        producer_name: validationResult.data.producer_name,
        shop_url: validationResult.data.shop_url,
        categories: validationResult.data.categories,
        region: validationResult.data.region,
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

    // Validate using Zod schema
    const validationResult = premiumInquirySchema.safeParse({
      producer_name,
      contact_name,
      email,
      message,
      privacy_accepted,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: formatZodError(validationResult.error),
      };
    }

    // Delegate to Data Access Layer
    const result = await createPremiumInquiry({
      producer_name: validationResult.data.producer_name,
      contact_name: validationResult.data.contact_name,
      email: validationResult.data.email,
      message: validationResult.data.message || null,
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

    // Validate using Zod schema
    const validationResult = contactFormSchema.safeParse({
      full_name,
      email,
      subject,
      message,
      privacy_accepted,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: formatZodError(validationResult.error),
      };
    }

    // Delegate to Data Access Layer
    const result = await createContactMessage({
      full_name: validationResult.data.full_name,
      email: validationResult.data.email,
      subject: validationResult.data.subject,
      message: validationResult.data.message,
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
