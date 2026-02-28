// lib/api/magazine.ts
import { cacheTag, cacheLife } from "next/cache";
import {
  getMagazineCards as getCardsFromDAL,
  getAllPublishedArticles as getAllArticlesFromDAL,
  getArticleBySlug as getArticleFromDAL,
  type MagazineCardDTO,
  type MagazineArticleDTO,
  type SeoDTO,
} from "@/lib/data";

export type MagazineCard = MagazineCardDTO;
export type MagazineArticle = MagazineArticleDTO;
export type { SeoDTO };

export async function getMagazineCards(): Promise<MagazineCardDTO[]> {
  "use cache";
  cacheLife("days");
  cacheTag("magazine-cards");

  return getCardsFromDAL();
}

export async function getAllArticles(): Promise<MagazineArticleDTO[]> {
  "use cache";
  cacheLife("days");
  cacheTag("magazine-articles");

  return getAllArticlesFromDAL();
}

export async function getArticleBySlug(
  slug: string
): Promise<MagazineArticleDTO | null> {
  "use cache";
  cacheLife("days");
  cacheTag("magazine-articles");
  cacheTag(`magazine-article-${slug}`);

  return getArticleFromDAL(slug);
}
