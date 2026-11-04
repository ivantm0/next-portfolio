"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal, SectionLabel } from "./Reveal";
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
    <section id="contact" className="mx-auto max-w-[1440px] px-5 pb-8 pt-20 md:px-10 md:pt-28">
      <SectionLabel index="03">{t.contact.label}</SectionLabel>

      <Reveal>
        <h2 className="display-wide text-[clamp(3rem,11vw,10rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
          {t.contact.title}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-6">
        <p className="max-w-sm text-lg text-ink-soft md:col-span-4">{t.contact.text}</p>

        <div className="md:col-span-5 md:col-start-6">
          <a
            href={`mailto:${EMAIL}`}
            className="break-all text-2xl font-medium underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent md:text-3xl"
          >
            {EMAIL}
          </a>
          <button
            onClick={copy}
            className="mt-4 block font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
          >
            <span aria-live="polite">{copied ? `✓ ${t.contact.copied}` : `⧉ ${t.contact.copy}`}</span>
          </button>
        </div>

        <ul className="flex gap-6 font-mono text-xs uppercase tracking-[0.1em] md:col-span-2 md:col-start-11 md:flex-col md:items-end md:gap-3">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-28 flex flex-col gap-4 border-t border-line-strong pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} — {t.footer.built}</span>
        <ViewCounter label={t.footer.views} />
        <button
          onClick={() => lenis?.scrollTo(0, { duration: 1.2 })}
          className="text-left uppercase transition-colors hover:text-accent"
        >
          ↑ {t.footer.top}
        </button>
      </footer>
    </section>
  );
};

export default Contact;
