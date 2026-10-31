"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { Reveal, easeOut } from "@/app/components/Reveal";
import Magnetic from "@/app/components/Magnetic";

const ProjectDetail = ({ index }: { index: number }) => {
  const { language, setLanguage, t } = useLanguage();
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
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-5 font-mono text-xs uppercase tracking-wider mix-blend-difference md:px-8">
        <Link href="/#work" className="transition-colors hover:text-accent">
          ← {t.project.back}
        </Link>
        <button
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
          aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
          className="uppercase"
        >
          <span className={language === "es" ? "text-accent" : "text-muted"}>ES</span>
          {" / "}
          <span className={language === "en" ? "text-accent" : "text-muted"}>EN</span>
        </button>
      </header>

      <main className="px-4 pb-8 pt-32 md:px-8 md:pt-40">
        <div className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">({String(index + 1).padStart(2, "0")})</span>
          <span className="h-px w-10 bg-line" />
          {project.role[language]}
        </div>

        <h1 className="overflow-hidden font-display text-[14vw] font-bold uppercase leading-[0.85] tracking-[-0.05em] md:text-[10vw]">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: easeOut }}
          >
            {project.name[language]}
          </motion.span>
        </h1>

        <Reveal
          delay={0.2}
          className="mt-16 grid gap-8 border-t border-line pt-8 md:grid-cols-12"
        >
          {meta.map((m) => (
            <div key={m.label} className="md:col-span-3">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
                {m.label}
              </p>
              <p className="text-lg">{m.value}</p>
            </div>
          ))}
          <div className="md:col-span-3">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
              {t.project.links}
            </p>
            {links.length ? (
              <div className="flex flex-wrap gap-4 text-lg">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
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
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.3 }}
          className="relative mt-16 aspect-video overflow-hidden rounded-lg"
        >
          <Image
            src={project.imageUrl}
            alt={project.name[language]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <Reveal className="mt-24 grid md:grid-cols-12">
          <p className="font-display text-2xl leading-snug md:col-span-8 md:col-start-5 md:text-4xl">
            {project.description[language]}
          </p>
        </Reveal>

        <Link
          href={`/proyectos/${next.slug}`}
          data-cursor={t.work.view}
          className="group mt-40 block border-t border-line pt-8"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            {t.project.next} →
          </p>
          <p className="font-display text-[12vw] font-bold uppercase leading-[0.85] tracking-[-0.05em] text-outline transition-colors duration-500 group-hover:text-accent group-hover:[-webkit-text-stroke:0px] md:text-[8vw]">
            {next.name[language]}
          </p>
        </Link>

        <div className="mt-24 flex justify-center">
          <Magnetic>
            <Link
              href="/#work"
              className="inline-flex rounded-full border border-bone px-7 py-4 font-mono text-sm uppercase tracking-widest transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink"
            >
              ← {t.project.back}
            </Link>
          </Magnetic>
        </div>
      </main>
    </>
  );
};

export default ProjectDetail;
