// lib/api/producers.ts
"use cache";

import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { cacheTag } from "next/cache";

export interface Producer {
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
  status: string;
}

export async function getProducersByCategory(
  categorySlug: string
): Promise<Producer[]> {
  // Cache tags for granular revalidation
  cacheTag("producers"); // Global tag for all producers
  cacheTag(`producers-${categorySlug}`); // Category-specific tag
  try {
    const producers = await directus.request(
      readItems("producers", {
        filter: {
          _or: [
            {
              category: {
                slug: { _eq: categorySlug },
              },
            },
            {
              category: {
                parent_category: {
                  slug: { _eq: categorySlug },
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

    return producers as Producer[];
  } catch (error) {
    console.error("Error fetching producers:", error);
    return [];
  }
}

// Cache configuration: automatically revalidates every 1 hour
// Can be invalidated immediately via webhook using tags:
// - 'producers' (all producers)
// - 'producers-{categorySlug}' (specific category)
