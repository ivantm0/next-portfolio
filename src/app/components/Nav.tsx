"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/context/LanguageContext";
import ThemeToggle from "./ThemeToggle";

const useMadridTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Madrid",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
};

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
      className="uppercase"
    >
      <span className={language === "es" ? "text-ink" : "text-muted"}>ES</span>
      <span className="text-muted"> / </span>
      <span className={language === "en" ? "text-ink" : "text-muted"}>EN</span>
    </button>
  );
};

// Regla bajo la barra: marcas cada 2 % (más largas cada 10 %) que se rellenan con el scroll
const ScrollRuler = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  // Recorte en lugar de escala, para que las marcas no se deformen
  const clipPath = useTransform(progress, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const ticks =
    "bg-[repeating-linear-gradient(to_right,currentColor_0_1px,transparent_1px_2%),repeating-linear-gradient(to_right,currentColor_0_1px,transparent_1px_10%)] bg-[length:100%_3px,100%_6px] bg-bottom bg-no-repeat";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px h-1.5">
      <div className={`absolute inset-0 text-line-strong ${ticks}`} />
      <motion.div style={{ clipPath }} className="absolute inset-0">
        <div className={`absolute inset-0 text-accent ${ticks}`} />
        <div className="absolute inset-x-0 bottom-0 h-px bg-accent" />
      </motion.div>
    </div>
  );
};

const Nav = () => {
  const { t } = useLanguage();
  const lenis = useLenis();
  const time = useMadridTime();

  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  const scrollTo = (e: React.MouseEvent, href: string) => {
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(href, { offset: href === "#top" ? 0 : -72, duration: 1.2 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 font-mono text-xs uppercase tracking-[0.08em] md:px-10">
        <a href="#top" onClick={(e) => scrollTo(e, "#top")} className="font-medium text-ink">
          Iván Terol
        </a>

        <span className="hidden text-muted lg:block">
          ES · <span className="tabular-nums">{time}</span> CET
        </span>

        <nav className="flex items-center gap-5 md:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              className="hidden text-ink-soft transition-colors hover:text-accent sm:block"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
          <LanguageToggle />
        </nav>
      </div>
      <ScrollRuler />
    </header>
  );
};

export default Nav;
