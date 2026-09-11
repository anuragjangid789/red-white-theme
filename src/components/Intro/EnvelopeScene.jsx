import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WaxSeal } from "./WaxSeal";
import { InvitationCard } from "./InvitationCard";
import { PichwaiLotus } from "../Shared/PichwaiMotifs";

const luxuryEase = [0.22, 1, 0.36, 1];

/**
 * ROYAL ENVELOPE OPENING SCENE
 * Red & White / Royal Crimson & Ivory Luxury Mewari Palace aesthetic.
 * Features realistic 3D envelope kinematics, gold foil interior liner,
 * pearl & floral background accents, and an ornate rising invitation card.
 */
export function EnvelopeScene({ data, onOpenComplete }) {
  // Stage state:
  // 0 = idle (closed envelope with pulsing wax seal)
  // 1 = seal clicked / top flap folding open in 3D
  // 2 = royal invitation card rising out of the envelope
  // 3 = envelope fading / card expanding into full homepage
  const [stage, setStage] = useState(0);

  const handleSealClick = () => {
    if (stage > 0) return;
    setStage(1); // 3D Flap opens

    // Step 2: Royal card emerges and rises
    setTimeout(() => {
      setStage(2);
    }, 1000);

    // Step 3: Card expands, envelope fades into home
    setTimeout(() => {
      setStage(3);
    }, 2200);

    // Complete transition to Home view
    setTimeout(() => {
      onOpenComplete?.();
    }, 3100);
  };

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col items-center justify-between overflow-hidden select-none"
      style={{
        backgroundColor: "#E6E5DE",
        backgroundImage: "url(/assets/background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        paddingTop: "48px",
        paddingBottom: "28px",
        paddingLeft: "16px",
        paddingRight: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* ====================================================================
          BACKGROUND ORNAMENTS LAYER (PEARLS & ROYAL BOTANICAL FLORALS)
          ==================================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-Left Pearl Strand Arch */}
        <div
          style={{
            position: "absolute",
            top: "-255px",
            left: "-30px",
            transform: "rotate(2deg)",
            opacity: 0.92,
          }}
        >
          <img
            src="/assets/pearl_clean.png"
            alt=""
            style={{ width: "340px", height: "auto", display: "block" }}
            draggable="false"
          />
        </div>

        {/* Top-Right Botanical Floral Blossom */}
        <div
          style={{
            position: "absolute",
            top: "-52px",
            right: "-65px",
            transform: "rotate(335deg)",
            opacity: 0.88,
          }}
        >
          <img
            src="/assets/flower_clean.png"
            alt=""
            style={{ width: "160px", height: "auto", display: "block" }}
            draggable="false"
          />
        </div>

        {/* Bottom-Left Botanical Blossom */}
        <div
          style={{
            position: "absolute",
            bottom: "-115px",
            left: "-125px",
            transform: "rotate(25deg)",
            opacity: 0.88,
          }}
        >
          <img
            src="/assets/flower_clean.png"
            alt=""
            style={{ width: "215px", height: "auto", display: "block" }}
            draggable="false"
          />
        </div>

        {/* Bottom-Right Pearl Garland */}
        <div
          style={{
            position: "absolute",
            bottom: "-12px",
            right: "-35px",
            transform: "rotate(16deg)",
            opacity: 0.9,
          }}
        >
          <img
            src="/assets/pearl_clean.png"
            alt=""
            style={{ width: "230px", height: "auto", display: "block" }}
            draggable="false"
          />
        </div>
      </div>

      {/* ====================================================================
          1. TOP ROYAL HEADER & INVOCATION
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: stage >= 3 ? 0 : 1, y: 0 }}
        transition={{ duration: 0.65, ease: luxuryEase }}
        className="relative z-10 flex flex-col items-center text-center mt-1 sm:mt-2"
      >
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-7 h-[0.5px] bg-[#C5A059]" />
          <span
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: "0.56rem",
              letterSpacing: "0.26em",
              color: "#801B26",
              fontWeight: 700,
            }}
          >
            ॥ श्री गणेशाय नमः ॥
          </span>
          <div className="w-7 h-[0.5px] bg-[#C5A059]" />
        </div>

        <h2
          style={{
            fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
            fontSize: "2.15rem",
            lineHeight: 1.05,
            color: "#801B26",
            fontWeight: 400,
            letterSpacing: "0.02em",
            textShadow: "0 1px 2px rgba(128, 27, 38, 0.12)",
            margin: "2px 0 0 0",
          }}
        >
          The Royal Invitation
        </h2>

        <p
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "0.48rem",
            fontWeight: 700,
            letterSpacing: "0.24em",
            color: "#A4313B",
            margin: "1px 0 0 0",
            textTransform: "uppercase",
          }}
        >
          {data.identity.city || "Udaipur, Rajasthan"} · 2026
        </p>
      </motion.div>

      {/* ====================================================================
          2. 3D ENVELOPE WRAPPER & MECHANICAL LAYERS
          ==================================================================== */}
      <motion.div
        className="relative my-auto z-20"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={
          stage === 3
            ? { opacity: 0, scale: 1.08, pointerEvents: "none" }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.85, ease: luxuryEase }}
        style={{
          perspective: 1200,
          width: "min(92vw, 370px)",
          height: "min(60vw, 245px)",
        }}
      >
        {/* ENVELOPE CONTAINER BODY */}
        <div className="relative w-full h-full">

          {/* LAYER 1: ENVELOPE BACK WALL & ORNATE GOLD FOIL LINER (z-index 10) */}
          <div
            className="absolute inset-0 rounded-md overflow-hidden shadow-2xl"
            style={{
              zIndex: 10,
              backgroundColor: "#45080E",
              border: "1px solid rgba(197, 160, 89, 0.45)",
              boxShadow: "0 20px 40px -8px rgba(70, 8, 14, 0.45), 0 6px 14px rgba(0, 0, 0, 0.16)",
            }}
          >
            {/* Rich Antique Gold Damask Liner */}
            <div
              className="w-full h-full"
              style={{
                backgroundColor: "#2B0408",
                backgroundImage: `
                  radial-gradient(#C5A059 1px, transparent 1px),
                  radial-gradient(#E5C378 0.75px, transparent 0.75px)
                `,
                backgroundSize: "16px 16px, 8px 8px",
                backgroundPosition: "0 0, 4px 4px",
                opacity: 0.9,
              }}
            >
              {/* Inner Gold Inset Border on Liner */}
              <div
                className="absolute inset-2 border border-[#C5A059]/35 rounded-sm"
                style={{ borderStyle: "dashed" }}
              />
            </div>
          </div>

          {/* LAYER 2: INVITATION CARD (z-index 20 -> 35 when rising) */}
          <motion.div
            layoutId="invitation-surface"
            className="absolute rounded-sm shadow-2xl overflow-hidden"
            initial={{ y: "1%", scale: 0.94 }}
            animate={
              stage >= 2
                ? {
                    y: stage === 3 ? "-8%" : "-52%",
                    scale: stage === 3 ? 1.08 : 1.02,
                    zIndex: 35, // Elevates in front of the front pocket
                  }
                : { y: "1%", scale: 0.94, zIndex: 20 }
            }
            transition={{
              duration: 1.15,
              ease: luxuryEase,
            }}
            style={{
              width: "92%",
              height: "90%",
              left: "4%",
              top: "5%",
            }}
          >
            <InvitationCard data={data} isExpanded={stage === 3} />
          </motion.div>

          {/* LAYER 3: ENVELOPE FRONT POCKET (z-index 30) */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-md"
            style={{ zIndex: 30 }}
          >
            <svg
              viewBox="0 0 370 245"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Pocket Red Gradients */}
                <linearGradient id="pocketLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5A0E17" />
                  <stop offset="100%" stopColor="#78141F" />
                </linearGradient>
                <linearGradient id="pocketRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5A0E17" />
                  <stop offset="100%" stopColor="#78141F" />
                </linearGradient>
                <linearGradient id="pocketBottom" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#801B26" />
                  <stop offset="50%" stopColor="#6C121C" />
                  <stop offset="100%" stopColor="#540C14" />
                </linearGradient>
                {/* Gold Trim Gradient */}
                <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FFF2D1" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#C5A059" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Left Side Triangular Fold */}
              <polygon
                points="0,0 185,138 0,245"
                fill="url(#pocketLeft)"
                stroke="rgba(197, 160, 89, 0.3)"
                strokeWidth="0.6"
              />
              {/* Right Side Triangular Fold */}
              <polygon
                points="370,0 185,138 370,245"
                fill="url(#pocketRight)"
                stroke="rgba(197, 160, 89, 0.3)"
                strokeWidth="0.6"
              />
              {/* Bottom Front Triangular Fold */}
              <polygon
                points="0,245 185,120 370,245"
                fill="url(#pocketBottom)"
                stroke="rgba(197, 160, 89, 0.4)"
                strokeWidth="0.8"
              />
              {/* Gold Filigree Trim Line */}
              <path
                d="M 0 245 L 185 120 L 370 245"
                stroke="url(#goldEdge)"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          </div>

          {/* LAYER 4: 3D TOP FLAP & WAX SEAL (z-index 40 -> 15 when open) */}
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "56%",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              zIndex: stage >= 1 ? 15 : 40, // Falls behind card once unfolded
            }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: stage >= 1 ? 176 : 0 }}
            transition={{ duration: 1.05, ease: luxuryEase }}
          >
            <svg
              viewBox="0 0 370 138"
              className="w-full h-full filter drop-shadow-[0_10px_16px_rgba(40,4,8,0.45)]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flapCrimson" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#550E16" />
                  <stop offset="40%" stopColor="#6E131D" />
                  <stop offset="100%" stopColor="#801B26" />
                </linearGradient>
              </defs>

              {/* Exterior Flap Polygon */}
              <polygon
                points="0,0 185,135 370,0"
                fill="url(#flapCrimson)"
                stroke="rgba(197, 160, 89, 0.45)"
                strokeWidth="0.9"
              />

              {/* Inner Decorative Gold Stitched Trim */}
              <path
                d="M 18 0 L 185 122 L 352 0"
                stroke="#C5A059"
                strokeWidth="0.75"
                strokeDasharray="3 2"
                fill="none"
                opacity="0.75"
              />
            </svg>

            {/* WAX SEAL (Centered at the apex of the flap - smoothly dissolves on opening) */}
            <div
              className="absolute left-1/2 pointer-events-auto"
              style={{
                top: "135px",
                transform: "translate(-50%, -50%)",
                zIndex: 50,
              }}
            >
              <motion.div
                animate={
                  stage >= 1
                    ? { opacity: 0, scale: 1.35, filter: "blur(5px)" }
                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.4 }}
              >
                <WaxSeal
                  onClick={handleSealClick}
                  monogram={data.intro.sealMonogram || "A & A"}
                  isOpening={stage > 0}
                />
              </motion.div>

              {/* Delicate Golden Sparkle Burst on Unseal */}
              {stage === 1 && (
                <motion.div
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="w-16 h-16 rounded-full border border-[#FFE7A8] bg-radial from-[#FFE7A8]/40 to-transparent" />
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ====================================================================
          3. BOTTOM INTERACTIVE CALL-TO-ACTION BADGE
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{
          opacity: stage === 0 ? 1 : 0,
          y: stage === 0 ? [0, -3, 0] : 12,
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.4 },
          y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-30 flex flex-col items-center cursor-pointer mb-1"
        onClick={handleSealClick}
      >
        <div
          className="luxury-btn flex items-center justify-center gap-2"
          style={{
            padding: "7px 20px",
            fontSize: "0.54rem",
            letterSpacing: "0.22em",
            color: "#801B26",
            borderColor: "rgba(128, 27, 38, 0.45)",
            background: "rgba(255, 255, 255, 0.94)",
            boxShadow: "0 4px 14px rgba(128, 27, 38, 0.14)",
            cursor: "pointer",
            textTransform: "uppercase",
            borderRadius: "2px",
          }}
        >
          <span className="text-[#C5A059]">✦</span>
          <span>{data.intro.ctaText || "CLICK WAX SEAL TO OPEN"}</span>
          <span className="text-[#C5A059]">✦</span>
        </div>

        <p
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "0.48rem",
            letterSpacing: "0.14em",
            color: "#6E6864",
            margin: "5px 0 0 0",
            textTransform: "uppercase",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {data.intro.instruction || "Tap the royal wax seal to unveil your personal invitation"}
        </p>
      </motion.div>
    </div>
  );
}

export default EnvelopeScene;
