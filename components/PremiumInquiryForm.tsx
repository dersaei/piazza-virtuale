// components/PremiumInquiryForm.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useActionState } from "react";
import Link from "next/link";
import styles from "@/styles/Forms.module.css";
import { submitPremiumInquiry } from "@/app/actions/submissions";
import SubmitButton from "@/components/shared/SubmitButton";
import FormStatus from "@/components/shared/FormStatus";

export default function PremiumInquiryForm() {
  // Server action state management
  const [state, formAction] = useActionState(submitPremiumInquiry, null);

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
      {/* Producer Name */}
      <div className={styles.formGroup}>
        <label htmlFor="producer_name" className={styles.label}>
          Nome del Produttore <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="producer_name"
          name="producer_name"
          required
          className={styles.input}
          placeholder="Es. Azienda Agricola Rossi"
        />
      </div>

      {/* Contact Name */}
      <div className={styles.formGroup}>
        <label htmlFor="contact_name" className={styles.label}>
          Nome e Cognome del Referente{" "}
          <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="contact_name"
          name="contact_name"
          required
          className={styles.input}
          placeholder="Es. Mario Rossi"
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
        />
      </div>

      {/* Message */}
      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Messaggio (opzionale)
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={styles.textarea}
          placeholder="Scrivi qui eventuali domande o richieste specifiche..."
        />
      </div>

      {/* Privacy Policy Checkbox */}
      <div className={styles.privacyGroup}>
        <label className={styles.privacyLabel}>
          <input
            type="checkbox"
            name="privacy_accepted"
            checked={privacyAccepted}
            onChange={handlePrivacyChange}
            required
            className={styles.privacyCheckbox}
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
        idleText="Invia Richiesta Premium"
        pendingText="Invio in corso..."
        disabled={!privacyAccepted}
      />
    </form>
  );
}
