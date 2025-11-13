// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "@/styles/reset.css";
import "@/styles/globals.css";
import { fontSerif, fontSans, fontFutura, fontDidot } from "./fonts";
import VerticalHeader from "@/components/VerticalHeader";
import HorizontalHeader from "@/components/HorizontalHeader";
import MobileHeader from "@/components/MobileHeader";
import MobileCategorySelector from "@/components/MobileCategorySelector";
import Footer from "@/components/Footer";
import AgeGateModal from "@/components/AgeGateModal";
import ScrollToTop from "@/components/ScrollToTop";
import AckeeTracker from "@/components/AckeeTracker";

export const metadata: Metadata = {
  title: "Piazza Virtuale",
  description:
    "Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande",
  metadataBase: new URL("https://piazzavirtuale.it"),
  alternates: {
    canonical: "/",
  },
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
    <html
      lang="it"
      className={`${fontSerif.variable} ${fontSans.variable} ${fontFutura.variable} ${fontDidot.variable}`}
    >
      {/* Note: Hydration warnings from browser extensions (e.g., Grammarly) are expected.
          We intentionally do NOT use suppressHydrationWarning to ensure all real
          hydration errors are visible during development. */}
      <body>
        <AckeeTracker />
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
        <AgeGateModal />
      </body>
    </html>
  );
}
