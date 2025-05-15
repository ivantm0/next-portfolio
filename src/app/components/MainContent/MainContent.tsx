"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { useMenu } from "@/context/MenuContext";
import { useLanguage } from "@/context/LanguageContext";
import Typed from "typed.js";
import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  setActiveSection: (section: string) => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: { duration: 0.3 },
  },
};

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
    <AnimatePresence mode="wait">
      {!menu && (
        <motion.section
          key="main-content"
          className="flex justify-center items-center flex-col px-4 pt-20 text-white text-center"
          style={{ fontFamily: "var(--font-geist-mono)" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="flex flex-col items-center max-w-[1200px] gap-6"
            variants={containerVariants}
          >
            <motion.h1
              className="text-3xl md:text-7xl font-bold uppercase leading-snug"
              variants={itemVariants}
            >
              {t.home.greeting}
            </motion.h1>

            <motion.div className="text-2xl mt-4" variants={itemVariants}>
              <span ref={typedRef} className="multiple-text" />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 mt-10 text-lg"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => handleClick("projects")}
                className="flex group flex-col items-center cursor-pointer overflow-hidden gap-2"
                aria-label="Ir a proyectos"
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="flex items-center gap-2">
                  <FaArrowRightLong />
                  {t.home.projects}
                </span>
                <div className="w-full h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-3 duration-300 bg-white"></div>
              </motion.button>

              <motion.button
                onClick={() => handleClick("about")}
                className="flex group flex-col items-center cursor-pointer overflow-hidden gap-2"
                aria-label="Ir a sobre mí"
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="flex items-center gap-2">
                  <FaArrowRightLong />
                  {t.home.about}
                </span>
                <div className="w-full h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-3 duration-300 bg-white"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default MainContent;
