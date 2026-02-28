// components/PremiumInquiryForm.tsx
"use client";

import { useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import styles from "@/styles/Forms.module.css";
import { submitPremiumInquiry } from "@/app/actions/submissions";
import SubmitButton from "@/components/shared/SubmitButton";
import FormStatus from "@/components/shared/FormStatus";

export default function PremiumInquiryForm() {
  // Server action state management
  const [state, formAction] = useActionState(submitPremiumInquiry, null);

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyAccepted(e.target.checked);
  };

  return (
    <form key={state?.submissionId ?? 0} action={formAction} className={styles.form}>
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
          autoComplete="organization"
          defaultValue={(state?.formData?.producer_name as string) || ""}
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
          autoComplete="name"
          defaultValue={(state?.formData?.contact_name as string) || ""}
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
          defaultValue={(state?.formData?.email as string) || ""}
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
          autoComplete="off"
          defaultValue={(state?.formData?.message as string) || ""}
        />
      </div>

      {/* Privacy Policy Checkbox */}
      <div className={styles.privacyGroup}>
        <label
          htmlFor="premium_privacy_accepted"
          className={styles.privacyLabel}
        >
          <input
            type="checkbox"
            id="premium_privacy_accepted"
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
        idleText="Invia Richiesta Premium"
        pendingText="Invio in corso..."
        disabled={!privacyAccepted}
      />
    </form>
  );
}
