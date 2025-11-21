// components/ArticleSkeleton.tsx
import styles from '@/styles/ArticlePage.module.css';

export default function ArticleSkeleton() {
  return (
    <div className={styles.articlePage}>
      <article className={`${styles.articleCard} ${styles.skeleton}`}>
        <div className={styles.articleHeader}>
          {/* Category tag skeleton */}
          <div
            className={styles.skeletonBox}
            style={{
              width: '150px',
              height: '32px',
              margin: '0 auto 1.5rem',
              borderRadius: '2px'
            }}
          />

          {/* Title skeleton */}
          <div
            className={styles.skeletonBox}
            style={{
              width: '80%',
              height: '3rem',
              margin: '0 auto 2rem',
              borderRadius: '4px'
            }}
          />

          {/* Date skeleton */}
          <div
            className={styles.skeletonBox}
            style={{
              width: '120px',
              height: '1rem',
              margin: '0 auto',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Content skeleton */}
        <div className={styles.articleContent}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={styles.skeletonBox}
              style={{
                width: i % 3 === 0 ? '95%' : '100%',
                height: '1rem',
                marginBottom: '1rem',
                borderRadius: '4px'
              }}
            />
          ))}
        </div>
      </article>
    </div>
  );
}
