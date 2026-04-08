// app/bevande/[subcategory]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCategoryBySlug } from '@/lib/constants/categories';
import ProducerCard from '@/components/ProducerCard';
import PremiumProducerCard from '@/components/PremiumProducerCard';
import styles from '@/styles/CategoryPage.module.css';
import { getProducersByCategory } from '@/lib/api/producers';
import { getPremiumProducersByCategory } from '@/lib/api/premium-producers';
import { getPageSeo } from '@/lib/api/pages';

const VALID_SUBCATEGORIES = ['birre', 'vini', 'distillati', 'caffe', 'succhi'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}): Promise<Metadata> {
  const { subcategory } = await params;

  if (!VALID_SUBCATEGORIES.includes(subcategory)) {
    return {
      title: 'Categoria non trovata',
      description: 'La categoria richiesta non esiste.',
    };
  }

  const fullSlug = `bevande-${subcategory}`;
  const category = getCategoryBySlug(fullSlug);

  if (!category) {
    return {
      title: 'Categoria non trovata',
      description: 'La categoria richiesta non esiste.',
    };
  }

  const fallbackTitle = `${category.label} - ${category.title} Italiani`;
  const fallbackDescription = `Scopri i ${category.title.toLowerCase()} italiani che vendono online direttamente ai consumatori. Prodotti artigianali e tradizionali del Made in Italy.`;
  const pageUrl = `https://piazzavirtuale.it/bevande/${subcategory}`;

  const seo = await getPageSeo(fullSlug);

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
      'bevande italiane',
      'produttori italiani',
      'made in italy',
      'vendita diretta',
      'e-shop',
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
  return VALID_SUBCATEGORIES.map(subcategory => ({
    subcategory,
  }));
}

export default async function BevandaSubcategoryPage({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;

  if (!VALID_SUBCATEGORIES.includes(subcategory)) {
    notFound();
  }

  const fullSlug = `bevande-${subcategory}`;
  const categoryData = getCategoryBySlug(fullSlug);

  if (!categoryData) {
    notFound();
  }

  const [producers, premiumProducers] = await Promise.all([
    getProducersByCategory(fullSlug),
    getPremiumProducersByCategory(fullSlug),
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
