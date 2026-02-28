// app/magazine/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/MagazinePage.module.css';
import { getMagazineCards } from '@/lib/api/magazine';
import { getPageSeo } from '@/lib/api/pages';

const FALLBACK_TITLE = 'Magazine | Piazza Virtuale';
const FALLBACK_DESCRIPTION = 'Leggi guide pratiche, approfondimenti e consigli su come acquistare alimenti e bevande online direttamente dai produttori italiani. Scopri specialità regionali, prodotti artigianali e Made in Italy.';
const PAGE_URL = 'https://piazzavirtuale.it/magazine';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo('magazine');

  const title = seo?.title ?? FALLBACK_TITLE;
  const description = seo?.meta_description ?? FALLBACK_DESCRIPTION;
  const canonicalUrl = seo?.canonical_url ?? PAGE_URL;
  const ogImageUrl = seo?.og_image ?? '/opengraph-image';

  return {
    title,
    description,
    robots: seo?.no_index ? { index: false, follow: true } : undefined,
    keywords: ['magazine', 'guide', 'prodotti italiani', 'produttori', 'made in italy', 'consigli acquisto'],
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      url: PAGE_URL,
      siteName: 'Piazza Virtuale',
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

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
