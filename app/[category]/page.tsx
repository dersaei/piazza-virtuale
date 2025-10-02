// app/[category]/page.tsx
import CategoryHeader from '@/components/category/CategoryHeader';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES, getCategoryBySlug } from '@/lib/constants/categories';

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

// Tell Next.js which routes to generate at build time (for static export)
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

  // Show 404 page if category doesn't exist
  if (!categoryData) {
    notFound();
  }

  return (
    <section>
      <CategoryHeader categoryName={categoryData.label} />
      {/* Shop content will go here later */}
    </section>
  );
}
