"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-8 py-20 text-background lg:px-20 lg:py-24">
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <Reveal className="space-y-4 text-center lg:text-left">
                <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
                  The Journal
                </span>
                <h2 className="font-serif text-3xl leading-tight md:text-4xl">
                  Early drops,
                  <br />
                  10% off first order
                </h2>
                <p className="mx-auto max-w-md leading-relaxed text-background/60 lg:mx-0">
                  New collections, ingredient notes, and seasonal bars — before they hit the shop.
                </p>
              </Reveal>

              <Reveal delay={0.12} className="flex justify-center lg:justify-start">
                <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-background placeholder:text-background/40"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="shrink-0 rounded-lg bg-accent px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-foreground hover:bg-accent-strong hover:text-background"
                  >
                    Subscribe
                  </motion.button>
                </form>
              </Reveal>
            </div>

            <Reveal delay={0.16} direction="right" className="flex flex-wrap justify-center gap-4 lg:justify-end">
              <Link
                href="/shop"
                className="rounded-lg bg-accent px-8 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-foreground hover:bg-accent-strong hover:text-background"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-white/20 px-8 py-3.5 text-sm uppercase tracking-[0.15em] text-background hover:bg-white/5"
              >
                Our Story
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
