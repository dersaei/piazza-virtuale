// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
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
  metadataBase: new URL("https://piazzavirtuale.it"),
  title: {
    default: "Piazza Virtuale",
    template: "%s | Piazza Virtuale",
  },
  description:
    "Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande. Scopri i migliori produttori che vendono online direttamente ai consumatori.",
  keywords: [
    "produttori italiani",
    "e-shop",
    "cibo italiano",
    "bevande italiane",
    "made in italy",
    "acquisto diretto",
    "food italiano",
    "specialità regionali",
    "eccellenze italiane",
    "vendita diretta",
  ],
  authors: [{ name: "Piazza Virtuale" }],
  creator: "Piazza Virtuale",
  publisher: "Piazza Virtuale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://piazzavirtuale.it",
    siteName: "Piazza Virtuale",
    title: "Piazza Virtuale - Il catalogo degli e-shop dei produttori italiani",
    description:
      "Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande. Scopri i migliori produttori che vendono online direttamente ai consumatori.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Piazza Virtuale - Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piazza Virtuale - Il catalogo degli e-shop dei produttori italiani",
    description:
      "Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande. Scopri i migliori produttori che vendono online direttamente ai consumatori.",
    images: ["/opengraph-image"],
  },
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
        <Suspense fallback={null}>
          <AckeeTracker />
        </Suspense>
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
