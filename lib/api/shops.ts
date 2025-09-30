// lib/api/shops.ts
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export interface Shop {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  website_url: string;
  is_premium: boolean;
  logo_url?: string;
  region: {
    id: string;
    name: string;
    slug: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  distinctive_products?: Array<{
    id: string;
    name: string;
  }>;
  awards?: Array<{
    id: string;
    name: string;
    year: number;
    image_url?: string;
  }>;
  featured_products?: Array<{
    id: string;
    name: string;
    image_url: string;
    product_url: string;
  }>;
  status: 'published' | 'draft' | 'archived';
}

export interface Region {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
}

interface ShopFilters {
  region?: string;
  product?: string;
  search?: string;
}

/**
 * Fetch shops by category with optional filters
 * Uses Directus SDK with automatic Redis caching
 */
export async function getShopsByCategory(
  categorySlug: string,
  filters?: ShopFilters
): Promise<Shop[]> {
  try {
    // Build Directus filter object
    const directusFilter: Record<string, unknown> = {
      category: {
        slug: { _eq: categorySlug },
      },
      status: { _eq: 'published' },
    };

    // Add region filter if provided
    if (filters?.region) {
      directusFilter.region = {
        slug: { _eq: filters.region },
      };
    }

    // Add product filter if provided
    if (filters?.product) {
      directusFilter.distinctive_products = {
        slug: { _eq: filters.product },
      };
    }

    // Add search filter if provided
    if (filters?.search) {
      directusFilter._or = [
        { name: { _icontains: filters.search } },
        { description: { _icontains: filters.search } },
        { short_description: { _icontains: filters.search } },
      ];
    }

    const shops = await directus.request(
      readItems('shops', {
        filter: directusFilter,
        fields: [
          'id',
          'name',
          'slug',
          'description',
          'short_description',
          'website_url',
          'is_premium',
          'logo_url',
          'region.id',
          'region.name',
          'region.slug',
          'category.id',
          'category.name',
          'category.slug',
          'distinctive_products.id',
          'distinctive_products.name',
          'awards.id',
          'awards.name',
          'awards.year',
          'awards.image_url',
          'featured_products.id',
          'featured_products.name',
          'featured_products.image_url',
          'featured_products.product_url',
          'status',
        ],
        sort: ['-is_premium', 'name'], // Premium shops first, then alphabetical
        limit: -1, // Get all matching shops
      })
    );

    return shops as Shop[];
  } catch (error) {
    console.error('Error fetching shops:', error);
    return [];
  }
}

/**
 * Fetch all regions for filter dropdown
 */
export async function getRegions(): Promise<Region[]> {
  try {
    const regions = await directus.request(
      readItems('regions', {
        filter: {
          status: { _eq: 'published' },
        },
        fields: ['id', 'name', 'slug'],
        sort: ['name'],
        limit: -1,
      })
    );

    return regions as Region[];
  } catch (error) {
    console.error('Error fetching regions:', error);
    return [];
  }
}

/**
 * Fetch products (distinctive products) by category
 */
export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  try {
    const products = await directus.request(
      readItems('products', {
        filter: {
          category: {
            slug: { _eq: categorySlug },
          },
          status: { _eq: 'published' },
        },
        fields: ['id', 'name', 'slug'],
        sort: ['name'],
        limit: -1,
      })
    );

    return products as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Get shop count by category (useful for analytics)
 */
export async function getShopCountByCategory(
  categorySlug: string
): Promise<number> {
  try {
    const result = await directus.request(
      readItems('shops', {
        filter: {
          category: {
            slug: { _eq: categorySlug },
          },
          status: { _eq: 'published' },
        },
        aggregate: {
          count: '*',
        },
      })
    );

    return result?.[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching shop count:', error);
    return 0;
  }
}
