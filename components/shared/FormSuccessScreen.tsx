// components/shared/FormSuccessScreen.tsx
"use client";

import styles from "@/styles/Forms.module.css";

interface FormSuccessScreenProps {
  title: string;
  message: string;
  onReset: () => void;
  resetLabel?: string;
}

export default function FormSuccessScreen({
  title,
  message,
  onReset,
  resetLabel = "Invia un'altra richiesta",
}: FormSuccessScreenProps) {
  return (
    <div className={styles.successScreen} role="status" aria-live="polite">
      <div className={styles.successIconWrapper}>
        <svg
          className={styles.successIcon}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="32" cy="32" r="30" stroke="#7a8471" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="30" fill="#7a8471" fillOpacity="0.08" />
          <polyline
            points="20,33 28,41 44,24"
            stroke="#7a8471"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className={styles.successTitle}>{title}</h3>
      <p className={styles.successMessage}>{message}</p>

      <button type="button" onClick={onReset} className={styles.resetButton}>
        {resetLabel}
      </button>
    </div>
  );
}
