// lib/data/producers.ts
import "server-only";
import { directusClient } from "./directus-client";
import { readItems } from "@directus/sdk";

/**
 * Producer Data Transfer Object (DTO)
 * This is the SAFE, PUBLIC-FACING data structure
 * Only includes data that should be exposed to the client
 */
export interface ProducerDTO {
  id: string;
  name: string;
  name_alt: string;
  category: {
    slug: string;
    name: string;
    parent_category?: {
      slug: string;
    } | null;
  };
  region: string;
  logo?: string;
  shop_url: string;
}

/**
 * Fetch producers by category
 *
 * @param categorySlug - Category slug to filter by
 * @returns Array of safe producer DTOs
 *
 * Security:
 * - Only returns published producers
 * - Only returns public fields (no sensitive data)
 * - Returns DTOs instead of raw database objects
 */
export async function getProducersByCategory(
  categorySlug: string
): Promise<ProducerDTO[]> {
  try {
    // Validate input
    if (!categorySlug || typeof categorySlug !== "string") {
      console.error("Invalid categorySlug:", categorySlug);
      return [];
    }

    // Sanitize input
    const safeCategorySlug = categorySlug.trim().toLowerCase();

    const producers = await directusClient.request(
      readItems("producers", {
        filter: {
          _or: [
            {
              category: {
                slug: { _eq: safeCategorySlug },
              },
            },
            {
              category: {
                parent_category: {
                  slug: { _eq: safeCategorySlug },
                },
              },
            },
          ],
          status: { _eq: "published" },
        },
        fields: [
          "id",
          "name",
          "name_alt",
          "category.slug",
          "category.name",
          "category.parent_category.slug",
          "region",
          "logo",
          "shop_url",
        ],
        sort: ["name"],
        limit: -1,
      })
    );

    // Return as DTOs (already filtered by fields above)
    return producers as ProducerDTO[];
  } catch (error) {
    console.error("Error fetching producers:", error);
    return [];
  }
}

/**
 * Get total count of producers by category
 * Useful for pagination or statistics
 */
export async function getProducersCountByCategory(
  categorySlug: string
): Promise<number> {
  try {
    const producers = await getProducersByCategory(categorySlug);
    return producers.length;
  } catch (error) {
    console.error("Error counting producers:", error);
    return 0;
  }
}
