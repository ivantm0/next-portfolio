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

export const metadata: Metadata = {
  title: "Iván Terol — Desarrollador frontend",
  description:
    "Portfolio de Iván Terol, desarrollador frontend. Interfaces web rápidas, accesibles y cuidadas al detalle.",
  openGraph: {
    title: "Iván Terol — Desarrollador frontend",
    description:
      "Interfaces web rápidas, accesibles y cuidadas al detalle.",
    type: "website",
    locale: "es_ES",
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
