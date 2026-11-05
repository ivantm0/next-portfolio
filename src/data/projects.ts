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
    slug: "nba-analytics",
    name: { es: "Estadísticas de jugadores NBA", en: "NBA Player Stats Tracker" },
    description: {
      es: "NBA Analytics, una web en Next.js 15 para seguir a tus jugadores favoritos sin entrar partido a partido: navegación por jornadas con estadísticas, comparación con la media de la temporada, próximos partidos y marcador en directo, forma reciente, hitos (doble-doble, máximo de la temporada) y gráfica de tendencia en SVG propio. Los datos se cargan cada día con una función programada de Netlify en PostgreSQL (Supabase y Drizzle), detrás de una capa de proveedor preparada para añadir otros deportes.",
      en: "NBA Analytics, a Next.js 15 app to follow your favourite players without opening every game: day-by-day navigation with box scores, comparison against the season average, upcoming games and live scores, recent form, milestones (double-double, season high) and a hand-made SVG trend chart. Data is loaded daily by a Netlify scheduled function into PostgreSQL (Supabase and Drizzle), behind a provider layer ready for other sports.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2026",
    imageUrl: "/projects-cover/20-nba-analytics.png",
    githubUrl: "https://github.com/ivantm0/nba-analytics",
    webUrl: "https://nba-analytics.netlify.app/",
    technology: ["Next.js", "PostgreSQL", "TypeScript"],
  },
  {
    slug: "design-system",
    name: { es: "Design system de web components", en: "Web Components Design System" },
    description: {
      es: "Trazo, un design system con Stencil.js documentado en Storybook: 15 web components que funcionan en Angular, React, Svelte o HTML, design tokens con tema claro y oscuro, campos que se integran en formularios nativos (ElementInternals) y patrones accesibles de WAI-ARIA. Cubierto con tests unitarios y con Playwright, incluida la revisión de accesibilidad con axe.",
      en: "Trazo, a Stencil.js design system documented in Storybook: 15 web components that work in Angular, React, Svelte or plain HTML, design tokens with light and dark themes, fields that join native forms (ElementInternals) and accessible WAI-ARIA patterns. Covered by unit and Playwright tests, including axe accessibility checks.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2026",
    imageUrl: "/projects-cover/19-trazo.png",
    githubUrl: "https://github.com/ivantm0/trazo-design-system",
    webUrl: "https://trazo-design-system.netlify.app/",
    technology: ["Stencil.js", "Storybook", "Playwright"],
  },
  {
    slug: "carril-kanban",
    name: { es: "Tablero kanban de tareas", en: "Kanban Task Board" },
    description: {
      es: "Carril, un tablero kanban en Angular 22 construido sobre Trazo, mi design system: componentes standalone, signals y el nuevo control flow en modo zoneless. Arrastrar y soltar entre columnas con Angular CDK y alternativa completa con teclado, búsqueda y filtro por prioridad, borrado con «Deshacer», tema claro y oscuro con los tokens de Trazo y datos guardados en el navegador. Cubierto con tests en Playwright, incluida la revisión de accesibilidad con axe.",
      en: "Carril, a kanban board in Angular 22 built on Trazo, my design system: standalone components, signals and the new control flow in zoneless mode. Drag and drop between columns with Angular CDK plus a full keyboard alternative, search and priority filter, delete with undo, light and dark themes from Trazo's tokens and data saved in the browser. Covered by Playwright tests, including axe accessibility checks.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2026",
    imageUrl: "/projects-cover/21-carril.png",
    githubUrl: "https://github.com/ivantm0/carril",
    webUrl: "https://carril-kanban.netlify.app/",
    technology: ["Angular", "TypeScript", "Playwright"],
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
    slug: "quiz",
    name: { es: "Juego de preguntas", en: "Quiz Game" },
    description: {
      es: "QuéSabes, un juego de preguntas en SvelteKit y Svelte 5 con modo dev (con fragmentos de código) y modo cultura general: 144 preguntas propias con explicación, puntos por rapidez y rachas, comodines, reto diario con semilla por fecha, estadísticas y control total por teclado. Cubierto con tests en Playwright.",
      en: "QuéSabes, a quiz game built with SvelteKit and Svelte 5 with a dev mode (including code snippets) and a general knowledge mode: 144 original questions with explanations, speed and streak scoring, lifelines, a date-seeded daily challenge, stats and full keyboard control. Covered by Playwright tests.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "2026",
    imageUrl: "/projects-cover/18-quesabes.png",
    githubUrl: "https://github.com/ivantm0/quizgame",
    webUrl: "https://quizcardgame.netlify.app/",
    technology: ["SvelteKit", "TypeScript", "Playwright"],
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
