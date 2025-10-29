// components/Footer.tsx
"use client";

import Link from "next/link";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span className={styles.copyright}>
          &copy; {currentYear} Spiżarnia Regio
        </span>

        <nav className={styles.footerNav}>
          <Link href="/informativa-privacy" className={styles.footerLink}>
            Privacy
          </Link>
          <Link href="/informativa-cookie" className={styles.footerLink}>
            Cookie
          </Link>
          <Link href="/note-legali" className={styles.footerLink}>
            Note Legali
          </Link>
        </nav>
      </div>
    </footer>
  );
}
