// app/bevande/[subcategory]/loading.tsx
import styles from '@/styles/CategoryPage.module.css';
import ProducerCardSkeleton from '@/components/ProducerCardSkeleton';

export default function Loading() {
  return (
    <section className={styles.categorySection}>
      <div className={styles.shopsGrid}>
        {/* Show 6 skeleton cards */}
        {[...Array(6)].map((_, i) => (
          <ProducerCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
