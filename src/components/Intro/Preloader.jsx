import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PichwaiLotus } from "../Shared/PichwaiMotifs";

/**
 * PRELOADER COMPONENT
 * PRD #9: Botanical SVG drawing, monogram, luxury ivory background, percentage counter
 */
export function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              onComplete?.();
            }, 600);
          }, 300);
          return 100;
        }
        // Smooth non-linear increment
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center paper-texture"
          style={{ backgroundColor: "var(--color-ivory)" }}
        >
          {/* Subtle Outer Frame */}
          <div className="absolute inset-4 md:inset-8 border border-[rgba(197,160,89,0.2)] pointer-events-none" />

          {/* Animated Botanical Lotus */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 relative"
          >
            <PichwaiLotus size={84} animate={true} color="#C5A059" />
          </motion.div>

          {/* Monogram */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="royal-heading text-xl md:text-2xl text-[#C5A059] tracking-[0.25em] mb-2"
          >
            A & A
          </motion.h2>

          {/* Editorial Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-xs uppercase tracking-[0.3em] text-[#7A7672] font-medium mb-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Preparing Your Royal Invitation
          </motion.p>

          {/* Progress Indicator */}
          <div className="w-44 h-[1.5px] bg-[#EAE3D6] relative overflow-hidden mb-3">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-[#C5A059]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <span
            className="text-xs tracking-widest text-[#9A783E] font-medium"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
