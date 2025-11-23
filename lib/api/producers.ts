// lib/api/producers.ts
/**
 * Cached wrapper for producers data access
 * This layer adds caching to the Data Access Layer
 */
"use cache";

import { cacheTag, cacheLife } from "next/cache";
import {
  getProducersByCategory as getProducersFromDAL,
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

// Cache configuration: automatically revalidates every 1 hour
// Can be invalidated immediately via webhook using tags:
// - 'producers' (all producers)
// - 'producers-{categorySlug}' (specific category)
