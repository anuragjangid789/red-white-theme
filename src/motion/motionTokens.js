/**
 * MOTION TOKENS
 * Strict adherence to PRD #115
 */
export const motionTokens = {
  fast: 0.35,
  ui: 0.6,
  reveal: 1.0,
  slow: 1.3,
  cinematic: 1.6,
  intro: 2.0,
  ease: [0.16, 1, 0.3, 1], // Slower, regal royal cubic bezier
  softSpring: {
    type: "spring",
    stiffness: 95,
    damping: 20,
    mass: 1.1,
  },
  gentleSpring: {
    type: "spring",
    stiffness: 65,
    damping: 22,
    mass: 1.5,
  },
};
