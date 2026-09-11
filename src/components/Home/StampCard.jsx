import React from "react";
import { motion } from "framer-motion";

/**
 * Generates an authentic scalloped postage stamp perimeter path
 */
function generateStampPath(w, h, r = 2.8, pitch = 9.2) {
  let d = "";

  // Top edge: L -> R with inward scallops
  const numX = Math.floor((w - 14) / pitch);
  const startX = (w - (numX - 1) * pitch - r * 2) / 2;

  d += `M 0 0 `;
  d += `L ${startX} 0 `;
  for (let i = 0; i < numX; i++) {
    d += `A ${r} ${r} 0 0 0 ${startX + i * pitch + r * 2} 0 `;
    if (i < numX - 1) {
      d += `L ${startX + (i + 1) * pitch} 0 `;
    }
  }
  d += `L ${w} 0 `;

  // Right edge: T -> B with inward scallops
  const numY = Math.floor((h - 14) / pitch);
  const startY = (h - (numY - 1) * pitch - r * 2) / 2;

  d += `L ${w} ${startY} `;
  for (let i = 0; i < numY; i++) {
    d += `A ${r} ${r} 0 0 0 ${w} ${startY + i * pitch + r * 2} `;
    if (i < numY - 1) {
      d += `L ${w} ${startY + (i + 1) * pitch} `;
    }
  }
  d += `L ${w} ${h} `;

  // Bottom edge: R -> L with inward scallops
  d += `L ${w - startX} ${h} `;
  for (let i = 0; i < numX; i++) {
    d += `A ${r} ${r} 0 0 0 ${w - (startX + i * pitch + r * 2)} ${h} `;
    if (i < numX - 1) {
      d += `L ${w - (startX + (i + 1) * pitch)} ${h} `;
    }
  }
  d += `L 0 ${h} `;

  // Left edge: B -> T with inward scallops
  d += `L 0 ${h - startY} `;
  for (let i = 0; i < numY; i++) {
    d += `A ${r} ${r} 0 0 0 0 ${h - (startY + i * pitch + r * 2)} `;
    if (i < numY - 1) {
      d += `L 0 ${h - (startY + (i + 1) * pitch)} `;
    }
  }
  d += `Z`;

  return d;
}

