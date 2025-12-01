// app/fonts.ts
// Font configuration using next/font for optimal performance
// All fonts are self-hosted and preloaded automatically by Next.js

import { Lora, Source_Sans_3, Outfit, Bodoni_Moda_SC } from "next/font/google";

/**
 * Lora - Serif font for body text and elegant typography
 * Replaces: Georgia, Times New Roman
 * Variable font for optimal performance
 * Weights used: 300, 400, 500, 600
 */
export const fontSerif = Lora({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-serif",
  // Variable fonts don't need weight specification
});

/**
 * Source Sans 3 - Sans-serif font for clean, modern UI elements
 * Replaces: Helvetica Neue, Arial
 * Variable font for optimal performance
 * Weights used: 300, 400, 500, 600
 */
export const fontSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
  // Variable fonts don't need weight specification
});

/**
 * Outfit - Geometric sans-serif font for headers and emphasis
 * Replaces: Futura
 * Variable font for optimal performance
 * Weights used: 500
 */
export const fontFutura = Outfit({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-futura",
  // Variable fonts don't need weight specification
});

/**
 * Bodoni Moda SC - Elegant serif font with small caps for special headings
 * Replaces: Didot
 * Variable font for optimal performance
 * Axes: Italic (ital), Optical Size (opsz), Weight (wght)
 */
export const fontDidot = Bodoni_Moda_SC({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-didot",
  // Variable fonts don't need weight specification
});
