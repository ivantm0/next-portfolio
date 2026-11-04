"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { projects, type Project } from "@/data/projects";
import { Reveal, SectionLabel } from "./Reveal";

// Marco de selección de Figma que aparece al pasar o enfocar una tarjeta
const SelectionFrame = () => {
  const handle = "absolute size-2 border border-accent bg-paper";
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 border border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <span className={`${handle} -left-1 -top-1`} />
      <span className={`${handle} -right-1 -top-1`} />
      <span className={`${handle} -bottom-1 -left-1`} />
      <span className={`${handle} -bottom-1 -right-1`} />
    </span>
  );
};

const Card = ({ project, index, featured }: { project: Project; index: number; featured?: boolean }) => {
  const { language } = useLanguage();
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <Link
      ref={ref}
      href={`/proyectos/${project.slug}`}
      className={`group block focus-visible:outline-none ${featured ? "md:grid md:grid-cols-12 md:gap-6" : ""}`}
    >
      <div className={`relative ${featured ? "md:col-span-8" : ""}`}>
        <div className="relative aspect-[16/10] overflow-hidden border border-line bg-raised">
          {/* La captura se "dibuja" de arriba abajo al entrar en pantalla */}
          <motion.div
            className="reveal-clip absolute inset-0"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={inView ? { clipPath: "inset(0 0 0% 0)" } : undefined}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          >
            <Image
              src={project.imageUrl}
              alt=""
              fill
              priority={index < 3}
              sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            />
          </motion.div>
        </div>
        <SelectionFrame />
      </div>

      <div className={`mt-5 ${featured ? "md:col-span-4 md:mt-0 md:flex md:flex-col md:justify-between" : ""}`}>
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-4 font-mono text-xs tabular-nums text-muted">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span>{project.year}</span>
          </div>
          <h3
            className={`font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent ${
              featured ? "text-3xl leading-[1.05] md:text-4xl" : "text-xl leading-tight md:text-2xl"
            }`}
          >
            {project.name[language]}
          </h3>
          <p
            className={`mt-3 max-w-[62ch] text-ink-soft ${
              featured ? "text-base leading-relaxed md:text-lg" : "line-clamp-2 text-[15px] leading-relaxed"
            }`}
          >
            {project.description[language]}
          </p>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          {project.technology.join(" / ")}
        </p>
      </div>
    </Link>
  );
};

const Work = () => {
  const { t } = useLanguage();
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-5 pb-20 pt-6 md:px-10 md:pb-28 md:pt-8">
      <SectionLabel index="01" aside={`${projects.length} ${t.work.count}`}>
        {t.work.label}
      </SectionLabel>

      <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
        <h2 className="display-wide text-5xl font-extrabold leading-none tracking-[-0.04em] md:col-span-7 md:text-7xl">
          {t.nav.work}
        </h2>
        <p className="max-w-sm text-ink-soft md:col-span-4 md:col-start-9">{t.work.intro}</p>
      </div>

      <ul className="grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-20">
        <li className="md:col-span-2">
          <Reveal>
            <Card project={featured} index={0} featured />
          </Reveal>
        </li>
        {rest.map((project, i) => (
          <li key={project.slug}>
            <Reveal delay={(i % 2) * 0.08}>
              <Card project={project} index={i + 1} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Work;
