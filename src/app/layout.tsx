import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "./components/SmoothScroll";
import Motion from "./components/Motion";
import { themeScript } from "./components/ThemeToggle";
import "./globals.css";

// Archivo variable con eje de anchura: normal para leer, ancha para titulares
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "Portfolio de Iván Terol, desarrollador frontend: Angular, Svelte, React y design systems con Stencil.js. Interfaces rápidas, accesibles y cuidadas al detalle.";

export const metadata: Metadata = {
  // Base para que las URLs de Open Graph (imágenes al compartir) sean absolutas.
  // Usa el dominio que sirve la web: ivanterol.com solo redirige aquí y los
  // scrapers (LinkedIn) no resuelven og:url/og:image apuntando a una redirección.
  metadataBase: new URL("https://ivanterol.netlify.app"),
  title: "Iván Terol — Desarrollador frontend",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Iván Terol — Desarrollador frontend",
    description,
    url: "/",
    siteName: "Iván Terol",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iván Terol — Desarrollador frontend",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme lo pone el script antes de hidratar: se ignora esa diferencia
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${archivo.variable} ${plexMono.variable} antialiased`}>
        <LanguageProvider>
          <Motion>
            <SmoothScroll>{children}</SmoothScroll>
          </Motion>
        </LanguageProvider>
      </body>
    </html>
  );
}
