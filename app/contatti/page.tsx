// app/contatti/page.tsx
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import styles from "@/styles/ContattiPage.module.css";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta il team di Piazza Virtuale per domande sul catalogo, per segnalare un produttore italiano o per informazioni sui servizi premium riservati agli e-shop.",
  alternates: {
    canonical: "https://piazzavirtuale.it/contatti",
  },
};

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
