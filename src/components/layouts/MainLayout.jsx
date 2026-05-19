import { useEffect } from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { menu } from "../../data/menuData";
import Lenis from "lenis";
import BackToTopButton from "../BackToTopButton";

export default function MainLayout() {
  const location = useLocation();

  // Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Pause Lenis when mobile menu opens (fixes iOS Safari touch interception)
    const handleMenuOpen = () => lenis.stop();
    const handleMenuClose = () => lenis.start();
    window.addEventListener('mobilemenuopen', handleMenuOpen);
    window.addEventListener('mobilemenuclose', handleMenuClose);

    return () => {
      lenis.destroy();
      window.removeEventListener('mobilemenuopen', handleMenuOpen);
      window.removeEventListener('mobilemenuclose', handleMenuClose);
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Default title
    let pageTitle = "Home";

    // 1. Try to find match in top-level menu items
    const topLevelMatch = menu.find(item => item.path === currentPath);
    if (topLevelMatch) {
      pageTitle = topLevelMatch.title;
    } else {
      // 2. Try to find match in sub-menu items
      menu.forEach(item => {
        if (item.children) {
          const subMatch = item.children.find(sub => sub.path === currentPath);
          if (subMatch) {
            pageTitle = subMatch.name;
          }
        }
      });
    }

    // 3. Fallback for dynamic routes or unmatched paths (like program details)
    if (pageTitle === "Home" && currentPath !== "/") {
      const pathnames = currentPath.split("/").filter((x) => x);
      if (pathnames.length > 0) {
        const lastPath = pathnames[pathnames.length - 1];
        pageTitle = lastPath
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
    }

    document.title = `${pageTitle} - Yuva Mitra`;
  }, [location]);

  return (
    <>
      <Topbar />
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTopButton />
    </>
  );
}
