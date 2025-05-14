"use client";

import Socials from "../../Socials/Socials";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  menu: boolean;
  setIsOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

const SideMenu = ({ menu, setIsOpen, setActiveSection }: Props) => {
  const handleClick = (section: string) => {
    setIsOpen(false);
    setActiveSection(section);
  };

  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {menu && (
        <motion.nav
          key="side-menu"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="absolute top-40 left-10 sm:top-50 lg:top-80 lg:left-100 z-50 overflow-hidden"
        >
          <motion.ul
            className="flex flex-col items-start gap-3"
            style={{ fontFamily: "var(--font-geist-mono)" }}
            variants={containerVariants}
          >
            {[
              { label: t.menu.home, section: "home", index: "01" },
              { label: t.menu.projects, section: "projects", index: "02" },
              { label: t.menu.about, section: "about", index: "03" },
              { label: t.menu.contact, section: "contact", index: "04" },
            ].map(({ label, section, index }) => (
              <motion.button
                key={section}
                className="text-4xl lg:text-7xl uppercase cursor-pointer group"
                onClick={() => handleClick(section)}
                variants={itemVariants}
              >
                <span className="text-base lg:text-3xl">{index}</span> {label}
                <div className="w-full h-0.5 -translate-x-[101%] group-hover:translate-x-0 transition-all -mt-1 duration-300 bg-white"></div>
              </motion.button>
            ))}

            <motion.div variants={itemVariants}>
              <Socials />
            </motion.div>
          </motion.ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;
