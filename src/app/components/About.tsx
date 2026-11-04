"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal, SectionLabel } from "./Reveal";

const stack = [
  { title: "Frameworks", items: ["Angular", "Svelte", "React", "Next.js"] },
  { title: "Design systems", items: ["Stencil.js", "Web Components", "Storybook", "Tailwind CSS", "Framer Motion"] },
  { title: { es: "Lenguajes", en: "Languages" }, items: ["TypeScript", "JavaScript", "HTML", "CSS"] },
  { title: { es: "Herramientas", en: "Tools" }, items: ["Figma", "Playwright", "Git", "Node.js"] },
];

const About = () => {
  const { language, t } = useLanguage();

  return (
    <section id="about" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <SectionLabel index="02">{t.about.label}</SectionLabel>

      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          <Reveal>
            <p className="text-balance text-3xl font-medium leading-[1.15] tracking-[-0.02em] md:text-5xl">
              {t.about.statement}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-[60ch] text-lg leading-relaxed text-ink-soft">{t.about.body}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-raised">
              <Image
                src="/photo-about.jpeg"
                alt="Iván Terol"
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              <span>Iván Terol</span>
              <span>4 : 5</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* El stack como tabla de especificación */}
      <dl className="mt-20 border-b border-line md:mt-28">
        {stack.map((group) => (
          <div key={typeof group.title === "string" ? group.title : group.title.es} className="grid gap-2 border-t border-line py-5 md:grid-cols-12 md:gap-6">
            <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted md:col-span-3">
              {typeof group.title === "string" ? group.title : group.title[language]}
            </dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-1 text-lg md:col-span-9">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>

      <a
        href="/CV_Ivan-Terol-Martinez.pdf"
        download
        className="mt-10 inline-flex h-11 items-center bg-ink px-5 font-mono text-xs uppercase tracking-[0.1em] text-paper transition-colors hover:bg-accent hover:text-accent-ink"
      >
        ↓ {t.about.download}
      </a>
    </section>
  );
};

export default About;
