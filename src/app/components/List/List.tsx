"use client";

import { ListData } from "@/app/components/List/ListData";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { useMenu } from "@/context/MenuContext";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

// Hook para detectar si la pantalla es móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 640);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isMobile;
};

const List = () => {
  const { language } = useLanguage();
  const [projectImage, setProjectImage] = useState(ListData[0].imageUrl);
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(
    ListData[0].name[language]
  );
  const [showDetails, setShowDetails] = useState(false);
  const { isOpen: menu } = useMenu();
  const isMobile = useIsMobile();

  const displayedImage = hoverImage || projectImage;
  const currentProject = ListData.find((p) => p.imageUrl === displayedImage);

  if (menu) return null;

  //VISTA DETALLE SOLO EN MÓVIL
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
          ← Volver a la lista
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
              GitHub
            </a>
          )}
          {currentProject.webUrl && (
            <a
              href={currentProject.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline"
            >
              Sitio Web
            </a>
          )}
        </div>
      </div>
    );
  }

  //VISTA PRINCIPAL (desktop + lista móvil)
  return (
    <div className="absolute flex gap-14 w-full bottom-0 h-4/5 sm:h-3/4 overflow-hidden sm:flex-row flex-col">
      {/* Imagen solo en sm+ */}
      {!isMobile && (
        <div className="relative group w-[50%] transition-all duration-500 ease-in-out transform rounded-tr-4xl overflow-hidden">
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
        </div>
      )}

      {/* Lista */}
      <div
        className={`flex w-full sm:w-[35%] flex-col ${
          menu ? "overflow-hidden" : "overflow-auto"
        } hide-scrollbar px-6`}
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <h1 className="uppercase tracking-widest text-2xl sm:text-4xl pb-2 border-b-2 border-white">
          Proyectos
        </h1>

        <ul className="text-base md:text-xl lg:text-3xl">
          {ListData.map((proyecto, index) => (
            <li
              key={index}
              className="border-b-2 flex items-center gap-2 border-white hover:px-10 transition-all duration-500 ease-in-out"
              onMouseEnter={() => setHoverImage(proyecto.imageUrl)}
              onMouseLeave={() => setHoverImage(null)}
            >
              {selectedProject === proyecto.name[language] && (
                <FaArrowRight className="ml-10 text-base sm:text-xl" />
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
