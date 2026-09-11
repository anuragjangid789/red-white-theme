import React from "react";
import { motion } from "framer-motion";
import { useCountdown } from "../../hooks/useCountdown";

export function Countdown({ targetDate, postWeddingMessage = "THE CELEBRATION HAS BEGUN" }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate);

  if (isPast) {
    return (
      <div className="my-8 py-4 px-8 border border-[rgba(197,160,89,0.3)] bg-[rgba(197,160,89,0.06)] rounded-sm text-center">
        <span
          className="text-sm md:text-base uppercase tracking-[0.25em] text-[#C5A059] font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {postWeddingMessage}
        </span>
      </div>
    );
  }

  const units = [
    { value: days, label: "DAYS" },
    { value: hours, label: "HOURS" },
    { value: minutes, label: "MINUTES" },
    { value: seconds, label: "SECONDS" },
  ];

  return (
    <div className="my-8 flex items-center justify-center gap-3 sm:gap-6 md:gap-10">
      {units.map((unit, idx) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <motion.span
              key={unit.value}
              initial={{ opacity: 0.7, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-3xl sm:text-4xl md:text-6xl text-[#1A3636] font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {unit.value}
            </motion.span>
            <span
              className="text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.25em] text-[#C5A059] font-medium mt-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {unit.label}
            </span>
          </div>

          {idx < units.length - 1 && (
            <span className="text-xl md:text-2xl text-[#C5A059] opacity-40 font-serif pb-4">
              ·
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
