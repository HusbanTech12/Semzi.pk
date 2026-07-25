"use client";

import Link from "next/link";
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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-2xl space-y-8">
          <Reveal delay={0.2}>
            <p className="flex items-center gap-3 text-accent text-[11px] tracking-[0.3em] uppercase">
              <span className="w-8 h-px bg-accent" />
              Beach Collection 2026
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-white">
              Natural Soap.
              <br />
              <span
                className="italic bg-gradient-to-r from-accent to-accent-strong bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                Nothing Harsh.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="text-base md:text-lg text-white/70 max-w-md leading-relaxed">
              Handmade in small batches with ingredients you can trust.
              Full INCI transparency. Nothing synthetic.
            </p>
          </Reveal>

          <Reveal delay={0.8} className="flex flex-wrap items-center gap-5 pt-2">
            <Link
              href="/shop"
              className="px-10 py-4 bg-accent text-background text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-accent-strong transition-all font-medium"
            >
              Shop All
            </Link>
            <Link
              href="/about"
              className="group flex items-center gap-3 text-white/80 text-sm tracking-[0.15em] uppercase hover:text-white transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              Our Story
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
