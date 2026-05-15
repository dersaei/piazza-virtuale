// components/VerticalHeader.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo-piazza-virtuale.png";
import styles from "@/styles/VerticalHeader.module.css";
import AddShopModal from "@/components/AddShopModal";

const NAVIGATION_ITEMS = [
  { id: "magazine", label: "Magazine", href: "/magazine" },
  { id: "chi-siamo", label: "Chi Siamo", href: "/chi-siamo" },
  { id: "come-funziona", label: "Come Funziona", href: "/come-funziona" },
  { id: "contatti", label: "Contatti", href: "/contatti" },
];

export default function VerticalHeader() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className={styles.verticalHeader}>
        <div className={styles.logo}>
          <Link href="/">
            <Image priority src={logo} alt="Logo Piazza Virtuale" />
          </Link>
        </div>

        <nav className={styles.nav}>
          {NAVIGATION_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.navButton} ${
                  isActive ? styles.active : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <div className={styles.buttonFrame}>
                  <div className={styles.buttonInnerFrame}>
                    <span className={styles.buttonText}>{item.label}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className={styles.addShopSection}>
          <button
            type="button"
            className={styles.addShopButton}
            onClick={() => setIsModalOpen(true)}
          >
            + Aggiungi Negozio
          </button>
        </div>
      </header>

      <AddShopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
