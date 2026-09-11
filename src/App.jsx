import React, { useState, useEffect, useCallback, useRef } from "react";
import { weddingData } from "./data/weddingData";
import { useScrollLock } from "./hooks/useScrollLock";
import IPhoneFrame from "./components/Chassis/IPhoneFrame";

// Intro Components
import { Preloader } from "./components/Intro/Preloader";
import { EnvelopeScene } from "./components/Intro/EnvelopeScene";

// Navigation Components
import { SubpageHeader } from "./components/Navigation/SubpageHeader";
import { SubpageFooter } from "./components/Navigation/SubpageFooter";

// Chapter Sections & Pages
import { HomePage } from "./components/Home/HomePage";
import { InvitationIndexPage } from "./components/Home/InvitationIndexPage";
import { ThankYouPage } from "./components/Closing/ThankYouPage";
import { FamilyPage } from "./components/Family/FamilyPage";
import { VenueReveal } from "./components/Welcome/VenueReveal";
import { CoupleSection } from "./components/Couple/CoupleSection";
import { SaveTheDateSection } from "./components/SaveDate/SaveTheDateSection";
import { StorySection } from "./components/Story/StorySection";
import { EventsSection } from "./components/Events/EventsSection";
import { VenueSection } from "./components/Venue/VenueSection";
import { GallerySection } from "./components/Gallery/GallerySection";
import { ParentsSection } from "./components/Parents/ParentsSection";

const ALL_PAGES = [
  "home",
  "index",
  "family",
  "thank-you",
  "couple",
  "save-the-date",
  "story",
  "events",
  "venue",
  "gallery",
];

const PAGE_TITLES = {
  home: "Welcome",
  index: "Invitation Index",
  family: "Family Details",
  "thank-you": "Thank You",
  couple: "The Couple",
  "save-the-date": "Save The Date",
  story: "Our Story",
  events: "The Celebrations",
  venue: "The Venue",
  gallery: "The Gallery",
};

