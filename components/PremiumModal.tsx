"use client";

import { useEffect } from "react";
import styles from "@/styles/PremiumModal.module.css";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`${styles.mdOverlay} ${isOpen ? styles.mdShow : ""}`}
        onClick={onClose}
      />
      <div
        className={`${styles.mdModal} ${styles.mdEffect12} ${
          isOpen ? styles.mdShow : ""
        }`}
      >
        <h3 className={styles.modalTitle}>Prodotti in Evidenza</h3>

        <div className={styles.mdContent}>
          <div className={styles.productContainer}>
            <div className={styles.leftColumn}>
              <div className={styles.imagePlaceholder}>FOTO</div>
            </div>
            <div className={styles.rightColumn}>
              <h4 className={styles.productName}>Farina Tipo 00</h4>
              <p className={styles.productPrice}>€3.50</p>
              <p className={styles.productDescription}>
                Farina bianca di alta qualità, macinata a pietra secondo la
                tradizione antica. Ideale per pane, pizza e dolci. Prodotta con
                grano 100% italiano coltivato nelle nostre terre toscane.
              </p>
              <a href="#" className={styles.productLink}>
                Visita Pagina Prodotto
              </a>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className={styles.mdClose} onClick={onClose}>
        Chiudi
      </button>
    </>
  );
}
