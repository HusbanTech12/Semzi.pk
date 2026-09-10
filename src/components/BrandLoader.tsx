"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BrandLoader({
  className,
  label = "Loading Semzi",
}: {
  className?: string;
  label?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <Image
            src="/images/brand/semzi-logo.png"
            alt="Semzi"
            width={280}
            height={112}
            priority
            className="h-16 w-auto bg-transparent object-contain sm:h-20"
            unoptimized
          />
        </motion.div>

        <div className="relative flex h-8 w-40 items-center justify-center overflow-hidden sm:w-48" aria-hidden>
          <motion.span
            className="absolute top-1 left-0 right-0 mx-auto h-px w-full bg-accent-strong/80"
            initial={reduceMotion ? false : { x: "-110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute top-1/2 left-1/2 h-px w-3/4 -translate-x-1/2 -translate-y-1/2 bg-accent/70"
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute bottom-1 left-0 right-0 mx-auto h-px w-full bg-accent-strong/80"
            initial={reduceMotion ? false : { x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="text-[10px] font-bold uppercase tracking-[0.35em] text-foreground-muted"
        >
          Preparing
        </motion.p>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}
