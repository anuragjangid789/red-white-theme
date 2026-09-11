import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * Generates an authentic scalloped postage stamp perimeter SVG path
 */
function generateStampPath(w, h, r = 2.4, pitch = 8.4) {
  let d = "";

  // Top edge: L -> R
  const numX = Math.floor((w - 10) / pitch);
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

  // Right edge: T -> B
  const numY = Math.floor((h - 10) / pitch);
  const startY = (h - (numY - 1) * pitch - r * 2) / 2;

  d += `L ${w} ${startY} `;
  for (let i = 0; i < numY; i++) {
    d += `A ${r} ${r} 0 0 0 ${w} ${startY + i * pitch + r * 2} `;
    if (i < numY - 1) {
      d += `L ${w} ${startY + (i + 1) * pitch} `;
    }
  }
  d += `L ${w} ${h} `;

  // Bottom edge: R -> L
  d += `L ${w - startX} ${h} `;
  for (let i = 0; i < numX; i++) {
    d += `A ${r} ${r} 0 0 0 ${w - (startX + i * pitch + r * 2)} ${h} `;
    if (i < numX - 1) {
      d += `L ${w - (startX + (i + 1) * pitch)} ${h} `;
    }
  }
  d += `L 0 ${h} `;

  // Left edge: B -> T
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

/**
 * StampFrame Component encapsulates a modern photo within a scalloped postage stamp
 */
function StampFrame({ src, alt, stampNo, year, location, width = 126, height = 146, rotation = 0 }) {
  const pathD = generateStampPath(width, height, 2.4, 8.4);
  const clipId = `stamp-clip-${stampNo}-${year}`;

  return (
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotation}deg)`,
        filter: "drop-shadow(0 6px 14px rgba(114, 2, 4, 0.16)) drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
        flexShrink: 0,
      }}
    >
      {/* SVG Clip Path Definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id={clipId}>
            <path d={pathD} />
          </clipPath>
        </defs>
      </svg>

      {/* Scalloped Stamp Paper Container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          clipPath: `url(#${clipId})`,
          backgroundColor: "#FAF7F0",
          backgroundImage: "linear-gradient(135deg, #FFFDF9 0%, #F5F0E6 100%)",
          padding: "7px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Inner Stamp Header Badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0 2px 3px 2px",
            fontSize: "0.38rem",
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#8A1C24",
            borderBottom: "0.5px solid rgba(138, 28, 36, 0.2)",
            marginBottom: "3px",
            userSelect: "none",
          }}
        >
          <span>{stampNo}</span>
          <span>{year}</span>
        </div>

        {/* Photo Container */}
        <div
          style={{
            position: "relative",
            flex: 1,
            width: "100%",
            borderRadius: "2px",
            overflow: "hidden",
            border: "0.75px solid rgba(138, 28, 36, 0.25)",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
            draggable="false"
          />

          {/* Postal Postmark Ink Cancellation Overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              right: "4px",
              border: "1px dashed rgba(114, 2, 4, 0.65)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(-18deg)",
              pointerEvents: "none",
              backgroundColor: "rgba(250, 247, 240, 0.45)",
              backdropFilter: "blur(0.5px)",
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.30rem",
                fontWeight: 700,
                color: "#720204",
                lineHeight: 1,
                letterSpacing: "0.08em",
              }}
            >
              {location}
            </span>
            <span
              style={{
                fontSize: "0.26rem",
                color: "#8A1C24",
                lineHeight: 1,
                marginTop: "1px",
              }}
            >
              ★ ★ ★
            </span>
          </div>
        </div>

        {/* Inner Stamp Footer Label */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: "3px",
            fontSize: "0.34rem",
            fontFamily: "'Cinzel', Georgia, serif",
            fontWeight: 700,
            letterSpacing: "0.16em",
            color: "#720204",
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          ROYAL POSTAGE
        </div>
      </div>
    </div>
  );
}

export function StorySection({ data, onBack, onNavigateIndex, pageHeight }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleBack = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onNavigateIndex) onNavigateIndex();
      else if (onBack) onBack();
    }, 850);
  };

  const stories = [
    {
      id: "story-1",
      order: "left", // Image on Left, Text on Right
      stampNo: "№ 01",
      year: "2021",
      location: "DELHI",
      eyebrow: "CHAPTER I · 2021",
      title: "The First Encounter",
      scriptTitle: "Beginning",
      description:
        "A serendipitous afternoon in New Delhi over a shared cup of coffee and hours of unbroken conversation that turned into a lifetime promise.",
      image: "/assets/story_1.jpg",
      rotation: -2.5,
    },
    {
      id: "story-2",
      order: "right", // Image on Right, Text on Left
      stampNo: "№ 02",
      year: "2023",
      location: "UDAIPUR",
      eyebrow: "CHAPTER II · 2023",
      title: "Sunset by the Lakes",
      scriptTitle: "Courtship",
      description:
        "Under the twilight skies of Lake Pichola, amid road trips and starlit walks, realizing their rhythms moved to the exact same timeless tempo.",
      image: "/assets/story_2.jpg",
      rotation: 2.5,
    },
    {
      id: "story-3",
      order: "left", // Image on Left, Text on Right
      stampNo: "№ 03",
      year: "2026",
      location: "PALACE",
      eyebrow: "CHAPTER III · 2026",
      title: "The Sacred Beginning",
      scriptTitle: "Forever",
      description:
        "Surrounded by beloved families, lifelong companions, and the sacred fire, stepping hand in hand into eternity.",
      image: "/assets/story_3.jpg",
      rotation: -2,
    },
  ];

  return (
    <motion.section
      id="story"
      className="story-page-canvas relative w-full paper-texture select-none flex flex-col justify-between items-center"
      initial={{ opacity: 0 }}
      animate={
        isExiting
          ? { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] } }
          : { opacity: 1, y: 0, scale: 1, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } }
      }
      style={{
        backgroundColor: "#E6E5DE",
        backgroundImage: "url(/assets/background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat-y",
        minHeight: pageHeight ? `${pageHeight}px` : "100%",
        height: pageHeight ? `${pageHeight}px` : "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
        paddingTop: "20px",
        paddingBottom: "14px",
        paddingLeft: "14px",
        paddingRight: "14px",
      }}
    >
      {/* ====================================================================
          TOP PAGE HEADER
          ==================================================================== */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 15,
          marginTop: "2px",
          marginBottom: "6px",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: -14 }}
          animate={
            isExiting
              ? { opacity: 0, y: -8, transition: { duration: 0.4 } }
              : { opacity: 1, y: 0, transition: { duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
            fontSize: "0.74rem",
            fontWeight: 700,
            letterSpacing: "0.26em",
            color: "#720204",
            textTransform: "uppercase",
            margin: "0 0 2px 0",
          }}
        >
          OUR STORY
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={
            isExiting
              ? { opacity: 0, y: -6, transition: { duration: 0.4, delay: 0.05 } }
              : { opacity: 1, y: 0, transition: { duration: 1.3, delay: 0.22, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "#8A1C24",
            textTransform: "uppercase",
            margin: "0",
          }}
        >
          A TAPESTRY OF MOMENTS
        </motion.p>
      </div>

      {/* ====================================================================
          3 STORY MOMENTS: LEFT - RIGHT - LEFT STAMP CARDS & DESCRIPTIONS
          ==================================================================== */}
      <div
        style={{
          width: "100%",
          maxWidth: "385px",
          display: "flex",
          flexDirection: "column",
          gap: "11px",
          zIndex: 20,
          margin: "0 auto",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {stories.map((story, idx) => {
          const isLeftImage = story.order === "left";
          const delay = 0.25 + idx * 0.18;

          return (
            <motion.div
              key={story.id}
              initial={{
                opacity: 0,
                x: isLeftImage ? -20 : 20,
                y: 12,
              }}
              animate={
                isExiting
                  ? {
                      opacity: 0,
                      x: isLeftImage ? -12 : 12,
                      transition: { duration: 0.4, delay: idx * 0.05 },
                    }
                  : {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: { duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] },
                    }
              }
              style={{
                display: "flex",
                flexDirection: isLeftImage ? "row" : "row-reverse",
                alignItems: "center",
                gap: "12px",
                width: "100%",
              }}
            >
              {/* Postage Stamp Photo */}
              <StampFrame
                src={story.image}
                alt={story.title}
                stampNo={story.stampNo}
                year={story.year}
                location={story.location}
                width={118}
                height={138}
                rotation={story.rotation}
              />

              {/* Title & Description Container */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: isLeftImage ? "left" : "right",
                  justifyContent: "center",
                  padding: "2px 0",
                }}
              >
                {/* Chapter Eyebrow */}
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.44rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "#8A1C24",
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}
                >
                  {story.eyebrow}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.86rem",
                    fontWeight: 700,
                    lineHeight: 1.18,
                    letterSpacing: "0.04em",
                    color: "#720204",
                    margin: "0 0 3px 0",
                  }}
                >
                  {story.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.64rem",
                    fontWeight: 600,
                    lineHeight: 1.32,
                    color: "#5C1318",
                    margin: 0,
                    letterSpacing: "0.01em",
                  }}
                >
                  {story.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ====================================================================
          BOTTOM SECTION: BLESSING & BACK TO INDEX BUTTON
          ==================================================================== */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 15,
          paddingBottom: "10px",
          marginTop: "6px",
        }}
      >
        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={
            isExiting
              ? { opacity: 0, y: 6, transition: { duration: 0.35 } }
              : { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.85, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "0.56rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#720204",
            textTransform: "uppercase",
            margin: "0 0 7px 0",
          }}
        >
          ✦ TWO HEARTS · ONE TIMELESS JOURNEY ✦
        </motion.p>

        {/* Back to Index Button */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={
            isExiting
              ? { opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.35 } }
              : { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, delay: 0.95, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            width: "100%",
            maxWidth: "185px",
          }}
        >
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="luxury-btn"
            style={{
              width: "100%",
              padding: "6px 14px",
              fontSize: "0.50rem",
              letterSpacing: "0.18em",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              cursor: "pointer",
              color: "#720204",
              borderColor: "rgba(114, 2, 4, 0.45)",
              background: "rgba(255, 255, 255, 0.9)",
              textTransform: "uppercase",
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>BACK TO INDEX</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
