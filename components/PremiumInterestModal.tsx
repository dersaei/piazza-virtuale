// components/PremiumInterestModal.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useActionState } from "react";
import Link from "next/link";
import styles from "@/styles/AddShopModal.module.css";
import { submitPremiumInterestForm } from "@/app/actions/submissions";
import FormSuccessScreen from "@/components/shared/FormSuccessScreen";

interface PremiumInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLOSE_DURATION = 200; // ms — match CSS animation duration
const OPEN_DURATION = 400;  // ms — match scaleOpen animation duration

export default function PremiumInterestModal({
  isOpen,
  onClose,
}: PremiumInterestModalProps) {
  const [state, formAction] = useActionState(submitPremiumInterestForm, null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Sync visibility with isOpen — open immediately, close with animation
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
      document.documentElement.classList.add("scroll-locked");
      setIsVisible(true);
      setIsClosing(false);
      setIsOpening(true);
      setTimeout(() => setIsOpening(false), OPEN_DURATION);
    }
    // No cleanup here — scroll restore is handled explicitly in handleClose
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    document.documentElement.classList.remove("scroll-locked");
    document.documentElement.style.removeProperty("--scrollbar-width");
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, CLOSE_DURATION);
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isVisible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isVisible, handleClose]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`${styles.backdrop} ${isClosing ? styles.closing : ""}`}
        onClick={isOpening ? undefined : handleClose}
        aria-hidden="true"
      />

      <div
        className={`${styles.modal} ${isClosing ? styles.closing : ""} ${isOpening ? styles.opening : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-interest-title"
      >
        <div className={styles.modalInner}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Chiudi"
          >
            ✕
          </button>

          {state?.success ? (
            <FormSuccessScreen
              title="Richiesta inviata!"
              message="Grazie per il Tuo interesse! Ti contatteremo al più presto con tutti i dettagli."
              onReset={handleClose}
              resetLabel="Chiudi"
            />
          ) : (
            <>
              <h2 id="premium-interest-title" className={styles.title}>
                Servizio Premium
              </h2>
              <p className={styles.description}>
                Lascia i Tuoi dati e Ti contatteremo con tutte le informazioni
                sul servizio premium.
              </p>

              <form
                key={state?.submissionId ?? 0}
                action={formAction}
                className={styles.form}
              >
                {/* Nome e cognome */}
                <div className={styles.formGroup}>
                  <label htmlFor="full_name" className={styles.label}>
                    Nome e cognome{" "}
                    <span className={styles.required}>(obbligatorio)</span>
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    required
                    className={styles.input}
                    autoComplete="name"
                    defaultValue={(state?.formData?.full_name as string) || ""}
                  />
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Indirizzo email{" "}
                    <span className={styles.required}>(obbligatorio)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={styles.input}
                    autoComplete="email"
                    defaultValue={(state?.formData?.email as string) || ""}
                  />
                </div>

                {/* Privacy checkbox */}
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="privacy_accepted"
                    name="privacy_accepted"
                    value="on"
                    required
                  />
                  <label
                    htmlFor="privacy_accepted"
                    className={styles.checkboxLabel}
                  >
                    Ho letto e accetto la{" "}
                    <Link href="/privacy-policy" target="_blank">
                      Informativa Privacy
                    </Link>
                  </label>
                </div>

                {/* Status */}
                {state && !state.success && state.message && (
                  <div
                    className={`${styles.statusMessage} ${styles.error}`}
                    role="alert"
                  >
                    {state.message}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" className={styles.submitButton}>
                  Invia richiesta
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
