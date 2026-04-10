// app/come-funziona/page.tsx
import Image from "next/image";
import Link from "next/link";
import logotest from "@/public/android-chrome-192x192.png";
import slowFoodItalia from "@/public/slow-food-italia.png";
import gamberoRosso from "@/public/gambero-rosso.png";
import aopIt from "@/public/aop-it.png";
import styles from "@/styles/ComeFunziona.module.css";
import type { Metadata } from "next";
import { getPageSeo } from "@/lib/api/pages";
import PremiumCta from "@/components/PremiumCta";
import AddShopButton from "@/components/AddShopButton";

const FALLBACK_TITLE = "Come Funziona";
const FALLBACK_DESCRIPTION =
  "Scopri come funziona Piazza Virtuale: aggiungi gratuitamente il tuo e-shop al catalogo dei produttori italiani di alimenti e bevande o richiedi il servizio premium per una maggiore visibilità.";
const PAGE_URL = "https://piazzavirtuale.it/come-funziona";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("come-funziona");

  const title = seo?.title ?? FALLBACK_TITLE;
  const description = seo?.meta_description ?? FALLBACK_DESCRIPTION;
  const canonicalUrl = seo?.canonical_url ?? PAGE_URL;
  const ogImageUrl = seo?.og_image ?? "/opengraph-image";

  return {
    title,
    description,
    robots: seo?.no_index ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: PAGE_URL,
      siteName: "Piazza Virtuale",
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

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
                bevande può essere aggiunto gratuitamente al nostro catalogo
                utilizzando il pulsante &ldquo;Aggiungi Negozio&rdquo;.
              </p>
              <AddShopButton />
            </div>
          </section>

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

              <div className={styles.pricingGrid}>
                {/* Piano Base */}
                <div className={styles.pricingBox}>
                  <p className={styles.pricingText}>
                    <strong>
                      Premium
                      <br />1 categoria
                    </strong>
                  </p>
                  <p className={styles.price}>&euro;250</p>
                  <p className={styles.priceNote}>all&apos;anno + IVA</p>
                  <ul className={styles.benefitList}>
                    <li>
                      <span className={styles.benefitIcon}>✦</span>
                      Esposizione annuale in 1 categoria
                    </li>
                    <li>
                      <span className={styles.benefitIcon}>✦</span>
                      Posizionamento nella parte superiore dell&apos;elenco
                    </li>
                    <li>
                      <span className={styles.benefitIcon}>✦</span>
                      <span>
                        Scheda premium con info su:
                        <ul className={styles.benefitSubList}>
                          <li>spedizione gratuita</li>
                          <li>premi e riconoscimenti</li>
                          <li>
                            caratteristiche dei prodotti e metodi di produzione
                          </li>
                        </ul>
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Piano Completo */}
                <div
                  className={`${styles.pricingBox} ${styles.pricingBoxFeatured}`}
                >
                  <p className={styles.pricingText}>
                    <strong>
                      Premium
                      <br /> illimitate
                    </strong>
                  </p>
                  <p className={styles.price}>&euro;325</p>
                  <p className={styles.priceNote}>all&apos;anno + IVA</p>
                  <ul className={styles.benefitList}>
                    <li>
                      <span className={styles.benefitIcon}>✦</span>
                      Esposizione annuale in tutte le categorie del produttore
                    </li>
                    <li>
                      <span className={styles.benefitIcon}>✦</span>
                      Posizionamento nella parte superiore dell&apos;elenco
                    </li>
                    <li>
                      <span className={styles.benefitIcon}>✦</span>
                      <span>
                        Scheda premium con info su:
                        <ul className={styles.benefitSubList}>
                          <li>spedizione gratuita</li>
                          <li>premi e riconoscimenti</li>
                          <li>
                            caratteristiche dei prodotti e metodi di produzione
                          </li>
                        </ul>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <PremiumCta />
              <Link href="/condizioni" className={styles.condizioniLink}>
                Leggi Condizioni Generali del Servizio Premium
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Premium Card Prototype */}
      <section className={styles.premiumCardPrototype}>
        <h2 className={styles.prototypeTitle}>Anteprima Scheda Premium</h2>
        <article className={styles.premiumCard}>
          {/* Categoria + Region */}
          <div className={styles.pcMeta}>
            <span className={styles.pcRegion}>Puglia</span>
            <span className={styles.pcSep}>·</span>
            <span className={styles.pcCategory}>Pasta</span>
          </div>

          {/* Nome */}
          <h3 className={styles.pcName}>Pastificio Artigianale</h3>

          {/* Logo */}
          <div className={styles.pcLogo}>
            <Image src={logotest} alt="Logo Pastificio Artigianale" />
          </div>

          {/* Divisore */}
          <hr className={styles.pcDivider} />

          {/* Descrizione premium */}
          <div className={styles.pcPremiumInfo}>
            <p className={styles.pcPremiumLabel}>In questo negozio troverai</p>
            <ul className={styles.pcPremiumFeatures}>
              <li>
                <span className={styles.pcFeatureIcon}>✦</span>
                Spedizione gratuita disponibile
              </li>
              <li>
                <span className={styles.pcFeatureIcon}>✦</span>
                Riconoscimenti: Slow Food, Gambero Rosso, AOP
              </li>
              <li>
                <span className={styles.pcFeatureIcon}>✦</span>
                Pasta trafilata al bronzo, essiccazione lenta a bassa
                temperatura, grano duro locale
              </li>
            </ul>
            <div className={styles.pcCertifications}>
              <Link
                href="https://www.slowfood.it"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={slowFoodItalia} alt="Slow Food Italia" />
              </Link>
              <Link
                href="https://culturaeconsapevolezza.mase.gov.it/news/dop-doc-e-igp-cibi-sicuri-autentici-e-di-qualita"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={aopIt} alt="AOP Italia" />
              </Link>
              <Link
                href="https://www.gamberorosso.it"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={gamberoRosso} alt="Gambero Rosso" />
              </Link>
            </div>
          </div>

          {/* CTA */}
          <a className={styles.pcCtaButton}>
            <span className={styles.pcCtaText}>Visita lo Shop</span>
          </a>
        </article>
      </section>
    </div>
  );
}
