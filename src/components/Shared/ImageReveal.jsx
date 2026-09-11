import React from "react";
import { motion } from "framer-motion";
import { motionTokens } from "../../motion/motionTokens";

/**
 * IMAGE REVEAL WRAPPER
 * PRD #117: Luxury clipPath reveal with subtle scale easing
 */
export function ImageReveal({
  children,
  className = "",
  direction = "vertical", // "vertical" | "horizontal"
  delay = 0,
}) {
  const clipInitial =
    direction === "horizontal"
      ? "inset(0% 100% 0% 0%)"
      : "inset(100% 0% 0% 0%)";

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        initial={{ clipPath: clipInitial, scale: 1.05 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        viewport={{ once: false, margin: "-20px" }}
        transition={{
          duration: motionTokens.cinematic,
          delay,
          ease: motionTokens.ease,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
