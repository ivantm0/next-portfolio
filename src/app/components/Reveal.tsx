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
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration: 0.9, ease: easeOut, delay }}
  >
    {children}
  </motion.div>
);

// Etiqueta de sección: "(02) — Trabajo seleccionado"
export const SectionLabel = ({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) => (
  <Reveal className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted md:mb-16">
    <span className="text-accent">({index})</span>
    <span className="h-px w-10 bg-line" />
    {children}
  </Reveal>
);
