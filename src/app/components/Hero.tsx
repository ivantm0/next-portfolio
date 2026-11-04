"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { easeOut } from "./Reveal";

// Las 12 columnas del layout, visibles como guías de Figma
export const Guides = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-y-0 left-5 right-5 grid grid-cols-4 gap-6 [mask-image:linear-gradient(to_bottom,black_60%,transparent)] md:left-10 md:right-10 md:grid-cols-12"
  >
    {Array.from({ length: 12 }, (_, i) => (
      <span
        key={i}
        className={`border-x border-line bg-accent/[0.02] ${i >= 4 ? "hidden md:block" : ""}`}
      />
    ))}
  </div>
);

// El nombre "seleccionado" como una capa en Figma: tamaño real medido en vivo
// y un tirador en la esquina para redimensionarlo arrastrando (doble clic restaura)
const Selection = ({ children, hint }: { children: React.ReactNode; hint: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const drag = useRef<{ x: number; w: number; s: number; max: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0];
      setSize({ w: Math.round(box.inlineSize), h: Math.round(box.blockSize) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el?.parentElement) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const w = el.offsetWidth;
    // No puede crecer más que su contenedor
    const max = (el.parentElement.clientWidth / w) * scale;
    drag.current = { x: e.clientX, w, s: scale, max };
    setDragging(true);
    setTouched(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const next = (d.s * (d.w + e.clientX - d.x)) / d.w;
    setScale(Math.min(Math.max(next, 0.35), d.max));
  };

  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };

  const handle = "absolute size-2 border border-accent bg-paper";

  return (
    <div ref={ref} className="relative w-fit" style={{ "--s": scale } as React.CSSProperties}>
      {children}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
        className="pointer-events-none absolute inset-0 border border-accent"
      >
        <span className="absolute -top-6 left-0 font-mono text-[11px] text-accent">h1</span>
        <span className={`${handle} -left-1 -top-1`} />
        <span className={`${handle} -right-1 -top-1`} />
        <span className={`${handle} -bottom-1 -left-1`} />

        {/* Tirador activo: zona de toque amplia alrededor del cuadradito */}
        <span
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={() => setScale(1)}
          className="pointer-events-auto absolute -bottom-5 -right-5 grid size-10 cursor-nwse-resize touch-none place-items-center"
        >
          <span
            className={`size-2.5 border border-accent transition-transform ${
              dragging ? "scale-150 bg-accent" : "bg-paper hover:scale-150"
            }`}
          />
        </span>
        {!touched && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.4 }}
            className="absolute -bottom-7 left-full ml-5 hidden whitespace-nowrap font-mono text-[11px] text-accent md:block"
          >
            ↖ {hint}
          </motion.span>
        )}

        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-accent px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-accent-ink">
          {size ? `${size.w} × ${size.h}` : "—"}
        </span>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="top" className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28">
      <Guides />

      <div className="relative">
        <div className="mb-12 flex justify-between font-mono text-xs uppercase tracking-[0.12em] text-muted md:mb-16">
          <span>
            <span className="text-accent">00</span>&nbsp;&nbsp;{t.hero.role}
          </span>
          <span className="hidden sm:inline">Portfolio · {new Date().getFullYear()}</span>
        </div>

        <Selection hint={t.hero.drag}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="display-wide select-none whitespace-nowrap font-display text-[calc(clamp(3rem,15.5vw,13.5rem)*var(--s,1))] md:text-[calc(clamp(3rem,14vw,13.5rem)*var(--s,1))] font-extrabold leading-[0.88] tracking-[-0.045em]"
          >
            Iván Terol
          </motion.h1>
        </Selection>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: easeOut }}
          className="mt-16 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end"
        >
          <p className="text-balance text-2xl font-medium leading-[1.2] tracking-[-0.01em] md:col-span-7 md:text-[2.5rem]">
            {t.hero.tagline}
          </p>

          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
              <span className="size-2 rounded-full bg-accent" />
              {t.hero.available}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex h-11 items-center bg-ink px-5 font-mono text-xs uppercase tracking-[0.1em] text-paper transition-colors hover:bg-accent hover:text-accent-ink"
              >
                {t.hero.cta} ↓
              </a>
              <a
                href="/CV_Ivan-Terol-Martinez.pdf"
                download
                className="inline-flex h-11 items-center border border-line-strong px-5 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
              >
                CV · PDF
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
