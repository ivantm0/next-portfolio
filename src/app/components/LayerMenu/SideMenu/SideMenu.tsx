"use client";

import Socials from "../../Socials/Socials";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  menu: boolean;
  setIsOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
}

const SideMenu = ({ menu, setIsOpen, setActiveSection }: Props) => {
  const handleClick = (section: string) => {
    setIsOpen(false);
    setActiveSection(section);
  };

  const { t } = useLanguage();

  if (!menu) return null;

  return (
    <nav className="absolute top-40 left-10 sm:top-50 lg:top-80 lg:left-100 z-50 overflow-hidden">
      <ul
        className="flex flex-col items-start gap-3"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <button
          className="text-4xl lg:text-7xl uppercase cursor-pointer group"
          onClick={() => handleClick("home")}
        >
          <span className="text-base lg:text-3xl">01</span> {t.menu.home}
          <div className="w-full h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-1 duration-300 bg-white"></div>
        </button>
        <button
          className="text-4xl lg:text-7xl uppercase cursor-pointer group"
          onClick={() => handleClick("projects")}
        >
          <span className="text-base lg:text-3xl">02</span> {t.menu.projects}
          <div className="w-full h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-1 duration-300 bg-white"></div>
        </button>
        <button
          className="text-4xl lg:text-7xl uppercase cursor-pointer group"
          onClick={() => handleClick("about")}
        >
          <span className="text-base lg:text-3xl">03</span> {t.menu.about}
          <div className="w-full h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-1 duration-300 bg-white"></div>
        </button>
        <button
          className="text-4xl lg:text-7xl uppercase cursor-pointer mb-4 group"
          onClick={() => handleClick("contact")}
        >
          <span className="text-base lg:text-3xl">04</span> {t.menu.contact}
          <div className="w-full h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-1 duration-300 bg-white"></div>
        </button>

        <Socials />
      </ul>
    </nav>
  );
};

export default SideMenu;
