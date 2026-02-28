// lib/api/pages.ts
import { cacheTag, cacheLife } from "next/cache";
import { getPageSeo as getPageSeoFromDAL } from "@/lib/data";
import type { SeoDTO } from "@/lib/data/magazine";

export type { SeoDTO };

export async function getPageSeo(slug: string): Promise<SeoDTO | null> {
  "use cache";
  cacheLife("days");
  cacheTag("pages-seo");
  cacheTag(`page-seo-${slug}`);

  return getPageSeoFromDAL(slug);
}
