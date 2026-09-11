import React from "react";
import { SectionLabel, AnimatedHeading } from "../Shared/AnimatedHeading";

export function VenueReveal({ data }) {
  const { welcome } = data;

  return (
    <section
      id="welcome"
      className="relative min-h-screen section-spacing overflow-hidden flex flex-col items-center justify-center linen-texture"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div className="container relative z-10 flex flex-col items-center text-center">
        <SectionLabel text={welcome.sectionLabel || "01 — DESTINATION REVEAL"} />

        <AnimatedHeading
          title={welcome.palaceName}
          subtitle={welcome.destination}
          size="large"
          className="my-3"
        />

        <p className="editorial-copy max-w-2xl mx-auto my-5 text-sm md:text-base text-[#383634]">
          {welcome.welcomeCopy}
        </p>

        {/* Architectural Palace Showcase Canvas */}
        <div className="relative w-full max-w-3xl mx-auto my-6 h-[260px] md:h-[340px] rounded-sm overflow-hidden border border-[rgba(197,160,89,0.35)] shadow-xl bg-gradient-to-b from-[#FAF6EE] to-[#E8DFCF] flex flex-col items-center justify-between p-6">
          <div className="w-full flex items-center justify-between">
            <span className="text-[0.62rem] uppercase tracking-[0.25em] text-[#C5A059] font-medium">
              EST. 1559 · MEWAR
            </span>
            <span className="text-[0.62rem] uppercase tracking-[0.25em] text-[#801B26] font-medium">
              UDAIPUR, RAJASTHAN
            </span>
          </div>

          <div className="text-center my-auto">
            <h3
              className="text-3xl md:text-4xl text-[#1A3636] font-normal tracking-wide"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The Oberoi Udaivilas
            </h3>
            <p className="text-xs uppercase tracking-[0.25em] text-[#9A783E] font-medium mt-2">
              On the Serene Banks of Lake Pichola
            </p>
          </div>

          <div className="w-full flex items-center justify-center border-t border-[rgba(197,160,89,0.25)] pt-3">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#7A7672]">
              THE ROYAL SANCTUARY
            </span>
          </div>
        </div>

        {/* Bottom Accent */}
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#7A7672] font-medium mt-2">
          {welcome.scrollHint || "SCROLL TO DISCOVER"}
        </p>
      </div>
    </section>
  );
}
