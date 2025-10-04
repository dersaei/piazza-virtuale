// lib/api/producers.ts
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export interface Producer {
  id: string;
  name: string;
  slug: string;
  category: string;
  region: string;
  shop_url: string;
  status: string;
}

export async function getProducersByCategory(
  categorySlug: string
): Promise<Producer[]> {
  try {
    const producers = await directus.request(
      readItems('producers', {
        filter: {
          category: { _eq: categorySlug },
          status: { _eq: 'published' },
        },
        fields: ['id', 'name', 'slug', 'category', 'region', 'shop_url'],
        sort: ['name'],
        limit: -1,
      })
    );

    return producers as Producer[];
  } catch (error) {
    console.error('Error fetching producers:', error);
    return [];
  }
}
