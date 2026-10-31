"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Cursor que crece sobre enlaces y muestra la etiqueta de `data-cursor`
const Cursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    let last: { x: number; y: number } | null = null;

    const update = (target: Element | null) => {
      const el = target?.closest<HTMLElement>("a, button, [data-cursor]");
      setHover(!!el);
      setLabel(el?.dataset.cursor ?? null);
    };

    const onMove = (e: MouseEvent) => {
      last = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      update(e.target as Element);
    };

    // Al hacer scroll el contenido cambia bajo un cursor quieto
    const onScroll = () => {
      if (last) update(document.elementFromPoint(last.x, last.y));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 88 : hover ? 44 : 12;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full ${
          hover && !label ? "border border-accent" : "bg-accent"
        }`}
      >
        {label && (
          <span className="font-mono text-xs uppercase tracking-wider text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cursor;
