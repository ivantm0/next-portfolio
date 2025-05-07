"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { useMenu } from "@/context/MenuContext";
import { useLanguage } from "@/context/LanguageContext";
import Typed from "typed.js";
import { useEffect, useRef, useCallback } from "react";

interface Props {
  setActiveSection: (section: string) => void;
}

const MainContent = ({ setActiveSection }: Props) => {
  const { isOpen: menu } = useMenu();
  const { t } = useLanguage();
  const typedRef = useRef<HTMLSpanElement | null>(null);
  const typedInstance = useRef<Typed | null>(null);

  const handleClick = useCallback(
    (section: string) => {
      setActiveSection(section);
    },
    [setActiveSection]
  );

  useEffect(() => {
    if (typedRef.current) {
      if (typedInstance.current) typedInstance.current.destroy();
      typedInstance.current = new Typed(typedRef.current, {
        strings: t.home.typedStrings,
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 500,
        loop: true,
      });
    }

    return () => {
      if (typedInstance.current) typedInstance.current.destroy();
    };
  }, [t.home.typedStrings]);

  return (
    <section
      className={`flex justify-center items-center flex-col px-4 py-8 text-white text-center ${
        menu
          ? "opacity-0 pointer-events-none h-0 overflow-hidden"
          : "opacity-100"
      }`}
      style={{ fontFamily: "var(--font-geist-mono)" }}
      aria-hidden={menu}
    >
      <div className="flex flex-col items-center max-w-[1200px] gap-6">
        <h1 className="text-3xl md:text-7xl font-bold uppercase leading-snug">
          {t.home.greeting}
        </h1>

        <div className="text-2xl mt-4">
          <span ref={typedRef} className="multiple-text" />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-10 text-lg">
          <button
            onClick={() => handleClick("projects")}
            className="flex group flex-col items-center cursor-pointer overflow-hidden gap-2"
            aria-label="Ir a proyectos"
          >
            <span className="flex items-center gap-2">
              <FaArrowRightLong />
              {t.home.projects}
            </span>
            <div className="w-full h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-3 duration-300 bg-white"></div>
          </button>

          <button
            onClick={() => handleClick("about")}
            className="flex group flex-col items-center cursor-pointer overflow-hidden gap-2"
            aria-label="Ir a sobre mí"
          >
            <span className="flex items-center gap-2">
              <FaArrowRightLong />
              {t.home.about}
            </span>
            <div className="w-full h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-3 duration-300 bg-white"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
