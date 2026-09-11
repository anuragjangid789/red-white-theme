import { useEffect } from "react";

/**
 * SCROLL LOCK HOOK
 * PRD #18: Locks document.body scroll during intro, unlocks when finished.
 */
export function useScrollLock(isLocked) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = "";
    };
  }, [isLocked]);
}
