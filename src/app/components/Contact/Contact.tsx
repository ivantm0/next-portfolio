"use client";

import { useMenu } from "@/context/MenuContext";
import Socials from "../Socials/Socials";
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
    transition: { type: "spring", stiffness: 60 },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.2 },
  },
};

const Contact = () => {
  const { isOpen: menu } = useMenu();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {!menu && (
        <motion.div
          key="contact"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="w-full flex justify-center items-center px-10 py-8"
        >
          <motion.div
            className="text-white w-full max-w-6xl"
            style={{ fontFamily: "var(--font-geist-mono)" }}
            variants={containerVariants}
          >
            <motion.h1
              className="text-3xl sm:text-5xl font-bold mb-4 tracking-wide"
              variants={itemVariants}
            >
              {t.contact.contact}
            </motion.h1>

            <motion.div
              className="w-full h-px bg-white/30 mb-6"
              variants={itemVariants}
            ></motion.div>

            <motion.div
              className="flex flex-col md:flex-row gap-10 mt-6"
              variants={itemVariants}
            >
              {/* Email */}
              <motion.div
                className="w-full md:w-1/2 flex flex-wrap items-center gap-4"
                variants={itemVariants}
              >
                <p className="font-semibold text-2xl">{t.contact.mail}:</p>
                <a
                  href="mailto:iterolmartinez@gmail.com"
                  className="underline hover:text-blue-400 transition-colors"
                >
                  iterolmartinez@gmail.com
                </a>
              </motion.div>

              {/* Redes sociales */}
              <motion.div
                className="w-full md:w-1/2 flex flex-wrap items-center gap-4"
                variants={itemVariants}
              >
                <p className="font-semibold text-2xl">{t.contact.social}:</p>
                <Socials />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Contact;
