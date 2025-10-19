// app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import styles from "@/styles/HomePage.module.css";
import territorioItaliano from "@/public/territorio-italiano.png";

export const metadata: Metadata = {
  title:
    "Piazza Virtuale - Il catalogo degli e-shop ufficiali dei produttori italiani",
  description:
    "Scopri i migliori produttori italiani di cibo e bevande che vendono online direttamente ai consumatori. Eccellenze, specialità regionali e prodotti tradizionali del Made in Italy.",
};

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        {/* Left Column - Text */}
        <div className={styles.heroText}>
          <h1 className={styles.heroHeading}>
            Scopri con noi i produttori italiani
            <span className={styles.highlight}>di cibo e bevande</span>
            che vendono direttamente
            <span className={styles.highlight}>online</span>
          </h1>
        </div>

        {/* Right Column - Image */}
        <div className={styles.heroImage}>
          <Image
            src={territorioItaliano}
            alt="Piazza Virtuale Catalogo di e-shop aziendali, produttori italiani di alimenti e bevandes"
            className={styles.mapImage}
            priority
          />
        </div>
      </section>
    </div>
  );
}
