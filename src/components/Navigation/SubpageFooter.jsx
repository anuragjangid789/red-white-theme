import React from "react";

export function SubpageFooter({
  onBack,
  coupleNames = "Radhika & Veer",
  city = "Udaipur, Rajasthan",
  backLabel = "RETURN TO HOME",
}) {
  return (
    <footer className="w-full py-8 px-5 border-t border-[rgba(197,160,89,0.25)] paper-texture flex flex-col items-center text-center mt-12">

      <h4
        className="text-2xl text-[#1A3636] font-normal my-2"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {coupleNames}
      </h4>
      <p
        className="text-xs uppercase tracking-[0.2em] text-[#801B26] font-medium mb-6"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {city}
      </p>

      <button
        type="button"
        onClick={onBack}
        className="luxury-btn text-xs"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>{backLabel}</span>
      </button>
    </footer>
  );
}
