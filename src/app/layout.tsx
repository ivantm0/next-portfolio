import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="es">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <Cursor />
        </LanguageProvider>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
