// app/page.tsx
import styles from '@/styles/HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.heroVersion}>
        <h1>Benvenuto a Piazza Virtuale</h1>
        <h2 className={styles.keyWord}>
          Catalogo di e-shop aziendali, produttori italiani di alimenti e
          bevande
        </h2>
        <h3>
          <span className={styles.accentWrapper}>
            {' '}
            Su Piazza Virtuale potrai{' '}
            <span className={styles.keyWord2}>scoprire</span> quali produttori
            italiani offrono la vendita diretta{' '}
            <span className={styles.keyWord2}>online</span> dei propri prodotti,
            consegnandoli direttamente al consumatore. Con noi{' '}
            <span className={styles.keyWord2}>troverai</span> un&rsquo;infinità
            di delizie – dalle{' '}
            <span className={styles.keyWord2}>eccellenze</span> più celebri fino
            a quelle conosciute solo dai veri intenditori:{' '}
            <span className={styles.keyWord2}>specialità</span> regionali,
            prodotti <span className={styles.keyWord2}>tradizionali</span>, un
            vero e proprio <span className={styles.keyWord2}>tesoro</span> del
            Made in Italy.
          </span>
        </h3>
      </section>
    </div>
  );
}
