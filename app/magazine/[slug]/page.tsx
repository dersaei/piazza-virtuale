// app/magazine/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/ArticlePage.module.css';

// Tymczasowe dane - później z Directus
const articles = {
  'come-acquistare-in-sicurezza-online': {
    title: 'Come acquistare in sicurezza online',
    category: 'Guida',
    date: '2025-10-16',
    content: `
      <p>Acquistare online direttamente dai produttori italiani è un modo eccellente per ottenere prodotti autentici e di alta qualità. Tuttavia, è importante seguire alcune regole di sicurezza.</p>
      
      <h2>1. Verifica l'autenticità del sito</h2>
      <p>Prima di effettuare un acquisto, assicurati che il sito web sia autentico. Controlla:</p>
      <ul>
        <li>Il certificato SSL (https://)</li>
        <li>Informazioni di contatto complete</li>
        <li>Partita IVA e ragione sociale</li>
      </ul>

      <h2>2. Metodi di pagamento sicuri</h2>
      <p>Utilizza sempre metodi di pagamento tracciabili come carte di credito, PayPal o bonifico bancario. Evita pagamenti in contanti o trasferimenti non tracciabili.</p>

      <h2>3. Leggi le recensioni</h2>
      <p>Cerca recensioni online del produttore. I feedback di altri clienti possono fornire informazioni preziose sulla qualità dei prodotti e del servizio.</p>
    `,
  },
  'perche-acquistare-direttamente-dai-produttori': {
    title: 'Perché acquistare direttamente dai produttori',
    category: 'Approfondimenti',
    date: '2025-01-10',
    content: `
      <p>L'acquisto diretto dai produttori italiani offre numerosi vantaggi che vanno oltre il semplice risparmio economico.</p>
      
      <h2>1. Prezzi più vantaggiosi</h2>
      <p>Eliminando gli intermediari, i produttori possono offrire prezzi più competitivi mantenendo la stessa qualità.</p>

      <h2>2. Prodotti freschi e autentici</h2>
      <p>Gli alimenti vengono spesso preparati su ordinazione, garantendo massima freschezza e autenticità.</p>

      <h2>3. Sostieni le piccole imprese</h2>
      <p>Acquistando direttamente, sostieni le piccole aziende familiari e l'economia locale italiana.</p>

      <h2>4. Tracciabilità completa</h2>
      <p>Conosci l'origine esatta dei prodotti e puoi comunicare direttamente con chi li produce.</p>
    `,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return {
      title: 'Articolo non trovato | Magazine - Piazza Virtuale',
    };
  }

  return {
    title: `${article.title} | Magazine - Piazza Virtuale`,
    description: article.content.substring(0, 160),
  };
}

export async function generateStaticParams() {
  return Object.keys(articles).map(slug => ({
    slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.articlePage}>
      <Link href='/magazine' className={styles.backLink}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 10.903167075297461 5.97998046875'
          className={styles.backArrow}
        >
          <defs>
            <style>{`.uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42 { stroke-width: 0px; }`}</style>
          </defs>
          <g>
            <g>
              <path
                className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                d='m0,2.989990234375L5.345744680849748,0l-1.642589812583537,2.46002197265625h7.20001220703125v.52996826171875H0Z'
              />
              <path
                className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                d='m0,2.989990234375l5.345744680849748,2.989990234375-1.642589812583537-2.46002197265625h7.20001220703125v-.52996826171875H0Z'
              />
              <polygon
                className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                points='.765847817816393 3.262022593142319 10.723294626330244 3.262022593142319 10.723294626330244 2.607767273993886 .049733925455257 2.989990234375 .765847817816393 3.262022593142319'
              />
            </g>
          </g>
        </svg>
        <span>Torna al Magazine</span>
      </Link>

      <article className={styles.articleCard}>
        <header className={styles.articleHeader}>
          <span className={styles.category}>{article.category}</span>
          <h1>{article.title}</h1>
          <time className={styles.date}>
            {new Date(article.date).toLocaleDateString('it-IT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>

        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}
