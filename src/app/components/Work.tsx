"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
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
    <section id="work" className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <SectionLabel index="01" aside={`${projects.length} ${t.work.count}`}>
        {t.work.label}
      </SectionLabel>

      <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
        <h2 className="display-wide text-5xl font-extrabold leading-none tracking-[-0.04em] md:col-span-7 md:text-7xl">
          {t.nav.work}
        </h2>
        <p className="max-w-sm text-ink-soft md:col-span-4 md:col-start-9">{t.work.intro}</p>
      </div>

      <ul
        className="border-b border-line"
        onMouseMove={onMove}
        onMouseLeave={() => {
          pointer.current = null;
          setActive(null);
        }}
      >
        {projects.map((project, i) => (
          <li key={project.slug} data-index={i} onMouseEnter={() => setActive(i)}>
            <Reveal delay={Math.min(i, 5) * 0.04}>
              <Link
                href={`/proyectos/${project.slug}`}
                onFocus={() => setActive(null)}
                className="group grid grid-cols-12 items-start gap-x-4 gap-y-4 border-t border-line py-6 transition-colors duration-300 hover:border-accent md:items-center md:py-8"
              >
                <span className="col-span-2 pt-1 font-mono text-xs tabular-nums text-accent md:col-span-1 md:pt-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-10 text-2xl font-semibold leading-tight tracking-[-0.02em] transition-[color,translate] duration-500 group-hover:translate-x-3 group-hover:text-accent md:col-span-5 md:text-4xl">
                  {project.name[language]}
                </h3>
                {/* En móvil no hay vista previa flotante: miniatura en la fila */}
                <div className="relative col-span-10 col-start-3 aspect-[16/10] overflow-hidden border border-line bg-raised md:hidden">
                  <Image src={project.imageUrl} alt="" fill sizes="85vw" className="object-cover object-top" />
                </div>
                <p className="col-span-10 col-start-3 line-clamp-3 text-sm leading-relaxed text-ink-soft md:col-span-4 md:col-start-auto">
                  {project.description[language]}
                </p>
                <p className="col-span-10 col-start-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted md:col-span-2 md:col-start-auto md:text-right">
                  {project.technology.join(" / ")}
                </p>
              </Link>
            </Reveal>
          </li>
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
              className="relative -ml-[190px] -mt-[120px] h-[240px] w-[380px] overflow-hidden border border-line bg-raised shadow-xl"
            >
              {projects.map((project, i) => (
                <Image
                  key={project.imageUrl}
                  src={project.imageUrl}
                  alt=""
                  fill
                  sizes="380px"
                  className={`object-cover object-top transition-opacity duration-300 ${
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
