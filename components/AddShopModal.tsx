// components/AddShopModal.tsx
"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import styles from "@/styles/AddShopModal.module.css";
import { submitQuickForm } from "@/app/actions/submissions";
import FormSuccessScreen from "@/components/shared/FormSuccessScreen";

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddShopModal({ isOpen, onClose }: AddShopModalProps) {
  const [state, formAction] = useActionState(submitQuickForm, null);

  // Lock body scroll when modal is open — external system, useEffect is correct here
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-shop-title"
      >
        <div className={styles.modalInner}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Chiudi"
          >
            ✕
          </button>

          {state?.success ? (
            <FormSuccessScreen
              title="Richiesta inviata!"
              message="Grazie! La tua richiesta è stata inviata con successo!"
              onReset={onClose}
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
