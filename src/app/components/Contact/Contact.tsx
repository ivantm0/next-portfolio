"use client";

import { useMenu } from "@/context/MenuContext";
import Socials from "../Socials/Socials";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const { isOpen: menu } = useMenu();

  const { t } = useLanguage();

  if (menu) return null;

  return (
    <div className="w-full flex justify-center items-center px-10 py-8 ">
      <div
        className="text-white w-full max-w-6xl"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <h1 className="text-5xl font-bold mb-4 tracking-wide">
          {t.contact.contact}
        </h1>
        <div className="w-full h-px bg-white/30 mb-6"></div>

        <div className="flex flex-col md:flex-row gap-10 mt-6">
          {/* Email */}
          <div className="w-full md:w-1/2 flex flex-wrap items-center gap-4">
            <p className="font-semibold text-2xl">{t.contact.mail}:</p>
            <a
              href="mailto:iterolmartinez@gmail.com"
              className="underline hover:text-blue-400 transition-colors"
            >
              iterolmartinez@gmail.com
            </a>
          </div>

          {/* Redes sociales */}
          <div className="w-full md:w-1/2 flex flex-wrap items-center gap-4">
            <p className="font-semibold text-2xl">{t.contact.social}:</p>
            <Socials />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
