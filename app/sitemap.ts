// app/sitemap.ts
import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/constants/categories";
import { getAllArticles } from "@/lib/api/magazine";

const BASE_URL = "https://piazzavirtuale.it";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/chi-siamo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/come-funziona`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contatti`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/magazine`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/informativa-privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/informativa-cookie`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/note-legali`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic category pages
  const categoryPages: MetadataRoute.Sitemap = Object.values(CATEGORIES).map(
    (category) => ({
      url: `${BASE_URL}${category.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: category.parent ? 0.7 : 0.8, // Main categories have higher priority
    })
  );

  // Dynamic magazine articles
  let magazineArticles: MetadataRoute.Sitemap = [];
  try {
    const articles = await getAllArticles();
    magazineArticles = articles.map((article) => ({
      url: `${BASE_URL}/magazine/${article.slug}`,
      lastModified: article.date_updated
        ? new Date(article.date_updated)
        : new Date(article.date_created),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching magazine articles for sitemap:", error);
  }

  // Combine all pages
  return [...staticPages, ...categoryPages, ...magazineArticles];
}
