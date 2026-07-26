"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/paint-underwater.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl space-y-8 text-center">
          <Reveal delay={0.2}>
            <motion.p
              className="inline-flex items-center gap-3 text-accent text-[11px] tracking-[0.3em] uppercase mx-auto"
              whileHover={{ letterSpacing: "0.4em" }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-8 h-px bg-accent" />
              Beach Collection 2026
            </motion.p>
          </Reveal>

          <Reveal delay={0.4}>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-white">
              Natural Soap.
              <br />
              <motion.span
                className="italic bg-gradient-to-r from-accent to-accent-strong bg-clip-text text-transparent inline-block"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Nothing Harsh.
              </motion.span>
            </h1>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="text-base md:text-lg text-white/70 max-w-md mx-auto leading-relaxed">
              Handmade in small batches with ingredients you can trust.
              Full INCI transparency. Nothing synthetic.
            </p>
          </Reveal>

          <Reveal delay={0.8} className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/shop"
                className="group px-10 py-4 bg-accent text-background text-sm tracking-[0.15em] uppercase rounded-lg font-medium relative overflow-hidden"
              >
                <span className="relative z-10">Shop All</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-strong to-accent-strong opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_-4px_rgba(199,154,86,0.6)]" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-10 py-4 border border-accent/40 text-accent text-sm tracking-[0.15em] uppercase font-medium rounded-lg transition-all duration-300 hover:bg-accent hover:text-background hover:border-accent hover:shadow-[0_0_30px_-4px_rgba(199,154,86,0.35)]"
              >
                Our Story
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
