// src/lib/api/magazine.ts
// Funkcje do pobierania artykułów z Directus dla Magazine

import directus from '../directus';
import { readItems } from '@directus/sdk';

// Magazine Card interface (for /magazine page)
export interface MagazineCard {
  id: number; // ← ZMIANA: Integer zamiast UUID
  category: string;
  title: string;
  url: string; // Slug artykułu (bez /magazine/ - prefiks dodawany w komponencie)
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

// Get all articles (for getStaticPaths in Astro)
export async function getAllArticles(): Promise<MagazineArticle[]> {
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
