import React, { useState } from "react";
import { motion } from "framer-motion";

export function SaveTheDateSection({ data, onBack, onNavigateIndex, pageHeight }) {
  const { identity } = data;
  const bride = identity.brideName || "Arusha";
  const groom = identity.groomName || "Akshit";
  const venue = identity.venueName || "The Oberoi Udaivilas, Lake Pichola";
  const weddingDateStr = identity.dateFormatted || "Saturday, November 28, 2026";

  const [calendarSaved, setCalendarSaved] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Smooth slow back navigation with exit animation
  const handleBack = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onNavigateIndex) onNavigateIndex();
      else if (onBack) onBack();
    }, 850);
  };

  // Download .ics file & save the date
  const handleSaveTheDate = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//${bride} and ${groom} Wedding//EN`,
      "BEGIN:VEVENT",
      `SUMMARY:Wedding Celebrations of ${bride} & ${groom}`,
      `DESCRIPTION:Wedding celebrations of ${bride} and ${groom} at ${venue}.`,
      `LOCATION:${venue}`,
      "DTSTART:20261128T053000Z",
      "DTEND:20261129T183000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${bride}-${groom}-Wedding-SaveTheDate.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 4500);
  };

  // November 2026 calendar days (Nov 1 is Sunday)
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  
  const calendarRows = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, null, null, null, null, null],
  ];

  return (
    <motion.section
      id="save-the-date"
      className="save-the-date-canvas relative w-full paper-texture select-none flex flex-col justify-between items-center"
      initial={{ opacity: 0 }}
      animate={
        isExiting
          ? { opacity: 0, y: 18, scale: 0.98, transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] } }
          : { opacity: 1, y: 0, scale: 1, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } }
      }
      style={{
        backgroundColor: "#E6E5DE",
        backgroundImage: "url(/assets/background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat-y",
        minHeight: pageHeight ? `${pageHeight}px` : "var(--screen-height, 100vh)",
        height: pageHeight ? `${pageHeight}px` : "var(--screen-height, 100vh)",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
        paddingTop: "42px",
        paddingBottom: "36px",
      }}
    >
      {/* ====================================================================
          TOP SECTION (ABOVE THE RED BOX)
          Placed lower down with enlarged elegant calligraphy text
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={
          isExiting
            ? { opacity: 0, y: -16, transition: { duration: 0.7 } }
            : { opacity: 1, y: 0, transition: { duration: 1.9, ease: [0.16, 1, 0.3, 1] } }
        }
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 10,
          marginTop: "4px",
          marginBottom: "2px",
        }}
      >
        {/* Section Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={
            isExiting
              ? { opacity: 0, transition: { duration: 0.6 } }
              : { opacity: 1, y: 0, transition: { duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.26em",
            color: "#720204",
            textTransform: "uppercase",
            margin: "0 0 3px 0",
          }}
        >
          SAVE OUR DATE
        </motion.p>

        {/* Couple Names in Enlarged Elegant Calligraphy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isExiting
              ? { opacity: 0, scale: 0.95, transition: { duration: 0.65 } }
              : { opacity: 1, scale: 1, transition: { duration: 2.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            margin: "2px 0",
          }}
        >
          <span
            style={{
              fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
              fontSize: "2.45rem",
              lineHeight: 1.08,
              color: "#720204",
              letterSpacing: "0.02em",
              textShadow: "0 1px 2px rgba(114, 2, 4, 0.12)",
            }}
          >
            {bride}
          </span>
          <span
            style={{
              fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
              fontSize: "1.55rem",
              lineHeight: 1,
              color: "#720204",
              margin: "0 2px",
            }}
          >
            &amp;
          </span>
          <span
            style={{
              fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
              fontSize: "2.45rem",
              lineHeight: 1.08,
              color: "#720204",
              letterSpacing: "0.02em",
              textShadow: "0 1px 2px rgba(114, 2, 4, 0.12)",
            }}
          >
            {groom}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={
            isExiting
              ? { opacity: 0, transition: { duration: 0.6 } }
              : { opacity: 1, y: 0, transition: { duration: 1.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "#720204",
            textTransform: "uppercase",
            margin: "0",
          }}
        >
          ARE GETTING MARRIED
        </motion.p>
      </motion.div>

      {/* ====================================================================
          MIDDLE SECTION: SOLID MAROON RED BOX WITH ANIMATED LACE BORDERS & CALENDAR
          ==================================================================== */}
      <div
        className="relative w-full"
        style={{
          width: "100%",
          position: "relative",
          zIndex: 20,
          margin: "0",
        }}
      >
        {/* TOP LACE BORDER (SLOW EMERGENCE & GENTLE WAVE) */}
        <motion.div
          initial={{ opacity: 0, y: 24, scaleY: 0.85 }}
          animate={
            isExiting
              ? { opacity: 0, y: 16, transition: { duration: 0.7 } }
              : { opacity: 1, y: 0, scaleY: 1, transition: { duration: 2.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            position: "absolute",
            top: "-41px",
            left: 0,
            width: "100%",
            height: "42px",
            pointerEvents: "none",
            zIndex: 25,
            overflow: "hidden",
          }}
        >
          <motion.img
            src="/assets/lace_top.png"
            alt="Intricate Royal Scallop Lace Top Border"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              display: "block",
            }}
            animate={{
              y: [0, -1.8, 0],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* SOLID RED / MAROON CENTRAL BOX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isExiting
              ? { opacity: 0, scale: 0.96, transition: { duration: 0.75 } }
              : { opacity: 1, scale: 1, transition: { duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            width: "100%",
            backgroundColor: "#720204",
            padding: "16px 18px 14px 18px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 20,
            boxShadow: "0 8px 24px rgba(114, 2, 4, 0.28)",
            overflow: "hidden",
          }}
        >
          {/* Subtle Regal Shine Light Beam sweeping every 2.6 seconds */}
          <motion.div
            initial={{ x: "-130%", opacity: 0 }}
            animate={{
              x: ["-130%", "230%"],
              opacity: [0, 0.5, 0.85, 0.5, 0],
            }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              repeatDelay: 1.3, // 1.3s sweep + 1.3s delay = 2.6s cycle
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: "absolute",
              top: "-40%",
              left: 0,
              width: "75%",
              height: "180%",
              background:
                "linear-gradient(115deg, transparent 15%, rgba(255, 255, 255, 0.04) 35%, rgba(255, 240, 205, 0.28) 50%, rgba(255, 255, 255, 0.08) 65%, transparent 85%)",
              transform: "skewX(-22deg)",
              pointerEvents: "none",
              zIndex: 8,
            }}
          />

          {/* Calendar Content Container */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Calendar Month Header */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={
                isExiting
                  ? { opacity: 0 }
                  : { opacity: 1, y: 0, transition: { duration: 1.6, delay: 0.45 } }
              }
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "8px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, transparent, rgba(229, 195, 120, 0.65))" }} />
                <h3
                  style={{
                    fontFamily: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    letterSpacing: "0.26em",
                    color: "#FAF7F0",
                    margin: 0,
                    textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  NOVEMBER 2026
                </h3>
                <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(229, 195, 120, 0.65), transparent)" }} />
              </div>
            </motion.div>

            {/* Days of the Week Grid Header (S M T W T F S) */}
            <div
              style={{
                width: "100%",
                maxWidth: "280px",
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                marginBottom: "6px",
                borderBottom: "1px solid rgba(229, 195, 120, 0.25)",
                paddingBottom: "4px",
              }}
            >
              {daysOfWeek.map((day, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontSize: "0.64rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#E5C378",
                  }}
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Calendar 30 Days Grid with Staggered Appearing & Disappearing Animation */}
            <div
              style={{
                width: "100%",
                maxWidth: "280px",
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                rowGap: "5px",
                textAlign: "center",
              }}
            >
              {calendarRows.flat().map((date, idx) => {
                const isWeddingDay = date === 28;

                if (!date) {
                  return <div key={`empty-${idx}`} style={{ height: "26px" }} />;
                }

                // Stagger delay based on position
                const staggerDelay = 0.25 + (idx % 7) * 0.05 + Math.floor(idx / 7) * 0.07;

                return (
                  <div
                    key={`day-${date}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "26px",
                      position: "relative",
                    }}
                  >
                    {isWeddingDay ? (
                      // Highlighted Wedding Day (28) with Animated Red Heart Design
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={
                          isExiting
                            ? { opacity: 0, scale: 0.6, transition: { duration: 0.5 } }
                            : {
                                opacity: 1,
                                scale: [1, 1.15, 1.05, 1.18, 1],
                                filter: [
                                  "drop-shadow(0 0 4px rgba(255, 46, 76, 0.5))",
                                  "drop-shadow(0 0 10px rgba(255, 46, 76, 0.9))",
                                  "drop-shadow(0 0 5px rgba(255, 46, 76, 0.6))",
                                  "drop-shadow(0 0 12px rgba(255, 46, 76, 0.95))",
                                  "drop-shadow(0 0 4px rgba(255, 46, 76, 0.5))",
                                ],
                                transition: {
                                  opacity: { duration: 1.2, delay: staggerDelay },
                                  scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                                  filter: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                                }
                              }
                        }
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.92 }}
                        style={{
                          position: "relative",
                          width: "30px",
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        onClick={handleSaveTheDate}
                        title="Wedding Day! Click to save the date"
                      >
                        {/* Red Heart SVG Silhouette */}
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "block",
                          }}
                        >
                          <defs>
                            <linearGradient id="redHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FF3352" />
                              <stop offset="45%" stopColor="#D60021" />
                              <stop offset="100%" stopColor="#8A0012" />
                            </linearGradient>
                            <linearGradient id="goldHeartStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFF0CA" />
                              <stop offset="50%" stopColor="#E5C378" />
                              <stop offset="100%" stopColor="#C5A059" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="url(#redHeartGrad)"
                            stroke="url(#goldHeartStroke)"
                            strokeWidth="0.85"
                          />
                        </svg>

                        {/* Centered Date Number '28' */}
                        <span
                          style={{
                            position: "relative",
                            zIndex: 2,
                            fontFamily: "'Cinzel', Georgia, serif",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            marginTop: "1px",
                            textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {date}
                        </span>
                      </motion.div>
                    ) : (
                      // Standard Calendar Date with Appearing and Disappearing Ambient Wave Animation
                      <motion.span
                        initial={{ opacity: 0, scale: 0.75, y: 4 }}
                        animate={
                          isExiting
                            ? {
                                opacity: 0,
                                scale: 0.7,
                                y: -4,
                                transition: { duration: 0.5, delay: (30 - date) * 0.012 },
                              }
                            : {
                                opacity: [0, 1, 0.75, 1],
                                scale: [0.8, 1, 0.95, 1],
                                y: [4, 0, 0, 0],
                                transition: {
                                  duration: 3.8,
                                  delay: staggerDelay,
                                  repeat: Infinity,
                                  repeatDelay: 2.2,
                                  ease: "easeInOut",
                                },
                              }
                        }
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "0.92rem",
                          fontWeight: 600,
                          color: "#FAF7F0",
                          display: "inline-block",
                        }}
                      >
                        {date}
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sub-label under Calendar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={
                isExiting
                  ? { opacity: 0 }
                  : { opacity: 1, transition: { duration: 1.8, delay: 0.8 } }
              }
              style={{
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: "0.54rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "#E5C378",
                  textTransform: "uppercase",
                }}
              >
                ✦ THE AUSPICIOUS CEREMONY ✦
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* BOTTOM LACE BORDER (SLOW EMERGENCE & GENTLE WAVE) */}
        <motion.div
          initial={{ opacity: 0, y: -24, scaleY: 0.85 }}
          animate={
            isExiting
              ? { opacity: 0, y: -16, transition: { duration: 0.7 } }
              : { opacity: 1, y: 0, scaleY: 1, transition: { duration: 2.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }
          }
          style={{
            position: "absolute",
            bottom: "-48px",
            left: 0,
            width: "100%",
            height: "49px",
            pointerEvents: "none",
            zIndex: 25,
            overflow: "hidden",
          }}
        >
          <motion.img
            src="/assets/lace_bottom.png"
            alt="Intricate Royal Scallop Lace Bottom Border"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              display: "block",
            }}
            animate={{
              y: [0, 1.8, 0],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* ====================================================================
          BOTTOM SECTION (BELOW THE RED BOX)
          Enlarged typography, Single "SAVE THE DATE" Button & Back Navigation
          ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={
          isExiting
            ? { opacity: 0, y: 16, transition: { duration: 0.7 } }
            : { opacity: 1, y: 0, transition: { duration: 1.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }
        }
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 10,
          paddingBottom: "12px",
        }}
      >
        {/* Full Date String */}
        <p
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#720204",
            textTransform: "uppercase",
            margin: "0 0 2px 0",
          }}
        >
          {weddingDateStr}
        </p>

        {/* Venue Location */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.66rem",
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: "#720204",
            textTransform: "uppercase",
            margin: "0 0 8px 0",
          }}
        >
          {venue}
        </p>

        {/* Action Buttons: Save The Date + Back to Index */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            width: "100%",
            maxWidth: "200px",
            alignItems: "center",
          }}
        >
          {/* Single "SAVE THE DATE" Button */}
          <motion.button
            type="button"
            onClick={handleSaveTheDate}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="luxury-btn"
            style={{
              width: "100%",
              padding: "7px 16px",
              fontSize: "0.52rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#720204",
              borderColor: "rgba(114, 2, 4, 0.45)",
              background: "rgba(255, 255, 255, 0.9)",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{calendarSaved ? "DATE SAVED TO CALENDAR ✓" : "SAVE THE DATE"}</span>
          </motion.button>

          {/* Back to Index Button matching Family section */}
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="luxury-btn"
            style={{
              width: "100%",
              padding: "7px 16px",
              fontSize: "0.52rem",
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
              width="12"
              height="12"
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
        </div>
      </motion.div>
    </motion.section>
  );
}
