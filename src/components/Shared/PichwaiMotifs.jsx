import React from "react";
import { motion } from "framer-motion";

/**
 * PICHWAI LOTUS EMBLEM
 * Sacred multi-layered Pichwai lotus with gold/rose gradient
 */
export function PichwaiLotus({ className = "w-12 h-12", color = "currentColor", animate = false, size = 64 }) {
  const pathAnim = animate
    ? {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lotusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C378" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#9A783E" />
        </linearGradient>
      </defs>

      {/* Central Petal */}
      <motion.path
        d="M50 18 C53 28 62 38 62 52 C62 62 56 68 50 72 C44 68 38 62 38 52 C38 38 47 28 50 18 Z"
        fill="url(#lotusGradient)"
        opacity="0.95"
        stroke={color}
        strokeWidth="0.75"
        {...pathAnim}
      />

      {/* Flanking Inner Petals */}
      <motion.path
        d="M50 32 C58 36 72 43 72 56 C72 66 62 72 50 73 C38 72 28 66 28 56 C28 43 42 36 50 32 Z"
        fill="url(#lotusGradient)"
        opacity="0.75"
        stroke={color}
        strokeWidth="0.75"
        {...pathAnim}
      />

      {/* Wide Outer Petals */}
      <motion.path
        d="M50 44 C64 48 82 54 82 64 C82 72 68 76 50 76 C32 76 18 72 18 64 C18 54 36 48 50 44 Z"
        fill="url(#lotusGradient)"
        opacity="0.5"
        stroke={color}
        strokeWidth="0.75"
        {...pathAnim}
      />

      {/* Auspicious Base Leaf Calyx */}
      <motion.path
        d="M26 74 C34 82 43 85 50 85 C57 85 66 82 74 74 C66 77 58 78 50 78 C42 78 34 77 26 74 Z"
        fill={color}
        opacity="0.8"
        {...pathAnim}
      />

      {/* Crown Droplet */}
      <circle cx="50" cy="14" r="2" fill="url(#lotusGradient)" />
    </svg>
  );
}

/**
 * RAJASTHANI PALACE JHAROKHA ARCH
 * Traditional cusped scalloped archway framing headings and hero sections
 */
export function PalaceArch({ width = 120, height = 50, color = "#C5A059" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="archGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Outer Arch Contour */}
      <path
        d="M10 90 L30 90 C30 65 45 45 70 45 C80 45 90 52 95 60 C105 40 115 25 120 10 C125 25 135 40 145 60 C150 45 160 45 170 45 C195 45 210 65 210 90 L230 90"
        stroke="url(#archGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner Scalloped Accent */}
      <path
        d="M40 88 C40 70 52 56 70 56 C78 56 86 62 90 68 C100 52 110 38 120 26 C130 38 140 52 150 68 C154 62 162 56 170 56 C188 56 200 70 200 88"
        stroke="url(#archGrad)"
        strokeWidth="0.75"
        strokeDasharray="2 3"
        fill="none"
      />
      {/* Central Finial Kalash */}
      <circle cx="120" cy="8" r="3" fill={color} />
      <path d="M120 2 L120 6" stroke={color} strokeWidth="1" />
    </svg>
  );
}

/**
 * FLORAL PICHWAI CREEPER DIVIDER
 * Elegant horizontal ornamental vine with flowing leaves and buds
 */
