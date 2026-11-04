"use client";

import { motion } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

// Aparece desde abajo al entrar en pantalla
export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8% 0px" }}
    transition={{ duration: 0.6, ease: easeOut, delay }}
  >
    {children}
  </motion.div>
);

// Cabecera de sección como anotación de especificación: "01 — Trabajo seleccionado"
export const SectionLabel = ({
  index,
  children,
  aside,
}: {
  index: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) => (
  <div className="mb-10 flex items-baseline justify-between gap-6 border-t border-line-strong pt-3 font-mono text-xs uppercase tracking-[0.12em] text-muted md:mb-14">
    <span className="flex items-baseline gap-3">
      <span className="text-accent">{index}</span>
      <span>{children}</span>
    </span>
    {aside && <span className="hidden sm:block">{aside}</span>}
  </div>
);
