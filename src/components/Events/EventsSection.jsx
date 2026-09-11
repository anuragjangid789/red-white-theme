import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EventsSection({ data, onBack, onNavigateIndex, pageHeight }) {
  const events = data?.events || [];

  // Allow ?event=mayra, haldi, sangeet, wedding in URL for direct preview & testing
  const getInitialIndex = () => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search).get("event");
      const idx = events.findIndex((e) => e.id === p);
      if (idx !== -1) return idx;
    }
    return 0;
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [direction, setDirection] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [calendarSaved, setCalendarSaved] = useState(false);

  // Touch swipe support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 35;

  const currentEvent = events[currentIndex] || events[0];

  // Download standard .ics calendar invite for the current event
  const handleAddToCalendar = () => {
    const eventTimeMap = {
      mayra: {
        start: "20260815T070000Z", // 12:30 PM IST
        end: "20260815T110000Z",   // 4:30 PM IST
        location: "Orchid Banquet, Avadh Utopia, Vapi",
      },
      haldi: {
        start: "20260816T033000Z", // 9:00 AM IST
        end: "20260816T073000Z",   // 1:00 PM IST
        location: "Marigold Lawn, Avadh Utopia, Vapi",
      },
      sangeet: {
        start: "20260817T123000Z", // 6:00 PM IST
        end: "20260817T173000Z",   // 11:00 PM IST
        location: "Marigold Lawn, Avadh Utopia, Vapi",
      },
      wedding: {
        start: "20260817T123000Z", // 6:00 PM IST
        end: "20260817T183000Z",   // 12:00 AM IST
        location: "Marigold Lawn, Avadh Utopia, Vapi",
      },
    };

    const mapping = eventTimeMap[currentEvent.id] || {
      start: "20260815T070000Z",
      end: "20260815T110000Z",
      location: `${currentEvent.venue || ""} ${currentEvent.subVenue || ""}`.trim() || "Avadh Utopia, Vapi",
    };

    const coupleNames = data?.identity?.coupleNames || "Arusha & Akshit";
    const title = `${currentEvent.title} Ceremony — ${coupleNames} Wedding`;
    const description = `${currentEvent.title} Celebrations of ${coupleNames}.\\nDate: ${currentEvent.date}\\nTime: ${currentEvent.time}\\nVenue: ${mapping.location}\\nDress Code: ${currentEvent.dressCode || "Festive Elegance"}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//${coupleNames} Wedding Celebrations//EN`,
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${mapping.location}`,
      `DTSTART:${mapping.start}`,
      `DTEND:${mapping.end}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${coupleNames.replace(/\s*&\s*/g, "-")}-${currentEvent.title}-Calendar.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 3500);
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Strict scroll lock while Events page is active & horizontal trackpad/wheel slide change
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    let wheelTimeout = null;
    const handleWheel = (e) => {
      e.preventDefault();
      if (wheelTimeout) return;
      if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 25) {
        if (e.deltaX > 20 || e.deltaY > 20) {
          nextSlide();
        } else if (e.deltaX < -20 || e.deltaY < -20) {
          prevSlide();
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
  }, [nextSlide, prevSlide]);

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Handle back navigation to Chapters / Index page
  const handleBack = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onNavigateIndex) onNavigateIndex();
      else if (onBack) onBack();
      else {
        window.location.hash = "#index";
      }
    }, 450);
  };

  // Smooth luxury ease curve matching HomePage
  const luxuryEase = [0.16, 1, 0.3, 1];

  return (
    <motion.section
      id="events"
      className="events-page-canvas relative w-full paper-texture select-none flex flex-col justify-between items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={
        isExiting
          ? { opacity: 0, y: 16, transition: { duration: 0.35 } }
          : { opacity: 1, y: 0, transition: { duration: 0.6, ease: luxuryEase } }
      }
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor: "#E6E5DE",
        backgroundImage: "url(/assets/background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        minHeight: "100%",
        height: "100%",
        maxHeight: "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
        paddingTop: "32px", // Lowered position for comfortable breathing room
        paddingBottom: "52px",
        touchAction: "pan-x none",
        overscrollBehavior: "none",
      }}
    >
      {/* ====================================================================
          BACKGROUND PEARL STRAND GARLANDS (SEPARATE & ANIMATED)
          ==================================================================== */}
      {/* Top Pearl Strand Arch */}
      <div
        style={{
          position: "absolute",
          top: "-268px",
          left: "-10px",
          transform: "rotate(2deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 12,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: -25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: luxuryEase, delay: 0.02 }}
          style={{ width: "340px", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          <img
            src="/assets/pearl_clean.png"
            alt="Royal Pearl Arch"
            loading="eager"
            decoding="async"
            style={{ width: "100%", height: "auto", display: "block", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            draggable="false"
          />
        </motion.div>
      </div>

      {/* Bottom-Right Pearl Strand Hanging */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "-30px",
          transform: "rotate(14deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 12,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: 25, y: 25 }}
          animate={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.65, ease: luxuryEase, delay: 0.04 }}
          style={{ width: "230px", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          <img
            src="/assets/pearl_clean.png"
            alt="Royal Pearl Garland"
            loading="eager"
            decoding="async"
            style={{ width: "100%", height: "auto", display: "block", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            draggable="false"
          />
        </motion.div>
      </div>

      {/* ====================================================================
          CORNER BOTANICAL FLOWERS (PERSISTENT & SMOOTH - ZERO FLICKER)
          ==================================================================== */}
      {/* Bottom-Left Red Botanical Blossom (Enlarged) */}
      <div
        style={{
          position: "absolute",
          bottom: "-125px",
          left: "-135px",
          transform: "rotate(20deg)",
          transformOrigin: "bottom left",
          pointerEvents: "none",
          zIndex: 8,
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.78, x: -25, y: 25 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.55, ease: luxuryEase, delay: 0.05 }}
          style={{ width: "215px", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          <img
            src="/assets/flower_clean.png"
            alt="Botanical Red Floral Ornament"
            loading="eager"
            decoding="async"
            style={{ width: "100%", height: "auto", display: "block", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            draggable="false"
          />
        </motion.div>
      </div>

      {/* Top-Right Red Accent Stem (Enlarged & Positioned safely outside text column) */}
      <div
        style={{
          position: "absolute",
          top: "-52px",
          right: "-62px",
          transform: "rotate(340deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 8,
          userSelect: "none",
          opacity: 0.85,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.78, x: 20, y: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.55, ease: luxuryEase, delay: 0.05 }}
          style={{ width: "165px", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          <img
            src="/assets/flower_clean.png"
            alt="Botanical Red Floral Ornament"
            loading="eager"
            decoding="async"
            style={{ width: "100%", height: "auto", display: "block", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            draggable="false"
          />
        </motion.div>
      </div>

      {/* ====================================================================
          MAIN SLIDING EVENTS CONTAINER (SLIGHTLY LOWERED POSITION)
          ==================================================================== */}
      <div className="events-main-slider relative w-full flex-1 flex flex-col justify-between items-center z-20 px-3 pt-4 pb-1">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentEvent.id}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: luxuryEase }}
            className="w-full flex-1 flex flex-col justify-between items-center relative"
          >
            {/* ===============================================================
                1. TOP EVENT HEADING (ROYAL CALLIGRAPHY SCRIPT - SEPARATE ANIM)
                =============================================================== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: -14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.42, delay: 0.04, ease: luxuryEase }}
              className="event-heading-wrapper w-full text-center"
              style={{
                marginTop: "20px", // Repositioned downside for elegant breathing room from top arch
                marginBottom: "2px",
              }}
            >
              <h2
                className="event-heading-title"
                style={{
                  fontFamily: "'Pinyon Script', 'Alex Brush', 'Great Vibes', cursive",
                  fontSize: currentEvent.id === "wedding" ? "3.55rem" : "3.85rem",
                  lineHeight: 1.05,
                  color: "#801B26",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  textShadow: "0 1px 2px rgba(128, 27, 38, 0.12)",
                  margin: 0,
                }}
              >
                {currentEvent.title}
              </h2>
            </motion.div>

            {/* ===============================================================
                2. EVENT BODY: MOTIFS & INDIVIDUAL SEPARATE TEXT LINES
                   (Positioned slightly down with generous comfortable spacing)
                =============================================================== */}
            <div className="event-content-body w-full flex-1 relative flex items-center justify-center my-auto min-h-[305px] pt-2">
              {/* -------------------------------------------------------------
                  LAYOUT A: MAYRA (MOTIF ON LEFT, TEXT ON RIGHT)
                  ------------------------------------------------------------- */}
              {currentEvent.id === "mayra" && (
                <div className="w-full h-full relative flex items-center justify-between">
                  {/* Mayra Chowki Illustration (Separated, Enlarged & Floating) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: -12 }}
                    transition={{ duration: 0.42, delay: 0.06, ease: luxuryEase }}
                    style={{
                      position: "absolute",
                      left: "-18px",
                      top: "72%",
                      transform: "translateY(-50%)",
                      width: "208px", // Enlarged PNG motif size
                      maxWidth: "65%",
                      zIndex: 20,
                      pointerEvents: "none",
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform" }}
                    >
                      <img
                        src={currentEvent.motif}
                        onError={(e) => {
                          if (currentEvent.motifWebp && e.currentTarget.src !== currentEvent.motifWebp) {
                            e.currentTarget.src = currentEvent.motifWebp;
                          }
                        }}
                        alt={currentEvent.motifAlt}
                        loading="eager"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          filter: "drop-shadow(0 12px 22px rgba(128, 27, 38, 0.22))",
                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                        }}
                        draggable="false"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Text Details on Right (Positioned slightly down) */}
                  <div
                    style={{
                      marginLeft: "auto",
                      width: "55%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      textAlign: "right",
                      zIndex: 15,
                      paddingRight: "6px",
                      paddingTop: "30px", // Repositioned slightly down
                    }}
                  >
                    {/* Line 1: Date */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.12, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.25,
                        margin: "0 0 4px 0",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {currentEvent.date}
                    </motion.p>

                    {/* Line 2: Time */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.16, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.04rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.15,
                        margin: "0 0 2px 0",
                      }}
                    >
                      {currentEvent.time}
                    </motion.p>

                    {/* Line 3: Subtext (Followed by Lunch) */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.2, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "0.88rem",
                        fontWeight: 500,
                        color: "#801B26",
                        fontStyle: "italic",
                        lineHeight: 1.15,
                        margin: "0 0 6px 0",
                      }}
                    >
                      {currentEvent.subtext}
                    </motion.p>

                    {/* Line 4: Primary Venue */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.24, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.02rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.2,
                        margin: "0",
                      }}
                    >
                      {currentEvent.venue}
                    </motion.p>

                    {/* Line 5: Sub-Venue */}
                    {currentEvent.subVenue && (
                      <motion.p
                        initial={{ opacity: 0, x: 18, y: 6 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 12, y: -4 }}
                        transition={{ duration: 0.38, delay: 0.28, ease: luxuryEase }}
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "0.98rem",
                          fontWeight: 600,
                          color: "#801B26",
                          lineHeight: 1.2,
                          margin: "0",
                        }}
                      >
                        {currentEvent.subVenue}
                      </motion.p>
                    )}

                    {/* Dress Code Section (Separated & Animated) */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        marginTop: "8px",
                      }}
                    >
                      {/* Dress Code Script Heading */}
                      <motion.span
                        initial={{ opacity: 0, x: 16, y: 6 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 12, y: -4 }}
                        transition={{ duration: 0.38, delay: 0.32, ease: luxuryEase }}
                        style={{
                          fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                          fontSize: "2.15rem",
                          color: "#801B26",
                          lineHeight: 1.1,
                          marginBottom: "4px",
                          letterSpacing: "0.02em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Dress Code
                      </motion.span>

                      {/* Dress Code Swatches Container & Individual Dots */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.35, delay: 0.36, ease: luxuryEase }}
                        style={{ display: "flex", gap: "8px", alignItems: "center" }}
                      >
                        {currentEvent.dressCodeColors.map((color, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.4 }}
                            transition={{ duration: 0.3, delay: 0.36 + idx * 0.04, ease: luxuryEase }}
                            style={{
                              width: "17px",
                              height: "17px",
                              borderRadius: "50%",
                              backgroundColor: color,
                              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.4)",
                              display: "inline-block",
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  LAYOUT B: HALDI (MOTIF ON RIGHT, TEXT ON LEFT)
                  ------------------------------------------------------------- */}
              {currentEvent.id === "haldi" && (
                <div className="w-full h-full relative flex items-center justify-between">
                  {/* Text Details on Left (Positioned slightly down) */}
                  <div
                    style={{
                      width: "55%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      zIndex: 15,
                      paddingLeft: "6px",
                      paddingTop: "30px", // Repositioned slightly down
                    }}
                  >
                    {/* Line 1: Date */}
                    <motion.p
                      initial={{ opacity: 0, x: -18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.12, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.25,
                        margin: "0 0 4px 0",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {currentEvent.date}
                    </motion.p>

                    {/* Line 2: Time */}
                    <motion.p
                      initial={{ opacity: 0, x: -18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.16, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.04rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.15,
                        margin: "0 0 2px 0",
                      }}
                    >
                      {currentEvent.time}
                    </motion.p>

                    {/* Line 3: Subtext */}
                    <motion.p
                      initial={{ opacity: 0, x: -18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.2, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "0.88rem",
                        fontWeight: 500,
                        color: "#801B26",
                        fontStyle: "italic",
                        lineHeight: 1.15,
                        margin: "0 0 6px 0",
                      }}
                    >
                      {currentEvent.subtext}
                    </motion.p>

                    {/* Line 4: Venue */}
                    <motion.p
                      initial={{ opacity: 0, x: -18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.24, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.02rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.2,
                        margin: "0",
                      }}
                    >
                      {currentEvent.venue}
                    </motion.p>

                    {/* Dress Code Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginTop: "8px",
                      }}
                    >
                      {/* Dress Code Script Heading */}
                      <motion.span
                        initial={{ opacity: 0, x: -16, y: 6 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: -12, y: -4 }}
                        transition={{ duration: 0.38, delay: 0.32, ease: luxuryEase }}
                        style={{
                          fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                          fontSize: "2.15rem",
                          color: "#801B26",
                          lineHeight: 1.1,
                          marginBottom: "4px",
                          letterSpacing: "0.02em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Dress Code
                      </motion.span>

                      {/* Dress Code Swatches */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.35, delay: 0.36, ease: luxuryEase }}
                        style={{ display: "flex", gap: "8px", alignItems: "center" }}
                      >
                        {currentEvent.dressCodeColors.map((color, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.4 }}
                            transition={{ duration: 0.3, delay: 0.36 + idx * 0.04, ease: luxuryEase }}
                            style={{
                              width: "17px",
                              height: "17px",
                              borderRadius: "50%",
                              backgroundColor: color,
                              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.4)",
                              display: "inline-block",
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  {/* Haldi Illustration on Right (Separated, Enlarged & Floating) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: 12 }}
                    transition={{ duration: 0.42, delay: 0.06, ease: luxuryEase }}
                    style={{
                      position: "absolute",
                      right: "-12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "214px", // Enlarged PNG motif size
                      maxWidth: "65%",
                      zIndex: 20,
                      pointerEvents: "none",
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform" }}
                    >
                      <img
                        src={currentEvent.motif}
                        onError={(e) => {
                          if (currentEvent.motifWebp && e.currentTarget.src !== currentEvent.motifWebp) {
                            e.currentTarget.src = currentEvent.motifWebp;
                          }
                        }}
                        alt={currentEvent.motifAlt}
                        loading="eager"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          filter: "drop-shadow(0 12px 22px rgba(128, 27, 38, 0.22))",
                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                        }}
                        draggable="false"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  LAYOUT C: SANGEET (GRAMOPHONE ON LEFT, TEXT ON RIGHT + FLOATING NOTES)
                  ------------------------------------------------------------- */}
              {currentEvent.id === "sangeet" && (
                <div className="w-full h-full relative flex items-center justify-between">
                  {/* Sangeet Gramophone on Left (Separated, Enlarged & Floating) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: -12 }}
                    transition={{ duration: 0.42, delay: 0.06, ease: luxuryEase }}
                    style={{
                      position: "absolute",
                      left: "-28px",
                      top: "10%",
                      transform: "translateY(-50%)",
                      width: "214px", // Enlarged PNG motif size
                      maxWidth: "65%",
                      zIndex: 20,
                      pointerEvents: "none",
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {/* Continuous Playing Musical Notes Stream from Gramophone Horn (Spread & Upside) */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-18px",
                          right: "22px",
                          width: "105px",
                          height: "135px",
                          pointerEvents: "none",
                          zIndex: 25,
                          overflow: "visible",
                        }}
                      >
                        {[
                          { symbol: "♪", size: "1.35rem", left: "22%", delay: 0, duration: 3.2, x: [0, -12, -22, -28], y: [0, -36, -78, -118], r: [-8, 14, -10, 18], isSparkle: false },
                          { symbol: "♫", size: "1.25rem", left: "44%", delay: 0.6, duration: 3.4, x: [0, 8, -8, 14], y: [0, -40, -84, -125], r: [10, -12, 16, -6], isSparkle: false },
                          { symbol: "✦", size: "0.9rem", left: "62%", delay: 1.15, duration: 2.6, x: [0, 14, 24, 30], y: [0, -34, -72, -108], r: [0, 90, 180, 270], isSparkle: true },
                          { symbol: "𝄞", size: "1.45rem", left: "34%", delay: 1.7, duration: 3.6, x: [0, 10, -12, 18], y: [0, -44, -94, -136], r: [-6, 16, -8, 14], isSparkle: false },
                          { symbol: "♩", size: "1.15rem", left: "16%", delay: 2.25, duration: 3.0, x: [0, -8, -18, -25], y: [0, -34, -74, -112], r: [8, -10, 12, -14], isSparkle: false },
                          { symbol: "♬", size: "1.28rem", left: "52%", delay: 2.8, duration: 3.5, x: [0, 12, 6, 20], y: [0, -42, -88, -128], r: [-12, 12, -6, 16], isSparkle: false },
                        ].map((note, i) => (
                          <motion.span
                            key={i}
                            style={{
                              position: "absolute",
                              bottom: "0px",
                              left: note.left,
                              fontSize: note.size,
                              color: note.isSparkle ? "#FFE58F" : "#D4A038",
                              textShadow: note.isSparkle
                                ? "0 0 10px rgba(255, 229, 143, 0.95), 0 0 16px rgba(212, 160, 56, 0.7)"
                                : "0 0 10px rgba(212, 160, 56, 0.85), 0 1px 3px rgba(128, 27, 38, 0.35)",
                              fontWeight: 700,
                              userSelect: "none",
                              display: "block",
                              lineHeight: 1,
                              filter: "drop-shadow(0 2px 4px rgba(128, 27, 38, 0.2))",
                            }}
                            initial={{ opacity: 0, y: 0, x: 0, scale: 0.2 }}
                            animate={{
                              opacity: [0, 1, 0.88, 0],
                              y: note.y,
                              x: note.x,
                              scale: [0.3, 1.05, 1.1, 0.65],
                              rotate: note.r,
                            }}
                            transition={{
                              duration: note.duration,
                              repeat: Infinity,
                              delay: note.delay,
                              ease: "easeOut",
                              times: [0, 0.18, 0.72, 1],
                            }}
                          >
                            {note.symbol}
                          </motion.span>
                        ))}
                      </div>

                      <img
                        src={currentEvent.motif}
                        onError={(e) => {
                          if (currentEvent.motifWebp && e.currentTarget.src !== currentEvent.motifWebp) {
                            e.currentTarget.src = currentEvent.motifWebp;
                          }
                        }}
                        alt={currentEvent.motifAlt}
                        loading="eager"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          filter: "drop-shadow(0 12px 24px rgba(128, 27, 38, 0.24))",
                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                        }}
                        draggable="false"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Text Details on Right (Positioned slightly down) */}
                  <div
                    style={{
                      marginLeft: "auto",
                      width: "55%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      textAlign: "right",
                      zIndex: 15,
                      paddingRight: "6px",
                      paddingTop: "30px", // Repositioned slightly down
                    }}
                  >
                    {/* Line 1: Date */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.12, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.25,
                        margin: "0 0 4px 0",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {currentEvent.date}
                    </motion.p>

                    {/* Line 2: Time */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.16, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.04rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.15,
                        margin: "0 0 2px 0",
                      }}
                    >
                      {currentEvent.time}
                    </motion.p>

                    {/* Line 3: Subtext */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.2, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "0.88rem",
                        fontWeight: 500,
                        color: "#801B26",
                        fontStyle: "italic",
                        lineHeight: 1.15,
                        margin: "0 0 6px 0",
                      }}
                    >
                      {currentEvent.subtext}
                    </motion.p>

                    {/* Line 4: Venue */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.24, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.02rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.2,
                        margin: "0",
                      }}
                    >
                      {currentEvent.venue}
                    </motion.p>

                    {/* Dress Code Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        marginTop: "8px",
                      }}
                    >
                      {/* Dress Code Script Heading */}
                      <motion.span
                        initial={{ opacity: 0, x: 16, y: 6 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 12, y: -4 }}
                        transition={{ duration: 0.38, delay: 0.32, ease: luxuryEase }}
                        style={{
                          fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                          fontSize: "2.15rem",
                          color: "#801B26",
                          lineHeight: 1.1,
                          marginBottom: "4px",
                          letterSpacing: "0.02em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Dress Code
                      </motion.span>

                      {/* Dress Code Swatches */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.35, delay: 0.36, ease: luxuryEase }}
                        style={{ display: "flex", gap: "8px", alignItems: "center" }}
                      >
                        {currentEvent.dressCodeColors.map((color, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.4 }}
                            transition={{ duration: 0.3, delay: 0.36 + idx * 0.04, ease: luxuryEase }}
                            style={{
                              width: "17px",
                              height: "17px",
                              borderRadius: "50%",
                              backgroundColor: color,
                              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.4)",
                              display: "inline-block",
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  LAYOUT D: WEDDING (ROYAL KALGI ON LEFT + BRIDAL NATH ON BOTTOM-RIGHT)
                  ------------------------------------------------------------- */}
              {currentEvent.id === "wedding" && (
                <div className="w-full h-full relative flex items-center justify-between">
                  {/* Royal Jewelry Kalgi on Left (Separated, Enlarged & Floating) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: -12 }}
                    transition={{ duration: 0.42, delay: 0.06, ease: luxuryEase }}
                    style={{
                      position: "absolute",
                      left: "-12px",
                      top: "30%",
                      transform: "translateY(-50%)",
                      width: "172px", // Enlarged PNG motif size
                      maxWidth: "52%",
                      zIndex: 20,
                      pointerEvents: "none",
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform" }}
                    >
                      <img
                        src={currentEvent.motif}
                        onError={(e) => {
                          if (currentEvent.motifWebp && e.currentTarget.src !== currentEvent.motifWebp) {
                            e.currentTarget.src = currentEvent.motifWebp;
                          }
                        }}
                        alt={currentEvent.motifAlt}
                        loading="eager"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          filter: "drop-shadow(0 12px 22px rgba(128, 27, 38, 0.22))",
                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                        }}
                        draggable="false"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Text Details on Right (Positioned slightly down) */}
                  <div
                    style={{
                      marginLeft: "auto",
                      width: "55%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      textAlign: "right",
                      zIndex: 15,
                      paddingRight: "6px",
                      paddingTop: "30px", // Repositioned slightly down
                    }}
                  >
                    {/* Line 1: Date */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.12, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.25,
                        margin: "0 0 4px 0",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {currentEvent.date}
                    </motion.p>

                    {/* Line 2: Time */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.16, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.04rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.15,
                        margin: "0 0 2px 0",
                      }}
                    >
                      {currentEvent.time}
                    </motion.p>

                    {/* Line 3: Subtext */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.2, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "0.88rem",
                        fontWeight: 500,
                        color: "#801B26",
                        fontStyle: "italic",
                        lineHeight: 1.15,
                        margin: "0 0 6px 0",
                      }}
                    >
                      {currentEvent.subtext}
                    </motion.p>

                    {/* Line 4: Venue */}
                    <motion.p
                      initial={{ opacity: 0, x: 18, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: 12, y: -4 }}
                      transition={{ duration: 0.38, delay: 0.24, ease: luxuryEase }}
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.02rem",
                        fontWeight: 600,
                        color: "#801B26",
                        lineHeight: 1.2,
                        margin: "0",
                      }}
                    >
                      {currentEvent.venue}
                    </motion.p>

                    {/* Dress Code Section */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        marginTop: "8px",
                      }}
                    >
                      {/* Dress Code Script Heading */}
                      <motion.span
                        initial={{ opacity: 0, x: 16, y: 6 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 12, y: -4 }}
                        transition={{ duration: 0.38, delay: 0.32, ease: luxuryEase }}
                        style={{
                          fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
                          fontSize: "2.15rem",
                          color: "#801B26",
                          lineHeight: 1.1,
                          marginBottom: "4px",
                          letterSpacing: "0.02em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Dress Code
                      </motion.span>

                      {/* Dress Code Swatches */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.35, delay: 0.36, ease: luxuryEase }}
                        style={{ display: "flex", gap: "8px", alignItems: "center" }}
                      >
                        {currentEvent.dressCodeColors.map((color, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.4 }}
                            transition={{ duration: 0.3, delay: 0.36 + idx * 0.04, ease: luxuryEase }}
                            style={{
                              width: "17px",
                              height: "17px",
                              borderRadius: "50%",
                              backgroundColor: color,
                              boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.4)",
                              display: "inline-block",
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wedding Bridal Nath (Positioned gracefully in the lower right zone of the slide) */}
            {currentEvent.id === "wedding" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 12 }}
                transition={{ duration: 0.42, delay: 0.08, ease: luxuryEase }}
                style={{
                  position: "absolute",
                  right: "-25px",
                  top: "300px",
                  width: "142px",
                  transform: "rotate(6deg)",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform" }}
                >
                  <img
                    src={currentEvent.secondaryMotif}
                    onError={(e) => {
                      if (currentEvent.secondaryMotifWebp && e.currentTarget.src !== currentEvent.secondaryMotifWebp) {
                        e.currentTarget.src = currentEvent.secondaryMotifWebp;
                      }
                    }}
                    alt="Bridal Nath Nose Ring"
                    loading="eager"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      filter: "drop-shadow(0 12px 22px rgba(128, 27, 38, 0.22))",
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                    }}
                    draggable="false"
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ====================================================================
          BOTTOM LUXURY NAVIGATION DOCK (ARROWS & BACK BUTTON)
          ==================================================================== */}
      <div
        className="event-bottom-nav w-full relative z-30 flex flex-col items-center gap-2 px-3"
        style={{
          background: "transparent",
          marginBottom: "10px",
          marginTop: "-26px",
          transform: "translateY(-45px)",
        }}
      >
        {/* Navigation Arrow Controls & 4 Dots Progress Bar */}
        <div className="w-full flex items-center justify-between max-w-[210px]">
          {/* Previous Arrow Button */}
          <motion.button
            type="button"
            onClick={prevSlide}
            whileHover={{ scale: 1.12, backgroundColor: "rgba(114, 2, 4, 0.12)" }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center justify-center cursor-pointer transition-colors"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.88)",
              border: "1px solid rgba(114, 2, 4, 0.35)",
              color: "#720204",
              boxShadow: "0 2px 6px rgba(114, 2, 4, 0.14)",
            }}
            title="Previous Event"
            aria-label="Previous Event"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>

          {/* 4 Dots Progress Bar */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(114, 2, 4, 0.2)",
              boxShadow: "0 2px 6px rgba(114, 2, 4, 0.08)",
            }}
          >
            {events.map((evt, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={evt.id || idx}
                  type="button"
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className="flex items-center justify-center p-1 cursor-pointer bg-transparent border-0 outline-none"
                  aria-label={`Go to event ${idx + 1}: ${evt.title}`}
                  title={`${idx + 1}. ${evt.title}`}
                >
                  <span
                    className="block transition-all duration-300 rounded-full"
                    style={{
                      width: isActive ? "18px" : "6px",
                      height: "6px",
                      backgroundColor: isActive ? "#720204" : "rgba(114, 2, 4, 0.32)",
                      boxShadow: isActive ? "0 1px 3px rgba(114, 2, 4, 0.35)" : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Next Arrow Button */}
          <motion.button
            type="button"
            onClick={nextSlide}
            whileHover={{ scale: 1.12, backgroundColor: "rgba(114, 2, 4, 0.12)" }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center justify-center cursor-pointer transition-colors"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.88)",
              border: "1px solid rgba(114, 2, 4, 0.35)",
              color: "#720204",
              boxShadow: "0 2px 6px rgba(114, 2, 4, 0.14)",
            }}
            title="Next Event"
            aria-label="Next Event"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>
        </div>

        {/* Action Buttons: Add to Calendar & Back to Index */}
        <div className="flex flex-col items-center gap-1.5 mt-0.5">
          {/* Add to Calendar Button */}
          <motion.button
            type="button"
            onClick={handleAddToCalendar}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="luxury-btn cursor-pointer"
            style={{
              padding: "4px 12px",
              fontSize: "0.50rem",
              letterSpacing: "0.18em",
              color: "#720204",
              borderColor: "rgba(114, 2, 4, 0.45)",
              background: calendarSaved ? "rgba(114, 2, 4, 0.12)" : "rgba(255, 255, 255, 0.88)",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
              transition: "all 0.25s ease",
            }}
            title={`Add ${currentEvent.title} Ceremony to Calendar`}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{calendarSaved ? "EVENT ADDED TO CALENDAR ✓" : "ADD TO CALENDAR"}</span>
          </motion.button>

          {/* Back to Index Navigation Button */}
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="luxury-btn cursor-pointer"
            style={{
              padding: "4px 12px",
              fontSize: "0.50rem",
              letterSpacing: "0.18em",
              color: "#720204",
              borderColor: "rgba(114, 2, 4, 0.45)",
              background: "rgba(255, 255, 255, 0.88)",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
            }}
            title="Back to Chapters Index"
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
