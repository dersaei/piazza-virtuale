// app/birre/page.tsx
import { Suspense } from 'react';
import { getShopsByCategory } from '@/lib/api/shops';
import CategoryPageClient from '@/components/category/CategoryPageClient';
import { ShopGridSkeleton } from '@/components/category/ShopGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birre - Birrifici Artigianali Italiani | Piazza Virtuale',
  description:
    'Scopri i birrifici artigianali italiani che vendono online. Birre craft, birre tradizionali e specialità regionali direttamente dai produttori.',
};

export default async function BirrePage() {
  const shops = await getShopsByCategory('birre');

  return (
    <Suspense fallback={<ShopGridSkeleton count={6} />}>
      <CategoryPageClient initialShops={shops} categoryLabel='Birre' />
    </Suspense>
  );
}
