import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const luxuryEase = [0.22, 1, 0.36, 1];

/**
 * Generates an authentic scalloped postage stamp perimeter SVG path
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

const PREWEDDING_CARDS = [
  {
    id: "pre-1",
    stampNo: "№ 01 / 04",
    title: "THE ROYAL JOURNEY",
    subtitle: "Through the golden hills & pine valleys of Rajasthan",
    src: "/assets/prewedding_1.jpg",
    alt: "Arusha & Akshit scenic prewedding road trip",
    location: "ARAVALLI HILLS · UDAIPUR",
    rate: "POSTAGE · ₹ 150",
    badge: "JOURNEY",
  },
  {
    id: "pre-2",
    stampNo: "№ 02 / 04",
    title: "WHISPERS OF LOVE",
    subtitle: "A tender gaze, a thousand promises spoken in silence",
    src: "/assets/prewedding_2.jpg",
    alt: "Arusha & Akshit intimate prewedding portrait",
    location: "ROYAL RETREAT · MEWAR",
    rate: "POSTAGE · ₹ 150",
    badge: "PORTRAIT",
  },
  {
    id: "pre-3",
    stampNo: "№ 03 / 04",
    title: "LAKE PICHOLA SUNSET",
    subtitle: "Where golden Mewari skies meet tranquil palace waters",
    src: "/assets/prewedding_3.jpg",
    alt: "The Oberoi Udaivilas palace at sunset",
    location: "THE OBEROI UDAIVILAS · PICHOLA",
    rate: "HERITAGE · 2026",
    badge: "SANCTUARY",
  },
  {
    id: "pre-4",
    stampNo: "№ 04 / 04",
    title: "THE SACRED PROMISE",
    subtitle: "Two souls united in timeless devotion and cherished vows",
    src: "/assets/prewedding_4.jpg",
    alt: "Bridal mehendi hands held in eternal union",
    location: "ROYAL COURTYARD · UDAIPUR",
    rate: "SACRED UNION",
    badge: "DEVOTION",
  },
];

export function GallerySection({ data, onBack, onNavigateIndex, pageHeight }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  const handleBack = () => {
    if (onBack) onBack();
    else if (onNavigateIndex) onNavigateIndex();
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PREWEDDING_CARDS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PREWEDDING_CARDS.length) % PREWEDDING_CARDS.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Strict scroll lock while Gallery page is active & horizontal trackpad/wheel card flipping
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    let wheelTimeout = null;
    const handleWheel = (e) => {
      e.preventDefault();
      if (wheelTimeout) return;
      if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
        if (e.deltaX > 15 || e.deltaY > 15) {
          handleNext();
        } else if (e.deltaX < -15 || e.deltaY < -15) {
          handlePrev();
        }
        wheelTimeout = setTimeout(() => {
          wheelTimeout = null;
        }, 350);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 45;
    const velocityThreshold = 220;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }
  };

  const stampW = 226;
  const stampH = 308;
  const stampPath = generateStampPath(stampW, stampH, 2.6, 9.2);

  return (
    <motion.section
      id="gallery"
      className="gallery-page-canvas relative w-full h-full min-h-full flex flex-col justify-between items-center select-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: luxuryEase }}
      style={{
        backgroundColor: "#E6E5DE",
        backgroundImage: "url(/assets/background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        minHeight: "100%",
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        overflowY: "hidden",
        overflowX: "hidden",
        touchAction: "none",
        overscrollBehavior: "none",
        paddingTop: "58px",
        paddingBottom: "46px",
      }}
    >
      {/* ====================================================================
          BACKGROUND ORNAMENTS LAYER (STRICTLY CONTAINED & CLIPPED AT BOUNDARIES)
          ==================================================================== */}
      <div
        className="gallery-decorations-layer"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Top Pearl Strand Arch */}
        <div
          style={{
            position: "absolute",
            top: "-268px",
            left: "-10px",
            transform: "rotate(2deg)",
            pointerEvents: "none",
            zIndex: 12,
            userSelect: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: -25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: luxuryEase }}
            style={{ width: "340px" }}
          >
            <img
              src="/assets/pearl_clean.png"
              alt="Royal Pearl Arch"
              style={{ width: "100%", height: "auto", display: "block" }}
              draggable="false"
            />
          </motion.div>
        </div>

        {/* Bottom-Right Pearl Garland */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "-30px",
            transform: "rotate(14deg)",
            pointerEvents: "none",
            zIndex: 12,
            userSelect: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 25, y: 25 }}
            animate={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 0.65, ease: luxuryEase, delay: 0.05 }}
            style={{ width: "230px" }}
          >
            <img
              src="/assets/pearl_clean.png"
              alt="Royal Pearl Garland"
              style={{ width: "100%", height: "auto", display: "block" }}
              draggable="false"
            />
          </motion.div>
        </div>

        {/* Top-Right Red Accent Stem */}
        <div
          style={{
            position: "absolute",
            top: "-52px",
            right: "-62px",
            transform: "rotate(340deg)",
            pointerEvents: "none",
            zIndex: 8,
            userSelect: "none",
            opacity: 0.85,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.78, x: 20, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            style={{ width: "155px" }}
          >
            <img
              src="/assets/flower_clean.png"
              alt="Botanical Floral Ornament"
              style={{ width: "100%", height: "auto", display: "block" }}
              draggable="false"
            />
          </motion.div>
        </div>

        {/* Bottom-Left Red Botanical Blossom */}
        <div
          style={{
            position: "absolute",
            bottom: "-125px",
            left: "-135px",
            transform: "rotate(20deg)",
            pointerEvents: "none",
            zIndex: 8,
            userSelect: "none",
            opacity: 0.9,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.78, x: -20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            style={{ width: "215px" }}
          >
            <img
              src="/assets/flower_clean.png"
              alt="Botanical Red Floral Ornament"
              style={{ width: "100%", height: "auto", display: "block" }}
              draggable="false"
            />
          </motion.div>
        </div>
      </div>

      {/* ====================================================================
          MAIN GALLERY CONTAINER (STRICTLY NON-SCROLLABLE FULL-VIEWPORT)
          ==================================================================== */}
      <div className="w-full flex-1 flex flex-col items-center justify-between z-20 px-3 relative max-w-[390px] mx-auto h-full overflow-hidden">

        {/* 1. TOP CALLIGRAPHY TITLE & SUBTITLE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: luxuryEase }}
          className="gallery-title-wrapper text-center w-full"
        >
          <h2
            style={{
              fontFamily: "'Pinyon Script', 'Alex Brush', 'Great Vibes', cursive",
              fontSize: "2.8rem",
              lineHeight: 1.0,
              color: "#801B26",
              fontWeight: 400,
              letterSpacing: "0.02em",
              textShadow: "0 1px 2px rgba(128, 27, 38, 0.12)",
              margin: 0,
            }}
          >
            The Gallery
          </h2>
          <p
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "0.52rem",
              fontWeight: 700,
              letterSpacing: "0.24em",
              color: "#A4313B",
              margin: "1px 0 0 0",
              textTransform: "uppercase",
            }}
          >
            Pre-Wedding Moments · Udaipur
          </p>
        </motion.div>

        {/* 2. STAMP FRAME CARD DECK (SLIDED BY FINGER) */}
        <div
          className="relative flex items-center justify-center my-auto"
          style={{
            width: `${stampW + 20}px`,
            height: `${stampH + 16}px`,
            perspective: 1000,
            touchAction: "none",
          }}
        >
          {/* SVG Clip-Path Definition for Scalloped Postage Stamp Frame */}
          <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
            <defs>
              <clipPath id="gallery-stamp-clip">
                <path d={stampPath} />
              </clipPath>
            </defs>
          </svg>

          {/* Render Stacked Cards (Back to Front) */}
          {[3, 2, 1, 0].map((offset) => {
            const cardIdx = (currentIndex + offset) % PREWEDDING_CARDS.length;
            const card = PREWEDDING_CARDS[cardIdx];
            const isFront = offset === 0;

            // Stack layout transformations
            const scale = 1 - offset * 0.06;
            const yOffset = offset * 10;
            const rot = offset === 0 ? 0 : offset === 1 ? 2.5 : offset === 2 ? -2.5 : 3.5;
            const opacity = offset === 0 ? 1 : offset === 1 ? 0.88 : offset === 2 ? 0.6 : 0.28;

            return (
              <motion.div
                key={card.id}
                layout
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.75}
                onDragEnd={isFront ? handleDragEnd : undefined}
                whileDrag={isFront ? { cursor: "grabbing" } : undefined}
                animate={{
                  scale,
                  y: yOffset,
                  rotate: rot,
                  opacity,
                  zIndex: 30 - offset * 5,
                }}
                transition={{
                  duration: 0.45,
                  ease: luxuryEase,
                }}
                style={{
                  position: "absolute",
                  width: `${stampW}px`,
                  height: `${stampH}px`,
                  cursor: isFront ? "grab" : "default",
                  touchAction: "none",
                  filter: isFront
                    ? "drop-shadow(0 14px 28px rgba(128, 27, 38, 0.22)) drop-shadow(0 4px 10px rgba(0,0,0,0.12))"
                    : "drop-shadow(0 8px 16px rgba(0,0,0,0.10))",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                {/* Authentic Scalloped Stamp Paper Shell */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    clipPath: "url(#gallery-stamp-clip)",
                    backgroundColor: "#FAF7F0",
                    backgroundImage: "linear-gradient(145deg, #FFFDF9 0%, #F5EFE6 100%)",
                    padding: "7px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  {/* Subtle Inner Double Border */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "6px",
                      border: "0.75px solid rgba(128, 27, 38, 0.35)",
                      pointerEvents: "none",
                      borderRadius: "1px",
                    }}
                  />

                  {/* Stamp Header Badge */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      padding: "2px 4px 3px 4px",
                      fontSize: "0.39rem",
                      fontFamily: "'Cinzel', Georgia, serif",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      color: "#801B26",
                      borderBottom: "0.5px solid rgba(128, 27, 38, 0.2)",
                      userSelect: "none",
                    }}
                  >
                    <span>{card.stampNo}</span>
                    <span style={{ color: "#C5A059", letterSpacing: "0.18em" }}>✦ A & A ✦</span>
                    <span>{card.badge}</span>
                  </div>

                  {/* Stamp Photo Frame */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "202px",
                      overflow: "hidden",
                      borderRadius: "2px",
                      border: "0.5px solid rgba(128, 27, 38, 0.22)",
                      boxShadow: "inset 0 2px 6px rgba(0,0,0,0.25)",
                      backgroundColor: "#000",
                    }}
                  >
                    <img
                      src={card.src}
                      alt={card.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                      }}
                      draggable="false"
                    />

                    {/* Vintage Postal Postmark Ink Cancellation Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "6px",
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        border: "1px dashed rgba(128, 27, 38, 0.45)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "rotate(-14deg)",
                        pointerEvents: "none",
                        color: "#801B26",
                        opacity: 0.7,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.32rem",
                          fontFamily: "'Cinzel', Georgia, serif",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textAlign: "center",
                          lineHeight: 1.1,
                        }}
                      >
                        ROYAL POST
                        <br />
                        <span style={{ fontSize: "0.28rem", color: "#C5A059" }}>★ 2026 ★</span>
                        <br />
                        UDAIPUR
                      </div>
                    </div>
                  </div>

                  {/* Stamp Footer Details */}
                  <div
                    style={{
                      padding: "4px 3px 2px 3px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "0.86rem",
                        fontWeight: 700,
                        color: "#801B26",
                        letterSpacing: "0.04em",
                        lineHeight: 1.15,
                        margin: "0 0 1px 0",
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "0.68rem",
                        fontStyle: "italic",
                        color: "#5C5652",
                        lineHeight: 1.2,
                        maxWidth: "210px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      "{card.subtitle}"
                    </div>

                    {/* Bottom Rate & Location Bar */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        borderTop: "0.5px solid rgba(128, 27, 38, 0.16)",
                        paddingTop: "2px",
                        marginTop: "3px",
                        fontSize: "0.36rem",
                        fontFamily: "'Cinzel', Georgia, serif",
                        fontWeight: 600,
                        color: "#7D7571",
                        letterSpacing: "0.08em",
                      }}
                    >
                      <span>{card.location}</span>
                      <span style={{ color: "#801B26", fontWeight: 700 }}>{card.rate}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3. NAVIGATION CONTROLS & HINT */}
        <div className="gallery-bottom-nav flex flex-col items-center gap-1.5 w-full mt-auto pb-1">
          {/* Swipe Hint & Active Counter */}
          <div className="flex items-center justify-between w-full max-w-[270px] px-1 text-[0.58rem]">
            {/* Prev Arrow */}
            <motion.button
              type="button"
              onClick={handlePrev}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/95 border border-[#801B26]/40 text-[#801B26] hover:bg-[#801B26] hover:text-white transition-all shadow-md cursor-pointer"
              aria-label="Previous Prewedding Card"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.button>

            {/* Dot Progress Indicators */}
            <div className="flex items-center gap-1.5">
              {PREWEDDING_CARDS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: currentIndex === idx ? "18px" : "6px",
                    height: "6px",
                    backgroundColor: currentIndex === idx ? "#801B26" : "rgba(128, 27, 38, 0.28)",
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/95 border border-[#801B26]/40 text-[#801B26] hover:bg-[#801B26] hover:text-white transition-all shadow-md cursor-pointer"
              aria-label="Next Prewedding Card"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>
          </div>

          <p
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "0.48rem",
              letterSpacing: "0.14em",
              color: "#7D7571",
              margin: "1px 0 2px 0",
              textTransform: "uppercase",
            }}
          >
            ✦ Slide card with finger to reveal next ✦
          </p>

          {/* Back to Index Button */}
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="gallery-back-btn luxury-btn flex items-center justify-center gap-1.5"
            style={{
              padding: "5px 16px",
              fontSize: "0.52rem",
              letterSpacing: "0.18em",
              color: "#801B26",
              borderColor: "rgba(128, 27, 38, 0.45)",
              background: "rgba(255, 255, 255, 0.88)",
              cursor: "pointer",
              textTransform: "uppercase",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>BACK TO INDEX</span>
          </motion.button>
        </div>

      </div>
    </motion.section>
  );
}

export default GallerySection;
