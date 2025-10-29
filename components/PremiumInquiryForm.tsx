// components/PremiumInquiryForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Forms.module.css";

interface FormData {
  producer_name: string;
  contact_name: string;
  email: string;
  message: string;
  privacy_accepted: boolean;
}

export default function PremiumInquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    producer_name: "",
    contact_name: "",
    email: "",
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
          "Devi accettare l'Informativa Privacy per poter inviare la richiesta.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/submissions/premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          producer_name: formData.producer_name,
          contact_name: formData.contact_name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio della richiesta premium");
      }

      setSubmitStatus({
        type: "success",
        message:
          "Grazie! La tua richiesta premium è stata inviata con successo. Ti contatteremo presto per discutere i dettagli.",
      });

      // Reset form
      setFormData({
        producer_name: "",
        contact_name: "",
        email: "",
        message: "",
        privacy_accepted: false,
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Si è verificato un errore. Per favore riprova più tardi o contattaci direttamente.",
      });
      console.error("Premium inquiry form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Producer Name */}
      <div className={styles.formGroup}>
        <label htmlFor="producer_name" className={styles.label}>
          Nome del Produttore <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="producer_name"
          name="producer_name"
          value={formData.producer_name}
          onChange={handleInputChange}
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
          value={formData.contact_name}
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

      {/* Message */}
      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Messaggio (opzionale)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
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
        {isSubmitting ? "Invio in corso..." : "Invia Richiesta Premium"}
      </button>
    </form>
  );
}
