// components/MobileHeader.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo-piazza-virtuale.png";
import styles from "@/styles/MobileHeader.module.css";

const NAVIGATION_ITEMS = [
  { id: "magazine", label: "Magazine", href: "/magazine" },
  { id: "chi-siamo", label: "Chi Siamo", href: "/chi-siamo" },
  { id: "come-funziona", label: "Come Funziona", href: "/come-funziona" },
  { id: "contatti", label: "Contatti", href: "/contatti" },
];

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
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
  }, [isMenuOpen]);

  const toggleMenu = () => {
    // Start fade out animation
    setIsChanging(true);

    // After fade out completes, change state and fade in
    setTimeout(() => {
      setIsMenuOpen(!isMenuOpen);
      setIsChanging(false);
    }, 200); // Match CSS transition duration
  };

  const handleLinkClick = () => {
    setIsChanging(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsChanging(false);
    }, 200);
  };

  const handleBackdropClick = () => {
    setIsChanging(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsChanging(false);
    }, 200);
  };

  return (
    <>
      <header className={styles.mobileHeader}>
        <div className={styles.logo}>
          <Link href="/" onClick={handleLinkClick}>
            <Image src={logo} alt="Piazza Virtuale" />
          </Link>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
        >
          <span className={`${styles.menuButtonText} ${isChanging ? styles.changing : ''}`}>
            {isMenuOpen ? "CHIUDI" : "MENU"}
          </span>
        </button>
      </header>

      {/* Backdrop overlay - clicking closes menu */}
      {isMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Slide-in menu overlay */}
      <div
        className={`${styles.menuOverlay} ${isMenuOpen ? styles.menuOpen : ""}`}
      >
        <nav className={styles.nav}>
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={handleLinkClick}
              className={`${styles.navButton} ${
                pathname === item.href ? styles.active : ""
              }`}
            >
              <div className={styles.buttonFrame}>
                <div className={styles.buttonInnerFrame}>
                  <span className={styles.buttonText}>{item.label}</span>
                </div>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
