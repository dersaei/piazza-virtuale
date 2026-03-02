// components/PremiumCta.tsx
"use client";

import { useState } from "react";
import styles from "@/styles/ComeFunziona.module.css";
import PremiumInterestModal from "@/components/PremiumInterestModal";

export default function PremiumCta() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.ctaWrapper}>
        <button
          type="button"
          className={styles.ctaButton}
          onClick={() => setIsOpen(true)}
        >
          <div className={styles.ctaButtonInner}>
            <span className={styles.ctaButtonText}>Sono interessato/a</span>
          </div>
        </button>
      </div>

      <PremiumInterestModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
