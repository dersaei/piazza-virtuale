// components/category/ShopGrid.tsx
import ShopCard from './ShopCard';
import styles from '@/styles/ShopGrid.module.css';
import type { Shop } from '@/lib/api/shops';

interface ShopGridProps {
  shops: Shop[];
  isLoading?: boolean;
}

export default function ShopGrid({ shops, isLoading = false }: ShopGridProps) {
  if (isLoading) {
    return <ShopGridSkeleton />;
  }

  if (shops.length === 0) {
    return null;
  }

  return (
    <div className={styles.shopGrid}>
      {shops.map(shop => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
}

/**
 * Skeleton loading state for ShopGrid
 */
export function ShopGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={styles.shopGrid}>
      {Array.from({ length: count }, (_, i) => (
        <ShopCardSkeleton key={i} isPremium={i < 2} />
      ))}
    </div>
  );
}

/**
 * Skeleton for individual shop card
 */
function ShopCardSkeleton({ isPremium = false }: { isPremium?: boolean }) {
  return (
    <div
      className={`${styles.skeletonCard} ${isPremium ? styles.skeletonPremium : ''}`}
    >
      {/* Premium Badge Skeleton */}
      {isPremium && (
        <div className={styles.skeletonBadge}>
          <div className={styles.skeletonPill} style={{ width: '80px' }} />
        </div>
      )}

      {/* Header Skeleton */}
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonLogo} />
        <div className={styles.skeletonHeaderInfo}>
          <div
            className={styles.skeletonLine}
            style={{ width: '70%', height: '24px' }}
          />
          <div
            className={styles.skeletonLine}
            style={{ width: '50%', height: '16px' }}
          />
        </div>
      </div>

      {/* Description Skeleton */}
      <div className={styles.skeletonDescription}>
        <div className={styles.skeletonLine} style={{ width: '100%' }} />
        <div className={styles.skeletonLine} style={{ width: '95%' }} />
        <div
          className={styles.skeletonLine}
          style={{ width: isPremium ? '90%' : '60%' }}
        />
        {isPremium && (
          <>
            <div className={styles.skeletonLine} style={{ width: '85%' }} />
            <div className={styles.skeletonLine} style={{ width: '75%' }} />
          </>
        )}
      </div>

      {/* Products Tags Skeleton */}
      <div className={styles.skeletonTags}>
        <div className={styles.skeletonPill} style={{ width: '80px' }} />
        <div className={styles.skeletonPill} style={{ width: '100px' }} />
        <div className={styles.skeletonPill} style={{ width: '90px' }} />
      </div>

      {/* Featured Products Skeleton (Premium only) */}
      {isPremium && (
        <div className={styles.skeletonFeatured}>
          <div
            className={styles.skeletonLine}
            style={{ width: '40%', height: '14px', marginBottom: '8px' }}
          />
          <div className={styles.skeletonProducts}>
            {[1, 2, 3].map(i => (
              <div key={i} className={styles.skeletonProduct}>
                <div className={styles.skeletonProductImage} />
                <div
                  className={styles.skeletonLine}
                  style={{ width: '90%', height: '12px' }}
                />
                <div
                  className={styles.skeletonLine}
                  style={{ width: '60%', height: '10px' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Button Skeleton */}
      <div className={styles.skeletonButton} />
    </div>
  );
}
