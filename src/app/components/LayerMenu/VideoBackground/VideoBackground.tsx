// import { useEffect, useState } from "react";

const VideoBackground = () => {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // useEffect(() => {
  //   const matchDark = window.matchMedia("(prefers-color-scheme: dark)");

  //   setIsDarkMode(matchDark.matches);

  //   const listener = (e: MediaQueryListEvent) => {
  //     setIsDarkMode(e.matches);
  //   };

  //   matchDark.addEventListener("change", listener);

  //   return () => {
  //     matchDark.removeEventListener("change", listener);
  //   };
  // }, []);
  return (
    <>
      <div className="absolute bg-black top-0 left-0 h-screen w-screen overflow-hidden object-cover -z-50"></div>

      {/* Futuro tema claro ${isDarkMode ? "bg-gray-900 opacity-80" : "bg-gray-500 opacity-80" */}
      <div
        className={`absolute top-0 left-0 h-screen w-screen overflow-hidden object-cover -z-50 bg-gray-900 opacity-80`}
      ></div>
    </>
  );
};

export default VideoBackground;
