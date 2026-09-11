import React from "react";
import { motion } from "framer-motion";
import { SectionLabel, AnimatedHeading } from "../Shared/AnimatedHeading";
import { motionTokens } from "../../motion/motionTokens";

export function CoupleSection({ data }) {
  const { couple } = data;
  const { bride, groom, familyIntro } = couple;

  return (
    <section
      id="couple"
      className="relative min-h-screen section-spacing overflow-hidden paper-texture"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="container relative z-10 flex flex-col items-center">
        {/* Chapter Header */}
        <SectionLabel text={couple.sectionLabel || "02 — THE TWO OF US"} />

        <AnimatedHeading
          title={couple.title || "Radhika & Veer"}
          subtitle={couple.subtitle}
          size="large"
          className="my-3"
        />

        {/* Bride & Groom Editorial Duo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-5xl my-10">
          
          {/* ================= BRIDE CARD ================= */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-20px" }}
            transition={{ duration: motionTokens.slow, ease: motionTokens.ease }}
            className="flex flex-col items-center text-center p-8 md:p-10 rounded-sm gold-frame bg-[#FCFAF5]"
          >
            {/* Portrait Canvas Frame */}
            <div className="relative w-40 h-52 mb-6 rounded-t-full border border-[rgba(197,160,89,0.35)] overflow-hidden bg-gradient-to-b from-[#F5EFEB] to-[#EAE3D6] flex flex-col items-center justify-center shadow-md">
              <div className="absolute inset-2 rounded-t-full border border-[rgba(197,160,89,0.2)] pointer-events-none" />
              <div className="w-16 h-16 rounded-full border border-[#C5A059] flex items-center justify-center bg-[rgba(253,251,247,0.7)]">
                <span className="text-2xl text-[#C5A059] font-serif">R</span>
              </div>
              <span className="text-[0.62rem] uppercase tracking-[0.25em] text-[#801B26] font-medium mt-3" style={{ fontFamily: "var(--font-sans)" }}>
                THE BRIDE
              </span>
            </div>

            <span
              className="text-[0.68rem] uppercase tracking-[0.25em] text-[#C5A059] font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {bride.role}
            </span>
            <h3
              className="text-3xl md:text-4xl font-normal text-[#1A3636] my-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {bride.name}
            </h3>
            <p className="text-xs md:text-sm text-[#7A7672] font-light leading-relaxed mb-4 max-w-sm">
              {bride.bio}
            </p>
            {bride.quote && (
              <p
                className="text-xs italic text-[#801B26] font-medium tracking-wide"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {bride.quote}
              </p>
            )}
          </motion.div>

          {/* ================= GROOM CARD ================= */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-20px" }}
            transition={{ duration: motionTokens.slow, ease: motionTokens.ease }}
            className="flex flex-col items-center text-center p-8 md:p-10 rounded-sm gold-frame bg-[#FCFAF5]"
          >
            {/* Portrait Canvas Frame */}
            <div className="relative w-40 h-52 mb-6 rounded-t-full border border-[rgba(197,160,89,0.35)] overflow-hidden bg-gradient-to-b from-[#F5EFEB] to-[#EAE3D6] flex flex-col items-center justify-center shadow-md">
              <div className="absolute inset-2 rounded-t-full border border-[rgba(197,160,89,0.2)] pointer-events-none" />
              <div className="w-16 h-16 rounded-full border border-[#C5A059] flex items-center justify-center bg-[rgba(253,251,247,0.7)]">
                <span className="text-2xl text-[#C5A059] font-serif">V</span>
              </div>
              <span className="text-[0.62rem] uppercase tracking-[0.25em] text-[#801B26] font-medium mt-3" style={{ fontFamily: "var(--font-sans)" }}>
                THE GROOM
              </span>
            </div>

            <span
              className="text-[0.68rem] uppercase tracking-[0.25em] text-[#C5A059] font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {groom.role}
            </span>
            <h3
              className="text-3xl md:text-4xl font-normal text-[#1A3636] my-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {groom.name}
            </h3>
            <p className="text-xs md:text-sm text-[#7A7672] font-light leading-relaxed mb-4 max-w-sm">
              {groom.bio}
            </p>
            {groom.quote && (
              <p
                className="text-xs italic text-[#801B26] font-medium tracking-wide"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {groom.quote}
              </p>
            )}
          </motion.div>
        </div>

        {/* ================= FAMILY INTRODUCTION ================= */}
        {familyIntro && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: motionTokens.slow, delay: 0.15 }}
            className="w-full max-w-3xl text-center mt-6 p-6 rounded-sm border border-[rgba(197,160,89,0.25)] bg-[rgba(247,243,238,0.6)]"
          >
            <h4
              className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold my-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {familyIntro.heading}
            </h4>
            <p className="text-xs text-[#7A7672] uppercase tracking-[0.18em] mb-4">
              {familyIntro.subheading}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 my-4">
              <div>
                <p
                  className="text-xl md:text-2xl text-[#1A3636]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {familyIntro.brideFamily}
                </p>
              </div>
              <span className="text-[#C5A059] font-serif text-2xl italic">&</span>
              <div>
                <p
                  className="text-xl md:text-2xl text-[#1A3636]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {familyIntro.groomFamily}
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm italic text-[#383634] max-w-xl mx-auto mt-4 font-light">
              {familyIntro.message}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
