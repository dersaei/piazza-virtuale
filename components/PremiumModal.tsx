"use client";

import { useEffect } from "react";
import Image from "next/image";
import imagetest from "@/public/test1.jpg";
import imagetest1 from "@/public/test2.jpg";
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
          <div className={styles.mdContent}>
            <div className={styles.grid}>
              <figure className={styles.effectJulia}>
                <Image
                  src={imagetest1}
                  alt="Farina Tipo 00"
                  fill
                  className={styles.image}
                />
                <figcaption>
                  <h2>
                    Farina <span>Tipo 00</span>
                  </h2>
                  <div>
                    <p>Alta qualità</p>
                    <p>Macinata a pietra</p>
                    <p>Grano 100% italiano</p>
                  </div>
                  <a href="#">Visita prodotto</a>
                </figcaption>
              </figure>

              <figure className={styles.effectJulia}>
                <Image
                  src={imagetest}
                  alt="Semola"
                  fill
                  className={styles.image}
                />
                <figcaption>
                  <h2>
                    Semola <span>Rimacinata</span>
                  </h2>
                  <div>
                    <p>Ideale per pane</p>
                    <p>Tradizione toscana</p>
                    <p>Qualità premium</p>
                  </div>
                  <a href="#">Visita prodotto</a>
                </figcaption>
              </figure>
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
