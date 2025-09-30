// app/birre/page.tsx
import { Suspense } from 'react';
import {
  getShopsByCategory,
  getRegions,
  getProductsByCategory,
} from '@/lib/api/shops';
import CategoryPageClient from '@/components/category/CategoryPageClient';
import { ShopGridSkeleton } from '@/components/category/ShopGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birre - Birrifici Artigianali Italiani | Piazza Virtuale',
  description:
    'Scopri i birrifici artigianali italiani che vendono online. Birre craft, birre tradizionali e specialità regionali direttamente dai produttori.',
};

interface PageProps {
  searchParams: {
    region?: string;
    product?: string;
    q?: string;
  };
}

export default async function BirrePage({ searchParams }: PageProps) {
  // Parallel data fetching for optimal performance
  const [shops, regions, products] = await Promise.all([
    getShopsByCategory('birre', {
      region: searchParams.region,
      product: searchParams.product,
      search: searchParams.q,
    }),
    getRegions(),
    getProductsByCategory('birre'),
  ]);

  return (
    <div className='category-page'>
      <header className='category-header'>
        <h1>Birrifici Artigianali Italiani</h1>
        <p>
          Scopri i birrifici che producono e vendono direttamente online. Dalla
          tradizione birraia del Nord alle nuove craft brewery del Sud.
        </p>
      </header>

      <Suspense fallback={<ShopGridSkeleton count={6} />}>
        <CategoryPageClient
          initialShops={shops}
          regions={regions}
          products={products}
          category='birre'
          categoryLabel='Birre'
          initialFilters={{
            region: searchParams.region,
            product: searchParams.product,
            search: searchParams.q,
          }}
        />
      </Suspense>
    </div>
  );
}

// Generate static params for common filter combinations (optional optimization)
export async function generateStaticParams() {
  // Pre-render the base page without filters
  return [{}];
}
