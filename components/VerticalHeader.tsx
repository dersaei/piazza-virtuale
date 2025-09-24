// components/VerticalHeader.tsx
"use client";

import Image from "next/image";
import logo from "@/public/logo-piazza-virtuale.png";
import { useState } from "react";
import styles from "@/styles/VerticalHeader.module.css";

const NAVIGATION_ITEMS = [
  { id: "magazine", label: "Magazine", href: "/magazine" },
  { id: "chi-siamo", label: "Chi Siamo", href: "/chi-siamo" },
  { id: "come-funziona", label: "Come Funziona", href: "/come-funziona" },
  { id: "contatti", label: "Contatti", href: "/contatti" },
];

export default function VerticalHeader() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <header className={styles.verticalHeader}>
      <div className={styles.logo}>
        <Image src={logo} alt="Piazza Virtuale" />
      </div>

      <nav className={styles.nav}>
        {NAVIGATION_ITEMS.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`${styles.navButton} ${
              activeItem === item.id ? styles.active : ""
            }`}
            onClick={() => setActiveItem(item.id)}
            onMouseEnter={() => setActiveItem(item.id)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <div className={styles.buttonFrame}>
              <div className={styles.buttonInnerFrame}>
                <span className={styles.buttonText}>{item.label}</span>
              </div>
            </div>
          </button>
        ))}
      </nav>
    </header>
  );
}
