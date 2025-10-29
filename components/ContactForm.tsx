// components/ContactForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Forms.module.css";

interface FormData {
  full_name: string;
  email: string;
  subject: string;
  message: string;
  privacy_accepted: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    subject: "",
    message: "",
    privacy_accepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, privacy_accepted: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate privacy acceptance
    if (!formData.privacy_accepted) {
      setSubmitStatus({
        type: "error",
        message:
          "Devi accettare l'Informativa Privacy per poter inviare il messaggio.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio del messaggio");
      }

      setSubmitStatus({
        type: "success",
        message:
          "Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.",
      });

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        subject: "",
        message: "",
        privacy_accepted: false,
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Si è verificato un errore durante l'invio del messaggio. Per favore riprova più tardi.",
      });
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Nome e Cognome */}
      <div className={styles.formGroup}>
        <label htmlFor="full_name" className={styles.label}>
          Nome e Cognome <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
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
          value={formData.email}
          onChange={handleInputChange}
          required
          className={styles.input}
          placeholder="mario.rossi@esempio.it"
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
          value={formData.subject}
          onChange={handleInputChange}
          required
          className={styles.input}
          placeholder="Es. Richiesta informazioni"
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
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={8}
          className={styles.textarea}
          placeholder="Scrivi qui il tuo messaggio..."
        />
      </div>

      {/* Privacy Policy Checkbox */}
      <div className={styles.privacyGroup}>
        <label className={styles.privacyLabel}>
          <input
            type="checkbox"
            checked={formData.privacy_accepted}
            onChange={handleCheckboxChange}
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
      {submitStatus.type && (
        <div
          className={`${styles.statusMessage} ${
            submitStatus.type === "success" ? styles.success : styles.error
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !formData.privacy_accepted}
        className={styles.submitButton}
      >
        {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
      </button>
    </form>
  );
}
