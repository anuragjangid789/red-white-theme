import React from "react";
import { PichwaiLotus, PalaceArch } from "../Shared/PichwaiMotifs";

/**
 * ROYAL INVITATION CARD COMPONENT
 * Physical luxury handmade card emerging from the royal envelope,
 * featuring gold foil embossed filigree, Sanskrit invocation,
 * and Pinyon Script calligraphy.
 */
export function InvitationCard({ data, isExpanded = false }) {
  const { identity } = data;

  return (
    <div
      className="invitation-card-content relative w-full h-full p-4 sm:p-6 md:p-8 flex flex-col items-center justify-between text-center select-none overflow-hidden rounded-sm"
      style={{
        backgroundColor: "#FAF7F0",
        backgroundImage: "radial-gradient(circle at center, #FFFDF8 0%, #FAF6EE 60%, #F3ECE0 100%)",
        border: "1.5px solid #C5A059",
        boxShadow: "0 12px 32px rgba(85, 14, 22, 0.18), 0 2px 6px rgba(0, 0, 0, 0.08), inset 0 0 24px rgba(197, 160, 89, 0.14)",
      }}
    >
      {/* 1. Subtle Paper Fiber Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#C5A059 0.75px, transparent 0.75px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* 2. Outer Delicate Gold Beaded Border */}
      <div
        className="absolute inset-2 sm:inset-2.5 border border-[#C5A059]/40 pointer-events-none"
        style={{
          borderStyle: "dashed",
          borderWidth: "0.75px",
        }}
      />

      {/* 3. Inner Fine Gold Inset Frame */}
      <div className="absolute inset-3 sm:inset-4 border border-[#C5A059]/60 pointer-events-none" />

      {/* 4. Ornate Gold Filigree Corner Accents */}
      <div className="absolute top-3.5 left-3.5 w-3 h-3 border-t-2 border-l-2 border-[#801B26] opacity-85" />
      <div className="absolute top-3.5 right-3.5 w-3 h-3 border-t-2 border-r-2 border-[#801B26] opacity-85" />
      <div className="absolute bottom-3.5 left-3.5 w-3 h-3 border-b-2 border-l-2 border-[#801B26] opacity-85" />
      <div className="absolute bottom-3.5 right-3.5 w-3 h-3 border-b-2 border-r-2 border-[#801B26] opacity-85" />

      {/* 5. Top Auspicious Invocation & Lotus Motif */}
      <div className="relative z-10 flex flex-col items-center pt-0.5 sm:pt-1">
        <span
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: "0.50rem",
            letterSpacing: "0.28em",
            color: "#801B26",
            fontWeight: 700,
          }}
        >
          ॥ श्री गणेशाय नमः ॥
        </span>
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <div className="w-6 h-[0.5px] bg-[#C5A059]" />
          <PichwaiLotus size={22} color="#C5A059" />
          <div className="w-6 h-[0.5px] bg-[#C5A059]" />
        </div>
        <span
          className="text-[0.44rem] sm:text-[0.48rem] uppercase tracking-[0.22em] text-[#A4313B] font-semibold mt-0.5"
          style={{ fontFamily: "'Cinzel', Georgia, serif" }}
        >
          {identity.invitationHeadline || "REQUEST THE HONOUR OF YOUR PRESENCE"}
        </span>
      </div>

      {/* 6. Grand Couple Names in Pinyon Script */}
      <div className="relative z-10 my-auto py-1 flex flex-col items-center">
        <h1
          style={{
            fontFamily: "'Pinyon Script', 'Alex Brush', cursive",
            fontSize: "2.35rem",
            lineHeight: 1.05,
            color: "#801B26",
            fontWeight: 400,
            letterSpacing: "0.02em",
            textShadow: "0 1px 2px rgba(128, 27, 38, 0.15)",
            margin: 0,
          }}
        >
          {identity.coupleNames}
        </h1>
        {/* Royal Gold Divider Line with Diamond Center */}
        <div className="flex items-center justify-center gap-1.5 my-1 w-28">
          <div className="flex-1 h-[0.5px] bg-[#C5A059]" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#801B26] bg-[#C5A059]" />
          <div className="flex-1 h-[0.5px] bg-[#C5A059]" />
        </div>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.62rem",
            fontStyle: "italic",
            color: "#5C5652",
            letterSpacing: "0.08em",
          }}
        >
          To celebrate their holy union in eternal love
        </span>
      </div>

      {/* 7. Palace Arch, Date & Venue */}
      <div className="relative z-10 flex flex-col items-center pb-0.5 sm:pb-1">
        <PalaceArch width={74} height={24} color="#C5A059" />
        <p
          className="text-[0.54rem] sm:text-[0.58rem] uppercase tracking-[0.24em] text-[#801B26] font-bold mt-1"
          style={{ fontFamily: "'Cinzel', Georgia, serif" }}
        >
          {identity.displayDate} · UDAIPUR
        </p>
        <p
          className="text-[0.42rem] sm:text-[0.46rem] text-[#7A7672] uppercase tracking-[0.16em] mt-0.5"
          style={{ fontFamily: "'Cinzel', Georgia, serif" }}
        >
          {identity.venueName}
        </p>
      </div>
    </div>
  );
}

export default InvitationCard;
