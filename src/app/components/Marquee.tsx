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
    <div aria-hidden className="overflow-hidden py-8">
      <div className="-mx-4 -rotate-2 overflow-hidden bg-accent py-4 text-accent-ink">
        <div className="animate-marquee flex w-max">
          {row.map((item, i) => (
            <span
              key={i}
              className="display-wide flex items-center gap-8 pr-8 text-3xl font-extrabold uppercase tracking-[-0.03em] md:text-5xl"
            >
              {item}
              <span>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
