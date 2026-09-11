import React from "react";
import { motion } from "framer-motion";

const luxuryEase = [0.22, 1, 0.36, 1];

export function VenueSection({ data, onBack, onNavigateIndex, pageHeight }) {
  const venue = data?.venue || {};

  const handleBack = () => {
    if (onBack) onBack();
    else if (onNavigateIndex) onNavigateIndex();
  };

  return (
    <motion.section
      id="venue"
      className="venue-page-canvas relative w-full h-full min-h-full flex flex-col justify-between items-center select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: luxuryEase }}
      style={{
        backgroundColor: "#E6E5DE",
        backgroundImage: "url(/assets/background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        minHeight: "100%",
        position: "relative",
        boxSizing: "border-box",
        overflowY: "auto",
        overflowX: "hidden",
        paddingTop: "36px",
        paddingBottom: "28px",
      }}
    >
      {/* ====================================================================
          MAIN VENUE CONTAINER (EVEN LUXURY DISTRIBUTION)
          ==================================================================== */}
      <div className="w-full flex-1 flex flex-col items-center justify-between z-10 px-5 relative max-w-[390px] mx-auto">
        
        {/* 1. TOP CALLIGRAPHY TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: luxuryEase }}
          className="text-center w-full"
        >
          <h2
            style={{
              fontFamily: "'Pinyon Script', 'Alex Brush', 'Great Vibes', cursive",
              fontSize: "3.2rem",
              lineHeight: 1.05,
              color: "#801B26",
              fontWeight: 400,
              letterSpacing: "0.02em",
              textShadow: "0 1px 2px rgba(128, 27, 38, 0.12)",
              margin: 0,
            }}
          >
            The Venue
          </h2>
        </motion.div>

        {/* 2. ARCHITECTURAL OPEN-WINDOW JHAROKHA WITH PALACE PLACE IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: luxuryEase }}
          whileHover={{ scale: 1.03 }}
          className="relative flex items-center justify-center cursor-pointer my-1"
          style={{
            width: "215px",
            margin: "0 auto",
          }}
        >
          {/* Ambient Warm Golden Halo behind the window */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "15%",
              width: "70%",
              height: "75%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(230, 229, 222, 0) 70%)",
              filter: "blur(18px)",
              pointerEvents: "none",
            }}
          />

          {/* Seamless Framed Architectural Window with Udaivilas Palace */}
          <img
            src="/assets/venue_window_framed.png"
            alt="The Oberoi Udaivilas, Udaipur through Palace Arch"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 10px 22px rgba(128, 27, 38, 0.20))",
              pointerEvents: "none",
            }}
            draggable="false"
          />
        </motion.div>

        {/* 3. VENUE DETAILS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: luxuryEase }}
          className="w-full text-center flex flex-col items-center my-1"
        >
          {/* Palace Name */}
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.65rem",
              fontWeight: 700,
              color: "#801B26",
              lineHeight: 1.15,
              letterSpacing: "0.02em",
              margin: "0 0 2px 0",
              textShadow: "0 1px 1px rgba(128, 27, 38, 0.08)",
            }}
          >
            {venue.title || "The Oberoi Udaivilas"}
          </h3>

          {/* Subtitle / Destination */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.02rem",
              fontWeight: 600,
              color: "#A4313B",
              lineHeight: 1.2,
              letterSpacing: "0.04em",
              margin: "0 0 5px 0",
            }}
          >
            {venue.city || "Lake Pichola, Udaipur, Rajasthan"}
          </p>

          {/* Elegant Divider Line with Center Diamond */}
          <div className="flex items-center justify-center gap-2 w-28 my-1 opacity-70">
            <div className="h-[0.5px] bg-[#801B26] flex-1" />
            <span className="text-[#801B26] text-[8px]">✦</span>
            <div className="h-[0.5px] bg-[#801B26] flex-1" />
          </div>

          {/* Historic Tagline / Brief Description */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "0.86rem",
              fontWeight: 500,
              fontStyle: "italic",
              color: "#4A4543",
              lineHeight: 1.35,
              maxWidth: "300px",
              margin: "3px 0 6px 0",
            }}
          >
            "A palatial sanctuary of tranquil courtyards and reflecting pools on the historic shores of Lake Pichola."
          </p>

          {/* Address */}
          <p
            style={{
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
              fontSize: "0.62rem",
              fontWeight: 500,
              color: "#6D6864",
              letterSpacing: "0.08em",
              lineHeight: 1.4,
              maxWidth: "280px",
              margin: "0",
              textTransform: "uppercase",
            }}
          >
            {venue.address || "Haridas Ji Ki Magri, Pichola, Udaipur, Rajasthan 313001"}
          </p>
        </motion.div>

        {/* 4. ACTION BUTTONS: GET DIRECTIONS & BACK TO INDEX */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: luxuryEase }}
          className="flex flex-col items-center gap-2.5 w-full mt-1"
        >
          {/* Get Directions Button */}
          {venue.mapUrl && (
            <motion.a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 6px 18px rgba(128, 27, 38, 0.28)" }}
              whileTap={{ scale: 0.96 }}
              className="luxury-btn flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#801B26",
                color: "#FAF6EE",
                borderColor: "#801B26",
                fontSize: "0.60rem",
                letterSpacing: "0.18em",
                padding: "8px 20px",
                borderRadius: "2px",
                textDecoration: "none",
                fontWeight: 600,
                boxShadow: "0 3px 12px rgba(128, 27, 38, 0.22)",
                cursor: "pointer",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              <span>GET DIRECTIONS ON MAPS</span>
            </motion.a>
          )}

          {/* Back to Index Button */}
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="luxury-btn flex items-center justify-center gap-1.5"
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
        </motion.div>

      </div>
    </motion.section>
  );
}

export default VenueSection;
