// app/contatti/page.tsx
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import styles from "@/styles/ContattiPage.module.css";
import { getPageSeo } from "@/lib/api/pages";

const FALLBACK_TITLE = "Contatti | Piazza Virtuale";
const FALLBACK_DESCRIPTION = "Contatta il team di Piazza Virtuale per domande sul catalogo, per segnalare un produttore italiano o per informazioni sui servizi premium riservati agli e-shop.";
const PAGE_URL = "https://piazzavirtuale.it/contatti";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("contatti");

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

export default function ContattiPage() {
  return (
    <div className={styles.contattiPage}>
      <main className={styles.header}>
        <h1>Contatti</h1>
        <h2 className={styles.keyWord}>
          Spiżarnia Regio, ul. Napoleońska 49, 06-500 Mława, Polonia
        </h2>
        <section className={styles.formSection}>
          <h2>Inviaci un messaggio</h2>
          <p className={styles.formIntro}>
            Hai domande o suggerimenti?
            <br /> Compila il modulo sottostante e ti risponderemo al più
            presto.
          </p>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
