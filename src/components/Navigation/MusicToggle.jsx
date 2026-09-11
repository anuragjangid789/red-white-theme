import React from "react";
import { motion } from "framer-motion";

/**
 * MUSIC TOGGLE BUTTON
 * PRD #126: Discreet sound controller in bottom corner
 */
export function MusicToggle({ isPlaying, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[rgba(197,160,89,0.4)] backdrop-blur-md bg-[rgba(253,251,247,0.85)] text-[#1A3636] shadow-sm hover:border-[#C5A059] transition-all cursor-pointer select-none"
      aria-label={isPlaying ? "Mute ambient palace music" : "Play ambient palace music"}
    >
      {/* Animated Sound Waves when playing */}
      <div className="flex items-end gap-[2px] h-3.5 w-3.5">
        <motion.span
          animate={{ height: isPlaying ? [3, 14, 6, 12, 4] : 3 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="w-[2px] bg-[#C5A059] rounded-full"
        />
        <motion.span
          animate={{ height: isPlaying ? [8, 4, 14, 6, 9] : 6 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
          className="w-[2px] bg-[#C5A059] rounded-full"
        />
        <motion.span
          animate={{ height: isPlaying ? [4, 12, 5, 14, 4] : 4 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="w-[2px] bg-[#C5A059] rounded-full"
        />
      </div>

      <span
        className="text-[0.68rem] uppercase tracking-[0.2em] font-medium text-[#1A3636]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {isPlaying ? "♪ SOUND ON" : "♪ SOUND OFF"}
      </span>
    </motion.button>
  );
}
