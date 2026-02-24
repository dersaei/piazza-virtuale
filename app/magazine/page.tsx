// app/magazine/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/MagazinePage.module.css';
import { getMagazineCards } from '@/lib/api/magazine';

export const metadata: Metadata = {
  title: 'Magazine',
  description:
    'Leggi guide pratiche, approfondimenti e consigli su come acquistare alimenti e bevande online direttamente dai produttori italiani. Scopri specialità regionali, prodotti artigianali e Made in Italy.',
  keywords: [
    'magazine',
    'guide',
    'prodotti italiani',
    'produttori',
    'made in italy',
    'consigli acquisto',
  ],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Piazza Virtuale',
    title: 'Magazine | Piazza Virtuale',
    description:
      'Leggi guide pratiche, approfondimenti e consigli su come acquistare alimenti e bevande online direttamente dai produttori italiani. Scopri specialità regionali, prodotti artigianali e Made in Italy.',
    url: 'https://piazzavirtuale.it/magazine',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magazine | Piazza Virtuale',
    description:
      'Leggi guide pratiche, approfondimenti e consigli su come acquistare alimenti e bevande online direttamente dai produttori italiani. Scopri specialità regionali, prodotti artigianali e Made in Italy.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://piazzavirtuale.it/magazine',
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
