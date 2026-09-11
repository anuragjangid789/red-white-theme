import React from "react";
import { motion } from "framer-motion";
import { CardGrid } from "./CardGrid";
import { SectionLabel } from "../Shared/AnimatedHeading";
import { PichwaiDivider } from "../Shared/PichwaiMotifs";

export function InvitationIndexPage({
  data,
  onNavigate,
  onBackHome,
  onGoThankYou,
  showNav = false,
  pageHeight,
}) {
  const { home } = data;

  return (
    <section
      id="invitation-index"
      className="home-snap-page page-bg-embossed relative w-full paper-texture py-6 px-3 flex flex-col items-center justify-between select-none"
      style={{
        backgroundColor: "#E6E5DE",
        backgroundImage: "url(/assets/background.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: pageHeight ? `${pageHeight}px` : "var(--screen-height, 100vh)",
        height: pageHeight ? `${pageHeight}px` : "var(--screen-height, 100vh)",
        overflow: "visible",
      }}
    >
      {/* Top and bottom seamless blends to adjacent pages */}
      <div className="page-seam-blend page-seam-blend-top" />
      <div className="page-seam-blend page-seam-blend-bottom" />

      {/* Top Navigation Bar (Only if standalone page) */}
      {showNav && (
        <div className="relative z-20 w-full max-w-md mx-auto flex items-center justify-between px-2 pt-2 pb-1 border-b border-[rgba(197,160,89,0.18)] mb-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-[#801B26] font-medium hover:text-[#C5A059] transition-colors py-1"
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
            className="text-[0.62rem] uppercase tracking-[0.25em] text-[#C5A059] font-medium"
            style={{ fontFamily: "var(--font-royal)" }}
          >
            {data.identity.monogram || "R & V"}
          </span>

          <button
            type="button"
            onClick={onGoThankYou}
            className="inline-flex items-center gap-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#801B26] font-medium hover:text-[#C5A059] transition-colors py-1"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>THANK YOU</span>
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
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      <div className="container relative z-10 flex flex-col items-center text-center w-full max-w-md mx-auto my-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-1"
        >
          <SectionLabel text={home.label || "INVITATION INDEX"} className="my-0.5 text-[0.6rem]" />
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.15, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl font-normal text-[#1A3636] tracking-tight my-0.5 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Chapters of Celebration
        </motion.h2>

        {/* Subtitle Hint */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[0.62rem] uppercase tracking-[0.22em] text-[#801B26] font-medium my-1"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Tap any chapter card to enter
        </motion.p>

        {/* 6 Primary Cards Grid (2 x 3 Screen Fit) */}
        <div className="w-full mt-3 mb-1">
          <CardGrid cards={home.cards} onNavigate={onNavigate} />
        </div>

        {/* Decorative Divider Leading into Next Section */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.15, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center my-1"
        >
          <PichwaiDivider width="60%" height={14} color="#C5A059" />
        </motion.div>

        {/* Optional Button (Only if standalone page) */}
        {showNav && onGoThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="w-full pt-2 border-t border-[rgba(197,160,89,0.18)] flex items-center justify-center mt-2"
          >
            <button
              type="button"
              onClick={onGoThankYou}
              className="luxury-btn text-[0.68rem] py-2 px-4 flex items-center gap-2"
            >
              <span>CONTINUE TO THANK YOU PAGE</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