export default function App() {
  const getInitialPage = () => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("event")) {
        return "events";
      }
      const pageParam = urlParams.get("page");
      if (pageParam && ALL_PAGES.includes(pageParam)) {
        return pageParam;
      }
      const hash = window.location.hash.replace("#", "");
      if (hash && ALL_PAGES.includes(hash)) {
        return hash;
      }
    }
    return "home";
  };

  const getDirectHashState = () => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("event")) {
        return true;
      }
      const pageParam = urlParams.get("page");
      if (pageParam && ALL_PAGES.includes(pageParam)) {
        return true;
      }
      const hash = window.location.hash.replace("#", "");
      if (hash && ALL_PAGES.includes(hash)) {
        return true;
      }
      if (sessionStorage.getItem("intro_completed") === "true") {
        return true;
      }
    }
    return false;
  };

  const initialPage = getInitialPage();
  const shouldSkipIntro = getDirectHashState();

  const [preloaderDone, setPreloaderDone] = useState(shouldSkipIntro);
  const [introCompleted, setIntroCompleted] = useState(shouldSkipIntro);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [viewportHeight, setViewportHeight] = useState(null);

  const mainViewportRef = useRef(null);

  // Lock scrolling when on dedicated fixed single-viewport pages (Events, Gallery, Venue)
  useEffect(() => {
    if (currentPage === "events" || currentPage === "gallery" || currentPage === "venue") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (mainViewportRef.current) {
        mainViewportRef.current.style.overflow = "hidden";
        mainViewportRef.current.scrollTo({ top: 0, behavior: "instant" });
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (mainViewportRef.current) {
        mainViewportRef.current.style.overflow = "";
      }
    }
  }, [currentPage]);

  // Measure and keep track of precise viewport height for equal slide sizing
  useEffect(() => {
    const updateHeight = () => {
      if (mainViewportRef.current) {
        const h = mainViewportRef.current.clientHeight;
        setViewportHeight(h);
        mainViewportRef.current.style.setProperty("--screen-height", `${h}px`);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    if (mainViewportRef.current) {
      observer.observe(mainViewportRef.current);
    }
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // Lock scroll only during intro envelope
  useScrollLock(!introCompleted);

  // Navigate directly to the Invitation Index / Chapters card section inside Home view
  const navigateToIndexSection = useCallback((smooth = false) => {
    setCurrentPage("home");
    window.history.pushState(null, "", " ");

    const scrollToTarget = () => {
      const el = document.getElementById("invitation-index");
      if (el) {
        el.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
      } else if (mainViewportRef.current) {
        const h = viewportHeight || mainViewportRef.current.clientHeight || window.innerHeight;
        mainViewportRef.current.scrollTo({ top: h, behavior: smooth ? "smooth" : "instant" });
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    // Use requestAnimationFrame & micro-delays to ensure DOM has rendered Home view before scrolling
    requestAnimationFrame(() => {
      scrollToTarget();
      setTimeout(scrollToTarget, 50);
      setTimeout(scrollToTarget, 150);
    });
  }, [viewportHeight]);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "index") {
        navigateToIndexSection(false);
      } else if (hash && ALL_PAGES.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: "instant" });
        if (mainViewportRef.current) {
          mainViewportRef.current.scrollTo({ top: 0, behavior: "instant" });
        }
      } else {
        setCurrentPage("home");
        window.scrollTo({ top: 0, behavior: "instant" });
        if (mainViewportRef.current) {
          mainViewportRef.current.scrollTo({ top: 0, behavior: "instant" });
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigateToIndexSection]);

  // If loaded with ?page=index or #index, automatically scroll to index card section
  useEffect(() => {
    if (typeof window !== "undefined" && introCompleted) {
      const hash = window.location.hash.replace("#", "");
      const pageParam = new URLSearchParams(window.location.search).get("page");
      if (hash === "index" || pageParam === "index") {
        navigateToIndexSection(false);
      }
    }
  }, [introCompleted, navigateToIndexSection]);

  // Envelope opening finished -> enter Home view
  const handleEnvelopeComplete = useCallback(() => {
    try {
      sessionStorage.setItem("intro_completed", "true");
    } catch (e) {}
    setIntroCompleted(true);
    setCurrentPage("home");
  }, []);

  // Open any chapter card in a dedicated page (NO long page scroll)
  const navigateToPage = useCallback((pageId) => {
    if (pageId === "index") {
      navigateToIndexSection(false);
      return;
    }
    const target = ALL_PAGES.includes(pageId) ? pageId : "home";
    setCurrentPage(target);
    if (target === "home") {
      window.history.pushState(null, "", " ");
    } else {
      window.history.pushState(null, "", `#${target}`);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    if (mainViewportRef.current) {
      mainViewportRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [navigateToIndexSection]);

  // Replay invitation experience
  const handleReplayIntro = useCallback(() => {
    try {
      sessionStorage.removeItem("intro_completed");
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: "instant" });
    if (mainViewportRef.current) {
      mainViewportRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
    window.history.pushState(null, "", " ");
    setCurrentPage("home");
    setIntroCompleted(false);
  }, []);

  // Scroll to top helper
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (mainViewportRef.current) {
      mainViewportRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className={`desktop-viewport-container theme-page-${currentPage}`}>
      <IPhoneFrame>
        <main
          ref={mainViewportRef}
          className="inner-app-scroll relative w-full h-full bg-[#E6E5DE] text-[var(--color-ink)] selection:bg-[#C5A059] selection:text-white"
        >
          {/* 00. PRELOADER */}
          {!preloaderDone && (
            <Preloader onComplete={() => setPreloaderDone(true)} />
          )}

          {/* 01. OPENING ENVELOPE EXPERIENCE (STATE A) */}
          {preloaderDone && !introCompleted && (
            <EnvelopeScene
              data={weddingData}
              onOpenComplete={handleEnvelopeComplete}
            />
          )}

          {/* STATE B: MULTI-PAGE APPLICATION (DEDICATED CHAPTER PAGES) */}
          {introCompleted && (
            <div className="relative w-full min-h-full flex flex-col subpage-bg-embossed">
          {/* =========================================================
              VIEW 1: MAIN HOME VIEW (WELCOME COVER -> INVITATION INDEX -> THANK YOU)
              ========================================================= */}
          {(currentPage === "home" || currentPage === "index") && (
            <div
              className="w-full home-scroll-container"
              style={{
                height: viewportHeight ? `${viewportHeight * 3}px` : "300vh",
                maxHeight: viewportHeight ? `${viewportHeight * 3}px` : "300vh",
                overflowY: "clip",
                overflowX: "hidden",
                position: "relative",
              }}
            >
              <HomePage data={weddingData} pageHeight={viewportHeight} />
              <InvitationIndexPage
                data={weddingData}
                onNavigate={navigateToPage}
                showNav={false}
                pageHeight={viewportHeight}
              />
              <ThankYouPage
                data={weddingData}
                onReplayIntro={handleReplayIntro}
                onScrollToTop={scrollToTop}
                showNav={false}
                pageHeight={viewportHeight}
              />
            </div>
          )}

          {/* =========================================================
              VIEW 3: DEDICATED THANK YOU PAGE (IF DIRECT HASH)
              ========================================================= */}
          {currentPage === "thank-you" && (
            <div className="w-full h-full flex-1 flex flex-col overflow-hidden">
              <ThankYouPage
                data={weddingData}
                onReplayIntro={handleReplayIntro}
                onScrollToTop={scrollToTop}
                onNavigateHome={() => navigateToPage("home")}
                showNav={true}
                pageHeight={viewportHeight}
              />
            </div>
          )}

          {/* =========================================================
              VIEW: DEDICATED FAMILY DETAILS PAGE
              ========================================================= */}
          {(currentPage === "family" || currentPage === "couple") && (
            <div
              className="w-full min-h-full flex-1 flex flex-col"
              style={{
                backgroundColor: "#E6E5DE",
                backgroundImage: "url(/assets/background.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "repeat-y",
              }}
            >
              <FamilyPage
                data={weddingData}
                onBack={navigateToIndexSection}
                onNavigateIndex={navigateToIndexSection}
                pageHeight={viewportHeight}
              />
            </div>
          )}

          {/* =========================================================
              VIEW 5: SAVE THE DATE DEDICATED PAGE
              ========================================================= */}
          {currentPage === "save-the-date" && (
            <div
              className="w-full min-h-full flex-1"
              style={{
                backgroundColor: "#E6E5DE",
                backgroundImage: "url(/assets/background.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            >
              <SaveTheDateSection
                data={weddingData}
                onBack={navigateToIndexSection}
                onNavigateIndex={navigateToIndexSection}
                pageHeight={viewportHeight}
              />
            </div>
          )}

          {/* =========================================================
              VIEW 6: OUR STORY DEDICATED PAGE
              ========================================================= */}
          {currentPage === "story" && (
            <div
              className="w-full min-h-full flex-1 flex flex-col"
              style={{
                backgroundColor: "#E6E5DE",
                backgroundImage: "url(/assets/background.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
              }}
            >
              <StorySection
                data={weddingData}
                onBack={navigateToIndexSection}
                onNavigateIndex={navigateToIndexSection}
                pageHeight={viewportHeight}
              />
            </div>
          )}

          {/* =========================================================
              VIEW 7: THE CELEBRATIONS DEDICATED PAGE
              ========================================================= */}
          {currentPage === "events" && (
            <div className="w-full h-full flex-1 flex flex-col overflow-hidden">
              <EventsSection
                data={weddingData}
                onBack={navigateToIndexSection}
                onNavigateIndex={navigateToIndexSection}
                pageHeight={viewportHeight}
              />
            </div>
          )}

          {/* =========================================================
              VIEW 8: THE VENUE DEDICATED PAGE
              ========================================================= */}
          {currentPage === "venue" && (
            <div className="w-full h-full flex-1 flex flex-col overflow-hidden">
              <VenueSection
                data={weddingData}
                onBack={navigateToIndexSection}
                onNavigateIndex={navigateToIndexSection}
                pageHeight={viewportHeight}
              />
            </div>
          )}

          {/* =========================================================
              VIEW 9: THE GALLERY DEDICATED PAGE
              ========================================================= */}
          {currentPage === "gallery" && (
            <div className="w-full h-full flex-1 flex flex-col overflow-hidden">
              <GallerySection
                data={weddingData}
                onBack={navigateToIndexSection}
                onNavigateIndex={navigateToIndexSection}
                pageHeight={viewportHeight}
              />
            </div>
          )}
        </div>
      )}
        </main>
      </IPhoneFrame>
    </div>
  );
}
