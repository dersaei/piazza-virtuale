// app/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import styles from "@/styles/HomePage.module.css";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ShopCounter } from "@/components/ShopCounter";
import { RegionListWithFeatured } from "@/components/RegionListWithFeatured";

export const metadata: Metadata = {
  title:
    "Catalogo degli e-shop di produttori italiani di cibo e bevande | Piazza Virtuale",
  description:
    "Comprare cibo online in Italia. Trova i negozi online dei produttori italiani di alimenti e bevande.",
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

      {/* Shop Counter Section */}
      <section className={styles.counterSection}>
        <Suspense
          fallback={<div className={styles.loading}>Caricamento...</div>}
        >
          <ShopCounter />
        </Suspense>
      </section>

      {/* Regions with Featured Producers Section */}
      <section className={styles.regionsSection}>
        <Suspense
          fallback={<div className={styles.loading}>Caricamento...</div>}
        >
          <RegionListWithFeatured />
        </Suspense>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>Piazza Virtuale</h2>
        <p className={styles.aboutDescription}>
          Scopri insieme a noi i produttori italiani di cibo e bevande che
          vendono i loro prodotti online. Trova specialità difficili da reperire
          nella tua zona: prodotti artigianali, regionali e di nicchia. Piazza
          Virtuale è la tua guida dove raccogliamo in un unico posto gli
          e-shop alimentari dei produttori di tutta Italia.
        </p>
      </section>
    </div>
  );
}
