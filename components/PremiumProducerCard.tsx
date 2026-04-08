// components/PremiumProducerCard.tsx
import Link from "next/link";
import styles from "@/styles/ComeFunziona.module.css";
import type { PremiumProducerDTO } from "@/lib/api/premium-producers";

interface Props {
  producer: PremiumProducerDTO;
}

export default function PremiumProducerCard({ producer }: Props) {
  const { nome, regioni, categorie, titolo, caratteristiche, shop_url } = producer;

  return (
    <div className={styles.premiumCardProduction}>
      <article className={styles.premiumCard}>
        <div className={styles.pcMeta}>
          <span className={styles.pcRegion}>{regioni}</span>
          <span className={styles.pcSep}>·</span>
          <span className={styles.pcCategory}>{categorie.name}</span>
        </div>

        <h3 className={styles.pcName}>{nome}</h3>

        <hr className={styles.pcDivider} />

        <div className={styles.pcPremiumInfo}>
          <p className={styles.pcPremiumLabel}>{titolo}</p>
          <ul className={styles.pcPremiumFeatures}>
            {caratteristiche.map((c, i) => (
              <li key={i}>
                <span className={styles.pcFeatureIcon}>✦</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={shop_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.pcCtaButton}
        >
          <span className={styles.pcCtaText}>Visita lo Shop</span>
        </Link>
      </article>
    </div>
  );
}
