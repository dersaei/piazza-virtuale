// lib/data/magazine.ts
import "server-only";
import { directusClient } from "./directus-client";
import { readItems } from "@directus/sdk";

/**
 * Magazine Card DTO (for /magazine page)
 * Safe, public-facing data structure
 */
export interface MagazineCardDTO {
  id: number;
  category: string;
  title: string;
  url: string;
  sort: number;
  date_created: string;
}

/**
 * Magazine Article DTO (for /magazine/[slug] page)
 * Safe, public-facing data structure
 */
export interface MagazineArticleDTO {
  id: number;
  slug: string;
  title: string;
  category: string;
  content: string;
  date_created: string;
  date_updated?: string;
}

/**
 * Get all magazine cards for homepage
 *
 * Security:
 * - Only returns published cards
 * - Only returns public fields
 * - Returns DTOs instead of raw database objects
 */
export async function getMagazineCards(): Promise<MagazineCardDTO[]> {
  try {
    const cards = await directusClient.request(
      readItems("magazine_cards", {
        filter: {
          status: { _eq: "published" },
        },
        fields: ["id", "category", "title", "url", "sort", "date_created"],
        sort: ["sort"], // Sort by manual order
        limit: -1,
      })
    );

    return cards as MagazineCardDTO[];
  } catch (error) {
    console.error("Error fetching magazine cards:", error);
    return [];
  }
}

/**
 * Get all published articles
 * Used for generateStaticParams
 *
 * Security:
 * - Only returns published articles
 * - Only returns minimal fields needed for static generation
 */
export async function getAllPublishedArticles(): Promise<MagazineArticleDTO[]> {
  try {
    const articles = await directusClient.request(
      readItems("magazine_articles", {
        filter: {
          status: { _eq: "published" },
        },
        fields: ["id", "slug", "date_created"],
        sort: ["-date_created"], // Sort by date descending
        limit: -1,
      })
    );

    return articles as MagazineArticleDTO[];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

/**
 * Get single article by slug
 *
 * @param slug - Article slug
 * @returns Article DTO or null if not found
 *
 * Security:
 * - Only returns published articles
 * - Validates slug input
 * - Returns safe DTO
 */
export async function getArticleBySlug(
  slug: string
): Promise<MagazineArticleDTO | null> {
  try {
    // Validate input
    if (!slug || typeof slug !== "string") {
      console.error("Invalid slug:", slug);
      return null;
    }

    // Sanitize input
    const safeSlug = slug.trim().toLowerCase();

    // Validate slug format (alphanumeric and hyphens only)
    if (!/^[a-z0-9-]+$/.test(safeSlug)) {
      console.error("Invalid slug format:", safeSlug);
      return null;
    }

    const articles = await directusClient.request(
      readItems("magazine_articles", {
        filter: {
          slug: { _eq: safeSlug },
          status: { _eq: "published" },
        },
        fields: [
          "id",
          "slug",
          "title",
          "category",
          "content",
          "date_created",
          "date_updated",
        ],
        limit: 1,
      })
    );

    return articles.length > 0 ? (articles[0] as MagazineArticleDTO) : null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

/**
 * Get articles count
 * Useful for statistics
 */
export async function getPublishedArticlesCount(): Promise<number> {
  try {
    const articles = await getAllPublishedArticles();
    return articles.length;
  } catch (error) {
    console.error("Error counting articles:", error);
    return 0;
  }
}
