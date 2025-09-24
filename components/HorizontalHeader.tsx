// components/HorizontalHeader.tsx
"use client";

import { useState } from "react";
import styles from "@/styles/HorizontalHeader.module.css";

const PRODUCT_CATEGORIES = [
  { id: "birre", label: "Birre", href: "/birre" },
  { id: "vini", label: "Vini", href: "/vini" },
  { id: "condimenti", label: "Condimenti", href: "/condimenti" },
  { id: "conserve-dolci", label: "Conserve dolci", href: "/conserve-dolci" },
  { id: "conserve-salate", label: "Conserve salate", href: "/conserve-salate" },
  { id: "miele", label: "Miele", href: "/miele" },
  { id: "legumi", label: "Legumi", href: "/legumi" },
  { id: "distillati", label: "Distillati", href: "/distillati" },
  { id: "dolci", label: "Dolci", href: "/dolci" },
  { id: "caseificio", label: "Caseificio", href: "/caseificio" },
  { id: "olii", label: "Olii", href: "/olii" },
  { id: "pane", label: "Pane", href: "/pane" },
  { id: "pasta", label: "Pasta", href: "/pasta" },
  { id: "farina", label: "Farina", href: "/farina" },
  { id: "cereali", label: "Cereali", href: "/cereali" },
  { id: "pescare", label: "Pescare", href: "/pescare" },
  { id: "salumi", label: "Salumi", href: "/salumi" },
  { id: "caffe", label: "Caffè", href: "/caffe" },
];

export default function HorizontalHeader() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <header className={styles.horizontalHeader}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              type="button"
              key={category.id}
              className={`${styles.categoryButton} ${
                activeCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className={styles.categoryText}>{category.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
