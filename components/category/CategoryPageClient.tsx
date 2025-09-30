// components/category/CategoryPageClient.tsx
'use client';

import { useState } from 'react';
import ShopGrid from './ShopGrid';
import styles from '@/styles/CategoryPage.module.css';
import type { Shop } from '@/lib/api/shops';

interface CategoryPageClientProps {
  initialShops: Shop[];
  categoryLabel: string;
}

export default function CategoryPageClient({
  initialShops,
  categoryLabel,
}: CategoryPageClientProps) {
  const [displayedShops] = useState(initialShops);

  return (
    <div className={styles.categoryContainer}>
      {/* Category Label Rectangle */}
      <div className={styles.categoryLabel}>
        <h1>{categoryLabel}</h1>
      </div>

      {/* Shop Grid */}
      <ShopGrid shops={displayedShops} isLoading={false} />
    </div>
  );
}
