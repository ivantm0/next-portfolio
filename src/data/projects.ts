type Localized = { es: string; en: string };

export type Project = {
  slug: string;
  name: Localized;
  description: Localized;
  role: Localized;
  year: string;
  imageUrl: string;
  githubUrl: string | null;
  webUrl: string | null;
  technology: string[];
};

// Los valores entre corchetes están pendientes de completar
export const projects: Project[] = [
  {
    slug: "acciona-atlas",
    name: { es: "ACCIONA Atlas · Plataforma ESG", en: "ACCIONA Atlas · ESG Platform" },
    description: {
      es: "Plataforma de transparencia ESG de ACCIONA que muestra en detalle el impacto de sus proyectos y el contexto del territorio donde se desarrollan.",
      en: "ACCIONA's ESG transparency platform, showing in detail the impact of its projects and the context of the territory where they take place.",
    },
    role: {
      es: "Desarrollador frontend · Prácticas en Innusual",
      en: "Frontend developer · Internship at Innusual",
    },
    year: "2025",
    imageUrl: "/projects-cover/0-acciona-atlas.png",
    githubUrl: null,
    webUrl: "https://atlas.acciona.com/",
    technology: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    slug: "barberia-reservas",
    name: { es: "Web de barbería con reservas", en: "Barbershop Booking Site" },
    description: {
      es: "Filo, la web de una barbería ficticia en SvelteKit y Svelte 5: reserva en 4 pasos con disponibilidad calculada según la duración del servicio y las citas ocupadas, exportación al calendario (.ics), gestión de citas y panel del negocio con la agenda del día. Cubierta con tests en Playwright.",
      en: "Filo, a fictional barbershop site built with SvelteKit and Svelte 5: 4-step booking with availability computed from service length and existing appointments, calendar export (.ics), appointment management and a business dashboard with the daily schedule. Covered by Playwright tests.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2026",
    imageUrl: "/projects-cover/17-filo.png",
    githubUrl: "https://github.com/ivantm0/filo-barber-club",
    webUrl: "https://filo-barber-club.netlify.app/",
    technology: ["SvelteKit", "TypeScript", "Playwright"],
  },
  {
    slug: "web-banco",
    name: { es: "Landing de banca digital", en: "Digital Banking Landing" },
    description: {
      es: "Órbita, landing de un banco digital ficticio en Next.js 15, Tailwind 4 y Motion: tarjeta 3D que sigue al puntero, comparador de tarjetas accesible, calculadora de ahorro con gráfica SVG propia y formulario con validación. Cubierta con tests en Playwright.",
      en: "Órbita, a landing page for a fictional digital bank built with Next.js 15, Tailwind 4 and Motion: pointer-tracking 3D card, accessible card comparison, savings calculator with a hand-made SVG chart and a validated signup form. Covered by Playwright tests.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2025",
    imageUrl: "/projects-cover/13-orbita.png",
    githubUrl: "https://github.com/ivantm0/landing-bank-nextjs",
    webUrl: "https://nextjs-bank.netlify.app/",
    technology: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    slug: "chatbot-gemini",
    name: { es: "Chatbot con IA (Gemini)", en: "AI Chatbot (Gemini)" },
    description: {
      es: "Charla, un chatbot con Gemini en React 19 y TypeScript: respuestas en streaming que se pueden detener, markdown con bloques de código, varias conversaciones guardadas y regenerar o reintentar. La clave de la API queda en el servidor, detrás de una función de Netlify. Cubierto con tests en Playwright.",
      en: "Charla, a Gemini chatbot built with React 19 and TypeScript: streaming answers you can stop, markdown with code blocks, multiple saved conversations, and regenerate or retry. The API key stays on the server behind a Netlify Function. Covered by Playwright tests.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2025",
    imageUrl: "/projects-cover/15-charla.png",
    githubUrl: null,
    webUrl: "https://chat-bot-gemini.netlify.app/",
    technology: ["React", "TypeScript", "Netlify Functions"],
  },
  {
    slug: "notas",
    name: { es: "Tablero de notas adhesivas", en: "Sticky Notes Board" },
    description: {
      es: "Notas, un tablero de notas adhesivas en React 19 y TypeScript: arrastrar y redimensionar con Pointer Events (ratón y táctil), edición directa, búsqueda, vista de lista, exportar/importar JSON, deshacer y control total por teclado. Cubierto con tests en Playwright.",
      en: "Notas, a sticky-notes board built with React 19 and TypeScript: drag and resize with Pointer Events (mouse and touch), inline editing, search, list view, JSON export/import, undo and full keyboard control. Covered by Playwright tests.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2025",
    imageUrl: "/projects-cover/16-notas-v2.png",
    githubUrl: "https://github.com/ivantm0/notas",
    webUrl: "https://agenda-notas.netlify.app/",
    technology: ["React", "TypeScript", "Playwright"],
  },
  {
    slug: "control-de-gastos",
    name: { es: "Gestor de gastos personales", en: "Personal Expense Tracker" },
    description: {
      es: "TrackFlow, un gestor de gastos en Angular zoneless con signals: resumen mensual, gráficas en SVG propio, presupuestos por categoría, filtros y exportación a CSV. Cubierto con tests end-to-end en Playwright.",
      en: "TrackFlow, an expense tracker built with zoneless Angular and signals: monthly overview, hand-made SVG charts, category budgets, filters and CSV export. Covered by Playwright end-to-end tests.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2025",
    imageUrl: "/projects-cover/14-trackflow.png",
    githubUrl: "https://github.com/ivantm0/expense-tracker",
    webUrl: "https://expense-tracker-flow.netlify.app/",
    technology: ["Angular", "TypeScript", "Playwright"],
  },
  {
    slug: "buscador-de-paises",
    name: { es: "Atlas de países y banderas", en: "World Countries & Flags Atlas" },
    description: {
      es: "Banderas, un atlas de 250 países en SvelteKit y Svelte 5 (runes): búsqueda instantánea con filtros en la URL, ficha por país con mapa y fronteras, y un minijuego para adivinar banderas. Todo pre-renderizado y cubierto con tests en Playwright.",
      en: "Banderas, an atlas of 250 countries built with SvelteKit and Svelte 5 (runes): instant search with URL filters, a page per country with map and borders, and a flag-guessing game. Fully prerendered and covered by Playwright tests.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2025",
    imageUrl: "/projects-cover/1-banderas.png",
    githubUrl: "https://github.com/ivantm0/buscar-paises",
    webUrl: "https://buscador-de-paises-js.netlify.app/",
    technology: ["SvelteKit", "TypeScript", "Playwright"],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
