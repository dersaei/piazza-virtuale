// components/category/CategoryHeader.tsx
import styles from '@/styles/CategoryHeader.module.css';

interface CategoryHeaderProps {
  categoryName: string;
}

export default function CategoryHeader({ categoryName }: CategoryHeaderProps) {
  return (
    <div className={styles.magazineDark}>
      <div className={styles.magazineDarkInner}>
        <h1 className={styles.magazineTextDark}>{categoryName}</h1>
      </div>
    </div>
  );
}
