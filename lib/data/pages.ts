// lib/data/pages.ts
import "server-only";
import { directusClient } from "./directus-client";
import { readItems } from "@directus/sdk";
import type { SeoDTO } from "./magazine";

/**
 * Raw Directus response type for pages
 */
interface DirectusPageResponse {
  slug: string;
  seo?: {
    title?: string | null;
    meta_description?: string | null;
    canonical_url?: string | null;
    no_index?: boolean | null;
    og_image?: string | null;
  } | null;
}

/**
 * Get SEO data for a page by slug
 *
 * @param slug - Page slug (e.g. "home", "chi-siamo", "vino")
 * @returns SeoDTO or null if page not found or has no SEO
 *
 * Security:
 * - Only returns published pages
 * - Only returns SEO fields (no internal data)
 */
export async function getPageSeo(slug: string): Promise<SeoDTO | null> {
  try {
    const pages = await directusClient.request(
      readItems("pages", {
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
        fields: [
          "slug",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { seo: ["title", "meta_description", "canonical_url", "no_index", "og_image"] } as any,
        ],
        limit: 1,
      })
    );

    if (pages.length === 0) {
      return null;
    }

    const page = pages[0] as unknown as DirectusPageResponse;

    if (!page.seo) {
      return null;
    }

    return {
      title: page.seo.title ?? null,
      meta_description: page.seo.meta_description ?? null,
      canonical_url: page.seo.canonical_url ?? null,
      no_index: page.seo.no_index ?? false,
      og_image: page.seo.og_image ?? null,
    };
  } catch (error) {
    console.error(`Error fetching SEO for page "${slug}":`, error);
    return null;
  }
}
