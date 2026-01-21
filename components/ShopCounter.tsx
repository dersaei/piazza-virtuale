// components/ShopCounter.tsx
import { getTotalProducersCount } from "@/lib/api/producers";
import styles from "@/styles/ShopCounter.module.css";

export async function ShopCounter() {
  const totalCount = await getTotalProducersCount();

  return (
    <div className={styles.shopCounter}>
      <p className={styles.label}>Negozi nel nostro catalogo</p>
      <div className={styles.countWrapper}>
        <span className={styles.count}>{totalCount}</span>
      </div>
    </div>
  );
}
