// app/chi-siamo/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import styles from "@/styles/ChiSiamoPage.module.css";
import italia from "@/public/territorio-italiano.png";

export const metadata: Metadata = {
  title: "Chi Siamo - Piazza Virtuale",
  description:
    "Scopri chi siamo e la nostra missione: connettere i consumatori con i migliori produttori italiani di cibo e bevande attraverso la vendita diretta online.",
  alternates: {
    canonical: "/chi-siamo",
  },
};

export default function ChiSiamoPage() {
  return (
    <div className={styles.chiSiamoPage}>
      <section className={styles.heroSection}>
        <h1>Benvenuto a Piazza Virtuale</h1>
        <h2 className={styles.keyWord}>
          Catalogo di e-shop aziendali, produttori italiani di alimenti e
          bevande
        </h2>
        <h3 className={styles.heroDescription}>
          <span className={styles.accentWrapper}>
            {" "}
            Su Piazza Virtuale potrai{" "}
            <span className={styles.keyWord2}>scoprire</span> quali produttori
            italiani offrono la vendita diretta{" "}
            <span className={styles.keyWord2}>online</span> dei propri prodotti,
            consegnandoli direttamente al consumatore. Con noi{" "}
            <span className={styles.keyWord2}>troverai</span> un&rsquo;infinità
            di delizie – dalle{" "}
            <span className={styles.keyWord2}>eccellenze</span> più celebri fino
            a quelle conosciute solo dai veri intenditori:{" "}
            <span className={styles.keyWord2}>specialità</span> regionali,
            prodotti <span className={styles.keyWord2}>tradizionali</span>, un
            vero e proprio <span className={styles.keyWord2}>tesoro</span> del
            Made in Italy.
          </span>
        </h3>
        <div className={styles.italiaMap}>
          <Image src={italia} alt="territorio italiano" />
        </div>
      </section>
    </div>
  );
}
