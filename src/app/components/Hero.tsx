"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const ease = [0.76, 0, 0.24, 1] as const;

// Cada letra sube desde debajo de su línea
const SplitLine = ({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) => (
  <span className={`flex overflow-hidden ${className}`} aria-label={text}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        aria-hidden
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease, delay: delay + i * 0.05 }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

const Hero = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-4 pb-8 pt-24 md:px-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex justify-between font-mono text-xs uppercase tracking-widest text-muted"
      >
        <span>{t.hero.role}</span>
        <span>Portfolio ©{new Date().getFullYear()}</span>
      </motion.div>

      <motion.h1
        style={{ y: nameY, opacity }}
        className="select-none font-display text-[24vw] font-bold uppercase leading-[0.82] tracking-[-0.06em] md:text-[19vw]"
      >
        <SplitLine text="Iván" delay={0.2} />
        <span className="flex items-end">
          <SplitLine text="Terol" delay={0.4} className="text-outline" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
            className="text-accent"
          >
            .
          </motion.span>
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.9 }}
        className="grid gap-6 md:grid-cols-12 md:items-end"
      >
        <p className="text-lg leading-snug md:col-span-5 md:text-2xl">
          {t.hero.tagline}
        </p>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest md:col-span-4 md:col-start-7">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {t.hero.available}
        </div>
        <div className="hidden items-center justify-end gap-3 font-mono text-xs uppercase tracking-widest text-muted md:col-span-2 md:flex">
          {t.hero.scroll}
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
