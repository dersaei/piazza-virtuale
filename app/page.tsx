// app/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import styles from "@/styles/HomePage.module.css";
import { CategoryGrid } from "@/components/CategoryGrid";

export const metadata: Metadata = {
  title:
    "Catalogo degli e-shop di produttori italiani di cibo e bevande | Piazza Virtuale",
  description:
    "Scopri i migliori produttori italiani di cibo e bevande che vendono online direttamente ai consumatori. Eccellenze, specialità regionali e prodotti tradizionali del Made in Italy.",
};

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      {/* Catalog Introduction Section */}
      <section className={styles.catalogIntro}>
        <h1 className={styles.catalogTitle}>
          Vetrina dei negozi online di produttori italiani enogastronomici
        </h1>
      </section>
      <h2 className={styles.heroHeading}>
        Scopri con noi i produttori italiani&nbsp;
        <span className={styles.highlight}>di cibo e bevande</span>
        che vendono direttamente&nbsp;
        <span className={styles.highlight}>online</span>
      </h2>

      {/* Categories Grid Section */}
      <section className={styles.categoriesSection}>
        <Suspense
          fallback={<div className={styles.loading}>Caricamento...</div>}
        >
          <CategoryGrid />
        </Suspense>
      </section>
    </div>
  );
}
