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
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 h-screen w-screen overflow-hidden object-cover -z-50"
      >
        <source src="/noise2.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* Futuro tema claro ${isDarkMode ? "bg-gray-900 opacity-80" : "bg-gray-500 opacity-80" */}
      <div
        className={`absolute top-0 left-0 h-screen w-screen overflow-hidden object-cover -z-50 bg-gray-900 opacity-80`}
      ></div>
    </>
  );
};

export default VideoBackground;
