"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "viewed";

// Evita la doble petición del StrictMode en desarrollo
let request: Promise<number | null> | null = null;

const fetchViews = () => {
  if (request) return request;
  let seen = false;
  try {
    seen = localStorage.getItem(SEEN_KEY) === "1";
  } catch {}

  // Solo cuenta la primera visita de cada navegador
  request = fetch("/api/views", { method: seen ? "GET" : "POST" })
    .then((r) => r.json())
    .then(({ views }) => {
      if (typeof views !== "number") return null;
      if (!seen) {
        try {
          localStorage.setItem(SEEN_KEY, "1");
        } catch {}
      }
      return views;
    })
    .catch(() => null);
  return request;
};

const ViewCounter = ({ label }: { label: string }) => {
  const [views, setViews] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    fetchViews().then(setViews);
  }, []);

  useEffect(() => {
    if (views === null) return;
    // Cuenta de 0 al total con ease-out
    const duration = 2000;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(views * (1 - Math.pow(1 - p, 4))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [views]);

  if (views === null) return null;

  return (
    <span className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {label} ·{" "}
      <span className="tabular-nums text-ink">
        {String(display).padStart(6, "0")}
      </span>
    </span>
  );
};

export default ViewCounter;
