// components/MobileCategorySelector.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/MobileCategorySelector.module.css';
import { MAIN_CATEGORY_LIST, CATEGORIES } from '@/lib/constants/categories';

export default function MobileCategorySelector() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedParentCategory, setSelectedParentCategory] = useState<string | null>(null);
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
    if (isOverlayOpen) {
      // Start closing animation
      setIsClosing(true);
      setTimeout(() => {
        setIsOverlayOpen(false);
        setIsClosing(false);
        setSelectedParentCategory(null);
      }, 400); // Match animation duration
    } else {
      // Open immediately
      setIsOverlayOpen(true);
      setSelectedParentCategory(null);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    const category = CATEGORIES[categoryId];

    // If category has subcategories, show them instead of navigating
    if (category.subcategories && category.subcategories.length > 0) {
      setSelectedParentCategory(categoryId);
    } else {
      // No subcategories, close overlay and navigate
      setIsOverlayOpen(false);
      setSelectedParentCategory(null);
    }
  };

  const handleSubcategoryClick = () => {
    // Start closing animation
    setIsClosing(true);
    setTimeout(() => {
      setIsOverlayOpen(false);
      setIsClosing(false);
      setSelectedParentCategory(null);
    }, 400); // Match animation duration
  };

  const handleBackToMainCategories = () => {
    setSelectedParentCategory(null);
  };

  // Get categories to display
  const categoriesToDisplay = selectedParentCategory
    ? CATEGORIES[selectedParentCategory].subcategories?.map(subId => CATEGORIES[subId]) || []
    : MAIN_CATEGORY_LIST;

  return (
    <>
      <div className={styles.selectorBar}>
        <button
          type="button"
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
          <div
            className={`${styles.overlay} ${isClosing ? styles.overlayClosing : styles.overlayOpen}`}
            onClick={toggleOverlay}
          />
          <div className={`${styles.categoryGrid} ${isClosing ? styles.gridClosing : styles.gridOpen}`}>
            {/* Back button when viewing subcategories */}
            {selectedParentCategory && (
              <button
                type="button"
                onClick={handleBackToMainCategories}
                className={`${styles.categoryButton} ${styles.backButton}`}
              >
                <svg
                  className={styles.backArrow}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 10.903167075297461 5.97998046875"
                >
                  <defs>
                    <style>{`.uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42 { stroke-width: 0px; }`}</style>
                  </defs>
                  <g>
                    <g>
                      <path
                        className="uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42"
                        d="m0,2.989990234375L5.345744680849748,0l-1.642589812583537,2.46002197265625h7.20001220703125v.52996826171875H0Z"
                      />
                      <path
                        className="uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42"
                        d="m0,2.989990234375l5.345744680849748,2.989990234375-1.642589812583537-2.46002197265625h7.20001220703125v-.52996826171875H0Z"
                      />
                      <polygon
                        className="uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42"
                        points=".765847817816393 3.262022593142319 10.723294626330244 3.262022593142319 10.723294626330244 2.607767273993886 .049733925455257 2.989990234375 .765847817816393 3.262022593142319"
                      />
                    </g>
                  </g>
                </svg>
                <span className={styles.categoryText}>Indietro</span>
              </button>
            )}

            {/* Display categories or subcategories */}
            {categoriesToDisplay.map((category) => {
              const hasSubcategories = category.subcategories && category.subcategories.length > 0;

              // If category has subcategories, render as button
              if (hasSubcategories && !selectedParentCategory) {
                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`${styles.categoryButton} ${
                      pathname === category.href ||
                      pathname.startsWith(category.href + '/')
                        ? styles.active
                        : ''
                    }`}
                  >
                    <span className={styles.categoryText}>{category.label}</span>
                    <svg
                      className={styles.arrow}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 10.903167075297461 5.97998046875"
                    >
                      <defs>
                        <style>{`.uuid-arrow-forward { stroke-width: 0px; }`}</style>
                      </defs>
                      <g>
                        <g>
                          <path
                            className="uuid-arrow-forward"
                            d="m10.903167075297461,2.989990234375L5.557422394447713,0l1.642589812583537,2.46002197265625H0v.52996826171875h10.903167075297461Z"
                          />
                          <path
                            className="uuid-arrow-forward"
                            d="m10.903167075297461,2.989990234375l-5.345744680849748,2.989990234375,1.642589812583537-2.46002197265625H0v-.52996826171875h10.903167075297461Z"
                          />
                          <polygon
                            className="uuid-arrow-forward"
                            points="10.137319257481068 3.262022593142319 .179872448967217 3.262022593142319 .179872448967217 2.607767273993886 10.853433149842204 2.989990234375 10.137319257481068 3.262022593142319"
                          />
                        </g>
                      </g>
                    </svg>
                  </button>
                );
              }

              // Otherwise render as link
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  onClick={handleSubcategoryClick}
                  className={`${styles.categoryButton} ${
                    pathname === category.href ||
                    pathname.startsWith(category.href + '/')
                      ? styles.active
                      : ''
                  }`}
                >
                  <span className={styles.categoryText}>{category.label}</span>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
