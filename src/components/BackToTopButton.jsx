import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
      className="fixed bottom-20 right-2 md:bottom-6 md:right-4 z-[999] flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-colors duration-300 hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-primary/30 group"
  title="Go to top"
        >
          <ChevronUp 
            size={28} 
            className="transition-transform duration-300 group-hover:-translate-y-1" 
            strokeWidth={2.5} 
          />
          
          {/* Glass background effect */}
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
