import Link from 'next/link';
import styles from '@/styles/ProducerCard.module.css';

interface ShopCardProps {
  categoryName: string;
  producerName: string;
  regionName: string;
  shopUrl: string;
}

export default function ShopCard({
  categoryName,
  producerName,
  regionName,
  shopUrl,
}: ShopCardProps) {
  return (
    <article className={styles.shopCard}>
      {/* Category Name */}
      <p className={styles.categoryName}>{categoryName}</p>

      {/* Producer Name with Underline */}
      <h2 className={styles.producerName}>{producerName}</h2>

      {/* Region Name */}
      <p className={styles.regionName}>{regionName}</p>

      {/* CTA Button */}
      <Link
        href={shopUrl}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.ctaButton}
      >
        <div className={styles.buttonInner}>
          <span className={styles.buttonText}>Visita lo Shop</span>
        </div>
      </Link>
    </article>
  );
}
