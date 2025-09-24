// components/VerticalHeader.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo-piazza-virtuale.png";
import styles from "@/styles/VerticalHeader.module.css";

const NAVIGATION_ITEMS = [
  { id: "magazine", label: "Magazine", href: "/magazine" },
  { id: "chi-siamo", label: "Chi Siamo", href: "/chi-siamo" },
  { id: "come-funziona", label: "Come Funziona", href: "/come-funziona" },
  { id: "contatti", label: "Contatti", href: "/contatti" },
];

export default function VerticalHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.verticalHeader}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src={logo}
            alt="Piazza Virtuale - Il catalogo degli e-shop ufficiali      
  dei produttori italiani di cibo e bevande"
          />
        </Link>
      </div>

      <nav className={styles.nav}>
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
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
    </header>
  );
}
