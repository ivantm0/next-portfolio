import { useState } from "react";
import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";
import VideoBackground from "./VideoBackground/VideoBackground";
import { useMenu } from "@/context/MenuContext";

type Props = {
  setActiveSection: (section: string) => void;
};

const LayerMenu = ({ setActiveSection }: Props) => {
  const { isOpen: menu, toggleMenu, setIsOpen } = useMenu();
  const [hoverEnabled, setHoverEnabled] = useState(true);

  const handleClick = () => {
    toggleMenu();
    setHoverEnabled(false);
  };

  const handleMouseLeave = () => {
    setHoverEnabled(true);
  };

  return (
    <div className="relative">
      <VideoBackground />
      <Header
        menu={menu}
        hoverEnabled={hoverEnabled}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        setActiveSection={setActiveSection}
        setIsOpen={setIsOpen}
      />
      <SideMenu
        menu={menu}
        setIsOpen={setIsOpen}
        setActiveSection={setActiveSection}
      />
    </div>
  );
};

export default LayerMenu;
