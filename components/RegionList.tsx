// components/RegionList.tsx
import { getAllRegionCounts } from "@/lib/api/producers";
import styles from "@/styles/RegionList.module.css";

export async function RegionList() {
  const regionCounts = await getAllRegionCounts();

  if (regionCounts.length === 0) {
    return null;
  }

  // Take first 20 regions
  const top20Regions = regionCounts.slice(0, 20);

  // Split into two columns of 10
  const column1 = top20Regions.slice(0, 10);
  const column2 = top20Regions.slice(10, 20);

  return (
    <div className={styles.regionList}>
      {/* Column 1: Regions 1-10 */}
      <div className={styles.column}>
        {column1.map(({ region, count }, index) => (
          <div key={region} className={styles.regionCard}>
            <span className={styles.regionNumber}>{index + 1}.</span>
            <div className={styles.regionContent}>
              <h3 className={styles.regionLabel}>{region}</h3>
              <div className={styles.regionCount}>
                <span className={styles.countNumber}>{count}</span>
                <span className={styles.countLabel}>
                  {count === 1 ? "produttore" : "produttori"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Column 2: Regions 11-20 */}
      <div className={styles.column}>
        {column2.map(({ region, count }, index) => (
          <div key={region} className={styles.regionCard}>
            <span className={styles.regionNumber}>{index + 11}.</span>
            <div className={styles.regionContent}>
              <h3 className={styles.regionLabel}>{region}</h3>
              <div className={styles.regionCount}>
                <span className={styles.countNumber}>{count}</span>
                <span className={styles.countLabel}>
                  {count === 1 ? "produttore" : "produttori"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
