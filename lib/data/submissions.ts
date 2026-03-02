// lib/data/submissions.ts
import "server-only";
import { directusClient } from "./directus-client";
import { createItem } from "@directus/sdk";
import { sanitizeText } from "@/lib/utils/sanitize";

/**
 * Contact Message DTO
 */
export interface ContactMessageDTO {
  full_name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Premium Interest DTO
 */
export interface PremiumInterestDTO {
  full_name: string;
  email: string;
}

/**
 * Quick Submission DTO
 */
export interface QuickSubmissionDTO {
  company_name?: string | null;
  shop_url: string;
}

/**
 * Create premium interest submission
 */
export async function createPremiumInterest(
  data: PremiumInterestDTO
): Promise<{ success: boolean; error?: string }> {
  try {
    await directusClient.request(
      createItem("premium_interests", {
        full_name: sanitizeText(data.full_name),
        email: data.email.trim().toLowerCase(),
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Premium interest error:", error);
    return {
      success: false,
      error: "Errore durante l'invio. Riprova più tardi.",
    };
  }
}

/**
 * Create contact message
 */
export async function createContactMessage(
  data: ContactMessageDTO
): Promise<{ success: boolean; error?: string }> {
  try {
    await directusClient.request(
      createItem("contact_messages", {
        full_name: sanitizeText(data.full_name),
        email: data.email.trim().toLowerCase(),
        subject: sanitizeText(data.subject),
        message: sanitizeText(data.message),
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Contact message error:", error);
    return {
      success: false,
      error: "Errore durante il salvataggio del messaggio.",
    };
  }
}

/**
 * Create quick submission (from modal in header)
 */
export async function createQuickSubmission(
  data: QuickSubmissionDTO
): Promise<{ success: boolean; error?: string }> {
  try {
    await directusClient.request(
      createItem("quick_submissions", {
        company_name: data.company_name ? sanitizeText(data.company_name) : null,
        shop_url: sanitizeText(data.shop_url),
        status: "pending",
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Quick submission error:", error);
    return {
      success: false,
      error: "Errore durante l'invio. Riprova più tardi.",
    };
  }
}
