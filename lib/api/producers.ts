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
  getAllRegionCounts as getAllRegionCountsFromDAL,
  getTotalProducersCount as getTotalProducersCountFromDAL,
  getRegionsWithFeaturedProducers as getRegionsWithFeaturedProducersFromDAL,
  type ProducerDTO,
  type RegionWithFeaturedDTO,
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

/**
 * Get counts for all regions (with caching)
 * This is a cached wrapper around the DAL function
 */
export async function getAllRegionCounts(): Promise<Array<{region: string; count: number}>> {
  cacheLife("hours");
  // Cache tag for region counts
  cacheTag("producers"); // Global tag for all producers
  cacheTag("region-counts"); // Specific tag for region counts

  // Delegate to Data Access Layer
  return getAllRegionCountsFromDAL();
}

/**
 * Get total count of all published producers (with caching)
 * This is a cached wrapper around the DAL function
 */
export async function getTotalProducersCount(): Promise<number> {
  cacheLife("hours");
  // Cache tag for total count
  cacheTag("producers"); // Global tag for all producers
  cacheTag("total-count"); // Specific tag for total count

  // Delegate to Data Access Layer
  return getTotalProducersCountFromDAL();
}

/**
 * Get regions with their counts and featured producers (with caching)
 * This is a cached wrapper around the DAL function
 */
export async function getRegionsWithFeaturedProducers(): Promise<RegionWithFeaturedDTO[]> {
  cacheLife("hours");
  // Cache tags for regions with featured
  cacheTag("producers"); // Global tag for all producers
  cacheTag("regions-featured"); // Specific tag for regions with featured

  // Delegate to Data Access Layer
  return getRegionsWithFeaturedProducersFromDAL();
}

// Cache configuration: automatically revalidates every 1 hour
// Can be invalidated immediately via webhook using tags:
// - 'producers' (all producers)
// - 'producers-{categorySlug}' (specific category)
// - 'category-counts' (all category counts)
// - 'region-counts' (all region counts)
// - 'total-count' (total producers count)
// - 'regions-featured' (regions with featured producers)
