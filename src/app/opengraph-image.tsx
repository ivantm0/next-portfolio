import { ImageResponse } from "next/og";

// Imagen que muestran LinkedIn, WhatsApp, X… al compartir el portfolio
export const alt = "Iván Terol — Desarrollador frontend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f3f1ec";
const INK = "#16161a";
const MUTED = "#64625d";
const LINE = "rgba(22,22,26,0.12)";
const ACCENT = "#c2350f";

/**
 * Descarga una fuente de Google Fonts. ImageResponse admite TTF, OTF y WOFF, pero no WOFF2.
 * Se genera en el build; si falla, se usa la fuente por defecto.
 */
async function loadFont(query: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${query}`, {
        // Con un user-agent antiguo Google Fonts devuelve WOFF en lugar de WOFF2
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko) Safari/534.30" },
      })
    ).text();
    // El CSS viene dividido por alfabetos: se usa el bloque latino (incluye tildes)
    const url =
      css.match(/\/\* latin \*\/[^}]*?src: url\((.+?)\) format\('(?:woff|truetype|opentype)'\)/)?.[1] ??
      css.match(/src: url\((.+?)\) format\('(?:woff|truetype|opentype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [wide, text, mono] = await Promise.all([
    loadFont("Archivo:wdth,wght@125,800"),
    loadFont("Archivo:wght@500"),
    loadFont("IBM+Plex+Mono:wght@500"),
  ]);
  const fonts = [
    wide && { name: "Archivo Wide", data: wide, weight: 800 as const, style: "normal" as const },
    text && { name: "Archivo", data: text, weight: 500 as const, style: "normal" as const },
    mono && { name: "Plex Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  const handle = (pos: Record<string, number>) => (
    <div style={{ position: "absolute", width: 14, height: 14, border: `2px solid ${ACCENT}`, background: PAPER, ...pos }} />
  );
  const monoStyle = { fontFamily: "Plex Mono, monospace", fontSize: 22, letterSpacing: 3 };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: PAPER,
          color: INK,
          fontFamily: "Archivo, sans-serif",
          position: "relative",
        }}
      >
        {/* Guías de columnas */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 64, right: 64, display: "flex", gap: 24 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{ flex: 1, borderLeft: `1px solid ${LINE}`, borderRight: `1px solid ${LINE}`, background: "rgba(194,53,15,0.02)" }} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: MUTED, ...monoStyle }}>
          <span style={{ display: "flex" }}>
            <span style={{ color: ACCENT, marginRight: 18 }}>00</span>DESARROLLADOR FRONTEND
          </span>
          <span>IVANTEROL.COM</span>
        </div>

        {/* El nombre seleccionado como una capa de Figma */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ ...monoStyle, fontSize: 18, color: ACCENT, marginBottom: 10 }}>h1</span>
          <div style={{ display: "flex", position: "relative", border: `2px solid ${ACCENT}`, padding: "0 6px" }}>
            <span style={{ fontFamily: "Archivo Wide, sans-serif", fontSize: 150, fontWeight: 800, letterSpacing: -6, lineHeight: 1.05 }}>
              Iván Terol
            </span>
            {handle({ left: -8, top: -8 })}
            {handle({ right: -8, top: -8 })}
            {handle({ left: -8, bottom: -8 })}
            {handle({ right: -8, bottom: -8 })}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 34, fontWeight: 500, lineHeight: 1.25, maxWidth: 680 }}>
            Interfaces rápidas y accesibles, y los design systems que las sostienen.
          </span>
          <span style={{ display: "flex", ...monoStyle, fontSize: 18, background: ACCENT, color: PAPER, padding: "8px 14px", flexShrink: 0, whiteSpace: "nowrap" }}>
            ANGULAR · SVELTE · STENCIL.JS
          </span>
        </div>
      </div>
    ),
    // Sin fuentes descargadas se omite la opción para que use la de por defecto
    fonts.length ? { ...size, fonts } : size,
  );
}
