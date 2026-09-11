import React from "react";
import { motion } from "framer-motion";
import { GaneshaLineArt, CalligraphicFlourish } from "../Shared/PichwaiMotifs";

export function HomePage({ data, pageHeight }) {
  const { identity } = data;

  const hosts =
    identity.hostsGrandparents || "SMT. PUSHPA & SHRI CHANDRABAN JI RELAN";
  const inv1 =
    identity.invitationHeadline || "REQUEST THE HONOUR OF YOUR PRESENCE";
  const inv2 =
    identity.invitationSubheadline ||
    "TO CELEBRATE THE WEDDING OF THEIR GRANDDAUGHTER";
  const bride = identity.brideName || "Arusha";
  const brideParents =
    identity.brideParents || "D/O SMT. MANISHA & SHRI RAKESH RELAN";
  const groom = identity.groomName || "Akshit";
  const groomGrandparents1 =
    identity.groomGrandparentsLine1 || "GRAND S/O SMT. SHAKUNTALA RANI";
  const groomGrandparents2 =
    identity.groomGrandparentsLine2 || "& LATE SHRI VISHANDAS KHATRI";
  const groomParents =
    identity.groomParents || "S/O SMT. MONICA & SHRI MANOJ KHATRI";

  return (
    <section
      id="home"
      className="home-snap-page page-bg-embossed relative w-full paper-texture select-none"
      style={{
        backgroundColor: "#E6E5DE",
        backgroundImage: "url(/assets/background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: pageHeight ? `${pageHeight}px` : "var(--screen-height, 100vh)",
        height: pageHeight ? `${pageHeight}px` : "var(--screen-height, 100vh)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "visible",
        zIndex: 20,
      }}
    >
      {/* ====================================================================
          CORNER & BORDER ELEMENTS (PROPERLY ORIENTED & VISIBLE):
          1. TOP ARCH: Pearl String arching along upper border
          2A. TOP-RIGHT: Primary Red Flower pointing down/inward
          2B. TOP-RIGHT: Second Accent Red Flower
          3. BOTTOM-LEFT: Red Flower (Spans half-half across Home & Index, z-index 45)
          4. BOTTOM-RIGHT: Pearl String hanging down right edge
          5. BOTTOM-RIGHT: Accent Red Flower Head in corner
          ==================================================================== */}

      {/* 1. TOP ARCH: PEARL STRING */}
      <div
        style={{
          position: "absolute",
          top: "-275px",
          left: "-10px",
          transform: "rotate(2deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 12,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
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
          viewport={{ once: false, amount: 0.15 }}
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

      {/* 3. BOTTOM-LEFT: RED FLOWER (ENLARGED & SHIFTED LOWER-LEFT, SPANS HALF-HALF ACROSS HOME & INDEX) */}
      <div
        style={{
          position: "absolute",
          bottom: "-130px",
          left: "-140px",
          transform: "rotate(20deg)",
          transformOrigin: "bottom left",
          pointerEvents: "none",
          zIndex: 45,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.75, x: -35, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          style={{ width: "200px" }}
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
          bottom: "20px",
          right: "-25px",
          transform: "rotate(12deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 12,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 30, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ width: "220px" }}
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
          bottom: "-14px",
          right: "-70px",
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
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          style={{ width: "125px" }}
        >
          <img
            src="/assets/flower_clean.png"
            alt="Botanical Red Blossom Corner"
            style={{ width: "100%", height: "auto", display: "block" }}
            draggable="false"
          />
        </motion.div>
      </div>

      {/* ====================================================================
          CENTERED INVITATION TEXT (SCROLL-TRIGGERED DYNAMIC APPEAR/DISAPPEAR)
          ==================================================================== */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          width: "100%",
          maxWidth: "340px",
          margin: "auto",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Lord Ganesha Motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: -16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.15, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "6px" }}
        >
          <GaneshaLineArt width={34} height={42} color="#801B26" animate={true} />
        </motion.div>

        {/* Grandparent Hosts Line */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.05, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#801B26",
            textTransform: "uppercase",
            lineHeight: 1.25,
            marginTop: "2px",
            marginBottom: "6px",
          }}
        >
          {hosts}
        </motion.h2>

        {/* Invitation Headline & Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.05, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "4px 0",
            maxWidth: "300px",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "0.55rem",
              letterSpacing: "0.16em",
              color: "#801B26",
              textTransform: "uppercase",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {inv1}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "0.52rem",
              letterSpacing: "0.14em",
              color: "#801B26",
              textTransform: "uppercase",
              lineHeight: 1.4,
              marginTop: "2px",
              marginBottom: 0,
            }}
          >
            {inv2}
          </p>
        </motion.div>

        {/* Bride Name: Arusha in Cursive Calligraphy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.25, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "2px 0" }}
        >
          <h1
            style={{
              fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
              fontSize: "2.45rem",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#801B26",
              letterSpacing: "0.02em",
              margin: 0,
              textShadow: "0 1px 2px rgba(128, 27, 38, 0.12)",
            }}
          >
            {bride}
          </h1>
        </motion.div>

        {/* Bride Parentage Line */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.05, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', 'Cinzel', serif",
            fontSize: "0.54rem",
            letterSpacing: "0.15em",
            color: "#801B26",
            textTransform: "uppercase",
            margin: "2px 0 4px 0",
          }}
        >
          {brideParents}
        </motion.p>

        {/* Elegant Calligraphic Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.95, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
            fontSize: "1.35rem",
            lineHeight: 1,
            color: "#801B26",
            margin: "1px 0",
            userSelect: "none",
          }}
        >
          &amp;
        </motion.div>

        {/* Groom Name: Akshit in Cursive Calligraphy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.25, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "2px 0" }}
        >
          <h1
            style={{
              fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
              fontSize: "2.45rem",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#801B26",
              letterSpacing: "0.02em",
              margin: 0,
              textShadow: "0 1px 2px rgba(128, 27, 38, 0.12)",
            }}
          >
            {groom}
          </h1>
        </motion.div>

        {/* Groom Grandparents Lineage */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.05, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2px" }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', 'Cinzel', serif",
              fontSize: "0.53rem",
              letterSpacing: "0.15em",
              color: "#801B26",
              textTransform: "uppercase",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {groomGrandparents1}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', 'Cinzel', serif",
              fontSize: "0.53rem",
              letterSpacing: "0.15em",
              color: "#801B26",
              textTransform: "uppercase",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {groomGrandparents2}
          </p>
        </motion.div>

        {/* Groom Parents Lineage */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.05, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', 'Cinzel', serif",
            fontSize: "0.53rem",
            letterSpacing: "0.15em",
            color: "#801B26",
            textTransform: "uppercase",
            marginTop: "4px",
            marginBottom: "6px",
          }}
        >
          {groomParents}
        </motion.p>

        {/* Symmetrical Ornamental Flourish Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.15, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "6px", marginBottom: "4px" }}
        >
          <CalligraphicFlourish width={120} height={19} color="#801B26" />
        </motion.div>

        {/* Discreet Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.75, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 1.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "6px",
            cursor: "pointer",
          }}
          onClick={() => {
            const el = document.getElementById("invitation-index");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span
            style={{
              fontSize: "0.48rem",
              letterSpacing: "0.22em",
              color: "#801B26",
              opacity: 0.75,
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#801B26"
            strokeWidth="1.6"
            style={{ marginTop: "2px", opacity: 0.75 }}
            className="animate-bounce"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>

      {/* Seamless Edge Seam Blend to next slide */}
      <div className="page-seam-blend page-seam-blend-bottom" />
    </section>
  );
}
