// components/Footer.tsx
import Link from "next/link";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  // Static year - updated at build time
  // For Cache Components compatibility, we use a static value
  const currentYear = 2025;

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
