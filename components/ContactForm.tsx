// components/ContactForm.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useActionState } from "react";
import Link from "next/link";
import styles from "@/styles/Forms.module.css";
import { submitContactForm } from "@/app/actions/submissions";
import SubmitButton from "@/components/shared/SubmitButton";
import FormStatus from "@/components/shared/FormStatus";

export default function ContactForm() {
  // Server action state management
  const [state, formAction] = useActionState(submitContactForm, null);

  // Local state for privacy checkbox
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Form reference for reset
  const formRef = useRef<HTMLFormElement>(null);
  const prevSuccessRef = useRef(false);

  // Reset form on successful submission
  useEffect(() => {
    // Only reset if this is a new success (not the same success state)
    if (state?.success && !prevSuccessRef.current) {
      prevSuccessRef.current = true;
      formRef.current?.reset();

      // Use setTimeout to avoid cascading renders
      setTimeout(() => {
        setPrivacyAccepted(false);
      }, 0);
    } else if (!state?.success) {
      prevSuccessRef.current = false;
    }
  }, [state]);

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyAccepted(e.target.checked);
  };

  return (
    <form ref={formRef} action={formAction} className={styles.form}>
      {/* Nome e Cognome */}
      <div className={styles.formGroup}>
        <label htmlFor="full_name" className={styles.label}>
          Nome e Cognome <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          required
          className={styles.input}
          placeholder="Es. Mario Rossi"
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
          placeholder="mario.rossi@esempio.it"
          autoComplete="email"
        />
      </div>

      {/* Oggetto/Argomento */}
      <div className={styles.formGroup}>
        <label htmlFor="subject" className={styles.label}>
          Oggetto <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className={styles.input}
          placeholder="Es. Richiesta informazioni"
          autoComplete="off"
        />
      </div>

      {/* Messaggio */}
      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Messaggio <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={8}
          className={styles.textarea}
          placeholder="Scrivi qui il tuo messaggio..."
          autoComplete="off"
        />
      </div>

      {/* Privacy Policy Checkbox */}
      <div className={styles.privacyGroup}>
        <label htmlFor="privacy_accepted" className={styles.privacyLabel}>
          <input
            type="checkbox"
            id="privacy_accepted"
            name="privacy_accepted"
            checked={privacyAccepted}
            onChange={handlePrivacyChange}
            required
            className={styles.privacyCheckbox}
            autoComplete="off"
          />
          <span className={styles.privacyText}>
            Ho letto e accetto l&rsquo;
            <Link href="/informativa-privacy" className={styles.privacyLink}>
              Informativa Privacy
            </Link>
            <span className={styles.required}> *</span>
          </span>
        </label>
      </div>

      {/* Submit Status */}
      <FormStatus state={state} />

      {/* Submit Button */}
      <SubmitButton
        idleText="Invia Messaggio"
        pendingText="Invio in corso..."
        disabled={!privacyAccepted}
      />
    </form>
  );
}
