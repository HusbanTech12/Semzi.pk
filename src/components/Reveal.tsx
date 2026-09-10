"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  scale?: boolean;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.55,
  once = true,
  scale = false,
}: Props) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once, margin: "-60px", amount: 0.2 });

  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.25, delay }}
      >
        {children}
      </motion.div>
    );
  }

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 48 },
    right: { x: -48 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
        ...(scale ? { scale: 0.94 } : {}),
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : {
              opacity: 0,
              ...directionOffset[direction],
              ...(scale ? { scale: 0.94 } : {}),
            }
      }
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
