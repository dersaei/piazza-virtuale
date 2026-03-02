// components/AddShopModal.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useActionState } from "react";
import styles from "@/styles/AddShopModal.module.css";
import { submitQuickForm } from "@/app/actions/submissions";
import FormSuccessScreen from "@/components/shared/FormSuccessScreen";

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLOSE_DURATION = 200; // ms — match CSS animation duration

export default function AddShopModal({ isOpen, onClose }: AddShopModalProps) {
  const [state, formAction] = useActionState(submitQuickForm, null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Sync visibility with isOpen — open immediately, close with animation
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Read saved scroll position before clearing styles
    const savedTop = document.body.style.top;
    setTimeout(() => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (savedTop) {
        window.scrollTo(0, parseInt(savedTop) * -1);
      }
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
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className={`${styles.modal} ${isClosing ? styles.closing : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-shop-title"
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
              message="Grazie! La tua richiesta è stata inviata con successo!"
              onReset={handleClose}
              resetLabel="Chiudi"
            />
          ) : (
            <>
              <h2 id="add-shop-title" className={styles.title}>
                Aggiungi negozio
              </h2>
              <p className={styles.description}>
                Ogni negozio online di produttori italiani può essere aggiunto
                gratuitamente al nostro catalogo.
              </p>

              <form
                key={state?.submissionId ?? 0}
                action={formAction}
                className={styles.form}
              >
                {/* Nome azienda */}
                <div className={styles.formGroup}>
                  <label htmlFor="company_name" className={styles.label}>
                    Nome dell&rsquo;azienda{" "}
                    <span className={styles.optional}>(opzionale)</span>
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    className={styles.input}
                    autoComplete="organization"
                    defaultValue={
                      (state?.formData?.company_name as string) || ""
                    }
                  />
                </div>

                {/* URL negozio */}
                <div className={styles.formGroup}>
                  <label htmlFor="shop_url" className={styles.label}>
                    URL del negozio online{" "}
                    <span className={styles.required}>(obbligatorio)</span>
                  </label>
                  <input
                    type="text"
                    id="shop_url"
                    name="shop_url"
                    required
                    className={styles.input}
                    autoComplete="url"
                    defaultValue={(state?.formData?.shop_url as string) || ""}
                  />
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
