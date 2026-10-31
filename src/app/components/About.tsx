"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal, SectionLabel } from "./Reveal";
import Magnetic from "./Magnetic";

const stack = [
  {
    title: "Frameworks",
    items: ["Angular", "Svelte", "React", "Next.js"],
  },
  {
    title: "Design systems",
    items: ["Stencil.js", "Web Components", "Storybook", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Lenguajes",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Herramientas",
    items: ["Figma", "Playwright", "Git", "Node.js"],
  },
];

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
};

// Texto que se va "encendiendo" palabra a palabra con el scroll
const ScrollText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="font-display text-3xl font-medium leading-[1.1] tracking-tight md:text-6xl"
    >
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
};

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-4 py-32 md:px-8 md:py-48">
      <SectionLabel index="02">{t.about.label}</SectionLabel>

      <div className="max-w-6xl">
        <ScrollText key={t.about.statement} text={t.about.statement} />
      </div>

      <div className="mt-24 grid gap-12 md:mt-40 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src="/photo-about.jpeg"
              alt="Iván Terol"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        </Reveal>

        <div className="flex flex-col justify-between gap-12 md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="text-lg leading-relaxed text-bone/80 md:text-xl">
              {t.about.body}
            </p>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2">
            {stack.map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.1}>
                <h3 className="mb-4 border-b border-line pb-3 font-mono text-xs uppercase tracking-widest text-accent">
                  {group.title}
                </h3>
                <ul className="space-y-1 text-lg">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Magnetic>
              <a
                href="/CV_Ivan-Terol-Martinez.pdf"
                download
                className="inline-flex items-center gap-3 rounded-full border border-bone px-7 py-4 font-mono text-sm uppercase tracking-widest transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink"
              >
                ↓ {t.about.download}
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
