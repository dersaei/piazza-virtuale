// components/HorizontalHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '@/styles/HorizontalHeader.module.css';
import {
  MAIN_CATEGORY_LIST,
  getSubcategories,
} from '@/lib/constants/categories';

export default function HorizontalHeader() {
  const pathname = usePathname();
  const [showBevandeSub, setShowBevandeSub] = useState(false);

  const bevandeSubcategories = getSubcategories('bevande');

  useEffect(() => {
    if (pathname.startsWith('/bevande')) {
      setShowBevandeSub(true);
    } else {
      setShowBevandeSub(false);
    }
  }, [pathname]);

  const categoriesToShow = showBevandeSub
    ? bevandeSubcategories
    : MAIN_CATEGORY_LIST;

  const handleBevandeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowBevandeSub(true);
  };

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowBevandeSub(false);
  };

  return (
    <header className={styles.horizontalHeader}>
      <nav className={styles.nav}>
        <div
          className={`${styles.navContainer} ${showBevandeSub ? styles.twoRows : ''}`}
        >
          {categoriesToShow.map(category => {
            const isBevande = category.id === 'bevande';

            return (
              <Link
                key={category.id}
                href={category.href}
                onClick={isBevande ? handleBevandeClick : undefined}
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

          {showBevandeSub && (
            <a
              href='#'
              onClick={handleBackClick}
              className={styles.backArrow}
              aria-label='Torna alle categorie principali'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 10.903167075297461 5.97998046875'
              >
                <defs>
                  <style>{`.uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42 { stroke-width: 0px; }`}</style>
                </defs>
                <g>
                  <g>
                    <path
                      className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                      d='m0,2.989990234375L5.345744680849748,0l-1.642589812583537,2.46002197265625h7.20001220703125v.52996826171875H0Z'
                    />
                    <path
                      className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                      d='m0,2.989990234375l5.345744680849748,2.989990234375-1.642589812583537-2.46002197265625h7.20001220703125v-.52996826171875H0Z'
                    />
                    <polygon
                      className='uuid-4cbcace5-1e93-4d7a-a56f-aa52c291ec42'
                      points='.765847817816393 3.262022593142319 10.723294626330244 3.262022593142319 10.723294626330244 2.607767273993886 .049733925455257 2.989990234375 .765847817816393 3.262022593142319'
                    />
                  </g>
                </g>
              </svg>
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
