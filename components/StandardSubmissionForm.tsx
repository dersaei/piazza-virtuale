// components/StandardSubmissionForm.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useActionState } from "react";
import Link from "next/link";
import styles from "@/styles/Forms.module.css";
import { GROUPED_FORM_CATEGORIES } from "@/lib/constants/formCategories";
import { submitStandardForm } from "@/app/actions/submissions";
import SubmitButton from "@/components/shared/SubmitButton";
import FormStatus from "@/components/shared/FormStatus";

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

export default function StandardSubmissionForm() {
  // Server action state management
  const [state, formAction] = useActionState(submitStandardForm, null);

  // Local state for UI interactions (categories, region selection)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  // Track previous formData to detect changes (React recommended pattern)
  const [prevFormData, setPrevFormData] = useState<
    Record<string, unknown> | undefined
  >();

  // Update state when formData changes (validation error) - React pattern for "resetting state when props change"
  // See: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (state?.formData && !state.success && state.formData !== prevFormData) {
    setPrevFormData(state.formData);
    setSelectedCategories((state.formData.categories as string[]) || []);
    setSelectedRegion((state.formData.region as string) || "");
  } else if (state?.success && prevFormData !== undefined) {
    // Reset tracking on successful submission
    setPrevFormData(undefined);
  }

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
        setSelectedCategories([]);
        setSelectedRegion("");
        setPrivacyAccepted(false);
        setClientError(null);
      }, 0);
    } else if (!state?.success) {
      prevSuccessRef.current = false;
    }
  }, [state]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyAccepted(e.target.checked);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

    if (file && file.size > MAX_FILE_SIZE) {
      setClientError(
        "Il file logo è troppo grande. Dimensione massima: 1MB."
      );
      e.target.value = ""; // Clear the file input
    } else {
      setClientError(null); // Clear error if file is valid
    }
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
          autoComplete="organization"
          defaultValue={(state?.formData?.producer_name as string) || ""}
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
          required
          className={styles.input}
          placeholder="https://www.tuoshop.it"
          autoComplete="url"
          defaultValue={(state?.formData?.shop_url as string) || ""}
        />
      </div>

      {/* Categories - Grouped by type */}
      <fieldset className={styles.formGroup}>
        <legend className={styles.label}>
          Categorie <span className={styles.required}>*</span>
        </legend>

        {/* Hidden input to store selected categories as JSON */}
        <input
          type="hidden"
          name="categories"
          value={JSON.stringify(selectedCategories)}
        />

        <div className={styles.categoriesContainer}>
          {Object.entries(GROUPED_FORM_CATEGORIES).map(
            ([groupName, categories]) => (
              <div key={groupName} className={styles.categoryGroup}>
                <h4 className={styles.categoryGroupTitle}>{groupName}</h4>
                <div className={styles.checkboxGrid}>
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      htmlFor={`category-${category.id}`}
                      className={styles.checkboxLabel}
                    >
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        name={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className={styles.checkbox}
                        autoComplete="off"
                      />
                      <span>{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {selectedCategories.length === 0 && (
          <p className={styles.hint}>Seleziona almeno una categoria</p>
        )}
      </fieldset>

      {/* Region - Radio Buttons */}
      <fieldset className={styles.formGroup}>
        <legend className={styles.label}>
          Regione <span className={styles.required}>*</span>
        </legend>

        <div className={styles.radioContainer}>
          {ITALIAN_REGIONS.map((region) => (
            <label key={region} className={styles.radioLabel}>
              <input
                type="radio"
                name="region"
                value={region}
                checked={selectedRegion === region}
                onChange={() => handleRegionChange(region)}
                required
                className={styles.radio}
                autoComplete="off"
              />
              <span>{region}</span>
            </label>
          ))}
        </div>

        {!selectedRegion && (
          <p className={styles.hint}>Seleziona una regione</p>
        )}
      </fieldset>

      {/* Logo Upload */}
      <div className={styles.formGroup}>
        <label htmlFor="logo" className={styles.label}>
          Logo (opzionale)
        </label>
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
          className={styles.fileInput}
          onChange={handleFileChange}
        />
        <p className={styles.hint}>
          Formati accettati: PNG, JPEG, JPG, WebP, SVG. Dimensione massima: 1MB
        </p>
        {clientError && (
          <p className={styles.errorHint} role="alert">
            {clientError}
          </p>
        )}
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
        idleText="Invia Richiesta"
        pendingText="Invio in corso..."
        disabled={
          selectedCategories.length === 0 ||
          !selectedRegion ||
          !privacyAccepted
        }
      />
    </form>
  );
}
