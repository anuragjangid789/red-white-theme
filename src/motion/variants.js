import { motionTokens } from "./motionTokens";

/**
 * REUSABLE MOTION VARIANTS
 * PRD #114, #116, #117, #118
 */

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionTokens.reveal, ease: motionTokens.ease },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.reveal, ease: motionTokens.ease },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.reveal, ease: motionTokens.ease },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionTokens.reveal, ease: motionTokens.ease },
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const lineReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: motionTokens.slow, ease: motionTokens.ease },
  },
};

export const maskReveal = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: motionTokens.slow, ease: motionTokens.ease },
  },
};

export const imageReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)", scale: 1.06 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: { duration: motionTokens.cinematic, ease: motionTokens.ease },
  },
};

export const drawSVG = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: motionTokens.cinematic, ease: motionTokens.ease },
  },
};
