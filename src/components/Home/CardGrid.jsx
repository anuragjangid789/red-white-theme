import React from "react";
import { StampCard } from "./StampCard";

export function CardGrid({ onNavigate }) {
  // Column 1 Stamps (Left: Tall, Medium, Compact)
  const leftStamps = [
    {
      id: "family",
      href: "#family",
      number: "№ 01",
      tagline: "HERITAGE",
      titleMain: "FAMILY",
      titleScript: "Details",
      subtitle: "LINEAGE & PARENTS",
      detail: "Relan & Khatri Families",
      footer: "FAMILY ARCHIVE",
      color: "#801B26",
      innerBg: "#FAF7F0",
      aspectHeight: 155,
      delay: 0.12,
      slideFrom: { x: -85, y: -30, rotate: -6 },
    },
    {
      id: "story",
      href: "#story",
      number: "№ 03",
      tagline: "MEMOIR",
      titleMain: "OUR STORY",
      titleScript: "Memoir",
      subtitle: "A Tapestry of Moments",
      detail: "Chapters · Promises",
      footer: "HERITAGE ARCHIVE",
      color: "#B38738",
      innerBg: "#FAF8F2",
      aspectHeight: 114,
      delay: 0.28,
      slideFrom: { x: -95, y: 0, rotate: -4 },
    },
    {
      id: "venue",
      href: "#venue",
      number: "№ 05",
      tagline: "TRAVEL",
      titleMain: "TRAVEL & STAY",
      titleScript: "The Venue",
      subtitle: "The Oberoi Udaivilas",
      detail: "Lake Pichola · Udaipur",
      footer: "DESTINATION GUIDE",
      color: "#1A3636",
      innerBg: "#F6F8F6",
      aspectHeight: 88,
      delay: 0.44,
      slideFrom: { x: -75, y: 45, rotate: -5 },
    },
  ];

  // Column 2 Stamps (Right: Medium-Tall, Medium, Square-Medium)
  const rightStamps = [
    {
      id: "save-the-date",
      href: "#save-the-date",
      number: "№ 02",
      tagline: "NOV 2026",
      titleMain: "SAVE",
      titleScript: "the",
      subtitle: "DATE",
      detail: "28 · 11 · 2026",
      footer: "OFFICIAL CORRESPONDENCE",
      color: "#4A6B53",
      innerBg: "#F7FAF7",
      aspectHeight: 135,
      delay: 0.2,
      slideFrom: { x: 85, y: -30, rotate: 6 },
    },
    {
      id: "events",
      href: "#events",
      number: "№ 04",
      tagline: "ITINERARY",
      titleMain: "CELEBRATIONS",
      titleScript: "Festivities",
      subtitle: "3 Days · 5 Events",
      detail: "Palace Soiree",
      footer: "CEREMONY SCHEDULE",
      color: "#3A4E5E",
      innerBg: "#F7F8FA",
      aspectHeight: 112,
      delay: 0.36,
      slideFrom: { x: 95, y: 0, rotate: 4 },
    },
    {
      id: "gallery",
      href: "#gallery",
      number: "№ 06",
      tagline: "PORTFOLIO",
      titleMain: "",
      titleScript: "Gallery",
      subtitle: "MEMORIES",
      detail: "Cherished Moments",
      footer: "VISUAL CHRONICLE",
      color: "#8B4B62",
      innerBg: "#FAF6F8",
      aspectHeight: 110,
      delay: 0.52,
      slideFrom: { x: 75, y: 45, rotate: 5 },
    },
  ];

  return (
    <div
      className="stamp-collage-grid"
      style={{
        width: "100%",
        maxWidth: "340px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        boxSizing: "border-box",
      }}
    >
      {/* Left Stamp Column */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {leftStamps.map((stamp) => (
          <StampCard key={stamp.id} {...stamp} onSelect={onNavigate} />
        ))}
      </div>

      {/* Right Stamp Column */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {rightStamps.map((stamp) => (
          <StampCard key={stamp.id} {...stamp} onSelect={onNavigate} />
        ))}
      </div>
    </div>
  );
}
