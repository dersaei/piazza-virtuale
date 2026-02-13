// app/come-funziona/page.tsx
"use client";

import Image from "next/image";
import logotest from "@/public/android-chrome-192x192.png";
import slowFoodItalia from "@/public/slow-food-italia.png";
import gamberoRosso from "@/public/gambero-rosso.png";
import aopIt from "@/public/aop-it.png";
import styles from "@/styles/ComeFunziona.module.css";
import StandardSubmissionForm from "@/components/StandardSubmissionForm";
import PremiumInquiryForm from "@/components/PremiumInquiryForm";

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
                I produttori interessati sono invitati a inviarci la loro
                richiesta non vincolante.
              </p>
              <div className={styles.pricingBox}>
                <p className={styles.pricingText}>
                  <strong>Servizio Premium:</strong>
                </p>
                <p className={styles.price}>&euro;25 al mese</p>
                <p className={styles.priceOr}>oppure</p>
                <p className={styles.price}>&euro;250 all&apos;anno</p>
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

      {/* Premium Card Prototype */}
      <section className={styles.premiumCardPrototype}>
        <h2 className={styles.prototypeTitle}>Anteprima Scheda Premium</h2>
        <article className={styles.premiumCard}>
          <span className={styles.featuredLabel}>
            <span>Puglia</span>
            <span>Pasta</span>
          </span>
          <div className={styles.premiumCertificationsContainer}>
            <Image src={gamberoRosso} alt="Gambero Rosso" />
            <Image src={slowFoodItalia} alt="Slow Food Italia" />
            <Image src={aopIt} alt="AOP Italia" />
          </div>
          <h3 className={styles.premiumProducerName}>Pastificio Artigianale</h3>
          <div className={styles.premiumLogoContainer}>
            <Image src={logotest} alt="test image" />
          </div>
          <a className={styles.premiumCtaButton}>
            <div className={styles.premiumButtonInner}>
              <span className={styles.premiumButtonText}>Visita lo Shop</span>
            </div>
          </a>{" "}
        </article>
      </section>
    </div>
  );
}
