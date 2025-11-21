// components/ArticleSkeleton.tsx
import Link from 'next/link';
import styles from '@/styles/ArticlePage.module.css';

export default function ArticleSkeleton() {
  return (
    <div className={styles.articlePage}>
      <article className={styles.articleCard}>
        <Link href='/magazine' className={styles.backLink}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 10.903167075297461 5.97998046875'
            className={styles.backArrow}
          >
            <defs>
              <style>{`.uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42 { stroke-width: 0px; }`}</style>
            </defs>
            <g>
              <g>
                <path
                  className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                  d='m0,2.989990234375L5.345744680849748,0l-1.642589812583537,2.46002197265625h7.20001220703125v.52996826171875H0Z'
                />
                <path
                  className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                  d='m0,2.989990234375l5.345744680849748,2.989990234375-1.642589812583537-2.46002197265625h7.20001220703125v-.52996826171875H0Z'
                />
                <polygon
                  className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                  points='.765847817816393 3.262022593142319 10.723294626330244 3.262022593142319 10.723294626330244 2.607767273993886 .049733925455257 2.989990234375 .765847817816393 3.262022593142319'
                />
              </g>
            </g>
          </svg>
        </Link>
        <header className={styles.articleHeader}>
          <span className={styles.category} style={{ color: 'transparent', background: '#e0e0e0' }}>
            Loading
          </span>
          <h1 style={{ color: 'transparent', background: '#e0e0e0' }}>
            Loading Article Title Here
          </h1>
          <time className={styles.date} style={{ color: 'transparent', background: '#e0e0e0' }}>
            1 gennaio 2024
          </time>
        </header>

        <div className={styles.articleContent}>
          {[...Array(10)].map((_, i) => (
            <p key={i} style={{ color: 'transparent', background: i % 3 === 0 ? '#f0f0f0' : '#e0e0e0' }}>
              Loading article content placeholder text here to simulate paragraph
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
