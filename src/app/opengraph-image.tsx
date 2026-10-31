import { ImageResponse } from "next/og";

// Imagen que muestran LinkedIn, WhatsApp, X… al compartir el portfolio
export const alt = "Iván Terol — Desarrollador frontend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Descarga Space Grotesk (la fuente del portfolio). ImageResponse admite TTF, OTF y WOFF, pero no WOFF2.
 * Se genera en el build; si falla, se usa la fuente por defecto.
 */
async function loadFont(weight: number) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@${weight}`, {
        // Con un user-agent antiguo Google Fonts devuelve WOFF en lugar de WOFF2
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko) Safari/534.30" },
      })
    ).text();
    // El CSS viene dividido por alfabetos: se usa el bloque latino (incluye tildes)
    const url = css.match(/\/\* latin \*\/[^}]*?src: url\((.+?)\) format\('(?:woff|truetype|opentype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [bold, medium] = await Promise.all([loadFont(700), loadFont(500)]);
  const fonts = [
    bold && { name: "Space Grotesk", data: bold, weight: 700 as const, style: "normal" as const },
    medium && { name: "Space Grotesk", data: medium, weight: 500 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0b0b0c",
          color: "#edeae3",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 500, letterSpacing: 4, color: "#8a877f" }}>
          <span>DESARROLLADOR FRONTEND</span>
          <span>IVANTEROL.COM</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 176, fontWeight: 700, lineHeight: 0.86, letterSpacing: -9 }}>
          <span>IVÁN</span>
          <span style={{ display: "flex" }}>
            TEROL<span style={{ color: "#c6ff3d" }}>.</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 28, fontWeight: 500 }}>
          {["Angular", "Svelte", "React", "Stencil.js", "TypeScript"].map((t) => (
            <span key={t} style={{ padding: "8px 22px", border: "2px solid #2a2a2f", borderRadius: 999 }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
    // Sin fuentes descargadas se omite la opción para que use la de por defecto
    fonts.length ? { ...size, fonts } : size,
  );
}
