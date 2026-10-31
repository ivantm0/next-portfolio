"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/context/LanguageContext";

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

const Nav = () => {
  const { language, setLanguage, t } = useLanguage();
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
    lenis.scrollTo(href, { duration: 1.4 });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-5 font-mono text-xs uppercase tracking-wider mix-blend-difference md:px-8"
    >
      <a href="#top" onClick={(e) => scrollTo(e, "#top")} className="font-bold">
        Iván Terol
      </a>

      <span className="hidden text-muted md:block">
        ES · {time} CET
      </span>

      <nav className="flex items-center gap-5 md:gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => scrollTo(e, l.href)}
            className="group relative hidden overflow-hidden sm:block"
          >
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
              {l.label}
            </span>
            <span className="absolute left-0 top-full block text-accent transition-transform duration-300 group-hover:-translate-y-full">
              {l.label}
            </span>
          </a>
        ))}
        <button
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
          aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
          className="uppercase"
        >
          <span className={language === "es" ? "text-accent" : "text-muted"}>ES</span>
          {" / "}
          <span className={language === "en" ? "text-accent" : "text-muted"}>EN</span>
        </button>
      </nav>
    </motion.header>
  );
};

export default Nav;
