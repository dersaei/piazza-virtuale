// app/magazine/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/MagazinePage.module.css';
import { getMagazineCards } from '@/lib/api/magazine';

export const metadata: Metadata = {
  title: 'Magazine',
  description:
    'Scopri guide, approfondimenti e consigli per acquistare i migliori prodotti italiani online direttamente dai produttori.',
  keywords: [
    'magazine',
    'guide',
    'prodotti italiani',
    'produttori',
    'made in italy',
    'consigli acquisto',
  ],
  openGraph: {
    title: 'Magazine | Piazza Virtuale',
    description:
      'Scopri guide, approfondimenti e consigli per acquistare i migliori prodotti italiani online direttamente dai produttori.',
    url: 'https://piazzavirtuale.it/magazine',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magazine | Piazza Virtuale',
    description:
      'Scopri guide, approfondimenti e consigli per acquistare i migliori prodotti italiani online direttamente dai produttori.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/magazine',
  },
};

// Note: Revalidation handled by Cache Components with "use cache" directive in lib/api/magazine.ts

export default async function MagazinePage() {
  const cards = await getMagazineCards();

  return (
    <div className={styles.containerMagazine}>
      <section className={styles.articlesGrid}>
        {cards.length > 0 ? (
          cards.map(card => (
            <Link
              key={card.id}
              href={`/magazine/${card.url}`}
              className={styles.articleCard}
              style={
                {
                  '--category-color': card.category.color,
                } as React.CSSProperties
              }
            >
              <div className={styles.tab}>{card.category.display_name}</div>
              <h2
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: card.title }}
              />
              <div className={styles.readMore}>leggi di più</div>
            </Link>
          ))
        ) : (
          <p className={styles.noArticles}>
            Nessun articolo disponibile al momento.
          </p>
        )}
      </section>
    </div>
  );
}
