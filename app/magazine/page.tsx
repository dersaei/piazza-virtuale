// app/magazine/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/MagazinePage.module.css';

export const metadata: Metadata = {
  title: 'Magazine - Piazza Virtuale',
  description:
    'Scopri guide, approfondimenti e consigli per acquistare i migliori prodotti italiani online direttamente dai produttori.',
};

// Dati tymczasowe - później z Directus
const articles = [
  {
    id: 1,
    slug: 'come-acquistare-in-sicurezza-online',
    title: 'Come acquistare in sicurezza online',
    category: 'Guida',
    categorySlug: 'guida',
  },
  {
    id: 2,
    slug: 'perche-acquistare-direttamente-dai-produttori',
    title: 'Perché acquistare online direttamente dai produttori?',
    category: 'Approfondimenti ',
    categorySlug: 'Approfondimenti ',
  },
  {
    id: 3,
    slug: 'perche1-acquistare-direttamente-dai-produttori',
    title: 'Perché acquistare online dai produttori?',
    category: 'Guida',
    categorySlug: 'Guida',
  },
  {
    id: 4,
    slug: 'perche3-acquistare-direttamente-dai-produttori',
    title: 'Perché online dai produttori?',
    category: 'Guida',
    categorySlug: 'Guida',
  },
];

export default function MagazinePage() {
  return (
    <div className={styles.containerMagazine}>
      <section className={styles.articlesGrid}>
        {articles.map(article => (
          <Link
            key={article.id}
            href={`/magazine/${article.slug}`}
            className={styles.articleCard}
          >
            <div className={styles.tab}>{article.category}</div>
            <h2
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: article.title.replace(/\n/g, '<br />'),
              }}
            />
            <div className={styles.readMore}>leggi di più</div>
          </Link>
        ))}
      </section>
    </div>
  );
}
