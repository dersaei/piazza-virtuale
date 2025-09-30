// components/category/ShopCard.tsx
import Image from 'next/image';
import styles from '@/styles/ShopCard.module.css';
import type { Shop } from '@/lib/api/shops';

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const isPremium = shop.is_premium;

  return (
    <article
      className={`${styles.shopCard} ${isPremium ? styles.premium : styles.standard}`}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className={styles.premiumBadge}>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path
              d='M8 1l2.163 4.382 4.837.703-3.5 3.411.826 4.817L8 12.09l-4.326 2.223.826-4.817-3.5-3.411 4.837-.703L8 1z'
              fill='currentColor'
            />
          </svg>
          <span>Premium</span>
        </div>
      )}

      {/* Header Section */}
      <header className={styles.cardHeader}>
        {/* Logo */}
        {shop.logo_url && (
          <div className={styles.logoWrapper}>
            <Image
              src={shop.logo_url}
              alt={`Logo ${shop.name}`}
              width={64}
              height={64}
              className={styles.logo}
            />
          </div>
        )}

        {/* Shop Name & Region */}
        <div className={styles.headerInfo}>
          <h3 className={styles.shopName}>{shop.name}</h3>
          <p className={styles.region}>
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
              <path
                d='M7 1.75a3.5 3.5 0 0 0-3.5 3.5c0 2.625 3.5 7 3.5 7s3.5-4.375 3.5-7A3.5 3.5 0 0 0 7 1.75z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <circle cx='7' cy='5.25' r='1.167' fill='currentColor' />
            </svg>
            {shop.region.name}
          </p>
        </div>
      </header>

      {/* Description */}
      <div className={styles.description}>
        {isPremium ? (
          <p className={styles.fullDescription}>{shop.description}</p>
        ) : (
          <p className={styles.shortDescription}>{shop.short_description}</p>
        )}
      </div>

      {/* Distinctive Products */}
      {shop.distinctive_products && shop.distinctive_products.length > 0 && (
        <div className={styles.distinctiveProducts}>
          <h4 className={styles.sectionTitle}>Prodotti distintivi</h4>
          <div className={styles.productTags}>
            {shop.distinctive_products.map(product => (
              <span key={product.id} className={styles.productTag}>
                {product.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Awards (if available) */}
      {shop.awards && shop.awards.length > 0 && (
        <div className={styles.awards}>
          <h4 className={styles.sectionTitle}>Riconoscimenti</h4>
          <div className={styles.awardsList}>
            {shop.awards.map(award => (
              <div key={award.id} className={styles.awardItem}>
                {award.image_url && (
                  <Image
                    src={award.image_url}
                    alt={award.name}
                    width={32}
                    height={32}
                    className={styles.awardImage}
                  />
                )}
                <div className={styles.awardInfo}>
                  <span className={styles.awardName}>{award.name}</span>
                  <span className={styles.awardYear}>{award.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Products (Premium only) */}
      {isPremium &&
        shop.featured_products &&
        shop.featured_products.length > 0 && (
          <div className={styles.featuredProducts}>
            <h4 className={styles.sectionTitle}>Prodotti in evidenza</h4>
            <div className={styles.productsGrid}>
              {shop.featured_products.slice(0, 3).map(product => (
                <a
                  key={product.id}
                  href={product.product_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.featuredProduct}
                >
                  <div className={styles.productImageWrapper}>
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={120}
                      height={120}
                      className={styles.productImage}
                    />
                  </div>
                  <p className={styles.productName}>{product.name}</p>
                  <span className={styles.externalLink}>
                    Vai al prodotto
                    <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
                      <path
                        d='M9 6.75v2.625A.625.625 0 0 1 8.375 10h-6.75A.625.625 0 0 1 1 9.375v-6.75A.625.625 0 0 1 1.625 2H4.25M7 1h4m0 0v4m0-4L5.5 6.5'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

      {/* Footer - Visit Shop Button */}
      <footer className={styles.cardFooter}>
        <a
          href={shop.website_url}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.visitButton}
        >
          <span>Visita l&apos;e-shop</span>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path
              d='M12 8.667v3.5a.833.833 0 0 1-.833.833H3.833A.833.833 0 0 1 3 12.167v-7.334A.833.833 0 0 1 3.833 4H7.5m2.5-1h4m0 0v4m0-4L7 10'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </a>
      </footer>
    </article>
  );
}
