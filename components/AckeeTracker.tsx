// components/AckeeTracker.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as ackeeTracker from "ackee-tracker";

const ACKEE_SERVER = "https://ackee.piazzavirtuale.it";
const ACKEE_DOMAIN_ID = "c5a39a11-4bdf-4633-9e68-f279bb4f585f";

export default function AckeeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const instanceRef = useRef<ReturnType<typeof ackeeTracker.create> | null>(
    null
  );
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Create Ackee instance once
    if (!instanceRef.current) {
      instanceRef.current = ackeeTracker.create(ACKEE_SERVER, {
        detailed: false, // Ustaw na true jeśli masz zgodę użytkownika na szczegółowe dane
        ignoreLocalhost: true,
        ignoreOwnVisits: true,
      });
    }

    // Stop previous record (if exists)
    if (stopRef.current) {
      stopRef.current();
    }

    // Start tracking new page
    const attributes = ackeeTracker.attributes(false);
    const record = instanceRef.current.record(ACKEE_DOMAIN_ID, attributes);
    stopRef.current = record.stop;

    // Cleanup on unmount
    return () => {
      if (stopRef.current) {
        stopRef.current();
      }
    };
  }, [pathname, searchParams]);

  return null; // Ten komponent nic nie renderuje
}
