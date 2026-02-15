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
          nella tua zona: prodotti artigianali, regionali e di nicchia.
          <br />
          <br /> Piazza Virtuale è la tua guida dove raccogliamo in un unico
          posto gli e-shop alimentari dei produttori di tutta Italia.
        </p>
        <svg
          className={styles.aboutFlag}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 481.1 274.45"
          aria-hidden="true"
        >
          <g>
            <g>
              <rect x="13.5" y="1.5" width="155.9" height="261.45" fill="#006837" />
              <path d="m158.9,274.45H0V10h158.9v264.45Zm-155.9-3h152.9V13H3v258.45Z" fill="#231f20" />
              <path d="m170.9,264.45H12V0h158.9v264.45Zm-155.9-3h152.9V3H15v258.45Z" fill="#231f20" />
            </g>
            <g>
              <rect x="168.89" y="1.5" width="155.9" height="261.45" fill="#f1f2f1" />
              <path d="m314.29,274.45h-158.9V10h158.9v264.45Zm-155.9-3h152.9V13h-152.9v258.45Z" fill="#231f20" />
              <path d="m326.29,264.45h-158.9V0h158.9v264.45Zm-155.9-3h152.9V3h-152.9v258.45Z" fill="#231f20" />
            </g>
            <g>
              <rect x="323.71" y="1.5" width="155.9" height="261.45" fill="#cd212a" />
              <path d="m469.11,274.45h-158.9V10h158.9v264.45Zm-155.9-3h152.9V13h-152.9v258.45Z" fill="#231f20" />
              <path d="m481.11,264.45h-158.9V0h158.9v264.45Zm-155.9-3h152.9V3h-152.9v258.45Z" fill="#231f20" />
            </g>
          </g>
        </svg>
      </section>
    </div>
  );
}
