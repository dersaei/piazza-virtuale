// components/shared/FormStatus.tsx

import styles from "@/styles/Forms.module.css";

interface FormStatusProps {
  /**
   * The state returned from useActionState
   */
  state: {
    success: boolean;
    message: string;
  } | null;
}

/**
 * Component to display form submission status messages
 * Shows success or error messages based on server action response
 */
export default function FormStatus({ state }: FormStatusProps) {
  if (!state || !state.message) {
    return null;
  }

  return (
    <div
      className={`${styles.statusMessage} ${
        state.success ? styles.success : styles.error
      }`}
      role="alert"
      aria-live="polite"
    >
      {state.message}
    </div>
  );
}
