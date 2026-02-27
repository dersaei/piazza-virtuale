// lib/data/directus-client.ts
import "server-only";
import { createDirectus, rest, staticToken } from "@directus/sdk";

/**
 * Directus Client Configuration
 * This is the ONLY place where Directus client should be created
 * and environment variables should be accessed.
 *
 * NOTE: This file is server-only. The "server-only" import above guarantees
 * this code never runs in the browser, so we use the internal DIRECTUS_URL
 * and DIRECTUS_SUBMISSION_TOKEN (neither is exposed to the client).
 *
 * staticToken: authenticates write operations (createItem, uploadFiles) using
 * a dedicated "Frontend Bot" user with Create-only permissions on submission
 * collections. Read operations (readItems) work via Public role permissions.
 *
 * cache: 'no-store' disables Next.js default fetch caching at the HTTP level.
 * Caching is handled explicitly in lib/api/ via "use cache" + cacheTag/cacheLife.
 */

const directusUrl = process.env.DIRECTUS_URL || "http://localhost:8055";
const submissionToken = process.env.DIRECTUS_SUBMISSION_TOKEN || "";

/**
 * Directus client instance
 * Use this for ALL database operations
 */
export const directusClient = createDirectus(directusUrl)
  .with(staticToken(submissionToken))
  .with(
    rest({
      onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
  );

/**
 * Re-export Directus schema types for convenience
 */
export type { DirectusSchema } from "@/types/directus";
