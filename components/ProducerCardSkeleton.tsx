// components/ProducerCardSkeleton.tsx
import styles from '@/styles/ProducerCard.module.css';

export default function ProducerCardSkeleton() {
  return (
    <article className={`${styles.shopCard} ${styles.skeleton}`}>
      {/* Category name skeleton */}
      <div
        className={styles.skeletonBox}
        style={{ width: '60%', height: '1rem', marginBottom: '0.5rem' }}
      />

      {/* Producer name skeleton */}
      <div
        className={styles.skeletonBox}
        style={{ width: '80%', height: '2rem', marginBottom: '2rem' }}
      />

      {/* Region name skeleton */}
      <div
        className={styles.skeletonBox}
        style={{ width: '40%', height: '0.9rem', marginBottom: '1.5rem' }}
      />

      {/* Logo skeleton */}
      <div
        className={styles.skeletonBox}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}
      />

      {/* Button skeleton */}
      <div
        className={styles.skeletonBox}
        style={{ width: '100%', height: '48px', borderRadius: '4px' }}
      />
    </article>
  );
}
