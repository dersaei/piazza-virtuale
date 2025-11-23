// lib/validation/schemas.ts
import { z } from "zod";

/**
 * Email validation schema
 * Uses Zod's built-in email validation which is more robust than regex
 */
export const emailSchema = z
  .string()
  .email("Per favore, inserisci un indirizzo email valido.")
  .max(254, "Email troppo lunga (max 254 caratteri).");

/**
 * Standard Submission Form Schema
 */
export const standardSubmissionSchema = z.object({
  producer_name: z
    .string()
    .min(1, "Nome del produttore è obbligatorio.")
    .max(200, "Nome del produttore troppo lungo (max 200 caratteri)."),

  shop_url: z
    .string()
    .url("Per favore, inserisci un URL valido.")
    .max(500, "URL troppo lungo (max 500 caratteri)."),

  categories: z
    .array(z.string())
    .min(1, "Seleziona almeno una categoria.")
    .max(20, "Troppe categorie selezionate (max 20)."),

  region: z
    .string()
    .min(1, "Regione è obbligatoria.")
    .max(100, "Nome regione troppo lungo (max 100 caratteri)."),

  privacy_accepted: z
    .literal("on")
    .or(
      z.literal("").refine((val) => val === "on", {
        message:
          "Devi accettare l'Informativa Privacy per poter inviare la richiesta.",
      })
    )
    .refine((val) => val === "on", {
      message:
        "Devi accettare l'Informativa Privacy per poter inviare la richiesta.",
    }),
});

export type StandardSubmissionInput = z.infer<typeof standardSubmissionSchema>;

/**
 * Premium Inquiry Form Schema
 */
export const premiumInquirySchema = z.object({
  producer_name: z
    .string()
    .min(1, "Nome del produttore è obbligatorio.")
    .max(200, "Nome del produttore troppo lungo (max 200 caratteri)."),

  contact_name: z
    .string()
    .min(1, "Nome di contatto è obbligatorio.")
    .max(200, "Nome di contatto troppo lungo (max 200 caratteri)."),

  email: emailSchema,

  message: z
    .string()
    .max(5000, "Messaggio troppo lungo (max 5000 caratteri).")
    .optional()
    .or(z.literal("")),

  privacy_accepted: z
    .literal("on")
    .or(
      z.literal("").refine((val) => val === "on", {
        message:
          "Devi accettare l'Informativa Privacy per poter inviare la richiesta.",
      })
    )
    .refine((val) => val === "on", {
      message:
        "Devi accettare l'Informativa Privacy per poter inviare la richiesta.",
    }),
});

export type PremiumInquiryInput = z.infer<typeof premiumInquirySchema>;

/**
 * Contact Form Schema
 */
export const contactFormSchema = z.object({
  full_name: z
    .string()
    .min(1, "Nome e cognome sono obbligatori.")
    .max(200, "Nome e cognome troppo lungo (max 200 caratteri)."),

  email: emailSchema,

  subject: z
    .string()
    .min(1, "Oggetto è obbligatorio.")
    .max(300, "Oggetto troppo lungo (max 300 caratteri)."),

  message: z
    .string()
    .min(1, "Messaggio è obbligatorio.")
    .max(5000, "Messaggio troppo lungo (max 5000 caratteri)."),

  privacy_accepted: z
    .literal("on")
    .or(
      z.literal("").refine((val) => val === "on", {
        message:
          "Devi accettare l'Informativa Privacy per poter inviare il messaggio.",
      })
    )
    .refine((val) => val === "on", {
      message:
        "Devi accettare l'Informativa Privacy per poter inviare il messaggio.",
    }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Helper function to format Zod errors into user-friendly messages
 */
export function formatZodError(error: z.ZodError): string {
  const firstError = error.issues[0]; // Changed from .errors to .issues
  return firstError?.message || "Errore di validazione.";
}
