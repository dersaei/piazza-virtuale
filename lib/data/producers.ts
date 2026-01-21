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

/**
 * Get counts for all categories
 * Returns a map of category slug to producer count
 */
export async function getAllCategoryCounts(): Promise<
  Record<string, number>
> {
  try {
    const producers = await directusClient.request(
      readItems("producers", {
        filter: {
          status: { _eq: "published" },
        },
        fields: [
          "id",
          "category.slug",
        ],
        limit: -1,
      })
    );

    // Count producers by their actual category
    const counts: Record<string, number> = {};

    for (const producer of producers) {
      const categorySlug = producer.category?.slug;

      if (categorySlug) {
        counts[categorySlug] = (counts[categorySlug] || 0) + 1;
      }
    }

    return counts;
  } catch (error) {
    console.error("Error fetching category counts:", error);
    return {};
  }
}

/**
 * Get counts for all regions
 * Returns an array of objects with region name and producer count, sorted by count descending
 */
export async function getAllRegionCounts(): Promise<Array<{region: string; count: number}>> {
  try {
    const producers = await directusClient.request(
      readItems("producers", {
        filter: {
          status: { _eq: "published" },
        },
        fields: [
          "id",
          "region",
        ],
        limit: -1,
      })
    );

    // Count producers by region
    const counts: Record<string, number> = {};

    for (const producer of producers) {
      const region = producer.region;

      if (region && typeof region === 'string') {
        counts[region] = (counts[region] || 0) + 1;
      }
    }

    // Convert to array and sort by count descending
    return Object.entries(counts)
      .map(([region, count]) => ({ region, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error("Error fetching region counts:", error);
    return [];
  }
}

/**
 * Get total count of all published producers
 * Returns the total number of shops in the catalog
 */
export async function getTotalProducersCount(): Promise<number> {
  try {
    const producers = await directusClient.request(
      readItems("producers", {
        filter: {
          status: { _eq: "published" },
        },
        fields: ["id"],
        limit: -1,
      })
    );

    return producers.length;
  } catch (error) {
    console.error("Error fetching total producers count:", error);
    return 0;
  }
}

/**
 * Featured Producer DTO for region list
 */
export interface FeaturedProducerDTO {
  id: string;
  name: string;
  name_alt: string;
  category: {
    name: string;
  };
  region: string;
  logo?: string;
  shop_url: string;
}

/**
 * Region with featured producer DTO
 */
export interface RegionWithFeaturedDTO {
  region: string;
  count: number;
  featuredProducer: FeaturedProducerDTO | null;
}

/**
 * Get regions with their counts and featured producers
 * Returns top 20 regions sorted by count descending, each with one featured producer
 * Featured producer is selected by is_featured flag, or first by name if none featured
 */
export async function getRegionsWithFeaturedProducers(): Promise<RegionWithFeaturedDTO[]> {
  try {
    // First try with is_featured field
    let producers;
    let hasFeaturedField = true;

    try {
      producers = await directusClient.request(
        readItems("producers", {
          filter: {
            status: { _eq: "published" },
          },
          fields: [
            "id",
            "name",
            "name_alt",
            "category.name",
            "region",
            "logo",
            "shop_url",
            "is_featured",
          ],
          sort: ["-is_featured", "name"],
          limit: -1,
        })
      );
    } catch {
      // Fallback: fetch without is_featured field if it doesn't exist yet
      hasFeaturedField = false;
      producers = await directusClient.request(
        readItems("producers", {
          filter: {
            status: { _eq: "published" },
          },
          fields: [
            "id",
            "name",
            "name_alt",
            "category.name",
            "region",
            "logo",
            "shop_url",
          ],
          sort: ["name"],
          limit: -1,
        })
      );
    }

    // Group producers by region and count them
    const regionMap: Record<string, {
      count: number;
      featuredProducer: FeaturedProducerDTO | null;
      hasFeatured: boolean;
    }> = {};

    for (const producer of producers) {
      const region = producer.region;

      if (region && typeof region === "string") {
        if (!regionMap[region]) {
          regionMap[region] = {
            count: 0,
            featuredProducer: null,
            hasFeatured: false,
          };
        }

        regionMap[region].count++;

        // Set featured producer
        // Priority: is_featured=true first, then first alphabetically
        // Check for truthy value (handles boolean true, string "true", 1, etc.)
        const isFeatured = hasFeaturedField && (
          producer.is_featured === true ||
          producer.is_featured === "true" ||
          producer.is_featured === 1
        );

        // Replace if: no featured yet, OR this one is featured and current one isn't
        if (!regionMap[region].featuredProducer || (isFeatured && !regionMap[region].hasFeatured)) {
          regionMap[region].featuredProducer = {
            id: producer.id,
            name: producer.name,
            name_alt: producer.name_alt,
            category: {
              name: producer.category?.name || "",
            },
            region: producer.region,
            logo: producer.logo || undefined,
            shop_url: producer.shop_url,
          };
          regionMap[region].hasFeatured = isFeatured;
        }
      }
    }

    // Convert to array, sort by count descending, and take top 20
    return Object.entries(regionMap)
      .map(([region, data]) => ({
        region,
        count: data.count,
        featuredProducer: data.featuredProducer,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  } catch (error) {
    console.error("Error fetching regions with featured producers:", error);
    return [];
  }
}
