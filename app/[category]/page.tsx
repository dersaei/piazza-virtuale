// app/[category]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES, getCategoryBySlug } from '@/lib/constants/categories';
import ProducerCard from '@/components/ProducerCard';
import styles from '@/styles/CategoryPage.module.css';

// Generate metadata dynamically for each category
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Categoria non trovata | Piazza Virtuale',
      description: 'La categoria richiesta non esiste.',
    };
  }

  return {
    title: `${category.label} - ${category.title} Italiani | Piazza Virtuale`,
    description: `Scopri i ${category.title.toLowerCase()} italiani che vendono online direttamente ai consumatori. Prodotti artigianali e tradizionali del Made in Italy.`,
  };
}

// Tell Next.js which routes to generate at build time
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

  // Demo data - will be replaced with Directus
  const demoProducers = [
    {
      id: '1',
      categoryName: categoryData.label,
      producerName: 'CANTINA ERRANTE',
      regionName: 'Toscana',
      shopUrl: 'https://example.com',
    },
    {
      id: '2',
      categoryName: categoryData.label,
      producerName: 'BIRRIFICIO ARTIGIANALE',
      regionName: 'Piemonte',
      shopUrl: 'https://example.com',
    },
    {
      id: '3',
      categoryName: categoryData.label,
      producerName: 'FATTORIA BIOLOGICA',
      regionName: 'Umbria',
      shopUrl: 'https://example.com',
    },
  ];

  return (
    <section className={styles.categorySection}>
      <div className={styles.shopsGrid}>
        {demoProducers.map(producer => (
          <ProducerCard
            key={producer.id}
            categoryName={producer.categoryName}
            producerName={producer.producerName}
            regionName={producer.regionName}
            shopUrl={producer.shopUrl}
          />
        ))}
      </div>
    </section>
  );
}
