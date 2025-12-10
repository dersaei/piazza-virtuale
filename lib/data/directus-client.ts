// lib/data/directus-client.ts
import "server-only";
import { createDirectus, rest } from "@directus/sdk";

/**
 * Directus Client Configuration
 * This is the ONLY place where Directus client should be created
 * and environment variables should be accessed.
 */

/**
 * Get Directus URL based on environment
 * IMPORTANT: This is the ONLY function that should access process.env
 */
function getDirectusUrl(): string {
  // Server-side: Use DIRECTUS_URL (internal connection, not exposed to client)
  if (typeof window === "undefined") {
    return process.env.DIRECTUS_URL || "http://localhost:8055";
  }

  // Client-side: Use NEXT_PUBLIC_DIRECTUS_URL (public URL, exposed to browser)
  return process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
}

/**
 * Directus client instance
 * Use this for ALL database operations
 */
export const directusClient = createDirectus(getDirectusUrl()).with(rest());

/**
 * Re-export Directus schema types for convenience
 */
export type { DirectusSchema } from "@/types/directus";
