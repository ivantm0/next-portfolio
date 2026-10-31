"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { Reveal, SectionLabel } from "./Reveal";

const Work = () => {
  const { language, t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  // Vista previa flotante que sigue al cursor
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const pointer = useRef<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    x.set(e.clientX);
    y.set(e.clientY);
  };

  // Al hacer scroll sin mover el ratón no hay mouseenter/leave:
  // se recalcula qué proyecto queda bajo el puntero
  useEffect(() => {
    const onScroll = () => {
      if (!pointer.current) return;
      const el = document.elementFromPoint(pointer.current.x, pointer.current.y);
      const li = el?.closest<HTMLElement>("#work li[data-index]");
      setActive(li ? Number(li.dataset.index) : null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="work" className="px-4 py-32 md:px-8 md:py-48">
      <SectionLabel index="01">{t.work.label}</SectionLabel>

      <div className="mb-16 flex items-end justify-between gap-6">
        <Reveal>
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-tighter md:text-8xl">
            {t.nav.work}
            <sup className="ml-2 align-top font-mono text-base text-accent md:text-2xl">
              {projects.length}
            </sup>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="hidden max-w-xs text-muted md:block">
          {t.work.intro}
        </Reveal>
      </div>

      <ul
        onMouseMove={onMove}
        onMouseLeave={() => {
          pointer.current = null;
          setActive(null);
        }}
      >
        {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 5) * 0.04}>
              <li data-index={i} onMouseEnter={() => setActive(i)}>
                <Link
                  href={`/proyectos/${project.slug}`}
                  data-cursor={t.work.view}
                  className="group grid grid-cols-12 items-center gap-4 border-t border-line py-6 transition-colors duration-500 hover:border-accent md:py-8"
                >
                  <span className="col-span-2 font-mono text-xs text-muted md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="col-span-10 font-display text-2xl font-semibold uppercase tracking-tight transition-all duration-500 group-hover:translate-x-4 group-hover:text-accent md:col-span-5 md:text-5xl">
                    {project.name[language]}
                  </h3>
                  {/* En móvil no hay vista previa flotante: miniatura en la fila */}
                  <div className="relative col-span-10 col-start-3 aspect-video overflow-hidden rounded-lg md:hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.name[language]}
                      fill
                      sizes="85vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="col-span-10 col-start-3 text-sm text-muted md:col-span-4 md:col-start-auto">
                    {project.description[language]}
                  </p>
                  <div className="col-span-10 col-start-3 flex flex-wrap gap-2 md:col-span-2 md:col-start-auto md:justify-end">
                    {project.technology.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            </Reveal>
          ))}
      </ul>

      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative -ml-[180px] -mt-[130px] h-[260px] w-[360px] overflow-hidden rounded-lg"
            >
              {projects.map((project, i) => (
                <Image
                  key={project.imageUrl}
                  src={project.imageUrl}
                  alt=""
                  fill
                  sizes="360px"
                  className={`object-cover transition-opacity duration-300 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Work;
