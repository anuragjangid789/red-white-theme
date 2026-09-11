import React from "react";
import { motion } from "framer-motion";
import { SectionLabel, AnimatedHeading } from "../Shared/AnimatedHeading";
import { motionTokens } from "../../motion/motionTokens";

export function ParentsSection({ data }) {
  const { parents } = data;

  return (
    <section
      id="parents"
      className="relative min-h-[80vh] section-spacing overflow-hidden paper-texture flex flex-col items-center justify-center"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="container relative z-10 flex flex-col items-center text-center">
        <SectionLabel text={parents.sectionLabel || "10 — BLESSINGS"} />

        <AnimatedHeading
          title={parents.heading}
          size="medium"
          className="my-3 max-w-3xl"
        />

        <p className="editorial-copy max-w-2xl mx-auto my-4 text-sm md:text-base text-[#7A7672]">
          {parents.subheading}
        </p>


        {/* Dual Family Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto my-8 w-full">
          {/* Bride Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: motionTokens.slow }}
            className="p-8 rounded-sm gold-frame bg-[#FCFAF5] flex flex-col items-center text-center"
          >
            <span
              className="text-xs uppercase tracking-[0.25em] text-[#801B26] font-semibold mt-1 mb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {parents.brideSide.familyTitle}
            </span>
            <h3
              className="text-xl md:text-2xl text-[#1A3636] font-normal my-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {parents.brideSide.parents}
            </h3>
            <p className="text-xs text-[#7A7672] font-light mt-2 italic">
              {parents.brideSide.elders}
            </p>
          </motion.div>

          {/* Groom Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: motionTokens.slow, delay: 0.1 }}
            className="p-8 rounded-sm gold-frame bg-[#FCFAF5] flex flex-col items-center text-center"
          >
            <span
              className="text-xs uppercase tracking-[0.25em] text-[#801B26] font-semibold mt-1 mb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {parents.groomSide.familyTitle}
            </span>
            <h3
              className="text-xl md:text-2xl text-[#1A3636] font-normal my-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {parents.groomSide.parents}
            </h3>
            <p className="text-xs text-[#7A7672] font-light mt-2 italic">
              {parents.groomSide.elders}
            </p>
          </motion.div>
        </div>

        {/* Sacred Blessing Quote */}
        {parents.blessingQuote && (
          <p
            className="text-xs md:text-sm text-[#801B26] italic font-serif max-w-xl mx-auto mt-6 tracking-wide"
          >
            {parents.blessingQuote}
          </p>
        )}
      </div>
    </section>
  );
}
