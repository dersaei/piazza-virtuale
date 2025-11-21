// components/HorizontalHeader.tsx
"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "@/styles/HorizontalHeader.module.css";
import {
  MAIN_CATEGORY_LIST,
  getSubcategories,
} from "@/lib/constants/categories";

export default function HorizontalHeader() {
  const pathname = usePathname();
  const { pending } = useLinkStatus();

  // Derived state from pathname - automatically updates when pathname changes
  const isOnBevandePage = pathname.startsWith("/bevande");
  const isOnCondimentiPage = pathname.startsWith("/condimenti");

  // Store state along with the pathname it was set on
  // This allows automatic reset when pathname changes without needing useEffect
  const [showBevandeSub, setShowBevandeSub] = useState<{show: boolean, pathname: string}>({
    show: false,
    pathname: pathname
  });
  const [showCondimentiSub, setShowCondimentiSub] = useState<{show: boolean, pathname: string}>({
    show: false,
    pathname: pathname
  });
  const [forceHideState, setForceHideState] = useState<{hide: boolean, pathname: string}>({
    hide: false,
    pathname: pathname
  });

  const bevandeSubcategories = getSubcategories("bevande");
  const condimentiSubcategories = getSubcategories("condimenti");

  // Derive current values - automatically reset when pathname changes
  // This is pure derived state, no effects needed
  const currentShowBevandeSub = showBevandeSub.pathname === pathname ? showBevandeSub.show : false;
  const currentShowCondimentiSub = showCondimentiSub.pathname === pathname ? showCondimentiSub.show : false;
  const forceHideSubcategories = forceHideState.pathname === pathname ? forceHideState.hide : false;

  // Automatically show subcategories when on respective routes (derived state)
  // but allow force hide to override
  // Priority: manual clicks (currentShowBevandeSub/currentShowCondimentiSub) override pathname-based detection
  const shouldShowBevandeSub = !forceHideSubcategories && (currentShowBevandeSub || (!currentShowCondimentiSub && isOnBevandePage));
  const shouldShowCondimentiSub = !forceHideSubcategories && (currentShowCondimentiSub || (!currentShowBevandeSub && isOnCondimentiPage));

  // Determine which categories to show
  const categoriesToShow = shouldShowBevandeSub
    ? bevandeSubcategories
    : shouldShowCondimentiSub
    ? condimentiSubcategories
    : MAIN_CATEGORY_LIST;

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    categoryId: string
  ) => {
    if (categoryId === "bevande") {
      e.preventDefault();
      setShowBevandeSub({ show: true, pathname: pathname });
      setShowCondimentiSub({ show: false, pathname: pathname });
      // Reset force hide when user explicitly clicks to show subcategories
      setForceHideState({ hide: false, pathname: pathname });
    } else if (categoryId === "condimenti") {
      e.preventDefault();
      setShowCondimentiSub({ show: true, pathname: pathname });
      setShowBevandeSub({ show: false, pathname: pathname });
      // Reset force hide when user explicitly clicks to show subcategories
      setForceHideState({ hide: false, pathname: pathname });
    }
  };

  const handleBackClick = () => {
    // Force hide subcategories even if pathname suggests they should be shown
    setForceHideState({ hide: true, pathname: pathname });
    setShowBevandeSub({ show: false, pathname: pathname });
    setShowCondimentiSub({ show: false, pathname: pathname });
  };

  return (
    <header className={styles.horizontalHeader}>
      {/* Loading indicator for navigation on slow networks */}
      {pending && <div className={styles.loadingBar} />}
      <nav className={styles.nav}>
        <div
          className={`${styles.navContainer} ${
            shouldShowBevandeSub || shouldShowCondimentiSub ? styles.twoRows : ""
          }`}
        >
          {/* Category buttons */}
          {categoriesToShow.map((category) => {
            const hasSubcategories =
              category.id === "bevande" || category.id === "condimenti";

            return (
              <Link
                key={category.id}
                href={category.href}
                prefetch={hasSubcategories ? false : undefined}
                onClick={
                  hasSubcategories
                    ? (e) => handleCategoryClick(e, category.id)
                    : undefined
                }
                className={`${styles.categoryButton} ${
                  pathname === category.href ||
                  pathname.startsWith(category.href + "/")
                    ? styles.active
                    : ""
                }`}
              >
                <span className={styles.categoryText}>{category.label}</span>
              </Link>
            );
          })}

          {/* Back arrow - shows main categories, stays on current page */}
          {(shouldShowBevandeSub || shouldShowCondimentiSub) && (
            <button
              type="button"
              onClick={handleBackClick}
              className={styles.backArrow}
              aria-label="Torna alle categorie principali"
            >
              <svg
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
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
