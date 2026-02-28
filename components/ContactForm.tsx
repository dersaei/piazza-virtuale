// components/ContactForm.tsx
"use client";

import { useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import styles from "@/styles/Forms.module.css";
import { submitContactForm } from "@/app/actions/submissions";
import SubmitButton from "@/components/shared/SubmitButton";
import FormStatus from "@/components/shared/FormStatus";

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, null);

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyAccepted(e.target.checked);
  };

  return (
    <form key={state?.submissionId ?? 0} action={formAction} className={styles.form}>
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
          defaultValue={(state?.formData?.full_name as string) || ""}
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
          defaultValue={(state?.formData?.subject as string) || ""}
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
          defaultValue={(state?.formData?.message as string) || ""}
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
