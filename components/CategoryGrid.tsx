// components/CategoryGrid.tsx
import Link from "next/link";
import { getAllCategoryCounts } from "@/lib/api/producers";
import { CATEGORY_LIST } from "@/lib/constants/categories";
import styles from "@/styles/CategoryGrid.module.css";

export async function CategoryGrid() {
  const categoryCounts = await getAllCategoryCounts();

  // Filter out parent categories (Bevande, Condimenti) - show only leaf categories
  // Sort by shop count descending
  const displayCategories = CATEGORY_LIST.filter(
    (category) => !category.subcategories
  ).sort((a, b) => {
    const countA = categoryCounts[a.slug] || 0;
    const countB = categoryCounts[b.slug] || 0;
    return countB - countA;
  });

  return (
    <div className={styles.categoryGrid}>
      {displayCategories.map((category) => {
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
