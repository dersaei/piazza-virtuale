// app/chi-siamo/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import styles from "@/styles/ChiSiamoPage.module.css";
import italia from "@/public/territorio-italiano.png";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description:
    "Scopri chi siamo e la nostra missione: connettere i consumatori con i migliori produttori italiani di cibo e bevande attraverso la vendita diretta online.",
  openGraph: {
    title: "Chi Siamo | Piazza Virtuale",
    description:
      "Scopri chi siamo e la nostra missione: connettere i consumatori con i migliori produttori italiani di cibo e bevande attraverso la vendita diretta online.",
    url: "https://piazzavirtuale.it/chi-siamo",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi Siamo | Piazza Virtuale",
    description:
      "Scopri chi siamo e la nostra missione: connettere i consumatori con i migliori produttori italiani di cibo e bevande attraverso la vendita diretta online.",
    images: ["/opengraph-image"],
  },
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

      <section className={styles.contentSection}>
        <p className={styles.intro}>
          Il catalogo italiano di negozi online ufficiali di produttori di cibo
          e bevande dall&rsquo;Italia, rivolto ai consumatori che cercano
          acquisti diretti dai produttori.
        </p>

        <h2>Cos&rsquo;è questo sito</h2>
        <p>
          Il sito &ldquo;Piazza Virtuale&rdquo; si presenta come una vetrina
          virtuale di e-shop di produttori enogastronomici italiani, ovvero di
          alimenti e bevande. Il suo obiettivo è facilitare la ricerca di
          produttori che vendono i propri prodotti direttamente online, senza
          intermediari.
        </p>

        <h2>Principali categorie di prodotti</h2>
        <p>
          Sulla pagina principale sono raccolti i link ai produttori in molte
          categorie, come bevande (birra, sidro, vino, distillati, caffè e tè,
          succhi), condimenti e aggiunte (pesto, aceto, pomodori, altre salse),
          nonché conserve, mieli, legumi e cereali, prodotti lattiero-caseari,
          dolciumi, oli, pane, riso, pasta, farina, pesce, salumi e frutta secca
          e disidratata. Ogni categoria mostra il numero di produttori
          disponibili nel catalogo, ad esempio sezioni separate per vino, olio,
          pasta o formaggi.
        </p>

        <h2>Come funziona il catalogo</h2>
        <p>
          Cliccando sulla categoria scelta si accede all&rsquo;elenco dei
          produttori che offrono la vendita online nel segmento specifico,
          permettendo di scoprire i loro negozi ufficiali. Il sito dispone anche
          di sezioni informative (magazine, descrizione del progetto, come
          funziona, contatti) e collegamenti all&rsquo;informativa sulla privacy,
          ai cookie e alle informazioni legali.
        </p>
      </section>
    </div>
  );
}
