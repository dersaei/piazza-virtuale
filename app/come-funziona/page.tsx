// app/come-funziona/page.tsx
import type { Metadata } from "next";
import styles from "@/styles/ComeFunziona.module.css";
import StandardSubmissionForm from "@/components/StandardSubmissionForm";
import PremiumInquiryForm from "@/components/PremiumInquiryForm";

export const metadata: Metadata = {
  title: "Come Funziona | Piazza Virtuale",
  description:
    "Scopri come funziona Piazza Virtuale e come aggiungere il tuo e-shop al nostro catalogo",
  alternates: {
    canonical: "/come-funziona",
  },
};

export default function ComeFunzionaPage() {
  return (
    <div className={styles.comeFunzionaPage}>
      <main className={styles.heroSection}>
        <h1 className={styles.mainTitle}>Come Funziona</h1>

        <div className={styles.contentWrapper}>
          {/* Section 1 */}
          <section className={styles.contentSection}>
            <div className={styles.numberBadge}>1</div>
            <div className={styles.textContent}>
              <p>
                <strong>Piazza Virtuale</strong> è un catalogo online dove puoi
                trovare l&apos;elenco dei produttori italiani di alimenti e
                bevande che gestiscono il proprio e-shop aziendale, vendendo i
                loro prodotti direttamente online in tutta Italia. I produttori
                che vendono tramite Internet vengono aggiunti al nostro catalogo{" "}
                <span className={styles.highlight}>gratuitamente</span>.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className={styles.contentSection}>
            <div className={styles.numberBadge}>2</div>
            <div className={styles.textContent}>
              <p>
                Ogni e-shop gestito da un produttore italiano di alimenti o
                bevande può essere aggiunto gratuitamente al nostro catalogo.
                Basta compilare il seguente modulo:
              </p>
            </div>
          </section>

          {/* Standard Submission Form */}
          <div className={styles.formContainer}>
            <StandardSubmissionForm />
          </div>

          {/* Section 3 */}
          <section className={styles.contentSection}>
            <div className={styles.numberBadge}>3</div>
            <div className={styles.textContent}>
              <p>
                I produttori possono sottoscrivere il{" "}
                <strong>servizio premium</strong>, che prevede il posizionamento
                della scheda del negozio in una forma più sviluppata nella parte
                superiore dell&apos;elenco della categoria scelta.
              </p>
              <p>
                Oltre alle informazioni di base visibili sulla scheda standard
                gratuita, può includere, a seconda delle preferenze:
              </p>
              <ul className={styles.featureList}>
                <li>
                  <strong>Prodotti in evidenza</strong> &#8212; foto, titolo e
                  link alla pagina del prodotto
                </li>
                <li>
                  <strong>Video promozionale</strong> &#8212; ad esempio il
                  processo di imballaggio dei prodotti per la spedizione o
                  l&apos;apertura di un pacco inviato al cliente
                </li>
                <li>
                  <strong>Articolo dedicato</strong> &#8212; link con titolo e
                  breve descrizione di un articolo che presenta il profilo del
                  produttore, disponibile nel nostro magazine
                </li>
              </ul>
              <p>
                Siamo aperti anche ad altre proposte. I produttori interessati
                sono invitati a inviarci la loro richiesta non vincolante.
              </p>
              <div className={styles.pricingBox}>
                <p className={styles.pricingText}>
                  <strong>Servizio Premium:</strong>
                </p>
                <p className={styles.price}>&euro;20 al mese</p>
                <p className={styles.priceOr}>oppure</p>
                <p className={styles.price}>&euro;200 all&apos;anno</p>
              </div>
            </div>
          </section>

          {/* Premium Inquiry Form */}
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Richiesta Servizio Premium</h2>
            <PremiumInquiryForm />
          </div>
        </div>
      </main>
    </div>
  );
}
