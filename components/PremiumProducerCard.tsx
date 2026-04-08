// components/PremiumProducerCard.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/ComeFunziona.module.css";
import type { PremiumProducerDTO } from "@/lib/api/premium-producers";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "";

function assetUrl(uuid: string, params = ""): string {
  return `${DIRECTUS_URL}/assets/${uuid}${params}`;
}

interface Props {
  producer: PremiumProducerDTO;
}

export default function PremiumProducerCard({ producer }: Props) {
  const {
    nome,
    regioni,
    categorie,
    logo,
    titolo,
    caratteristiche,
    shop_url,
    galleria,
  } = producer;

  return (
    <div className={styles.premiumCardProduction}>
      <article className={styles.premiumCard}>
        <div className={styles.pcMeta}>
          <span className={styles.pcRegion}>{regioni}</span>
          <span className={styles.pcSep}>·</span>
          <span className={styles.pcCategory}>{categorie.name}</span>
        </div>

        <h3 className={styles.pcName}>{nome}</h3>

        {logo && (
          <Image
            src={assetUrl(logo.id, "?width=160&format=webp&quality=85")}
            alt={`Logo ${nome}`}
            width={160}
            height={160}
            className={styles.pcLogo}
          />
        )}

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

          {galleria.length > 0 && (
            <div className={styles.pcCertifications}>
              {galleria.map((file) => (
                <div key={file.id} className={styles.pcGalleryItem}>
                  <Image
                    src={assetUrl(file.id, "?format=webp&quality=80")}
                    alt={nome}
                    fill
                    sizes="120px"
                    className={styles.pcGalleryImage}
                  />
                </div>
              ))}
            </div>
          )}
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
