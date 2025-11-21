// app/bevande/[subcategory]/loading.tsx
import styles from '@/styles/CategoryPage.module.css';

export default function Loading() {
  return (
    <section className={styles.categorySection}>
      <p className={styles.caricamento}>
        Caricamento produttori...
      </p>
    </section>
  );
}
