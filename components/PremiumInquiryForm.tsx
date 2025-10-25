// components/PremiumInquiryForm.tsx
"use client";

import { useState } from "react";
import styles from "@/styles/Forms.module.css";

interface PremiumFormData {
  producer_name: string;
  contact_name: string;
  email: string;
  message: string;
}

export default function PremiumInquiryForm() {
  const [formData, setFormData] = useState<PremiumFormData>({
    producer_name: "",
    contact_name: "",
    email: "",
    message: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/submissions/premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio del modulo");
      }

      setSubmitStatus({
        type: "success",
        message:
          "Grazie per il tuo interesse! Ti contatteremo presto per discutere il servizio premium.",
      });

      // Reset form
      setFormData({
        producer_name: "",
        contact_name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Si è verificato un errore. Per favore riprova più tardi o contattaci direttamente.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Producer Name */}
      <div className={styles.formGroup}>
        <label htmlFor="premium_producer_name" className={styles.label}>
          Nome del Produttore <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="premium_producer_name"
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
          Nome e Cognome del Rappresentante{" "}
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
          Indirizzo Email <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className={styles.input}
          placeholder="mario.rossi@example.it"
        />
      </div>

      {/* Message (Optional) */}
      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Messaggio (opzionale)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          className={styles.textarea}
          placeholder="Inserisci eventuali domande o richieste specifiche..."
        />
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
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? "Invio in corso..." : "Invia Richiesta"}
      </button>
    </form>
  );
}
