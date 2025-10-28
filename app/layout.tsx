// app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/styles/reset.css";
import "@/styles/globals.css";
import VerticalHeader from "@/components/VerticalHeader";
import HorizontalHeader from "@/components/HorizontalHeader";

export const metadata: Metadata = {
  title: "Piazza Virtuale",
  description:
    "Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        <div>
          <VerticalHeader />
          <div className="main-content-area">
            <HorizontalHeader />
            <main className="main-content">{children}</main>
          </div>
        </div>
        <Script
          src="https://ackee.piazzavirtuale.it/tracker.js"
          data-ackee-server="https://ackee.piazzavirtuale.it"
          data-ackee-domain-id="c5a39a11-4bdf-4633-9e68-f279bb4f585f"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
