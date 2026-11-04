"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { Reveal, easeOut } from "@/app/components/Reveal";
import { LanguageToggle } from "@/app/components/Nav";
import ThemeToggle from "@/app/components/ThemeToggle";

const ProjectDetail = ({ index }: { index: number }) => {
  const { language, t } = useLanguage();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: t.project.role, value: project.role[language] },
    { label: t.project.year, value: project.year },
    { label: t.project.stack, value: project.technology.join(" · ") },
  ];

  const links = [
    project.webUrl && { href: project.webUrl, label: t.project.website },
    project.githubUrl && { href: project.githubUrl, label: t.project.code },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 font-mono text-xs uppercase tracking-[0.08em] md:px-10">
          <Link href="/#work" className="text-ink-soft transition-colors hover:text-accent">
            ← {t.project.back}
          </Link>
          <div className="flex items-center gap-5 md:gap-8">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <div className="mb-8 flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.12em] text-muted">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span>/ {String(projects.length).padStart(2, "0")}</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="display-wide max-w-[16ch] text-balance text-[clamp(2.5rem,7vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
        >
          {project.name[language]}
        </motion.h1>

        {/* Ficha técnica */}
        <Reveal delay={0.15} className="mt-14 grid gap-6 border-y border-line py-6 sm:grid-cols-2 md:grid-cols-12">
          {meta.map((m) => (
            <div key={m.label} className="md:col-span-3">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{m.label}</p>
              <p className="text-lg leading-snug">{m.value}</p>
            </div>
          ))}
          <div className="md:col-span-3">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{t.project.links}</p>
            {links.length ? (
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-lg">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-lg text-muted">{t.project.private}</p>
            )}
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.25 }}
          className="relative mt-10 aspect-[16/10] overflow-hidden border border-line bg-raised"
        >
          <Image
            src={project.imageUrl}
            alt={project.name[language]}
            fill
            priority
            sizes="(min-width: 1440px) 1360px, 100vw"
            className="object-cover object-top"
          />
        </motion.div>

        <Reveal className="mt-20 grid md:grid-cols-12 md:gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted md:col-span-3">
            {language === "es" ? "Descripción" : "Overview"}
          </p>
          <p className="mt-4 text-pretty text-2xl font-medium leading-[1.3] tracking-[-0.01em] md:col-span-8 md:col-start-5 md:mt-0 md:text-3xl">
            {project.description[language]}
          </p>
        </Reveal>

        <Link href={`/proyectos/${next.slug}`} className="group mt-32 block border-t border-line-strong pt-4">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.12em] text-muted">
            {t.project.next} →
          </p>
          <p className="display-wide max-w-[18ch] text-balance text-[clamp(2rem,5.5vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] transition-colors group-hover:text-accent">
            {next.name[language]}
          </p>
        </Link>
      </main>
    </>
  );
};

export default ProjectDetail;
