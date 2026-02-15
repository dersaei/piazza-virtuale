// components/RegionListWithFeatured.tsx
import Link from "next/link";
import Image from "next/image";
import { getRegionsWithFeaturedProducers } from "@/lib/api/producers";
import styles from "@/styles/RegionListWithFeatured.module.css";

export async function RegionListWithFeatured() {
  const regions = await getRegionsWithFeaturedProducers();

  if (regions.length === 0) {
    return null;
  }

  return (
    <div className={styles.regionList}>
      {regions.map(({ region, count, featuredProducer }, index) => (
        <div key={region} className={styles.regionRow}>
          {/* Label on top edge of row, above logo */}
          {featuredProducer?.logo && (
            <span className={styles.featuredLabel}>Consigliato</span>
          )}

          {/* Left side: Number and Region info */}
          <div className={styles.regionInfo}>
            <span className={styles.regionNumber}>{index + 1}</span>
            <div className={styles.regionDetails}>
              <h3 className={styles.regionName}>{region}</h3>
              <span className={styles.regionCount}>
                {count} {count === 1 ? "negozio" : "negozi"}
              </span>
            </div>
          </div>

          {/* Right side: Featured Producer Logo */}
          {featuredProducer?.logo && (
            <>
              <Link
                href={featuredProducer.shop_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.stretchedLink}
                title={featuredProducer.name_alt}
                aria-label={featuredProducer.name_alt}
              />
              <div className={styles.featuredWrapper}>
                <div className={styles.logoLink}>
                  <Image
                    src={`/${featuredProducer.logo}`}
                    alt={featuredProducer.name_alt}
                    fill
                    className={styles.logo}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
