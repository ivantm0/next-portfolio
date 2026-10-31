const items = [
  "Angular",
  "Svelte",
  "Stencil.js",
  "Web Components",
  "Design Systems",
  "Storybook",
  "Figma",
  "React",
  "Next.js",
  "TypeScript",
  "Accesibilidad",
];

const Marquee = () => {
  const row = [...items, ...items];
  return (
    // El contenedor recorta las esquinas de la franja inclinada
    <div className="overflow-hidden py-8">
      <div className="-mx-4 -rotate-2 overflow-hidden border-y border-ink bg-accent py-4 text-ink">
        <div className="animate-marquee flex w-max">
          {row.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 pr-8 font-display text-3xl font-bold uppercase tracking-tight md:text-5xl"
            >
              {item}
              <span aria-hidden>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
