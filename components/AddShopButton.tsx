// components/AddShopButton.tsx
"use client";

import { useState } from "react";
import styles from "@/styles/AddShopButton.module.css";
import AddShopModal from "@/components/AddShopModal";

interface AddShopButtonProps {
  className?: string;
}

export default function AddShopButton({ className }: AddShopButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${styles.addShopButton}${className ? ` ${className}` : ""}`}
        onClick={() => setIsOpen(true)}
      >
        + Aggiungi Negozio
      </button>

      <AddShopModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
