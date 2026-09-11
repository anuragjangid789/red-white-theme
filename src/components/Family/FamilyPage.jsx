import React, { useState } from "react";
import { motion } from "framer-motion";

export function FamilyPage({ data, onBack, onNavigateIndex, pageHeight }) {
  const { identity } = data;

  const bride = identity.brideName || "Arusha";
  const groom = identity.groomName || "Akshit";
  const venue = identity.venueName || "The Oberoi Udaivilas, Lake Pichola";
  const groomGrandparents2 =
    identity.groomGrandparentsLine2 || "& LATE SHRI VISHANDAS KHATRI";

  const [isExiting, setIsExiting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Smooth slow back navigation with exit animation
  const handleBack = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onNavigateIndex) onNavigateIndex();
      else if (onBack) onBack();
    }, 850);
  };

  return (
    <motion.section
      id="family-page"
      className="family-page-canvas relative w-full paper-texture select-none flex flex-col justify-between items-center"
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
        paddingTop: "var(--family-page-pad-top, 22px)",
        paddingBottom: "var(--family-page-pad-bottom, 12px)",
        paddingLeft: "12px",
        paddingRight: "12px",
      }}
    >
      {/* ====================================================================
          BOTANICAL FLOWER ORNAMENTS: TOP-LEFT & BOTTOM-RIGHT (TOWARDS CENTER)
          ==================================================================== */}

      {/* 1. TOP-LEFT FLOWER (PEEKING INTO VIEW TOWARDS CENTER) */}
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: "-6px",
          transform: "rotate(32deg)",
          transformOrigin: "top left",
          pointerEvents: "none",
          zIndex: 8,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.75, x: -24, y: -24 }}
          animate={
            isExiting
              ? { opacity: 0, scale: 0.8, x: -16, y: -16, transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] } }
              : { opacity: 0.9, scale: 1, x: 0, y: 0, transition: { duration: 1.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{ width: "min(135px, 28vw)" }}
        >
          <img
            src="/assets/flower_clean.png"
            alt="Botanical Flower Ornament Top Left"
            style={{ width: "100%", height: "auto", display: "block" }}
            draggable="false"
          />
        </motion.div>
      </div>

      {/* 2. BOTTOM-RIGHT FLOWER (PEEKING INTO VIEW TOWARDS CENTER) */}
      <div
        style={{
          position: "absolute",
          bottom: "2px",
          right: "-6px",
          transform: "rotate(212deg)",
          transformOrigin: "bottom right",
          pointerEvents: "none",
          zIndex: 8,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.75, x: 24, y: 24 }}
          animate={
            isExiting
              ? { opacity: 0, scale: 0.8, x: 16, y: 16, transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] } }
              : { opacity: 0.9, scale: 1, x: 0, y: 0, transition: { duration: 1.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{ width: "min(140px, 30vw)" }}
        >
          <img
            src="/assets/flower_clean.png"
            alt="Botanical Red Blossom Bottom Right"
            style={{ width: "100%", height: "auto", display: "block" }}
            draggable="false"
          />
        </motion.div>
      </div>

      {/* ====================================================================
          TOP PAGE HEADER WITH APPEARING / DISAPPEARING ANIMATION
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
          marginTop: "1px",
          marginBottom: "1px",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={
            isExiting
              ? { opacity: 0, y: -10, transition: { duration: 0.45 } }
              : { opacity: 1, y: 0, transition: { duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.26em",
            color: "#720204",
            textTransform: "uppercase",
            margin: "0 0 2px 0",
          }}
        >
          FAMILY DETAILS
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={
            isExiting
              ? { opacity: 0, y: -6, transition: { duration: 0.45, delay: 0.05 } }
              : { opacity: 1, y: 0, transition: { duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.60rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#8A1C24",
            textTransform: "uppercase",
            margin: "0",
          }}
        >
          THE RELAN &amp; KHATRI FAMILIES
        </motion.p>
      </div>

      {/* ====================================================================
          TOP FAMILY SIDE SWITCHER TABS
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={
          isExiting
            ? { opacity: 0, y: -4, transition: { duration: 0.35 } }
            : { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }
        }
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          zIndex: 25,
          margin: "2px 0 6px 0",
        }}
      >
        <button
          type="button"
          onClick={() => setIsFlipped(false)}
          style={{
            padding: "5px 16px",
            borderRadius: "20px",
            border: !isFlipped ? "1px solid #720204" : "1px solid rgba(114, 2, 4, 0.2)",
            background: !isFlipped
              ? "linear-gradient(135deg, #720204 0%, #8A1C24 100%)"
              : "rgba(255, 255, 255, 0.8)",
            color: !isFlipped ? "#FFF8F0" : "#720204",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.54rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: !isFlipped
              ? "0 4px 12px rgba(114, 2, 4, 0.28)"
              : "0 2px 6px rgba(0,0,0,0.04)",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Bride's Side
        </button>

        <button
          type="button"
          onClick={() => setIsFlipped(true)}
          style={{
            padding: "5px 16px",
            borderRadius: "20px",
            border: isFlipped ? "1px solid #720204" : "1px solid rgba(114, 2, 4, 0.2)",
            background: isFlipped
              ? "linear-gradient(135deg, #720204 0%, #8A1C24 100%)"
              : "rgba(255, 255, 255, 0.8)",
            color: isFlipped ? "#FFF8F0" : "#720204",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.54rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: isFlipped
              ? "0 4px 12px rgba(114, 2, 4, 0.28)"
              : "0 2px 6px rgba(0,0,0,0.04)",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Groom's Side
        </button>
      </motion.div>

      {/* ====================================================================
          MAIN SECTION: 3D FLIPPABLE LUXURY ROYAL CARD WITH SHINE ANIMATION
          ==================================================================== */}
      <motion.div
        className="family-3d-card-wrapper"
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={
          isExiting
            ? { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.55 } }
            : { opacity: 1, scale: 1, y: 0, transition: { duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] } }
        }
        style={{
          perspective: "1400px",
          width: "92%",
          maxWidth: "385px",
          height: "438px",
          margin: "0 auto",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <motion.div
          className="family-3d-card-inner"
          animate={{
            rotateY: isFlipped ? 180 : 0,
            rotateZ: isFlipped ? -0.8 : 0,
          }}
          transition={{
            duration: 0.85,
            ease: [0.34, 1.25, 0.64, 1],
          }}
          whileHover={{
            scale: 1.02,
            y: -4,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.98 }}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            borderRadius: "16px",
            boxShadow: isFlipped
              ? "0 24px 50px -10px rgba(114, 2, 4, 0.32), 0 10px 24px rgba(0, 0, 0, 0.16), 0 0 0 1.5px rgba(197, 160, 89, 0.6)"
              : "0 24px 50px -10px rgba(114, 2, 4, 0.30), 0 10px 24px rgba(0, 0, 0, 0.14), 0 0 0 1.5px rgba(197, 160, 89, 0.6)",
          }}
        >
          {/* =================================================================
              FRONT FACE: THE BRIDE'S SIDE (THE RELAN FAMILY)
              ================================================================= */}
          <div
            className="family-card-face family-card-front"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: "16px",
              backgroundColor: "#FFFDF9",
              backgroundImage:
                "radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.96) 0%, rgba(247, 240, 227, 0.94) 100%), repeating-linear-gradient(45deg, rgba(197, 160, 89, 0.03) 0px, rgba(197, 160, 89, 0.03) 2px, transparent 2px, transparent 6px), url('/assets/background.webp')",
              backgroundBlendMode: "normal, normal, multiply",
              backgroundSize: "cover, auto, 240px",
              border: "1.5px solid #C5A059",
              padding: "18px 20px 14px 20px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
              overflow: "hidden",
              boxShadow: "inset 0 0 25px rgba(197, 160, 89, 0.18)",
            }}
          >
            {/* Subtle Luxury Card Shine / Light Glint Animation */}
            <motion.div
              animate={{
                x: ["-140%", "240%"],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "55%",
                height: "100%",
                background:
                  "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.38) 50%, rgba(255, 248, 230, 0.45) 54%, transparent 80%)",
                transform: "skewX(-22deg)",
                pointerEvents: "none",
                zIndex: 8,
              }}
            />

            {/* Center Royal Watermark Crest */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isExiting ? { opacity: 0 } : { opacity: 0.06, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "180px",
                height: "180px",
                pointerEvents: "none",
                backgroundImage: "url('/assets/flower_clean.png')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: 1,
              }}
            />

            {/* Ornate Gold Inset Border & Corner Accents */}
            <div
              style={{
                position: "absolute",
                top: "6px",
                left: "6px",
                right: "6px",
                bottom: "6px",
                border: "1.2px solid rgba(197, 160, 89, 0.65)",
                borderRadius: "11px",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "9px",
                left: "9px",
                right: "9px",
                bottom: "9px",
                border: "0.5px dashed rgba(114, 2, 4, 0.35)",
                borderRadius: "8px",
                pointerEvents: "none",
              }}
            />

            {/* Corner Decorative Ornaments */}
            <span style={{ position: "absolute", top: "9px", left: "9px", color: "#C5A059", fontSize: "0.65rem", lineHeight: 1, pointerEvents: "none" }}>✤</span>
            <span style={{ position: "absolute", top: "9px", right: "9px", color: "#C5A059", fontSize: "0.65rem", lineHeight: 1, pointerEvents: "none" }}>✤</span>
            <span style={{ position: "absolute", bottom: "9px", left: "9px", color: "#C5A059", fontSize: "0.65rem", lineHeight: 1, pointerEvents: "none" }}>✤</span>
            <span style={{ position: "absolute", bottom: "9px", right: "9px", color: "#C5A059", fontSize: "0.65rem", lineHeight: 1, pointerEvents: "none" }}>✤</span>

            {/* Top Royal Badge with Staggered Appearing/Disappearing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isExiting ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25 }}
              style={{ position: "relative", zIndex: 2 }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "0.56rem",
                  letterSpacing: "0.22em",
                  fontWeight: 700,
                  color: "#8A1C24",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "2px",
                  lineHeight: 1.2,
                }}
              >
                ✦ THE BRIDE'S SIDE ✦
              </span>
              <span
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                  color: "#720204",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                THE RELAN FAMILY
              </span>
            </motion.div>

            {/* Center: Bride Calligraphy & Lineage */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                margin: "auto 0",
              }}
            >
              <motion.h3
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={isExiting ? { opacity: 0, scale: 0.92, y: -4 } : { opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.35 }}
                style={{
                  fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                  fontSize: "3.15rem",
                  fontWeight: 400,
                  lineHeight: 1.02,
                  color: "#720204",
                  margin: "0 0 5px 0",
                  textShadow: "0 2px 4px rgba(114, 2, 4, 0.12)",
                }}
              >
                {bride}
              </motion.h3>

              {/* Daughter Of */}
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={isExiting ? { opacity: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.42 }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.50rem",
                  letterSpacing: "0.24em",
                  color: "#8A1C24",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "3px",
                  lineHeight: 1.2,
                }}
              >
                DAUGHTER OF
              </motion.span>

              {/* Parents */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={isExiting ? { opacity: 0, y: -4 } : { opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.48 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#720204",
                    textTransform: "uppercase",
                    lineHeight: 1.32,
                  }}
                >
                  SMT. MANISHA RELAN
                </span>
                <span
                  style={{
                    fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#720204",
                    textTransform: "uppercase",
                    lineHeight: 1.32,
                  }}
                >
                  &amp; SHRI RAKESH RELAN
                </span>
              </motion.div>

              {/* Gold Filigree Divider */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isExiting ? { opacity: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.54 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "60%",
                  margin: "2px 0 6px 0",
                }}
              >
                <div style={{ flex: 1, height: "0.75px", background: "linear-gradient(90deg, transparent, #C5A059)" }} />
                <span style={{ color: "#C5A059", fontSize: "0.52rem" }}>❖</span>
                <div style={{ flex: 1, height: "0.75px", background: "linear-gradient(90deg, #C5A059, transparent)" }} />
              </motion.div>

              {/* Granddaughter Of */}
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={isExiting ? { opacity: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.6 }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.48rem",
                  letterSpacing: "0.22em",
                  color: "#8A1C24",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "3px",
                  lineHeight: 1.2,
                }}
              >
                GRANDDAUGHTER OF
              </motion.span>

              {/* Grandparents in 2 Rows */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={isExiting ? { opacity: 0, y: -4 } : { opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.66 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "#8A1C24",
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  SMT. PUSHPA
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "#8A1C24",
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  &amp; SHRI CHANDRABAN JI RELAN
                </span>
              </motion.div>
            </div>

            {/* Bottom Flip Indicator Button (Moved upside, arrow removed, animated) */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isExiting ? { opacity: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.72 }}
              style={{
                position: "relative",
                zIndex: 2,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 16px",
                borderRadius: "14px",
                background: "rgba(114, 2, 4, 0.08)",
                border: "1px solid rgba(114, 2, 4, 0.2)",
                color: "#720204",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.48rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "4px",
                lineHeight: 1.2,
              }}
            >
              <span>Tap to View Groom's Family</span>
            </motion.div>
          </div>

          {/* =================================================================
              BACK FACE: THE GROOM'S SIDE (THE KHATRI FAMILY)
              ================================================================= */}
          <div
            className="family-card-face family-card-back"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "16px",
              backgroundColor: "#FFFDF9",
              backgroundImage:
                "radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.96) 0%, rgba(247, 240, 227, 0.94) 100%), repeating-linear-gradient(45deg, rgba(197, 160, 89, 0.03) 0px, rgba(197, 160, 89, 0.03) 2px, transparent 2px, transparent 6px), url('/assets/background.webp')",
              backgroundBlendMode: "normal, normal, multiply",
              backgroundSize: "cover, auto, 240px",
              border: "1.5px solid #C5A059",
              padding: "18px 20px 14px 20px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
              overflow: "hidden",
              boxShadow: "inset 0 0 25px rgba(197, 160, 89, 0.18)",
            }}
          >
            {/* Subtle Luxury Card Shine / Light Glint Animation */}
            <motion.div
              animate={{
                x: ["-140%", "240%"],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "55%",
                height: "100%",
                background:
                  "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.38) 50%, rgba(255, 248, 230, 0.45) 54%, transparent 80%)",
                transform: "skewX(-22deg)",
                pointerEvents: "none",
                zIndex: 8,
              }}
            />

            {/* Center Royal Watermark Crest */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isExiting ? { opacity: 0 } : { opacity: 0.06, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "180px",
                height: "180px",
                pointerEvents: "none",
                backgroundImage: "url('/assets/flower_clean.png')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: 1,
              }}
            />

            {/* Ornate Gold Inset Border & Corner Accents */}
            <div
              style={{
                position: "absolute",
                top: "6px",
                left: "6px",
                right: "6px",
                bottom: "6px",
                border: "1.2px solid rgba(197, 160, 89, 0.65)",
                borderRadius: "11px",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "9px",
                left: "9px",
                right: "9px",
                bottom: "9px",
                border: "0.5px dashed rgba(114, 2, 4, 0.35)",
                borderRadius: "8px",
                pointerEvents: "none",
              }}
            />

            {/* Corner Decorative Ornaments */}
            <span style={{ position: "absolute", top: "9px", left: "9px", color: "#C5A059", fontSize: "0.65rem", lineHeight: 1, pointerEvents: "none" }}>✤</span>
            <span style={{ position: "absolute", top: "9px", right: "9px", color: "#C5A059", fontSize: "0.65rem", lineHeight: 1, pointerEvents: "none" }}>✤</span>
            <span style={{ position: "absolute", bottom: "9px", left: "9px", color: "#C5A059", fontSize: "0.65rem", lineHeight: 1, pointerEvents: "none" }}>✤</span>
            <span style={{ position: "absolute", bottom: "9px", right: "9px", color: "#C5A059", fontSize: "0.65rem", lineHeight: 1, pointerEvents: "none" }}>✤</span>

            {/* Top Royal Badge with Staggered Appearing/Disappearing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isExiting ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25 }}
              style={{ position: "relative", zIndex: 2 }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "0.56rem",
                  letterSpacing: "0.22em",
                  fontWeight: 700,
                  color: "#8A1C24",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "2px",
                  lineHeight: 1.2,
                }}
              >
                ✦ THE GROOM'S SIDE ✦
              </span>
              <span
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                  color: "#720204",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                THE KHATRI FAMILY
              </span>
            </motion.div>

            {/* Center: Groom Calligraphy & Lineage */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                margin: "auto 0",
              }}
            >
              <motion.h3
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={isExiting ? { opacity: 0, scale: 0.92, y: -4 } : { opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.35 }}
                style={{
                  fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                  fontSize: "3.15rem",
                  fontWeight: 400,
                  lineHeight: 1.02,
                  color: "#720204",
                  margin: "0 0 5px 0",
                  textShadow: "0 2px 4px rgba(114, 2, 4, 0.12)",
                }}
              >
                {groom}
              </motion.h3>

              {/* Son Of */}
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={isExiting ? { opacity: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.42 }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.50rem",
                  letterSpacing: "0.24em",
                  color: "#8A1C24",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "3px",
                  lineHeight: 1.2,
                }}
              >
                SON OF
              </motion.span>

              {/* Parents */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={isExiting ? { opacity: 0, y: -4 } : { opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.48 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#720204",
                    textTransform: "uppercase",
                    lineHeight: 1.32,
                  }}
                >
                  SMT. MONICA KHATRI
                </span>
                <span
                  style={{
                    fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#720204",
                    textTransform: "uppercase",
                    lineHeight: 1.32,
                  }}
                >
                  &amp; SHRI MANOJ KHATRI
                </span>
              </motion.div>

              {/* Gold Filigree Divider */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isExiting ? { opacity: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.54 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "60%",
                  margin: "2px 0 6px 0",
                }}
              >
                <div style={{ flex: 1, height: "0.75px", background: "linear-gradient(90deg, transparent, #C5A059)" }} />
                <span style={{ color: "#C5A059", fontSize: "0.52rem" }}>❖</span>
                <div style={{ flex: 1, height: "0.75px", background: "linear-gradient(90deg, #C5A059, transparent)" }} />
              </motion.div>

              {/* Grandson Of */}
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={isExiting ? { opacity: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.6 }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.48rem",
                  letterSpacing: "0.22em",
                  color: "#8A1C24",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: "3px",
                  lineHeight: 1.2,
                }}
              >
                GRANDSON OF
              </motion.span>

              {/* Grandparents in 2 Rows */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={isExiting ? { opacity: 0, y: -4 } : { opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.66 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "#8A1C24",
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  SMT. SHAKUNTALA RANI
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "#8A1C24",
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  {groomGrandparents2.startsWith("&") ? groomGrandparents2 : `& ${groomGrandparents2}`}
                </span>
              </motion.div>
            </div>

            {/* Bottom Flip Indicator Button (Moved upside, arrow removed, animated) */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isExiting ? { opacity: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.72 }}
              style={{
                position: "relative",
                zIndex: 2,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 16px",
                borderRadius: "14px",
                background: "rgba(114, 2, 4, 0.08)",
                border: "1px solid rgba(114, 2, 4, 0.2)",
                color: "#720204",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.48rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "4px",
                lineHeight: 1.2,
              }}
            >
              <span>Tap to View Bride's Family</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ====================================================================
          BOTTOM SECTION WITH APPEARING / DISAPPEARING ANIMATION
          ==================================================================== */}
      <div
        className="family-page-footer-container"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 15,
          paddingBottom: "34px",
          marginBottom: "22px",
        }}
      >
        {/* Blessings line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={
            isExiting
              ? { opacity: 0, y: 8, transition: { duration: 0.4, delay: 0.1 } }
              : { opacity: 1, y: 0, transition: { duration: 1.3, delay: 0.85, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "0.66rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#720204",
            textTransform: "uppercase",
            margin: "0 0 1px 0",
          }}
        >
          WITH THE BLESSINGS OF BOTH FAMILIES
        </motion.p>

        {/* Venue Location */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={
            isExiting
              ? { opacity: 0, y: 8, transition: { duration: 0.4, delay: 0.12 } }
              : { opacity: 1, y: 0, transition: { duration: 1.3, delay: 0.92, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.60rem",
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: "#8A1C24",
            textTransform: "uppercase",
            margin: "0 0 5px 0",
          }}
        >
          {venue}
        </motion.p>

        {/* Back to Index Button */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.95 }}
          animate={
            isExiting
              ? { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.4, delay: 0.15 } }
              : { opacity: 1, y: 0, scale: 1, transition: { duration: 1.3, delay: 1.0, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            width: "100%",
            maxWidth: "190px",
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
