// components/CategoryGrid.tsx
import Link from "next/link";
import { getAllCategoryCounts } from "@/lib/api/producers";
import { MAIN_CATEGORY_LIST } from "@/lib/constants/categories";
import styles from "@/styles/CategoryGrid.module.css";

export async function CategoryGrid() {
  const categoryCounts = await getAllCategoryCounts();

  return (
    <div className={styles.categoryGrid}>
      {MAIN_CATEGORY_LIST.map((category) => {
        const count = categoryCounts[category.slug] || 0;

        return (
          <Link
            key={category.id}
            href={category.href}
            className={styles.categoryCard}
          >
            <div className={styles.categoryContent}>
              <h3 className={styles.categoryLabel}>{category.label}</h3>
              <div className={styles.categoryCount}>
                <span className={styles.countNumber}>{count}</span>
                <span className={styles.countLabel}>
                  {count === 1 ? "produttore" : "produttori"}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
