import { useReducedMotion, type Easing, type Variants } from "framer-motion";

const sharedEase: Easing = [0.22, 1, 0.36, 1];
const outEase: Easing = "easeOut";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: sharedEase },
};

export const fadeLeft = {
  initial: { opacity: 0, x: -72 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.75, ease: sharedEase },
};

export const fadeUpView = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25, margin: "-60px" as const },
  transition: { duration: 0.6, ease: sharedEase },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: outEase },
};

export const scaleInView = {
  initial: { opacity: 0, scale: 0.92, y: 28 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, amount: 0.2, margin: "-40px" as const },
  transition: { duration: 0.55, ease: sharedEase },
};

export const slideLeftView = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.25, margin: "-60px" as const },
  transition: { duration: 0.6, ease: sharedEase },
};

export const slideRightView = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.25, margin: "-60px" as const },
  transition: { duration: 0.6, ease: sharedEase },
};

export const staggerContainer: Variants = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 32, scale: 0.96 },
  whileInView: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: sharedEase },
  },
};

export const cardHover = {
  whileHover: { scale: 1.02, y: -4 },
  transition: { duration: 0.25, ease: outEase },
};

export function useAnimations() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const simple = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      whileInView: { opacity: 1 },
      viewport: { once: true },
      transition: { duration: 0.25 },
    };

    return {
      fadeUp: simple,
      fadeLeft: simple,
      fadeUpView: simple,
      scaleIn: simple,
      scaleInView: simple,
      slideLeftView: simple,
      slideRightView: simple,
      cardHover: {},
      staggerContainer: { initial: {}, whileInView: {} },
      staggerItem: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1, transition: { duration: 0.25 } },
      },
    };
  }

  return {
    fadeUp,
    fadeLeft,
    fadeUpView,
    scaleIn,
    scaleInView,
    slideLeftView,
    slideRightView,
    cardHover,
    staggerContainer,
    staggerItem,
  };
}
