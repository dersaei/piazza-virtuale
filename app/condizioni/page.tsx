// app/condizioni/page.tsx
import { Suspense } from "react";
import styles from "@/styles/LegalPage.module.css";
import { getCondizioni } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condizioni Generali del Servizio Premium",
  description:
    "Condizioni generali del servizio Premium Piazza Virtuale per i produttori italiani",
  alternates: {
    canonical: "https://piazzavirtuale.it/condizioni",
  },
};

async function CondizioniContent() {
  const data = await getCondizioni();
  console.log("[condizioni] data:", JSON.stringify(data)?.slice(0, 200));

  const lastUpdate = data?.date_updated
    ? new Date(data.date_updated).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className={styles.legalContent}>
      <header className={styles.header}>
        <h1>Condizioni Generali del Servizio Premium</h1>
        {lastUpdate && (
          <p className={styles.lastUpdate}>
            Ultimo aggiornamento: {lastUpdate}
          </p>
        )}
      </header>

      {data?.content ? (
        <div
          className={styles.section}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      ) : (
        <div className={styles.section}>
          <p>Contenuto non disponibile.</p>
        </div>
      )}
    </article>
  );
}

export default function CondizioniPage() {
  return (
    <div className={styles.legalPage}>
      <Suspense fallback={<div className={styles.legalContent} />}>
        <CondizioniContent />
      </Suspense>
    </div>
  );
}
