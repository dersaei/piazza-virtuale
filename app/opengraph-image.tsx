// app/opengraph-image.tsx
import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

// Image metadata
export const alt =
  "Piazza Virtuale - Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e bevande";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
  const logoData = readFileSync(
    join(process.cwd(), "public", "logo-piazza-virtuale.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#b6c0ba",
        padding: "60px 80px",
        gap: "32px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt="Piazza Virtuale"
        style={{ maxWidth: "300px", maxHeight: "150px", objectFit: "contain" }}
      />

      <p
        style={{
          fontSize: "32px",
          color: "#2c2f2a",
          margin: 0,
          maxWidth: "800px",
          lineHeight: 1.4,
          textAlign: "center",
        }}
      >
        Il catalogo degli e-shop ufficiali dei produttori italiani di cibo e
        bevande
      </p>

      {/* Bottom badge */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          alignItems: "center",
          color: "#4a4f45",
          fontSize: "22px",
        }}
      >
        🇮🇹
      </div>
    </div>,
    {
      ...size,
    },
  );
}
