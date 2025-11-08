// components/AgeGateModal.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setAgeVerified } from "@/app/actions/age-verification";
import styles from "@/styles/AgeGateModal.module.css";

// Categories that require age verification (18+)
// These match the actual URL structure with /bevande/ parent path
const ALCOHOL_CATEGORIES = [
  "/bevande/birre",
  "/bevande/vini",
  "/bevande/distillati",
];

// Cookie name (must match server action)
const AGE_VERIFIED_COOKIE = "age_verified";

export default function AgeGateModal() {
  const pathname = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if current pathname requires age verification
    // Now checking for exact path matches or paths that start with these URLs
    const requiresVerification = ALCOHOL_CATEGORIES.some(
      (category) => pathname === category || pathname.startsWith(category + "/")
    );

    if (!requiresVerification) {
      setShowModal(false);
      return;
    }

    // Check if user has already verified age (client-side cookie check)
    const hasVerified =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${AGE_VERIFIED_COOKIE}=`))
        ?.split("=")[1] === "true";

    setShowModal(!hasVerified);

    // Lock body scroll when modal is shown
    if (!hasVerified) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [pathname]);

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      // Call Server Action to set cookie
      const result = await setAgeVerified();

      if (result.success) {
        // Restore scroll before hiding modal
        document.body.style.overflow = "";
        setShowModal(false);
        // Refresh the page to update server-side rendering
        router.refresh();
      } else {
        console.error("Failed to set age verification cookie");
      }
    } catch (error) {
      console.error("Error during age verification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeny = () => {
    // Restore scroll before redirecting
    document.body.style.overflow = "";
    // Redirect to homepage if user denies age verification
    router.push("/");
  };

  if (!showModal) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} aria-hidden="true" />

      {/* Modal */}
      <div
        className={styles.modal}
        role="dialog"
        aria-labelledby="age-gate-title"
        aria-describedby="age-gate-description"
      >
        <div className={styles.modalContent}>
          {/* Warning Icon */}
          <div className={styles.iconWrapper}>
            <svg
              className={styles.warningIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          {/* Title */}
          <h2 id="age-gate-title" className={styles.title}>
            Verifica dell&rsquo;Età
          </h2>

          {/* Description */}
          <div id="age-gate-description" className={styles.description}>
            <p>Questo sito contiene informazioni su prodotti alcolici.</p>
            <p>Confermi di avere almeno 18 anni?</p>
          </div>

          {/* Legal Notice */}
          <p className={styles.legalNotice}>
            Ai sensi dell&rsquo;Art. 689 del Codice Penale, è vietata la vendita
            di bevande alcoliche ai minori di 18 anni.
          </p>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className={`${styles.button} ${styles.buttonConfirm}`}
              aria-label="Conferma di avere almeno 18 anni"
            >
              {isLoading ? "Verifica in corso..." : "Sì, ho almeno 18 anni"}
            </button>

            <button
              type="button"
              onClick={handleDeny}
              disabled={isLoading}
              className={`${styles.button} ${styles.buttonDeny}`}
              aria-label="Non ho ancora 18 anni"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
