"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

interface ProductGridProps {
  children: ReactNode;
}

export default function ProductGrid({ children }: ProductGridProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      {...staggerContainer}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {children}
    </motion.div>
  );
}
