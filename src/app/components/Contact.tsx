"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal, SectionLabel } from "./Reveal";
import Magnetic from "./Magnetic";
import ViewCounter from "./ViewCounter";

const EMAIL = "iterolmartinez@gmail.com";

const socials = [
  { label: "GitHub", href: "https://github.com/ivantm0" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ivanterolmartinez/" },
];

const Contact = () => {
  const { t } = useLanguage();
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section
      id="contact"
      className="flex min-h-svh flex-col justify-between px-4 pb-8 pt-32 md:px-8 md:pt-48"
    >
      <div>
        <SectionLabel index="03">{t.contact.label}</SectionLabel>

        <Reveal>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="Email"
            className="group block font-display text-[13vw] font-bold uppercase leading-[0.85] tracking-[-0.05em] md:text-[12vw]"
          >
            <span className="text-outline transition-colors duration-500 group-hover:text-accent group-hover:[-webkit-text-stroke:0px]">
              {t.contact.title}
            </span>
          </a>
        </Reveal>

        <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12">
          <Reveal className="text-lg text-muted md:col-span-4">
            {t.contact.text}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-wrap items-center gap-4 md:col-span-5 md:col-start-6">
            <a
              href={`mailto:${EMAIL}`}
              className="text-xl underline decoration-line underline-offset-8 transition-colors hover:decoration-accent md:text-2xl"
            >
              {EMAIL}
            </a>
            <button
              onClick={copy}
              className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
            >
              {copied ? t.contact.copied : t.contact.copy}
            </button>
          </Reveal>

          <Reveal delay={0.2} className="flex gap-3 md:col-span-3 md:justify-end">
            {socials.map((s) => (
              <Magnetic key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full border border-bone px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink"
                >
                  {s.label} ↗
                </a>
              </Magnetic>
            ))}
          </Reveal>
        </div>
      </div>

      <footer className="mt-24 flex flex-col gap-4 border-t border-line pt-6 font-mono text-xs uppercase tracking-widest text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} — {t.footer.built}</span>
        <ViewCounter label={t.footer.views} />
        <button
          onClick={() => lenis?.scrollTo(0, { duration: 2 })}
          className="text-left uppercase transition-colors hover:text-accent"
        >
          ↑ {t.footer.top}
        </button>
      </footer>
    </section>
  );
};

export default Contact;
