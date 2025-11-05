import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/ProducerCard.module.css';

interface ShopCardProps {
  categoryName: string;
  producerName: string;
  producerNameAlt: string;
  regionName: string;
  shopUrl: string;
  logoPath?: string;
}

export default function ShopCard({
  categoryName,
  producerName,
  producerNameAlt,
  regionName,
  shopUrl,
  logoPath,
}: ShopCardProps) {
  return (
    <article className={styles.shopCard}>
      <p className={styles.categoryName}>{categoryName}</p>

      <h2
        className={styles.producerName}
        dangerouslySetInnerHTML={{ __html: producerName }}
      />

      <p className={styles.regionName}>{regionName}</p>

      {logoPath && (
        <div className={styles.logoContainer}>
          <Image
            src={`/${logoPath}`}
            alt={producerNameAlt}
            fill={true}
            className={styles.logo}
          />
        </div>
      )}

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
