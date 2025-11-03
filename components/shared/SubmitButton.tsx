// components/shared/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";
import styles from "@/styles/Forms.module.css";

interface SubmitButtonProps {
  /**
   * Text to display when form is idle
   */
  idleText: string;
  /**
   * Text to display when form is submitting
   */
  pendingText: string;
  /**
   * Additional disabled conditions beyond form pending state
   */
  disabled?: boolean;
}

/**
 * Reusable Submit Button component using useFormStatus hook
 * Automatically shows pending state during form submission
 * Must be used within a <form> element
 */
export default function SubmitButton({
  idleText,
  pendingText,
  disabled = false,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={styles.submitButton}
      aria-busy={pending}
    >
      {pending ? pendingText : idleText}
    </button>
  );
}
