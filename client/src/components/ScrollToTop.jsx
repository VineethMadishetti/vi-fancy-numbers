import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Disable the browser's default scroll restoration behavior
    // This prevents the browser from jumping back to the previous position on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Force scroll to top immediately
    window.scrollTo(0, 0);
  }, [pathname]); // Runs on every route change and initial load

  return null;
};

export default ScrollToTop;