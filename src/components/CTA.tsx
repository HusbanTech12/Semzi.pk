"use client";

import Link from "next/link";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-surface-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-foreground text-background py-20 lg:py-28 px-8 lg:px-20">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent-subtle/5 blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <Reveal className="space-y-4 text-center lg:text-left">
                <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium">
                  Stay Connected
                </span>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                  Join the Semzi
                  <br />
                  Community
                </h2>
                <p className="text-foreground-muted max-w-md leading-relaxed mx-auto lg:mx-0">
                  Subscribe for early access to new collections, ingredient
                  insights, and exclusive offers. 10% off your first order.
                </p>
              </Reveal>

              <Reveal delay={0.15} className="flex justify-center lg:justify-start">
                <div className="flex gap-2 max-w-md w-full">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-background placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  <button className="px-6 py-3.5 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-colors font-medium shrink-0">
                    Subscribe
                  </button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} direction="right" className="space-y-8">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div className="space-y-1">
                  <p className="font-serif text-3xl text-accent">10K+</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-foreground-muted">
                    Happy Customers
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-3xl text-accent">100%</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-foreground-muted">
                    Natural Ingredients
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-3xl text-accent">50+</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-foreground-muted">
                    Product Varieties
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 bg-accent text-background text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-accent-strong transition-all font-medium"
                >
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3.5 border border-white/20 text-background text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-white/5 transition-all"
                >
                  Our Story
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
