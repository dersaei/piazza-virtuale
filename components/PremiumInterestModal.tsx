// components/PremiumInterestModal.tsx
"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import Link from "next/link";
import styles from "@/styles/AddShopModal.module.css";
import { submitPremiumInterestForm } from "@/app/actions/submissions";
import FormSuccessScreen from "@/components/shared/FormSuccessScreen";

interface PremiumInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumInterestModal({
  isOpen,
  onClose,
}: PremiumInterestModalProps) {
  const [state, formAction] = useActionState(submitPremiumInterestForm, null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        aria-labelledby="premium-interest-title"
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
              message="Grazie per il Tuo interesse! Ti contatteremo al più presto con tutti i dettagli."
              onReset={onClose}
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
