// components/ProducerCardSkeleton.tsx
import styles from '@/styles/ProducerCard.module.css';

export default function ProducerCardSkeleton() {
  return (
    <article className={styles.shopCard}>
      {/* Exact same structure as ProducerCard */}
      <p className={styles.categoryName} style={{ color: 'transparent', background: '#e0e0e0' }}>
        Loading
      </p>

      <h2 className={styles.producerName} style={{ color: 'transparent', background: '#e0e0e0' }}>
        Loading Producer
      </h2>

      <p className={styles.regionName} style={{ color: 'transparent', background: '#e0e0e0' }}>
        Loading
      </p>

      <div className={styles.logoContainer} style={{ background: '#f0f0f0' }} />

      <div className={styles.ctaButton} style={{ pointerEvents: 'none', opacity: 0.6 }}>
        <div className={styles.buttonInner}>
          <span className={styles.buttonText} style={{ color: 'transparent', background: '#e0e0e0' }}>
            Visita lo Shop
          </span>
        </div>
      </div>
    </article>
  );
}
