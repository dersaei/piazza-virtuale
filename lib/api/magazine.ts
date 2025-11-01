// lib/api/magazine.ts
'use cache';

import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { cacheTag } from 'next/cache';

// Magazine Card interface (for /magazine page)
export interface MagazineCard {
  id: number; // ← ZMIANA: Integer zamiast UUID
  category: string;
  title: string;
  url: string;
  sort: number;
  date_created: string; // ← NOWE POLE
}

// Magazine Article interface (for /magazine/[slug] page)
export interface MagazineArticle {
  id: number; // ← ZMIANA: Integer zamiast UUID
  slug: string;
  title: string;
  category: string;
  content: string;
  date_created: string; // ← ZMIANA: date_published → date_created
  date_updated?: string; // ← NOWE POLE (opcjonalne)
  status: string;
}

// Get all magazine cards for homepage
export async function getMagazineCards(): Promise<MagazineCard[]> {
  cacheTag('magazine-cards');

  try {
    const cards = await directus.request(
      readItems('magazine_cards', {
        filter: {
          status: { _eq: 'published' },
        },
        fields: ['id', 'category', 'title', 'url', 'sort', 'date_created'],
        sort: ['sort'], // Sort by manual order
        limit: -1,
      })
    );

    return cards as MagazineCard[];
  } catch (error) {
    console.error('Error fetching magazine cards:', error);
    return [];
  }
}

// Get all articles (for generateStaticParams)
export async function getAllArticles(): Promise<MagazineArticle[]> {
  cacheTag('magazine-articles');

  try {
    const articles = await directus.request(
      readItems('magazine_articles', {
        filter: {
          status: { _eq: 'published' },
        },
        fields: ['id', 'slug', 'date_created'],
        sort: ['-date_created'], // ← ZMIANA: Sort by date_created desc
        limit: -1,
      })
    );

    return articles as MagazineArticle[];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Get single article by slug
export async function getArticleBySlug(
  slug: string
): Promise<MagazineArticle | null> {
  cacheTag('magazine-articles');
  cacheTag(`magazine-article-${slug}`);

  try {
    const articles = await directus.request(
      readItems('magazine_articles', {
        filter: {
          slug: { _eq: slug },
          status: { _eq: 'published' },
        },
        fields: [
          'id',
          'slug',
          'title',
          'category',
          'content',
          'date_created', // ← ZMIANA
          'date_updated', // ← NOWE
        ],
        limit: 1,
      })
    );

    return articles.length > 0 ? (articles[0] as MagazineArticle) : null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Cache configuration: automatically revalidates every day (static content)
// Can be invalidated immediately via webhook using tags:
// - 'magazine-articles' (all articles)
// - 'magazine-article-{slug}' (specific article)
// - 'magazine-cards' (cards on homepage)
