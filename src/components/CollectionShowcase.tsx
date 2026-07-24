"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

export default function CollectionShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="mb-10 space-y-2">
          <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium">
            Current Collection
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Beach
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Link href="/collections/beach" className="group block relative aspect-[21/9] rounded-2xl overflow-hidden bg-surface-muted">
            <Image
              src="/images/soap-collection.jpg"
              alt="Beach Collection - Natural soap with ocean-inspired ingredients"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-lg px-10 lg:px-16 space-y-5">
                <p className="text-[11px] tracking-[0.3em] uppercase text-accent">
                  Carry the Beach Home
                </p>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1]">
                  Beach
                  <br />
                  Collection 2026
                </h3>
                <p className="text-sm text-white/70 max-w-sm leading-relaxed">
                  Sea salt, driftwood, and coastal botanicals. Natural soap inspired by the shore.
                </p>
                <span className="inline-flex items-center gap-2 text-white text-sm tracking-[0.15em] uppercase group-hover:gap-3 transition-all">
                  Explore Collection
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
