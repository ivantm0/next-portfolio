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
    name: { es: "ACCIONA Atlas", en: "ACCIONA Atlas" },
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
    slug: "web-banco",
    name: { es: "Web banco", en: "Bank web" },
    description: {
      es: "Landing page de banco con animaciones en Framer Motion.",
      en: "Bank landing page with Framer Motion animations.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "[AÑO]",
    imageUrl: "/projects-cover/13-web-bank.png",
    githubUrl: "https://github.com/ivantm0/landing-bank-nextjs",
    webUrl: "https://nextjs-bank.netlify.app/",
    technology: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    slug: "chatbot-gemini",
    name: { es: "Chatbot Gemini", en: "Gemini Chatbot" },
    description: {
      es: "Chatbot de IA que utiliza la API Gemini de Google.",
      en: "AI chatbot using Google's Gemini API.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "[AÑO]",
    imageUrl: "/projects-cover/15-chatbot.png",
    githubUrl: null,
    webUrl: "https://chat-bot-gemini.netlify.app/",
    technology: ["React", "Bootstrap", "TypeScript"],
  },
  {
    slug: "notas",
    name: { es: "Notas", en: "Notes" },
    description: {
      es: "Aplicación para crear notas y colocarlas en cualquier lugar de la pantalla.",
      en: "App to create notes and place them anywhere on the screen.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "[AÑO]",
    imageUrl: "/projects-cover/16-notas.png",
    githubUrl: "https://github.com/ivantm0/notas",
    webUrl: "https://agenda-notas.netlify.app/",
    technology: ["React", "CSS", "TypeScript"],
  },
  {
    slug: "control-de-gastos",
    name: { es: "Control de gastos", en: "Expense tracker" },
    description: {
      es: "Aplicación de seguimiento de gastos completamente funcional.",
      en: "Fully functional expense tracking app.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "[AÑO]",
    imageUrl: "/projects-cover/14-track-flow.png",
    githubUrl: "https://github.com/ivantm0/expense-tracker",
    webUrl: "https://expense-tracker-flow.netlify.app/",
    technology: ["React", "Bootstrap", "TypeScript"],
  },
  {
    slug: "buscador-de-paises",
    name: { es: "Buscador de países", en: "Country finder" },
    description: {
      es: "Web para buscar países por nombre, en inglés y en español.",
      en: "Website to search for countries by name, in English and Spanish.",
    },
    role: { es: "Proyecto personal", en: "Personal project" },
    year: "[AÑO]",
    imageUrl: "/projects-cover/1-buscador-paises.png",
    githubUrl: "https://github.com/ivantm0/buscar-paises.git",
    webUrl: "https://buscador-de-paises-js.netlify.app/",
    technology: ["HTML", "CSS", "JavaScript"],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
