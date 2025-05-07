"use client";

// import { useEffect, useState } from "react";
// import { LuSun, LuMoon } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import "flag-icons/css/flag-icons.min.css";

interface Props {
  menu: boolean;
  hoverEnabled: boolean;
  onClick: () => void;
  onMouseLeave: () => void;
  setActiveSection: (section: string) => void;
  setIsOpen: (open: boolean) => void;
}

const Header = ({
  menu,
  hoverEnabled,
  onClick,
  onMouseLeave,
  setActiveSection,
  setIsOpen,
}: Props) => {
  const handleClick = (Section: string) => {
    setIsOpen(false);
    setActiveSection(Section);
  };

  // const [isDarkMode, setIsDarkMode] = useState(false);

  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  // useEffect(() => {
  //   const matchDark = window.matchMedia("(prefers-color-scheme: dark)");

  //   setIsDarkMode(matchDark.matches);

  //   const listener = (e: MediaQueryListEvent) => {
  //     setIsDarkMode(e.matches);
  //   };

  //   matchDark.addEventListener("change", listener);

  //   return () => {
  //     matchDark.removeEventListener("change", listener);
  //   };
  // }, []);

  return (
    <div className="flex w-full justify-between items-center px-5 py-10 sm:px-20 sm:py-30">
      <div className="flex gap-10">
        <button
          onClick={() => handleClick("home")}
          className="cursor-pointer text-xl font-bold md:text-2xl"
        >
          ITMPortfolio
        </button>
        <div>
          {[
            <div key="line 1" className="text-2xl font-bold hidden sm:block">
              Iván Terol
            </div>,
          ].map((item, index, array) => {
            const delay = menu
              ? `${index * 200}ms`
              : `${(array.length - index - 1) * 200}ms`;

            return (
              <div
                key={index}
                className={`transition-all flex gap-10 justify-center duration-1000 ease-in-out transform ${
                  menu
                    ? "-translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: delay }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className={`text-3xl flex cursor-pointer ${
            language === "es" ? "fi fi-gb" : "fi fi-es"
          }`}
          onClick={toggleLanguage}
        ></button>
        {/* <div className="text-4xl">{isDarkMode ? <LuMoon /> : <LuSun />}</div> */}
        <div
          className={`w-10 h-10 grid grid-cols-3 grid-rows-3 overflow-hidden cursor-pointer ${
            hoverEnabled ? "group" : ""
          }`}
          onClick={onClick}
          onMouseLeave={onMouseLeave}
        >
          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-1 col-end-2 row-start-1 row-end-2 transition-all duration-300 ${
              menu ? "hidden group-hover:grid" : ""
            }`}
          ></div>

          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-2 col-end-3 row-start-1 row-end-2 transition-all duration-300 ${
              menu
                ? "-translate-y-full"
                : hoverEnabled
                ? "group-hover:-translate-y-full"
                : ""
            }`}
          ></div>

          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-3 col-end-4 row-start-1 row-end-2 transition-all duration-300 ${
              menu ? "hidden group-hover:grid" : ""
            }`}
          ></div>

          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-1 col-end-2 row-start-2 row-end-3 transition-all duration-300 ${
              menu
                ? "-translate-x-full"
                : hoverEnabled
                ? "group-hover:-translate-x-full"
                : ""
            }`}
          ></div>

          {/* center */}
          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-2 col-end-3 row-start-2 row-end-3 transition-all duration-300 ${
              menu
                ? "rotate-45 w-8 -translate-x-3 group-hover:rotate-0"
                : hoverEnabled
                ? "rotate-0 group-hover:w-8 group-hover:-translate-x-3"
                : "rotate-0"
            }`}
          ></div>

          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-2 col-end-3 row-start-2 row-end-3 transition-all duration-300 ${
              menu
                ? "rotate-45 h-8 -translate-y-3 group-hover:rotate-0"
                : hoverEnabled
                ? "rotate-0 group-hover:h-8 group-hover:-translate-y-3"
                : "rotate-0"
            }`}
          ></div>
          {/* end center */}

          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-3 col-end-4 row-start-2 row-end-3 transition-all duration-300 ${
              menu
                ? "translate-x-[200%]"
                : hoverEnabled
                ? "group-hover:translate-x-[200%]"
                : ""
            }`}
          ></div>

          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-1 col-end-2 row-start-3 row-end-4 transition-all duration-300 ${
              menu ? "hidden group-hover:grid" : ""
            }`}
          ></div>

          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-2 col-end-3 row-start-3 row-end-4 transition-all duration-300 ${
              menu
                ? "translate-y-[200%]"
                : hoverEnabled
                ? "group-hover:translate-y-[200%]"
                : ""
            }`}
          ></div>

          <div
            className={`w-2 h-2 rounded-full border-2 border-white col-start-3 col-end-4 row-start-3 row-end-4 transition-all duration-300 ${
              menu ? "hidden group-hover:grid" : ""
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
