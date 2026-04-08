// app/[category]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES, getCategoryBySlug } from '@/lib/constants/categories';
import ProducerCard from '@/components/ProducerCard';
import PremiumProducerCard from '@/components/PremiumProducerCard';
import styles from '@/styles/CategoryPage.module.css';
import { getProducersByCategory } from '@/lib/api/producers';
import { getPremiumProducersByCategory } from '@/lib/api/premium-producers';
import { getPageSeo } from '@/lib/api/pages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Categoria non trovata',
      description: 'La categoria richiesta non esiste.',
    };
  }

  const fallbackTitle = `${category.label} - ${category.title} Italiani`;
  const fallbackDescription = `Scopri i ${category.title.toLowerCase()} italiani che vendono online direttamente ai consumatori. Prodotti artigianali e tradizionali del Made in Italy.`;
  const pageUrl = `https://piazzavirtuale.it/${categorySlug}`;

  const seo = await getPageSeo(categorySlug);

  const title = seo?.title ?? fallbackTitle;
  const description = seo?.meta_description ?? fallbackDescription;
  const canonicalUrl = seo?.canonical_url ?? pageUrl;
  const ogImageUrl = seo?.og_image ?? '/opengraph-image';

  return {
    title,
    description,
    robots: seo?.no_index ? { index: false, follow: true } : undefined,
    keywords: [
      category.label.toLowerCase(),
      category.title.toLowerCase(),
      'produttori italiani',
      'made in italy',
      'vendita diretta',
      'e-shop',
      'acquisto online',
    ],
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      url: pageUrl,
      siteName: 'Piazza Virtuale',
      title: `${title} | Piazza Virtuale`,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${title} - Piazza Virtuale` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Piazza Virtuale`,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(category => ({
    category,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const categoryData = getCategoryBySlug(categorySlug);

  if (!categoryData) {
    notFound();
  }

  const [producers, premiumProducers] = await Promise.all([
    getProducersByCategory(categorySlug),
    getPremiumProducersByCategory(categorySlug),
  ]);

  return (
    <section className={styles.categorySection}>
      {premiumProducers.length > 0 && (
        <div className={styles.premiumSection}>
          {premiumProducers.map(producer => (
            <PremiumProducerCard key={producer.id} producer={producer} />
          ))}
        </div>
      )}
      <div className={styles.shopsGrid}>
        {producers.length > 0 ? (
          producers.map(producer => (
            <ProducerCard
              key={producer.id}
              categoryName={producer.category.name}
              producerName={producer.name}
              producerNameAlt={producer.name_alt}
              regionName={producer.region}
              logoPath={producer.logo}
              shopUrl={producer.shop_url}
            />
          ))
        ) : (
          <p className={styles.nessunTrovato}>
            Nessun produttore trovato in questa categoria.
          </p>
        )}
      </div>
    </section>
  );
}