export function StampCard({
  id,
  href,
  number = "01",
  tagline = "UDAIPUR",
  titleMain = "WEDDING",
  titleScript = "Invite",
  subtitle = "The Couple",
  detail = "Arusha & Akshit",
  footer = "ROYAL POSTAGE",
  color = "#801B26",
  innerBg = "#FAF7F0",
  aspectHeight = 185,
  onSelect,
  delay = 0,
  slideFrom = { x: 0, y: 35, rotate: 0 },
  duration = 1.2,
}) {
  const w = 174;
  const h = aspectHeight;
  const pathData = generateStampPath(w, h, 2.7, 9.2);

  return (
    <motion.a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onSelect?.(href.replace("#", ""));
      }}
      initial={{
        opacity: 0,
        x: slideFrom?.x ?? 0,
        y: slideFrom?.y ?? 35,
        rotate: slideFrom?.rotate ?? 0,
        scale: 0.88,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.96 }}
      className="relative w-full block cursor-pointer select-none group"
      style={{
        width: "100%",
        height: `${h}px`,
        position: "relative",
        display: "block",
        boxSizing: "border-box",
        filter: "drop-shadow(0 3px 8px rgba(26, 54, 54, 0.14))",
      }}
    >
      {/* PURE VECTOR SVG SCALLOPED POSTAGE STAMP */}
      <svg
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "block",
          overflow: "visible",
        }}
        preserveAspectRatio="none"
        viewBox={`0 0 ${w} ${h}`}
      >
        <defs>
          {/* Subtle Vintage Postal Waves Pattern */}
          <pattern id={`waves-${id}`} width="36" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 0 5 Q 9 0 18 5 T 36 5"
              fill="none"
              stroke={color}
              strokeWidth="0.65"
              opacity="0.12"
            />
            <path
              d="M 0 9 Q 9 4 18 9 T 36 9"
              fill="none"
              stroke={color}
              strokeWidth="0.65"
              opacity="0.12"
            />
          </pattern>
        </defs>

        {/* 1. Outer Scalloped Perforated Border */}
        <path d={pathData} fill={color} />

        {/* 2. Inner Parchment Paper Background */}
        <rect
          x="6.5"
          y="6.5"
          width={w - 13}
          height={h - 13}
          fill={innerBg}
        />

        {/* 3. Postal Cancellation Waves Overlay */}
        <rect
          x="6.5"
          y="6.5"
          width={w - 13}
          height={h - 13}
          fill={`url(#waves-${id})`}
        />

        {/* 4. Primary Inset Frame Border */}
        <rect
          x="9.5"
          y="9.5"
          width={w - 19}
          height={h - 19}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.55"
        />

        {/* 5. Secondary Delicate Dashed Frame Border */}
        <rect
          x="12"
          y="12"
          width={w - 24}
          height={h - 24}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.32"
          strokeDasharray="2.5 2"
        />

        {/* 6. Corner Decorative Dots */}
        <circle cx="10.5" cy="10.5" r="1.2" fill={color} opacity="0.65" />
        <circle cx={w - 10.5} cy="10.5" r="1.2" fill={color} opacity="0.65" />
        <circle cx="10.5" cy={h - 10.5} r="1.2" fill={color} opacity="0.65" />
        <circle cx={w - 10.5} cy={h - 10.5} r="1.2" fill={color} opacity="0.65" />
      </svg>

      {/* STAMP TYPOGRAPHY & DESIGN CONTENT */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "8px",
          right: "8px",
          bottom: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          padding: "3px 4px",
          pointerEvents: "none",
          zIndex: 10,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Top Header: Denomination & Tagline */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.46rem",
            letterSpacing: "0.14em",
            fontWeight: 700,
            color,
            fontFamily: "var(--font-royal, 'Cinzel', serif)",
            lineHeight: 1,
          }}
        >
          <span>{number}</span>
          <span style={{ opacity: 0.85 }}>{tagline}</span>
        </div>

        {/* Center Main Design Content */}
        <div
          style={{
            margin: "auto 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {titleMain && (
            <div
              style={{
                fontFamily: "var(--font-royal, 'Cinzel', serif)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1.1,
                color:
                  titleMain === "SAVE" || titleMain === "WEDDING" || titleMain === "FAMILY"
                    ? "#801B26"
                    : color,
                fontSize:
                  titleMain === "SAVE"
                    ? "0.74rem"
                    : titleMain === "WEDDING" || titleMain === "FAMILY"
                    ? "0.67rem"
                    : "0.58rem",
              }}
            >
              {titleMain}
            </div>
          )}

          {titleScript && (
            <div
              style={{
                fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                fontSize:
                  titleScript === "Invite" ||
                  titleScript === "Blessings" ||
                  titleScript === "Details" ||
                  titleScript === "Lineage"
                    ? "1.55rem"
                    : titleScript === "the"
                    ? "1.22rem"
                    : titleScript === "Gallery"
                    ? "1.65rem"
                    : "1.34rem",
                lineHeight: 0.95,
                color:
                  titleScript === "Invite" ||
                  titleScript === "Blessings" ||
                  titleScript === "Details" ||
                  titleScript === "Lineage" ||
                  titleScript === "Gallery" ||
                  titleScript === "Festivities"
                    ? "#801B26"
                    : color,
                margin: titleScript === "the" ? "-2px 0 -1px" : "-1px 0 0",
              }}
            >
              {titleScript}
            </div>
          )}

          {subtitle && (
            <div
              style={{
                fontFamily: "var(--font-royal, 'Cinzel', serif)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                lineHeight: 1.1,
                marginTop: "2px",
                color: titleMain === "SAVE" ? "#801B26" : "#1A3636",
                fontSize: titleMain === "SAVE" ? "0.74rem" : "0.49rem",
              }}
            >
              {subtitle}
            </div>
          )}

          {detail && (
            <div
              style={{
                fontSize: "0.43rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: "1px",
                opacity: 0.85,
                color: color === "#801B26" ? "#801B26" : "#444444",
                fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)",
                fontStyle: titleMain === "WEDDING" || titleMain === "FAMILY" ? "italic" : "normal",
              }}
            >
              {detail}
            </div>
          )}
        </div>

        {/* Bottom Footer: Official Postal Line */}
        <div
          style={{
            width: "85%",
            textAlign: "center",
            fontSize: "0.39rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.75,
            borderTop: "0.5px solid rgba(0,0,0,0.1)",
            paddingTop: "2px",
            color,
            fontFamily: "var(--font-sans, sans-serif)",
            lineHeight: 1,
          }}
        >
          {footer}
        </div>
      </div>
    </motion.a>
  );
}
