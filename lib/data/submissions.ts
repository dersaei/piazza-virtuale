// lib/data/submissions.ts
import "server-only";
import { directusClient } from "./directus-client";
import { createItem, uploadFiles } from "@directus/sdk";

// Constants
const LOGO_FOLDER_ID = process.env.DIRECTUS_LOGO_FOLDER_ID || "6117a847-6c58-489e-8b9e-61991620ad24";
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/webp",
];

/**
 * Standard Submission DTO
 */
export interface StandardSubmissionDTO {
  producer_name: string;
  shop_url: string;
  categories: string[];
  region: string;
  logo?: string | null;
}

/**
 * Premium Inquiry DTO
 */
export interface PremiumInquiryDTO {
  producer_name: string;
  contact_name: string;
  email: string;
  message?: string | null;
}

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
 * File Upload Result
 */
interface FileUploadResult {
  success: boolean;
  fileId?: string;
  error?: string;
}

/**
 * Upload logo file to Directus
 *
 * @param file - File to upload
 * @returns Upload result with file ID or error
 *
 * Security:
 * - Validates file type (MIME type)
 * - Validates file size
 * - Validates file extension
 * - Uploads to specific folder only
 */
async function uploadLogo(file: File): Promise<FileUploadResult> {
  try {
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        success: false,
        error:
          "Formato file non valido. Formati accettati: PNG, JPEG, JPG, WebP, SVG.",
      };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: "File troppo grande. Dimensione massima: 1MB.",
      };
    }

    // Validate file extension
    const fileName = file.name.toLowerCase();
    if (!fileName.match(/\.(png|jpg|jpeg|svg|webp)$/)) {
      return {
        success: false,
        error: "Estensione file non valida.",
      };
    }

    // Upload to Directus
    const logoFormData = new FormData();
    logoFormData.append("folder", LOGO_FOLDER_ID);
    logoFormData.append("file", file);

    const uploadedFiles = await directusClient.request(
      uploadFiles(logoFormData)
    );

    // Validate upload response
    if (!uploadedFiles) {
      return {
        success: false,
        error: "Nessuna risposta dal server durante il caricamento del file.",
      };
    }

    // Extract ID from response (handle different response structures)
    const fileId = uploadedFiles?.data?.id || uploadedFiles?.id;

    if (!fileId) {
      console.error("Invalid upload response structure:", uploadedFiles);
      return {
        success: false,
        error: "Risposta invalida dal server. Il file potrebbe non essere stato caricato.",
      };
    }

    // Validate fileId is a non-empty string
    if (typeof fileId !== "string" || fileId.trim() === "") {
      console.error("Invalid fileId received:", fileId);
      return {
        success: false,
        error: "ID file invalido ricevuto dal server.",
      };
    }

    return {
      success: true,
      fileId: fileId,
    };
  } catch (error) {
    console.error("Logo upload error:", error);
    return {
      success: false,
      error: "Errore durante il caricamento del logo.",
    };
  }
}

/**
 * Create standard submission
 *
 * @param data - Validated submission data
 * @param logoFile - Optional logo file
 * @returns Success status
 *
 * Security:
 * - All data is already validated by Server Action
 * - Files are validated before upload
 * - Data is sanitized before insertion
 */
export async function createStandardSubmission(
  data: StandardSubmissionDTO,
  logoFile?: File | null
): Promise<{ success: boolean; error?: string }> {
  try {
    let logoId: string | null = null;

    // Upload logo if provided
    if (logoFile && logoFile.size > 0) {
      const uploadResult = await uploadLogo(logoFile);

      if (!uploadResult.success) {
        return {
          success: false,
          error: uploadResult.error,
        };
      }

      logoId = uploadResult.fileId || null;
    }

    // Create submission in Directus
    await directusClient.request(
      createItem("standard_submissions", {
        producer_name: data.producer_name,
        shop_url: data.shop_url,
        categories: data.categories,
        region: data.region,
        logo: logoId,
        submission_status: "pending",
        submitted_at: new Date().toISOString(),
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Standard submission error:", error);
    return {
      success: false,
      error: "Errore durante il salvataggio della richiesta.",
    };
  }
}

/**
 * Create premium inquiry
 *
 * @param data - Validated inquiry data
 * @returns Success status
 *
 * Security:
 * - All data is already validated by Server Action
 * - Email is sanitized (trimmed and lowercased)
 */
export async function createPremiumInquiry(
  data: PremiumInquiryDTO
): Promise<{ success: boolean; error?: string }> {
  try {
    await directusClient.request(
      createItem("premium_inquiries", {
        producer_name: data.producer_name,
        contact_name: data.contact_name,
        email: data.email.trim().toLowerCase(),
        message: data.message || null,
        status: "pending",
        submitted_at: new Date().toISOString(),
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Premium inquiry error:", error);
    return {
      success: false,
      error: "Errore durante il salvataggio della richiesta premium.",
    };
  }
}

/**
 * Create contact message
 *
 * @param data - Validated contact data
 * @returns Success status
 *
 * Security:
 * - All data is already validated by Server Action
 * - All fields are trimmed
 * - Email is lowercased
 */
export async function createContactMessage(
  data: ContactMessageDTO
): Promise<{ success: boolean; error?: string }> {
  try {
    await directusClient.request(
      createItem("contact_messages", {
        full_name: data.full_name.trim(),
        email: data.email.trim().toLowerCase(),
        subject: data.subject.trim(),
        message: data.message.trim(),
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
