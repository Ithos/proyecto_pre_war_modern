import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => { // Se ejecuta cuando el componente se desmonta o cuando cambia el efecto o sus dependencias esto evita fugas de memoria
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;