export function PichwaiDivider({ width = "100%", height = 24, color = "#C5A059" }) {
  return (
    <div className="flex items-center justify-center my-6" style={{ width }}>
      <svg
        width="100%"
        height={height}
        viewBox="0 0 400 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: 400 }}
        aria-hidden="true"
      >
        <path
          d="M10 15 C60 15 80 5 120 15 C140 20 160 10 185 15 L190 15"
          stroke={color}
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="200" cy="15" r="4" fill={color} opacity="0.9" />
        <circle cx="193" cy="15" r="2" fill={color} opacity="0.6" />
        <circle cx="207" cy="15" r="2" fill={color} opacity="0.6" />
        {/* Tiny leaves */}
        <path
          d="M198 11 C200 7 203 7 202 11 Z"
          fill={color}
          opacity="0.8"
        />
        <path
          d="M198 19 C200 23 203 23 202 19 Z"
          fill={color}
          opacity="0.8"
        />
        <path
          d="M210 15 L215 15 C240 10 260 20 280 15 C320 5 340 15 390 15"
          stroke={color}
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

/**
 * ROYAL PEACOCK SILHOUETTE
 * Graceful Mewari peacock with crest and plume
 */
export function RoyalPeacock({ size = 80, flip = false, color = "#1A3636" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="peacockGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C378" />
          <stop offset="100%" stopColor="#C5A059" />
        </linearGradient>
      </defs>
      {/* Crown Crest */}
      <path d="M42 22 L45 28 M46 21 L47 28 M50 23 L48 29" stroke="url(#peacockGold)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="42" cy="21" r="1.5" fill="url(#peacockGold)" />
      <circle cx="46" cy="20" r="1.5" fill="url(#peacockGold)" />
      <circle cx="50" cy="22" r="1.5" fill="url(#peacockGold)" />

      {/* Head & Neck */}
      <path
        d="M48 28 C46 29 44 32 45 35 C46 38 49 40 50 43 C52 48 51 54 48 58 C44 63 38 68 34 74 C30 80 29 88 32 95 C35 101 42 105 50 105 C62 105 75 96 85 86 C94 76 102 62 105 48 C107 38 103 30 96 28 C88 26 80 34 76 42 C72 50 70 60 72 70"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Eye */}
      <circle cx="48" cy="33" r="1.2" fill={color} />
      {/* Beak */}
      <path d="M44 33 L39 34 L44 36 Z" fill="url(#peacockGold)" />

      {/* Plume details */}
      <circle cx="78" cy="46" r="4" stroke="url(#peacockGold)" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="86" cy="60" r="5" stroke="url(#peacockGold)" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="94" cy="74" r="5.5" stroke="url(#peacockGold)" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
  );
}

/**
 * ROYAL MONOGRAM CREST
 */
export function RoyalMonogram({ monogram = "R & V", size = 80 }) {
  return (
    <div
      className="monogram-crest flex flex-col items-center justify-center relative select-none"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <circle cx="50" cy="50" r="47" stroke="#C5A059" strokeWidth="1" opacity="0.8" />
        <circle cx="50" cy="50" r="43" stroke="#C5A059" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
      </svg>
      <span
        className="font-serif tracking-widest text-center"
        style={{
          fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
          fontSize: `${size * 0.28}px`,
          color: "#C5A059",
          letterSpacing: "0.15em",
        }}
      >
        {monogram}
      </span>
    </div>
  );
}

/**
 * SACRED LORD GANESHA LINE-ART
 * Auspicious Indian wedding invitation motif matching reference image
 */
export function GaneshaLineArt({ width = 44, height = 52, color = "#801B26", animate = true }) {
  const drawVariant = animate
    ? {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        },
      }
    : {};

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none pointer-events-none drop-shadow-sm"
      initial={animate ? "hidden" : "visible"}
      animate="visible"
    >
      {/* Crown / Mukut */}
      <motion.path
        d="M50 10 L50 20 M42 16 L50 10 L58 16 M38 24 L50 18 L62 24 M35 30 C45 28 55 28 65 30"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariant}
      />
      
      {/* Forehead & Sacred Tilak */}
      <motion.path
        d="M50 32 L50 42 M47 36 L53 36"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariant}
      />
      <circle cx="50" cy="30" r="1.8" fill={color} />

      {/* Main Face Contour, Trunk & Left Swirl */}
      <motion.path
        d="M40 32 C34 35 28 42 27 50 C26 58 31 66 38 72 C42 76 46 82 46 90 C46 98 42 104 36 104 C30 104 28 98 32 94 C35 91 40 92 41 96"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariant}
      />

      {/* Tusk & Right Cheek */}
      <motion.path
        d="M54 74 L60 74 M56 68 C62 66 68 60 70 52 C72 44 68 36 62 32"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={drawVariant}
      />

      {/* Ear Curves */}
      <motion.path
        d="M27 48 C20 46 14 52 16 62 C18 70 24 76 30 78 M70 48 C78 46 84 52 82 62 C80 70 74 76 66 78"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariant}
      />

      {/* Sacred Modak / Blessing Palm Accent */}
      <motion.path
        d="M62 82 C68 84 72 89 71 95 C70 100 64 104 58 102 C54 100 52 96 54 92"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        variants={drawVariant}
      />
    </motion.svg>
  );
}

/**
 * CALLIGRAPHIC INVITATION FLOURISH DIVIDER
 * Symmetrical vintage ornamental scroll divider matching reference image
 */
export function CalligraphicFlourish({ width = 160, height = 24, color = "#801B26" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none pointer-events-none"
    >
      {/* Central Blossom Motif */}
      <circle cx="100" cy="15" r="2.5" fill={color} />
      <path
        d="M100 8 C102 11 104 13 104 15 C104 17 102 19 100 22 C98 19 96 17 96 15 C96 13 98 11 100 8 Z"
        fill={color}
        opacity="0.85"
      />
      <circle cx="94" cy="15" r="1.5" fill={color} />
      <circle cx="106" cy="15" r="1.5" fill={color} />

      {/* Left Flourish Wing */}
      <path
        d="M92 15 C80 15 72 11 60 11 C45 11 35 21 24 21 C16 21 12 17 14 13 C16 9 22 10 22 14 C22 17 19 19 16 18 M60 11 C70 11 78 18 88 18"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right Flourish Wing (Symmetrical mirror) */}
      <path
        d="M108 15 C120 15 128 11 140 11 C155 11 165 21 176 21 C184 21 188 17 186 13 C184 9 178 10 178 14 C178 17 181 19 184 18 M140 11 C130 11 122 18 112 18"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

