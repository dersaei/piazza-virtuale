// app/page.tsx
import styles from '@/styles/HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        <h1>Benvenuto a Piazza Virtuale</h1>
        <h2>
          Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e
          bevande
        </h2>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentGrid}>
          {/* Demo content */}
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={styles.contentCard}>
              <h3>Prodotto {i + 1}</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
