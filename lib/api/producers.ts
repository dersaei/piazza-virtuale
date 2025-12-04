// lib/api/producers.ts
/**
 * Cached wrapper for producers data access
 * This layer adds caching to the Data Access Layer
 */
"use cache";

import { cacheTag, cacheLife } from "next/cache";
import {
  getProducersByCategory as getProducersFromDAL,
  getAllCategoryCounts as getAllCategoryCountsFromDAL,
  type ProducerDTO,
} from "@/lib/data";

// Re-export type for backward compatibility
export type Producer = ProducerDTO;

/**
 * Get producers by category (with caching)
 * This is a cached wrapper around the DAL function
 */
export async function getProducersByCategory(
  categorySlug: string
): Promise<ProducerDTO[]> {
  cacheLife("hours");
  // Cache tags for granular revalidation
  cacheTag("producers"); // Global tag for all producers
  cacheTag(`producers-${categorySlug}`); // Category-specific tag

  // Delegate to Data Access Layer
  return getProducersFromDAL(categorySlug);
}

/**
 * Get counts for all main categories (with caching)
 * This is a cached wrapper around the DAL function
 */
export async function getAllCategoryCounts(): Promise<
  Record<string, number>
> {
  cacheLife("hours");
  // Cache tag for category counts
  cacheTag("producers"); // Global tag for all producers
  cacheTag("category-counts"); // Specific tag for counts

  // Delegate to Data Access Layer
  return getAllCategoryCountsFromDAL();
}

// Cache configuration: automatically revalidates every 1 hour
// Can be invalidated immediately via webhook using tags:
// - 'producers' (all producers)
// - 'producers-{categorySlug}' (specific category)
// - 'category-counts' (all category counts)
