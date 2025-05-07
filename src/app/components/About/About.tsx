"use client";

import { useMenu } from "@/context/MenuContext";
import Image from "next/image";
import { FaArrowDownLong } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

const About = () => {
  const { isOpen: menu } = useMenu();

  const { t } = useLanguage();

  if (menu) return null;
  return (
    <div className="lg:absolute flex top-0 gap-10 right-0 justify-between -z-10">
      <div
        className="text-white w-full flex flex-col justify-center xl:pl-50 py-8 px-4 md:px-10 xl:px-0 md:pt-32"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <h1 className="text-5xl mb-4 font-bold">{t.about.about}</h1>
        <div className="w-full h-px bg-white/30 mb-6"></div>
        <p className="text-xl w-full xl:w-[80%]">
          Soy Iván Terol, un apasionado desarrollador frontend con interés en la
          ciberseguridad y las aplicaciones modernas. Me encanta construir
          experiencias digitales limpias, funcionales y con un enfoque fuerte en
          la estética.
        </p>
        <a
          href="/CV_Ivan-Terol-Martinez.pdf"
          download
          className="flex group flex-col pt-6 cursor-pointer overflow-hidden gap-2 w-fit pointer-events-auto"
          aria-label="Descargar CV"
        >
          <span className="flex items-center gap-2">
            <FaArrowDownLong />
            {t.about.download}
          </span>
          <div className="w-38 h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-3 duration-300 bg-white"></div>
        </a>
      </div>
      <Image
        src="/photo-about.jpeg"
        alt="Foto Iván Terol"
        width={550}
        height={1000}
        className="rounded-bl-4xl hidden lg:block"
      ></Image>
    </div>
  );
};

export default About;
