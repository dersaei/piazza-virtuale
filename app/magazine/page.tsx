// app/magazine/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/MagazinePage.module.css';
import { getMagazineCards } from '@/lib/api/magazine';

export const metadata: Metadata = {
  title: 'Magazine - Piazza Virtuale',
  description:
    'Scopri guide, approfondimenti e consigli per acquistare i migliori prodotti italiani online direttamente dai produttori.',
};

// Note: Revalidation handled by Cache Components with "use cache" directive in lib/api/magazine.ts

export default async function MagazinePage() {
  const cards = await getMagazineCards();

  return (
    <div className={styles.containerMagazine}>
      <section className={styles.articlesGrid}>
        {cards.length > 0 ? (
          cards.map(card => (
            <Link key={card.id} href={card.url} className={styles.articleCard}>
              <div className={styles.tab}>{card.category}</div>
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
