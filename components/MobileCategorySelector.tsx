// components/MobileCategorySelector.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/MobileCategorySelector.module.css';
import { MAIN_CATEGORY_LIST } from '@/lib/constants/categories';

export default function MobileCategorySelector() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when category selector is open
  useEffect(() => {
    if (isOverlayOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOverlayOpen]);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleCategoryClick = () => {
    setIsOverlayOpen(false);
  };

  return (
    <>
      <div className={styles.selectorBar}>
        <button
          className={styles.selectorButton}
          onClick={toggleOverlay}
          aria-label='Seleziona categoria'
        >
          Seleziona Categoria
        </button>
      </div>

      {/* Category overlay */}
      {isOverlayOpen && (
        <>
          <div className={styles.overlay} onClick={toggleOverlay} />
          <div className={styles.categoryGrid}>
            {MAIN_CATEGORY_LIST.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                onClick={handleCategoryClick}
                className={`${styles.categoryButton} ${
                  pathname === category.href ||
                  pathname.startsWith(category.href + '/')
                    ? styles.active
                    : ''
                }`}
              >
                <span className={styles.categoryText}>{category.label}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
