// app/layout.tsx
import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/globals.css";
import VerticalHeader from "@/components/VerticalHeader";
import HorizontalHeader from "@/components/HorizontalHeader";

export const metadata: Metadata = {
  title: "Piazza Virtuale",
  description:
    "Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        <div className="app-layout">
          <VerticalHeader />
          <div className="main-content-area">
            <HorizontalHeader />
            <main className="main-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
