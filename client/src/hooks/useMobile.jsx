import { useEffect, useState } from "react";

const useMobile = (breakpoint = 320) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  // handleResize events for mobile devices
  const handleResize = () => {
    const check = window.innerWidth < breakpoint;
    setIsMobile(check);
  };

  // run handleResize on component mount and when window size changes
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
     
  }, []);

  return [isMobile];
};

export default useMobile;
