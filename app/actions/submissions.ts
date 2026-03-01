// app/actions/submissions.ts
"use server";
import {
  createContactMessage,
  createQuickSubmission,
} from "@/lib/data";
import {
  contactFormSchema,
  quickSubmissionSchema,
  formatZodError,
} from "@/lib/validation/schemas";

/**
 * Type for form submission state
 * Includes formData to preserve user input on validation errors
 */
export type FormSubmissionState = {
  success: boolean;
  message: string;
  formData?: Record<string, unknown>;
  submissionId?: number;
} | null;

/**
 * Server Action for Contact Form
 */
export async function submitContactForm(
  _prevState: FormSubmissionState,
  formData: FormData
): Promise<FormSubmissionState> {
  try {
    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const privacy_accepted = formData.get("privacy_accepted") as string;

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
        formData: { full_name, email, subject, message },
      };
    }

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
      submissionId: Date.now(),
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

/**
 * Server Action for Quick Submission (modal in header)
 */
export async function submitQuickForm(
  _prevState: FormSubmissionState,
  formData: FormData
): Promise<FormSubmissionState> {
  try {
    const company_name = formData.get("company_name") as string;
    const shop_url = formData.get("shop_url") as string;

    const validationResult = quickSubmissionSchema.safeParse({
      company_name: company_name || undefined,
      shop_url,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: formatZodError(validationResult.error),
        formData: { company_name, shop_url },
      };
    }

    const result = await createQuickSubmission({
      company_name: validationResult.data.company_name || null,
      shop_url: validationResult.data.shop_url,
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
        "Grazie! La tua richiesta è stata inviata con successo. Ti contatteremo presto.",
      submissionId: Date.now(),
    };
  } catch (error) {
    console.error("Quick form error:", error);
    return {
      success: false,
      message:
        "Si è verificato un errore. Per favore riprova più tardi o contattaci direttamente.",
    };
  }
}
