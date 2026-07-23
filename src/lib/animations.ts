import { useReducedMotion, type Easing } from "framer-motion";

const sharedEase: Easing = [0.22, 1, 0.36, 1];
const outEase: Easing = "easeOut";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: sharedEase },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: outEase },
};

export const cardHover = {
  whileHover: { scale: 1.02, y: -2 },
  transition: { duration: 0.25, ease: outEase },
};

export function useAnimations() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      fadeUp: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } },
      scaleIn: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } },
      cardHover: {},
      staggerContainer,
    };
  }

  return {
    fadeUp,
    scaleIn,
    cardHover,
    staggerContainer,
  };
}
