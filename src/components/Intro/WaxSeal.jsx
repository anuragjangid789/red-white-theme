import React from "react";
import { motion } from "framer-motion";

/**
 * ROYAL WAX SEAL COMPONENT
 * Authentic molten Rajput seal with gold foil embossed monogram,
 * metallic bevel ring, and ambient golden shimmer.
 */
export function WaxSeal({ onClick, monogram = "A & A", isOpening = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isOpening}
      whileHover={{ scale: 1.08, rotate: 1.5 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className="relative z-50 flex items-center justify-center cursor-pointer select-none focus:outline-none"
      style={{
        width: 82,
        height: 82,
        background: "transparent",
        border: "none",
        padding: 0,
      }}
      aria-label="Click wax seal to open wedding invitation"
    >
      {/* Ambient Pulsing Gold Aura */}
      {!isOpening && (
        <motion.div
          className="absolute inset-[-8px] rounded-full pointer-events-none"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.75, 0.3],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(229, 195, 120, 0.45) 0%, rgba(197, 160, 89, 0.15) 50%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      )}

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(85,14,22,0.45)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
      >
        <defs>
          {/* Deep Royal Crimson Wax Gradient */}
          <radialGradient id="waxCrimson" cx="35%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#A82835" />
            <stop offset="35%" stopColor="#801B26" />
            <stop offset="70%" stopColor="#550E16" />
            <stop offset="95%" stopColor="#35060B" />
            <stop offset="100%" stopColor="#220306" />
          </radialGradient>

          {/* Stamped Center Recess Gradient */}
          <radialGradient id="waxInnerRecess" cx="40%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#6E151E" />
            <stop offset="60%" stopColor="#500B13" />
            <stop offset="100%" stopColor="#320408" />
          </radialGradient>

          {/* Liquid Gold Foil Gradient */}
          <linearGradient id="liquidGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D1" />
            <stop offset="25%" stopColor="#E5C378" />
            <stop offset="55%" stopColor="#C5A059" />
            <stop offset="85%" stopColor="#8F6C26" />
            <stop offset="100%" stopColor="#E5C378" />
          </linearGradient>

          {/* Radial Gold Foil Highlight */}
          <radialGradient id="goldMonogram" cx="35%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#FFF8E7" />
            <stop offset="30%" stopColor="#F5D78E" />
            <stop offset="65%" stopColor="#C5A059" />
            <stop offset="90%" stopColor="#966D24" />
            <stop offset="100%" stopColor="#5C3E0D" />
          </radialGradient>
        </defs>

        {/* 1. Organic Molten Wax Rim (Authentic hand-poured contour) */}
        <path
          d="M50 4 C68 3 83 11 92 24 C99 36 98 53 93 68 C87 83 75 95 59 96 C43 97 27 93 15 81 C5 70 3 53 7 36 C11 20 27 5 50 4 Z"
          fill="url(#waxCrimson)"
        />

        {/* 2. Molten Wax Drips & Beads */}
        <circle cx="86" cy="27" r="4.2" fill="#5F0F18" opacity="0.85" />
        <circle cx="14" cy="71" r="5.2" fill="#4B080F" opacity="0.9" />
        <circle cx="71" cy="90" r="4.8" fill="#42060C" opacity="0.85" />
        <circle cx="32" cy="93" r="3.2" fill="#4B080F" opacity="0.75" />
        <circle cx="88" cy="62" r="3.6" fill="#520A12" opacity="0.75" />

        {/* 3. Outer Stamped Bevel Highlight Ring */}
        <circle
          cx="50"
          cy="50"
          r="33.5"
          fill="none"
          stroke="rgba(255, 235, 195, 0.22)"
          strokeWidth="1.2"
        />

        {/* 4. Deep Recessed Stamped Center Basin */}
        <circle
          cx="50"
          cy="50"
          r="31"
          fill="url(#waxInnerRecess)"
          stroke="rgba(0, 0, 0, 0.45)"
          strokeWidth="1.2"
        />

        {/* 5. Delicate Gold Beaded Border Ring */}
        <circle
          cx="50"
          cy="50"
          r="28.5"
          fill="none"
          stroke="url(#liquidGold)"
          strokeWidth="0.85"
          strokeDasharray="1.8 1.8"
          opacity="0.85"
        />

        {/* 6. Royal Crown / Crest Above Monogram */}
        <g transform="translate(50, 31) scale(0.65)">
          {/* Crown Peak & Fleur-de-lis */}
          <path
            d="M -10 6 L -14 -4 L -6 0 L 0 -8 L 6 0 L 14 -4 L 10 6 Z"
            fill="url(#goldMonogram)"
            opacity="0.95"
          />
          {/* Crown Base Jewels */}
          <circle cx="-9" cy="8" r="1.2" fill="#FFF8E7" />
          <circle cx="0" cy="8" r="1.4" fill="#FFF8E7" />
          <circle cx="9" cy="8" r="1.2" fill="#FFF8E7" />
          <rect x="-11" y="7" width="22" height="1.6" rx="0.8" fill="url(#goldMonogram)" opacity="0.8" />
        </g>

        {/* 7. Stamped Initials / Monogram */}
        <text
          x="50"
          y="56.5"
          textAnchor="middle"
          fill="url(#goldMonogram)"
          fontFamily="'Cinzel', 'Times New Roman', serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="0.06em"
          style={{
            textShadow: "0 1.5px 3px rgba(0, 0, 0, 0.75), 0 -0.5px 1px rgba(255, 240, 200, 0.4)",
          }}
        >
          {monogram}
        </text>

        {/* 8. Royal Lotus / Star Flourish Below Monogram */}
        <g transform="translate(50, 65) scale(0.55)">
          {/* Center Diamond */}
          <polygon points="0,-4 4,0 0,4 -4,0" fill="url(#goldMonogram)" />
          {/* Side Petal Flourishes */}
          <path d="M -4 0 Q -10 -2 -14 -6 Q -12 2 -4 3" fill="url(#goldMonogram)" opacity="0.85" />
          <path d="M 4 0 Q 10 -2 14 -6 Q 12 2 4 3" fill="url(#goldMonogram)" opacity="0.85" />
          <circle cx="-16" cy="-7" r="1" fill="#FFF8E7" />
          <circle cx="16" cy="-7" r="1" fill="#FFF8E7" />
        </g>
      </svg>
    </motion.button>
  );
}

export default WaxSeal;
