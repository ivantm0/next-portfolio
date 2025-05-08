"use client";

import { useState } from "react";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import LayerMenu from "./components/LayerMenu/LayerMenu";
import List from "./components/List/List";
import MainContent from "./components/MainContent/MainContent";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="h-[100dvh] relative">
      <LayerMenu setActiveSection={setActiveSection} />
      {activeSection === "home" && (
        <MainContent setActiveSection={setActiveSection} />
      )}

      {activeSection === "projects" && <List />}

      {activeSection === "about" && <About />}

      {activeSection === "contact" && <Contact />}
    </div>
  );
}
