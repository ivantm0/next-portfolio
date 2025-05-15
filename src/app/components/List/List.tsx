"use client";

import { ListData } from "@/app/components/List/ListData";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { useMenu } from "@/context/MenuContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// Iconos por tecnología
const techIcons: { [key: string]: JSX.Element } = {
  html: <SiHtml5 title="HTML" />,
  css: <SiCss3 title="CSS" />,
  js: <SiJavascript title="JavaScript" />,
  ts: <SiTypescript title="TypeScript" />,
  react: <SiReact title="React" />,
  nextjs: <SiNextdotjs title="Next.js" />,
  tailwind: <SiTailwindcss title="Tailwind CSS" />,
  java: <FaJava title="Java" />,
  node: <SiNodedotjs title="Node.js" />,
};

// Hook móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);
  return isMobile;
};

// Animaciones
const imageVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const listItemVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const List = () => {
  const { language, t } = useLanguage();
  const { isOpen: menu } = useMenu();
  const isMobile = useIsMobile();

  const [projectImage, setProjectImage] = useState(ListData[0].imageUrl);
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState(
    ListData[0].name[language]
  );
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string>("all");

  const displayedImage = hoverImage || projectImage;

  const filteredData =
    selectedTech === "all"
      ? ListData
      : ListData.filter((project) =>
          project.technology
            .split(" ")
            .map((t) => t.toLowerCase())
            .includes(selectedTech)
        );

  const currentProject = ListData.find((p) => p.imageUrl === displayedImage);

  const allTechnologies = [
    "all",
    ...Array.from(
      new Set(
        ListData.flatMap((p) =>
          p.technology.split(" ").map((t) => t.toLowerCase())
        )
      )
    ),
  ];

  if (menu) return null;

  // Vista móvil detalle
  if (isMobile && showDetails && currentProject) {
    return (
      <div
        className="absolute w-full bottom-0 h-5/6 p-6 text-white"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <button
          className="mb-4 text-sm underline"
          onClick={() => setShowDetails(false)}
        >
          {t.projects.back}
        </button>
        <h2 className="text-2xl font-bold">{currentProject.name[language]}</h2>
        <p className="mt-4 text-lg">{currentProject.description[language]}</p>
        <div className="relative w-full h-64 mt-6 rounded overflow-hidden">
          <Image
            src={currentProject.imageUrl}
            alt="Imagen detalle"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex gap-4 mt-6">
          {currentProject.githubUrl && (
            <a
              href={currentProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              {t.projects.github}
            </a>
          )}
          {currentProject.webUrl && (
            <a
              href={currentProject.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              {t.projects.website}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute flex gap-14 w-full bottom-0 h-4/5 sm:h-3/4 overflow-hidden sm:flex-row flex-col">
      {/* Imagen */}
      {!isMobile && (
        <motion.div
          className="relative group w-[50%] rounded-tr-4xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          {currentProject &&
            (currentProject.githubUrl || currentProject.webUrl) && (
              <div className="absolute hidden z-10 top-0 left-0 w-full h-full bg-black/70 rounded-tr-4xl group-hover:flex items-center justify-center gap-6 transition-colors duration-1000">
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-white text-4xl cursor-pointer hover:scale-120 transition-transform duration-300" />
                  </a>
                )}
                {currentProject.webUrl && (
                  <a
                    href={currentProject.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TfiWorld className="text-white text-4xl cursor-pointer hover:scale-120 transition-transform duration-300" />
                  </a>
                )}
              </div>
            )}
          <Image
            src={displayedImage}
            alt="Imagen proyecto"
            fill
            className="rounded-tr-4xl object-cover"
          />
        </motion.div>
      )}

      {/* Lista */}
      <div
        className={`flex w-full md:w-[35%] flex-col ${
          menu ? "overflow-hidden" : "overflow-auto"
        } hide-scrollbar px-6`}
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-4">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              className={`p-2 rounded cursor-pointer border text-xl flex items-center gap-1 ${
                selectedTech === tech
                  ? "bg-white text-black"
                  : "border-white hover:bg-white hover:text-black transition"
              }`}
              onClick={() => setSelectedTech(tech)}
              title={tech}
            >
              {tech === "all" ? t.projects.all : techIcons[tech] || tech}
            </button>
          ))}
        </div>

        <motion.h1
          className="uppercase tracking-widest text-2xl sm:text-4xl pb-2 border-b-2 border-white"
          initial="hidden"
          animate="visible"
          variants={listItemVariants}
          custom={0}
        >
          {t.projects.projects}
        </motion.h1>

        <ul className="text-base md:text-xl lg:text-3xl">
          {filteredData.map((proyecto, index) => (
            <motion.li
              key={index}
              className="border-b-2 flex items-center justify-between border-white hover:px-6 transition-all duration-500 ease-in-out"
              onMouseEnter={() => setHoverImage(proyecto.imageUrl)}
              onMouseLeave={() => setHoverImage(null)}
              initial="hidden"
              animate="visible"
              variants={listItemVariants}
              custom={index + 1}
            >
              <div className="flex items-center gap-2">
                {selectedProject === proyecto.name[language] && (
                  <FaArrowRight className="ml-2 text-base sm:text-xl" />
                )}
                <button
                  className="cursor-pointer my-4 tracking-widest text-left"
                  onClick={() => {
                    setProjectImage(proyecto.imageUrl);
                    setSelectedProject(proyecto.name[language]);
                    if (isMobile) setShowDetails(true);
                  }}
                >
                  {proyecto.name[language]}
                </button>
              </div>
              {/* Tecnologías */}
              <div className="flex gap-2 pr-2 text-xl">
                {proyecto.technology.split(" ").map((tech, idx) => (
                  <span key={idx} title={tech}>
                    {techIcons[tech.toLowerCase()] || tech}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
