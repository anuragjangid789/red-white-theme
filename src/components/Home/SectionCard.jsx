import React from "react";
import { motion } from "framer-motion";

export function SectionCard({ card, onSelect }) {
  return (
    <motion.a
      href={card.href}
      onClick={(e) => {
        e.preventDefault();
        onSelect?.(card.href.replace("#", ""));
      }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex flex-col items-center justify-center p-3 rounded-sm overflow-hidden text-decoration-none cursor-pointer transition-all duration-300 w-full"
      style={{
        backgroundColor: "var(--color-card-bg)",
        border: "1px solid var(--color-paper-border)",
        boxShadow: "0 2px 8px rgba(26, 54, 54, 0.04)",
        minHeight: 78,
      }}
    >
      {/* Delicate Inner Inset Border */}
      <div className="absolute inset-1 border border-[rgba(197,160,89,0.2)] group-hover:border-[rgba(197,160,89,0.55)] transition-colors pointer-events-none" />

      {/* Subtle Background Radial Texture */}
      <div
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#C5A059 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Top Chapter Number */}
      <span
        className="text-[0.66rem] tracking-[0.25em] text-[#C5A059] font-medium opacity-80 group-hover:opacity-100 mb-0.5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {card.number}
      </span>

      {/* Minimalist Diamond Accent */}
      <span className="w-1 h-1 rotate-45 border border-[#C5A059] opacity-50 my-1 group-hover:bg-[#C5A059] transition-all" />

      {/* Chapter Title */}
      <h3
        className="text-[0.94rem] sm:text-[0.98rem] font-medium text-[#1A3636] group-hover:text-[#801B26] transition-colors leading-tight tracking-wide text-center"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {card.title}
      </h3>
    </motion.a>
  );
}
