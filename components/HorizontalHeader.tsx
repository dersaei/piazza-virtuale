// components/HorizontalHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/HorizontalHeader.module.css';
import { CATEGORY_LIST } from '@/lib/constants/categories';

export default function HorizontalHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.horizontalHeader}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          {CATEGORY_LIST.map(category => (
            <Link
              key={category.id}
              href={category.href}
              className={`${styles.categoryButton} ${
                pathname === category.href ? styles.active : ''
              }`}
            >
              <span className={styles.categoryText}>{category.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
