// lib/data/magazine.ts
import "server-only";
import { directusClient } from "./directus-client";
import { readItems } from "@directus/sdk";

/**
 * Category DTO
 * Safe, public-facing category data structure
 */
export interface CategoryDTO {
  name: string;
  display_name: string;
  color: string;
}

/**
 * Magazine Card DTO (for /magazine page)
 * Safe, public-facing data structure
 */
export interface MagazineCardDTO {
  id: number;
  category: CategoryDTO;
  title: string;
  url: string;
  sort: number;
  date_created: string;
}

/**
 * Raw Directus response type for magazine_cards
 * Internal type used for API response transformation
 */
interface DirectusMagazineCardResponse {
  id: number;
  title: string;
  url: string;
  sort: number;
  date_created: string;
  magazine_category_id?: CategoryDTO | null;
}

/**
 * Magazine Article DTO (for /magazine/[slug] page)
 * Safe, public-facing data structure
 */
export interface MagazineArticleDTO {
  id: number;
  slug: string;
  title: string;
  category: CategoryDTO;
  content: string;
  date_created: string;
  date_updated?: string;
}

/**
 * Raw Directus response type for magazine_articles
 * Internal type used for API response transformation
 */
interface DirectusMagazineArticleResponse {
  id: number;
  slug: string;
  title: string;
  content: string;
  date_created: string;
  date_updated?: string;
  magazine_category_id?: CategoryDTO | null;
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
        fields: [
          "id",
          "title",
          "url",
          "sort",
          "date_created",
          {
            magazine_category_id: ["name", "display_name", "color"],
          },
        ],
        sort: ["sort"], // Sort by manual order
        limit: -1,
      })
    );

    return (cards as DirectusMagazineCardResponse[]).map((card) => {
      return {
        id: card.id,
        category: card.magazine_category_id || {
          name: "default",
          display_name: "Categoria",
          color: "#B8A281", // fallback color
        },
        title: card.title,
        url: card.url,
        sort: card.sort,
        date_created: card.date_created,
      };
    }) as MagazineCardDTO[];
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
          "content",
          "date_created",
          "date_updated",
          {
            magazine_category_id: ["name", "display_name", "color"],
          },
        ],
        limit: 1,
      })
    );

    if (articles.length === 0) {
      return null;
    }

    const article = articles[0] as DirectusMagazineArticleResponse;

    return {
      id: article.id,
      slug: article.slug,
      title: article.title,
      category: article.magazine_category_id || {
        name: "default",
        display_name: "Categoria",
        color: "#B8A281", // fallback color
      },
      content: article.content,
      date_created: article.date_created,
      date_updated: article.date_updated,
    };
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
