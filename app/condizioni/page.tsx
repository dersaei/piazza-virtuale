// app/condizioni/page.tsx
import ReactMarkdown from "react-markdown";
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

export default async function CondizioniPage() {
  const data = await getCondizioni();

  const lastUpdate = data?.date_updated
    ? new Date(data.date_updated).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className={styles.legalPage}>
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
          <div className={styles.section}>
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <div className={styles.highlight}>{children}</div>
                ),
                table: ({ children }) => (
                  <div className={styles.table}>
                    <table>{children}</table>
                  </div>
                ),
              }}
            >
              {data.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className={styles.section}>
            <p>Contenuto non disponibile.</p>
          </div>
        )}
      </article>
    </div>
  );
}
