// app/[category]/loading.tsx
import styles from '@/styles/CategoryPage.module.css';

export default function Loading() {
  return (
    <section className={styles.categorySection}>
      <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        Caricamento produttori...
      </p>
    </section>
  );
}
