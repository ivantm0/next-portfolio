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
    <div className=" flex gap-10 top-0 right-0 justify-between">
      <div
        className="text-white w-full md:max-w-[600px] xl:max-w-[500px] flex flex-col justify-center xl:ml-50 my-8 mx-4 md:mx-10 xl:mx-0"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <h1 className="text-5xl mb-4 font-bold">{t.about.about}</h1>
        <div className="w-full h-px bg-white/30 mb-6"></div>
        <p className="text-xl w-full xl:w-full">{t.about.description}</p>
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
        className="rounded-bl-4xl hidden lg:block lg:absolute top-0 right-0 -z-10"
      ></Image>
    </div>
  );
};

export default About;
