import React from "react";

export function ClosingSection({ data, onReplayIntro }) {
  const { closing, identity } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const scrollEl = document.querySelector(".inner-app-scroll");
    if (scrollEl) {
      scrollEl.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="closing"
      className="relative section-spacing paper-texture overflow-hidden flex flex-col items-center justify-center border-t border-[rgba(197,160,89,0.25)] py-10"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Monogram */}
        <div className="mb-2">
          <h2
            className="royal-heading text-lg md:text-xl text-[#C5A059] tracking-[0.3em] font-medium"
            style={{ fontFamily: "var(--font-royal)" }}
          >
            {closing.monogram || identity.monogram}
          </h2>
        </div>

        {/* Couple Names */}
        <h3
          className="text-2xl md:text-3xl text-[#1A3636] font-normal my-1.5"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {closing.coupleNames || identity.coupleNames}
        </h3>

        <p
          className="text-[0.68rem] uppercase tracking-[0.25em] text-[#801B26] font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {closing.city || identity.city} · {closing.date || identity.displayDate}
        </p>

        <p className="editorial-copy max-w-xl mx-auto my-4 text-xs md:text-sm text-[#7A7672]">
          {closing.farewellMessage}
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 my-6">
          <button
            type="button"
            onClick={onReplayIntro}
            className="luxury-btn text-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span>{closing.replayButton || "REPLAY INVITATION"}</span>
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="luxury-btn text-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
            <span>{closing.backToTop || "RETURN TO TOP"}</span>
          </button>
        </div>

        {/* Copyright Note */}
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#7A7672] mt-6">
          Crafted with devotion & Pichwai artistry · All rights reserved
        </p>
      </div>
    </footer>
  );
}
