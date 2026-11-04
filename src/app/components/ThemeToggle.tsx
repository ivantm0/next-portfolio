"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Theme = "light" | "dark";

const KEY = "theme";

/**
 * Se ejecuta en <head> antes de pintar. Cada visita empieza con el tema del
 * sistema; si se cambia con el botón, se mantiene durante la sesión (al recargar
 * o al abrir un proyecto) sin parpadeo.
 */
export const themeScript = `try{var t=sessionStorage.getItem("${KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const systemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const labels = {
  es: { light: "Claro", dark: "Oscuro", aria: "Tema", switchTo: "cambiar a" },
  en: { light: "Light", dark: "Dark", aria: "Theme", switchTo: "switch to" },
};

// Círculo vacío (claro) o lleno (oscuro)
const Icon = ({ theme }: { theme: Theme | null }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="shrink-0">
    <circle cx="6" cy="6" r="5" fill={theme === "dark" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const ThemeToggle = () => {
  const { language } = useLanguage();
  // null hasta montar: en el servidor no se sabe el tema del sistema
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const chosen = root.dataset.theme;
    setTheme(chosen === "light" || chosen === "dark" ? chosen : systemTheme());

    // Mientras no se elija a mano, sigue los cambios del sistema
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!root.dataset.theme) setTheme(systemTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    if (!theme) return;
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      sessionStorage.setItem(KEY, next);
    } catch {}
  };

  const l = labels[language];
  const label = theme
    ? `${l.aria}: ${l[theme]}, ${l.switchTo} ${l[theme === "dark" ? "light" : "dark"].toLowerCase()}`
    : l.aria;

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex items-center gap-1.5 uppercase sm:min-w-[4.5rem] text-ink-soft transition-colors hover:text-accent"
    >
      <Icon theme={theme} />
      <span className="hidden sm:inline">{theme ? l[theme] : " "}</span>
    </button>
  );
};

export default ThemeToggle;
