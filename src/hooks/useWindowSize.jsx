import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
