// app/bevande/[subcategory]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCategoryBySlug } from '@/lib/constants/categories';
import ProducerCard from '@/components/ProducerCard';
import styles from '@/styles/CategoryPage.module.css';
import { getProducersByCategory } from '@/lib/api/producers';

const VALID_SUBCATEGORIES = ['birre', 'vini', 'distillati', 'caffe', 'succhi'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}): Promise<Metadata> {
  const { subcategory } = await params;

  if (!VALID_SUBCATEGORIES.includes(subcategory)) {
    return {
      title: 'Categoria non trovata | Piazza Virtuale',
    };
  }

  const fullSlug = `bevande-${subcategory}`;
  const category = getCategoryBySlug(fullSlug);

  if (!category) {
    return {
      title: 'Categoria non trovata | Piazza Virtuale',
    };
  }

  return {
    title: `${category.label} - ${category.title} Italiani | Piazza Virtuale`,
    description: `Scopri i ${category.title.toLowerCase()} italiani che vendono online direttamente ai consumatori.`,
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

  const producers = await getProducersByCategory(fullSlug);

  return (
    <section className={styles.categorySection}>
      <div className={styles.shopsGrid}>
        {producers.length > 0 ? (
          producers.map(producer => (
            <ProducerCard
              key={producer.id}
              categoryName={producer.category.name} // ZMIANA: używamy nazwy z Directus
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
