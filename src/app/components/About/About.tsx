"use client";

import { useMenu } from "@/context/MenuContext";
import Image from "next/image";
import { FaArrowDownLong } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70 },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.2 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3 },
  },
};

const About = () => {
  const { isOpen: menu } = useMenu();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {!menu && (
        <motion.div
          key="about"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="flex gap-10 top-0 right-0 justify-between"
        >
          <motion.div
            className="text-white w-full md:max-w-[600px] xl:max-w-[45%] flex flex-col justify-center xl:ml-40 my-8 mx-4 md:mx-10 xl:mx-0"
            style={{ fontFamily: "var(--font-geist-mono)" }}
            variants={containerVariants}
          >
            <motion.h1
              className="text-5xl mb-4 font-bold"
              variants={itemVariants}
            >
              {t.about.about}
            </motion.h1>

            <motion.div
              className="w-full h-px bg-white/30 mb-6"
              variants={itemVariants}
            />

            <motion.p
              className="text-xl w-full xl:w-full"
              variants={itemVariants}
            >
              {t.about.description}
            </motion.p>

            <motion.a
              href="/CV_Ivan-Terol-Martinez.pdf"
              download
              className="flex group flex-col pt-6 cursor-pointer overflow-hidden gap-2 w-fit pointer-events-auto"
              aria-label="Descargar CV"
              variants={itemVariants}
            >
              <span className="flex items-center gap-2">
                <FaArrowDownLong />
                {t.about.download}
              </span>
              <div className="w-38 h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-3 duration-300 bg-white"></div>
            </motion.a>
          </motion.div>

          <motion.div
            className="hidden lg:block lg:absolute top-0 right-0 -z-10"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={imageVariants}
          >
            <Image
              src="/photo-about.jpeg"
              alt="Foto Iván Terol"
              width={550}
              height={1000}
              className="rounded-bl-4xl"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default About;
