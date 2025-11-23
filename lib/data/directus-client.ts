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
  // Check if we're running in production
  if (process.env.NODE_ENV === "production") {
    // If this code runs on the server (SSR/API routes), use internal connection
    if (typeof window === "undefined") {
      return "http://localhost:8055"; // Server-side: direct local connection
    }

    // If this code runs in the browser, use the public subdomain
    return "https://cms.piazzavirtuale.it"; // Client-side: public subdomain
  }

  // Development environment - use direct IP access
  return "http://185.238.72.187:8055";
}

/**
 * Directus client instance
 * Use this for ALL database operations
 */
export const directusClient = createDirectus(getDirectusUrl()).with(rest());
