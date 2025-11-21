// app/magazine/[slug]/loading.tsx
import styles from '@/styles/ArticlePage.module.css';

export default function Loading() {
  return (
    <div className={styles.articlePage}>
      <article className={styles.articleCard}>
        <p className={styles.caricamento}>
          Caricamento articolo...
        </p>
      </article>
    </div>
  );
}
