// app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/styles/reset.css";
import "@/styles/globals.css";
import VerticalHeader from "@/components/VerticalHeader";
import HorizontalHeader from "@/components/HorizontalHeader";
import MobileHeader from "@/components/MobileHeader";
import MobileCategorySelector from "@/components/MobileCategorySelector";
import Footer from "@/components/Footer";
import AgeGateModal from "@/components/AgeGateModal";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Piazza Virtuale",
  description:
    "Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      {/* Note: Hydration warnings from browser extensions (e.g., Grammarly) are expected.
          We intentionally do NOT use suppressHydrationWarning to ensure all real
          hydration errors are visible during development. */}
      <body>
        <ScrollToTop />
        <div>
          {/* Desktop headers */}
          <VerticalHeader />
          <div className="main-content-area">
            <HorizontalHeader />
            <main className="main-content">{children}</main>
            <Footer />
          </div>

          {/* Mobile headers */}
          <MobileHeader />
          <MobileCategorySelector />
          <main className="mobile-main-content">{children}</main>
          <div className="mobile-footer-wrapper">
            <Footer />
          </div>
        </div>
        <Script
          src="https://ackee.piazzavirtuale.it/tracker.js"
          data-ackee-server="https://ackee.piazzavirtuale.it"
          data-ackee-domain-id="c5a39a11-4bdf-4633-9e68-f279bb4f585f"
          strategy="lazyOnload"
        />
        <AgeGateModal />
      </body>
    </html>
  );
}
