// lib/api/producers.ts
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

export type Producer = ProducerDTO;

export async function getProducersByCategory(
  categorySlug: string
): Promise<ProducerDTO[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("producers");
  cacheTag(`producers-${categorySlug}`);

  return getProducersFromDAL(categorySlug);
}

export async function getAllCategoryCounts(): Promise<Record<string, number>> {
  "use cache";
  cacheLife("hours");
  cacheTag("producers");
  cacheTag("category-counts");

  return getAllCategoryCountsFromDAL();
}

export async function getAllRegionCounts(): Promise<Array<{ region: string; count: number }>> {
  "use cache";
  cacheLife("hours");
  cacheTag("producers");
  cacheTag("region-counts");

  return getAllRegionCountsFromDAL();
}

export async function getTotalProducersCount(): Promise<number> {
  "use cache";
  cacheLife("hours");
  cacheTag("producers");
  cacheTag("total-count");

  return getTotalProducersCountFromDAL();
}

export async function getRegionsWithFeaturedProducers(): Promise<RegionWithFeaturedDTO[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("producers");
  cacheTag("regions-featured");

  return getRegionsWithFeaturedProducersFromDAL();
}
