"use client";

import Link from "next/link";

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
        <source src="/videos/smoke-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-xl space-y-6">
          <p className="text-white text-sm tracking-[0.2em] uppercase drop-shadow-lg">
            Beach Collection 2026
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-white drop-shadow-lg">
            Natural Soap.
            <br />
            <span className="text-accent">Nothing Harsh.</span>
          </h1>
          <p className="text-base text-white/90 max-w-md leading-relaxed drop-shadow-lg">
            Handmade in small batches with ingredients you can trust.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/shop"
              className="px-8 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
            >
              Shop All
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border border-white/40 text-white text-sm tracking-wider uppercase rounded-lg hover:bg-white/10 transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
