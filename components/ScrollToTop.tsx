// components/ScrollToTop.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/ScrollToTop.module.css";

export default function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      className={styles.button}
      onClick={scrollToTop}
      aria-label="Torna su"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 5.98 10.9"
        className={styles.icon}
      >
        <path d="m2.99,0L0,5.35l2.46-1.64v7.2h.53V0Z" />
        <path d="m2.99,0l2.99,5.35-2.46-1.64v7.2h-.53V0Z" />
        <polygon points="3.26 .77 3.26 10.72 2.61 10.72 2.99 .05 3.26 .77" />
      </svg>
    </button>
  );
}
