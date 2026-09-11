import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GalleryLightbox({ isOpen, images = [], activeIndex = 0, onClose, onIndexChange }) {
  const currentImage = images[activeIndex] || images[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onIndexChange((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        onIndexChange((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose, onIndexChange]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-10 bg-[rgba(18,36,36,0.96)] backdrop-blur-xl text-white select-none"
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-10">
          <div className="flex items-center gap-2">
            <span
              className="text-xs uppercase tracking-[0.25em] text-[#E5C378] font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              WEDDING CHRONICLE
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FAF6EE] hover:text-[#E5C378] transition-colors p-2 cursor-pointer font-medium"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>CLOSE (ESC)</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Central Displayed Photo Canvas */}
        <div className="relative my-auto flex items-center justify-center w-full max-w-4xl mx-auto h-[60vh] md:h-[70vh]">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={() => onIndexChange((activeIndex - 1 + images.length) % images.length)}
            className="absolute left-0 md:-left-16 p-3 text-[#E5C378] hover:scale-110 transition-transform cursor-pointer z-20"
            aria-label="Previous photograph"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image Representation Canvas */}
          <motion.div
            key={currentImage.id || activeIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full rounded-sm overflow-hidden border border-[rgba(229,195,120,0.3)] shadow-2xl flex flex-col items-center justify-center p-8 text-center"
            style={{
              backgroundColor: "#162E2E",
              background: `radial-gradient(circle at center, #234848 0%, #122424 100%)`,
            }}
          >
            <div className="absolute inset-3 border border-[rgba(229,195,120,0.15)] pointer-events-none" />
            
            <h3
              className="text-3xl md:text-5xl font-light text-[#FAF6EE] mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {currentImage.title}
            </h3>
            <p className="text-xs md:text-sm text-[#C5A059] uppercase tracking-[0.2em] font-medium mb-3">
              {currentImage.category}
            </p>
            <p className="text-xs md:text-sm text-[#D8D2C5] max-w-lg leading-relaxed font-light italic">
              “{currentImage.caption}”
            </p>
          </motion.div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={() => onIndexChange((activeIndex + 1) % images.length)}
            className="absolute right-0 md:-right-16 p-3 text-[#E5C378] hover:scale-110 transition-transform cursor-pointer z-20"
            aria-label="Next photograph"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Bottom Pagination */}
        <div className="text-center z-10">
          <span
            className="text-xs tracking-[0.3em] text-[#E5C378] font-medium"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
