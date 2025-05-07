import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MenuProvider } from "@/context/MenuContext";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iván Terol | Portfolio",
  description: "Portfolio de Iván Terol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <MenuProvider>{children}</MenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
