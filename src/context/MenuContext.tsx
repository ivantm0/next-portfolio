"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MenuContextType {
  isOpen: boolean;
  toggleMenu: () => void;
  setIsOpen: (open: boolean) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu debe usarse dentro de un MenuProvider");
  }
  return context;
};
