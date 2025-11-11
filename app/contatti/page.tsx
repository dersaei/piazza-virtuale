// app/contatti/page.tsx
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import styles from "@/styles/ContattiPage.module.css";

export const metadata: Metadata = {
  title: "Contatti | Piazza Virtuale",
  description:
    "Contattaci per qualsiasi domanda o informazione su Piazza Virtuale",
  alternates: {
    canonical: "/contatti",
  },
};

export default function ContattiPage() {
  return (
    <div className={styles.contattiPage}>
      <main className={styles.header}>
        <h1>Contatti</h1>
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
