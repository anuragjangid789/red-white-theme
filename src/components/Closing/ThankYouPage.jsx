import React from "react";
import { motion } from "framer-motion";
import { PichwaiDivider } from "../Shared/PichwaiMotifs";

export function ThankYouPage({
  data,
  onReplayIntro,
  onScrollToTop,
  onNavigateHome,
  showNav = false,
  pageHeight,
}) {
  const { closing, identity } = data;
  const bride = identity?.brideName || data.couple?.bride?.name || "Arusha";
  const groom = identity?.groomName || data.couple?.groom?.name || "Akshit";

  const handleScrollTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const scrollEl = document.querySelector(".inner-app-scroll");
      if (scrollEl) {
        scrollEl.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      id="thank-you"
      className="home-snap-page page-bg-embossed relative w-full paper-texture py-6 px-4 flex flex-col items-center justify-center text-center select-none"
      style={{
        backgroundColor: "#E6E5DE",
        backgroundImage: "url(/assets/background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: pageHeight ? `${pageHeight}px` : "var(--screen-height, 100vh)",
        height: pageHeight ? `${pageHeight}px` : "var(--screen-height, 100vh)",
        maxHeight: pageHeight ? `${pageHeight}px` : "var(--screen-height, 100vh)",
        overflow: "hidden",
      }}
    >
      {/* Top seamless blend to previous page */}
      <div className="page-seam-blend page-seam-blend-top" />

      {/* ====================================================================
          FLORAL & PEARL CORNER DECORATIONS (EXACT HOME PAGE SYMMETRY)
          ==================================================================== */}

      {/* 1. TOP ARCH: PEARL STRING (Z-INDEX 50 TO OVERLAP INTO INDEX PAGE) */}
      <div
        style={{
          position: "absolute",
          top: "-298px",
          left: "-20px",
          transform: "rotate(25deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 50,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
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

      {/* 2A. TOP-RIGHT: PRIMARY RED FLOWER */}
      <div
        style={{
          position: "absolute",
          top: "0px",
          right: "-40px",
          transform: "rotate(340deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 35,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 30, y: -30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ width: "165px" }}
        >
          <img
            src="/assets/flower_clean.png"
            alt="Botanical Flower Ornament"
            style={{ width: "100%", height: "auto", display: "block" }}
            draggable="false"
          />
        </motion.div>
      </div>

      {/* BOTTOM DECORATIONS CONTAINER: Clipped at bottom boundary to strictly prevent scroll leakage past thank you page */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 40,
        }}
      >
        {/* 3. BOTTOM-LEFT: RED FLOWER */}
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "-120px",
            transform: "rotate(45deg)",
            transformOrigin: "bottom left",
            pointerEvents: "none",
            zIndex: 45,
            userSelect: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.75, x: -30, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            style={{ width: "155px" }}
          >
            <img
              src="/assets/flower_clean.png"
              alt="Botanical Red Blossom"
              style={{ width: "100%", height: "auto", display: "block" }}
              draggable="false"
            />
          </motion.div>
        </div>

        {/* 4. BOTTOM-RIGHT: PEARL STRING */}
        <div
          style={{
            position: "absolute",
            bottom: "-105px",
            right: "18px",
            transform: "rotate(97deg)",
            transformOrigin: "center center",
            pointerEvents: "none",
            zIndex: 48,
            userSelect: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ width: "300px" }}
          >
            <img
              src="/assets/pearl_clean.png"
              alt="Royal Pearl String"
              style={{ width: "100%", height: "auto", display: "block" }}
              draggable="false"
            />
          </motion.div>
        </div>

        {/* 5. BOTTOM-RIGHT: ACCENT RED FLOWER HEAD */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "-30px",
            transform: "rotate(330deg)",
            transformOrigin: "center center",
            pointerEvents: "none",
            zIndex: 32,
            userSelect: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.75, x: 25, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{ width: "120px" }}
          >
            <img
              src="/assets/flower_clean.png"
              alt="Botanical Red Blossom Corner"
              style={{ width: "100%", height: "auto", display: "block" }}
              draggable="false"
            />
          </motion.div>
        </div>
      </div>

      {/* Top Navigation Bar (Only if standalone page) */}
      {showNav && (
        <div className="absolute top-2 left-0 right-0 z-20 w-full max-w-md mx-auto flex items-center justify-between px-4 pt-1 pb-2 border-b border-[rgba(197,160,89,0.18)]">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-[#801B26] font-medium hover:text-[#C5A059] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>HOME</span>
          </button>

          <span
            className="text-[0.65rem] uppercase tracking-[0.25em] text-[#C5A059] font-semibold"
            style={{ fontFamily: "var(--font-royal)" }}
          >
            GRATITUDE
          </span>

          <button
            type="button"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#801B26] font-medium hover:text-[#C5A059] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>TOP</span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      )}

      {/* ====================================================================
          MINIMALIST ROYAL CENTER CONTENT:
          1. THANK YOU HEADING
          2. HEARTFELT GRATITUDE SUBTITLE
          3. ENHANCED EMOTIONAL SENTIMENT COPY (1-2 LINES)
          4. PICHWAI DIVIDER
          5. COUPLE NAMES & FAMILIES
          ==================================================================== */}
      <div className="container relative z-20 flex flex-col items-center justify-center max-w-md mx-auto my-auto py-3">
        {/* 1. Thank You Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
            fontSize: "1.45rem",
            fontWeight: 700,
            letterSpacing: "0.26em",
            color: "#801B26",
            textTransform: "uppercase",
            margin: "0 0 3px 0",
            lineHeight: 1.2,
          }}
        >
          THANK YOU
        </motion.h2>

        {/* 2. Subtitle: With Heartfelt Gratitude */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            color: "#801B26",
            textTransform: "uppercase",
            lineHeight: 1.4,
            margin: "2px 0 6px 0",
            fontWeight: 600,
          }}
        >
          With Heartfelt Gratitude
        </motion.p>

        {/* 3. Enhanced Sentiment Copy (1-2 lines added) */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.05, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.86rem",
            fontStyle: "italic",
            letterSpacing: "0.015em",
            color: "#801B26",
            lineHeight: 1.5,
            margin: "4px 0 10px 0",
            fontWeight: 500,
            maxWidth: "310px",
            textAlign: "center",
          }}
        >
          <span className="block">Your love, blessings, and cherished presence</span>
          <span className="block">mean the world to us as we begin our forever.</span>
        </motion.p>

        {/* 4. Ornate Pichwai Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.1, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "4px 0 12px 0",
          }}
        >
          <PichwaiDivider width="56%" height={16} color="#801B26" />
        </motion.div>

        {/* 5. Couple Name in 3 Rows */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "2px 0",
          }}
        >
          {/* Row 1: Bride */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 14 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.15, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <h1
              style={{
                fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                fontSize: "2.65rem",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#801B26",
                letterSpacing: "0.02em",
                margin: 0,
                whiteSpace: "nowrap",
                textShadow: "0 1px 2px rgba(128, 27, 38, 0.12)",
              }}
            >
              {bride}
            </h1>
          </motion.div>

          {/* Row 2: Ampersand in Middle Separate Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.95, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
              fontSize: "1.45rem",
              lineHeight: 1,
              color: "#801B26",
              margin: "1px 0",
              userSelect: "none",
            }}
          >
            &amp;
          </motion.div>

          {/* Row 3: Groom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 14 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.15, delay: 0.60, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <h1
              style={{
                fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                fontSize: "2.65rem",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#801B26",
                letterSpacing: "0.02em",
                margin: 0,
                whiteSpace: "nowrap",
                textShadow: "0 1px 2px rgba(128, 27, 38, 0.12)",
              }}
            >
              {groom}
            </h1>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
