"use client";

import { motion } from "framer-motion";
import { useAnimations } from "@/lib/animations";
import { cn } from "@/lib/utils";

type GlowFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlowFrame({ children, className }: GlowFrameProps) {
  const { cardHover } = useAnimations();

  return (
    <motion.div
      {...cardHover}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-surface-muted card-glow-brown",
        className
      )}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(201,163,107,0.22),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}
