import { useState, useEffect } from "react";

/**
 * ACTIVE SECTION OBSERVER HOOK
 * PRD #29, #30, #167: Tracks current visible section and syncs hash without reloads.
 */
export function useActiveSection(sectionIds = [], enabled = true) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;

    const handleScroll = () => {
      // Find the section closest to the top third of the viewport
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            // Optionally update hash silently
            if (window.location.hash !== `#${id}`) {
              window.history.replaceState(null, "", `#${id}`);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, enabled]);

  return activeSection;
}
