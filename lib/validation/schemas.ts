// lib/validation/schemas.ts
import { z } from "zod";

/**
 * Email validation schema
 */
export const emailSchema = z
  .email({ error: "Per favore, inserisci un indirizzo email valido." })
  .max(254, { error: "Email troppo lunga (max 254 caratteri)." });

/**
 * Contact Form Schema
 */
export const contactFormSchema = z.object({
  full_name: z
    .string()
    .min(1, { error: "Nome e cognome sono obbligatori." })
    .max(200, { error: "Nome e cognome troppo lungo (max 200 caratteri)." }),

  email: emailSchema,

  subject: z
    .string()
    .min(1, { error: "Oggetto è obbligatorio." })
    .max(300, { error: "Oggetto troppo lungo (max 300 caratteri)." }),

  message: z
    .string()
    .min(1, { error: "Messaggio è obbligatorio." })
    .max(5000, { error: "Messaggio troppo lungo (max 5000 caratteri)." }),

  privacy_accepted: z.string().refine((val) => val === "on", {
    message:
      "Devi accettare l'Informativa Privacy per poter inviare il messaggio.",
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Quick Submission Schema (modal in header)
 * URL accepts plain domains (e.g. negozio.it) — https:// is added if missing.
 * company_name is optional.
 */
export const quickSubmissionSchema = z.object({
  company_name: z
    .string()
    .max(200, { error: "Nome troppo lungo (max 200 caratteri)." })
    .optional()
    .or(z.literal("")),

  shop_url: z
    .string()
    .min(1, { error: "L'URL del negozio è obbligatorio." })
    .max(500, { error: "URL troppo lungo (max 500 caratteri)." })
    .transform((val) => {
      const trimmed = val.trim();
      if (trimmed && !/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
      }
      return trimmed;
    })
    .pipe(z.url({ error: "Inserisci un URL valido (es. negozio.it)." })),
});

export type QuickSubmissionInput = z.infer<typeof quickSubmissionSchema>;

/**
 * Premium Interest Schema (modal on come-funziona page)
 */
export const premiumInterestSchema = z.object({
  full_name: z
    .string()
    .min(1, { error: "Nome e cognome sono obbligatori." })
    .max(200, { error: "Nome e cognome troppo lungo (max 200 caratteri)." }),

  email: emailSchema,

  privacy_accepted: z.string().refine((val) => val === "on", {
    message:
      "Devi accettare l'Informativa Privacy per poter inviare la richiesta.",
  }),
});

export type PremiumInterestInput = z.infer<typeof premiumInterestSchema>;

/**
 * Helper function to format Zod errors into user-friendly messages
 */
export function formatZodError(error: z.ZodError): string {
  const firstError = error.issues[0];
  return firstError?.message || "Errore di validazione.";
}
