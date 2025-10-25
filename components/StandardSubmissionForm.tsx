// components/StandardSubmissionForm.tsx
"use client";

import { useState } from "react";
import styles from "@/styles/Forms.module.css";
import { GROUPED_FORM_CATEGORIES } from "@/lib/constants/formCategories";

const ITALIAN_REGIONS = [
  "Abruzzo",
  "Basilicata",
  "Calabria",
  "Campania",
  "Emilia-Romagna",
  "Friuli-Venezia Giulia",
  "Lazio",
  "Liguria",
  "Lombardia",
  "Marche",
  "Molise",
  "Piemonte",
  "Puglia",
  "Sardegna",
  "Sicilia",
  "Toscana",
  "Trentino-Alto Adige",
  "Umbria",
  "Valle d'Aosta",
  "Veneto",
];

interface FormData {
  producer_name: string;
  shop_url: string;
  categories: string[];
  region: string;
  logo: File | null;
}

export default function StandardSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    producer_name: "",
    shop_url: "",
    categories: [],
    region: "",
    logo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData((prev) => {
      const categories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Create FormData for multipart upload
      const submitData = new FormData();
      submitData.append("producer_name", formData.producer_name);
      submitData.append("shop_url", formData.shop_url);
      submitData.append("categories", JSON.stringify(formData.categories));
      submitData.append("region", formData.region);
      if (formData.logo) {
        submitData.append("logo", formData.logo);
      }

      const response = await fetch("/api/submissions/standard", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio del modulo");
      }

      setSubmitStatus({
        type: "success",
        message:
          "Grazie! La tua richiesta è stata inviata con successo. Ti contatteremo presto.",
      });

      // Reset form
      setFormData({
        producer_name: "",
        shop_url: "",
        categories: [],
        region: "",
        logo: null,
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

      {/* Shop URL */}
      <div className={styles.formGroup}>
        <label htmlFor="shop_url" className={styles.label}>
          Indirizzo del Negozio Online{" "}
          <span className={styles.required}>*</span>
        </label>
        <input
          type="url"
          id="shop_url"
          name="shop_url"
          value={formData.shop_url}
          onChange={handleInputChange}
          required
          className={styles.input}
          placeholder="https://www.tuoshop.it"
        />
      </div>

      {/* Categories - Grouped by type */}
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Categorie <span className={styles.required}>*</span>
        </label>

        <div className={styles.categoriesContainer}>
          {Object.entries(GROUPED_FORM_CATEGORIES).map(
            ([groupName, categories]) => (
              <div key={groupName} className={styles.categoryGroup}>
                <h4 className={styles.categoryGroupTitle}>{groupName}</h4>
                <div className={styles.checkboxGrid}>
                  {categories.map((category) => (
                    <label key={category.id} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className={styles.checkbox}
                      />
                      <span>{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {formData.categories.length === 0 && (
          <p className={styles.hint}>Seleziona almeno una categoria</p>
        )}
      </div>

      {/* Region */}
      <div className={styles.formGroup}>
        <label htmlFor="region" className={styles.label}>
          Regione <span className={styles.required}>*</span>
        </label>
        <select
          id="region"
          name="region"
          value={formData.region}
          onChange={handleInputChange}
          required
          className={styles.select}
        >
          <option value="">Seleziona la regione</option>
          {ITALIAN_REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Logo Upload */}
      <div className={styles.formGroup}>
        <label htmlFor="logo" className={styles.label}>
          Logo (opzionale)
        </label>
        <input
          type="file"
          id="logo"
          name="logo"
          onChange={handleFileChange}
          accept="image/png,image/jpeg,image/jpg,image/svg+xml"
          className={styles.fileInput}
        />
        <p className={styles.hint}>
          Formati accettati: PNG, JPG, SVG. Dimensione massima: 5MB
        </p>
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
        disabled={isSubmitting || formData.categories.length === 0}
        className={styles.submitButton}
      >
        {isSubmitting ? "Invio in corso..." : "Invia Richiesta"}
      </button>
    </form>
  );
}
