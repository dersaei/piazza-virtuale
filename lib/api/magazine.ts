// lib/api/magazine.ts
/**
 * Cached wrapper for magazine data access
 * This layer adds caching to the Data Access Layer
 */
"use cache";

import { cacheTag, cacheLife } from "next/cache";
import {
  getMagazineCards as getCardsFromDAL,
  getAllPublishedArticles as getAllArticlesFromDAL,
  getArticleBySlug as getArticleFromDAL,
  type MagazineCardDTO,
  type MagazineArticleDTO,
} from "@/lib/data";

// Re-export types for backward compatibility
export type MagazineCard = MagazineCardDTO;
export type MagazineArticle = MagazineArticleDTO;

/**
 * Get all magazine cards for homepage (with caching)
 */
export async function getMagazineCards(): Promise<MagazineCardDTO[]> {
  cacheLife("days");
  cacheTag("magazine-cards");

  return getCardsFromDAL();
}

/**
 * Get all articles (with caching)
 * Used for generateStaticParams
 */
export async function getAllArticles(): Promise<MagazineArticleDTO[]> {
  cacheLife("days");
  cacheTag("magazine-articles");

  return getAllArticlesFromDAL();
}

/**
 * Get single article by slug (with caching)
 */
export async function getArticleBySlug(
  slug: string
): Promise<MagazineArticleDTO | null> {
  cacheLife("days");
  cacheTag("magazine-articles");
  cacheTag(`magazine-article-${slug}`);

  return getArticleFromDAL(slug);
}

// Cache configuration: automatically revalidates every day (static content)
// Can be invalidated immediately via webhook using tags:
// - 'magazine-articles' (all articles)
// - 'magazine-article-{slug}' (specific article)
// - 'magazine-cards' (cards on homepage)
