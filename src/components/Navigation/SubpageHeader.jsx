import React from "react";
import { motion } from "framer-motion";

export function SubpageHeader({ title, onBack, backLabel = "BACK TO HOME" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 left-0 w-full z-30 flex items-center justify-between px-4 md:px-5 pt-8 pb-3 backdrop-blur-md bg-[rgba(230,229,222,0.92)] border-b border-[rgba(197,160,89,0.25)] shadow-sm"
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="luxury-btn text-xs"
        aria-label={`Return via ${backLabel}`}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>{backLabel}</span>
      </button>

      {/* Chapter Title */}
      <div className="flex items-center gap-2 select-none">
        <span
          className="royal-heading text-xs md:text-sm text-[#1A3636] tracking-[0.2em] font-semibold"
          style={{ fontFamily: "var(--font-royal)" }}
        >
          {title}
        </span>
      </div>
    </motion.div>
  );
}
