import React from "react";
import { motion } from "framer-motion";
import { motionTokens } from "../../motion/motionTokens";

/**
 * ANIMATED HEADING
 * PRD #116: Line mask reveal for luxury headings
 */
export function AnimatedHeading({
  title,
  subtitle,
  align = "center",
  tag: Tag = "h2",
  className = "",
  size = "large",
  royal = false,
}) {
  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

  const sizeStyles = {
    small: "text-2xl md:text-3xl",
    medium: "text-3xl md:text-5xl",
    large: "text-4xl md:text-6xl lg:text-7xl",
    hero: "text-5xl md:text-7xl lg:text-8xl",
  }[size] || "text-4xl md:text-6xl";

  const headingFont = royal
    ? "'Cinzel', 'Times New Roman', serif"
    : "'Cormorant Garamond', Georgia, serif";

  return (
    <div className={`flex flex-col ${alignClass} ${className} overflow-hidden my-3`}>
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "115%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: false, margin: "-30px" }}
          transition={{ duration: motionTokens.slow, ease: motionTokens.ease }}
        >
          <Tag
            className={`${sizeStyles} font-normal tracking-tight`}
            style={{ fontFamily: headingFont, lineHeight: 1.12 }}
          >
            {title}
          </Tag>
        </motion.div>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: motionTokens.reveal, delay: 0.15, ease: motionTokens.ease }}
          className="mt-3 text-base md:text-lg font-light text-[#7A7672] max-w-xl italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/**
 * SECTION LABEL
 * PRD #178: Wide-spaced editorial chapter tag
 */
export function SectionLabel({ text, align = "center", className = "" }) {
  const alignClass =
    align === "left"
      ? "justify-start"
      : align === "right"
      ? "justify-end"
      : "justify-center";

  return (
    <div className={`flex items-center ${alignClass} ${className} mb-3`}>
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.22em" }}
        viewport={{ once: false }}
        transition={{ duration: motionTokens.slow, ease: motionTokens.ease }}
        className="sans-label text-xs tracking-widest text-[#C5A059] uppercase font-medium"
      >
        {text}
      </motion.span>
    </div>
  );
}
