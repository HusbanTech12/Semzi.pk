"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-surface-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-foreground text-background py-20 lg:py-28 px-8 lg:px-20">
          <motion.div
            className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl -translate-y-1/2 translate-x-1/3"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent-subtle/5 blur-3xl translate-y-1/2 -translate-x-1/3"
            animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

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
                    className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-background placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_-4px_rgba(199,154,86,0.3)] transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3.5 bg-accent text-background text-sm tracking-wider uppercase rounded-lg font-medium shrink-0 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Subscribe</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-strong to-accent-strong opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} direction="right" className="space-y-8">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div className="space-y-1">
                  <motion.p
                    className="font-serif text-3xl text-accent"
                    whileHover={{ scale: 1.1, color: "#A47C3B" }}
                    transition={{ duration: 0.2 }}
                  >
                    10K+
                  </motion.p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-foreground-muted">
                    Happy Customers
                  </p>
                </div>
                <div className="space-y-1">
                  <motion.p
                    className="font-serif text-3xl text-accent"
                    whileHover={{ scale: 1.1, color: "#A47C3B" }}
                    transition={{ duration: 0.2 }}
                  >
                    100%
                  </motion.p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-foreground-muted">
                    Natural Ingredients
                  </p>
                </div>
                <div className="space-y-1">
                  <motion.p
                    className="font-serif text-3xl text-accent"
                    whileHover={{ scale: 1.1, color: "#A47C3B" }}
                    transition={{ duration: 0.2 }}
                  >
                    50+
                  </motion.p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-foreground-muted">
                    Product Varieties
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/shop"
                    className="group px-8 py-3.5 bg-accent text-background text-sm tracking-[0.15em] uppercase rounded-lg font-medium relative overflow-hidden"
                  >
                    <span className="relative z-10">Shop Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-strong to-accent-strong opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/about"
                    className="group px-8 py-3.5 border border-white/20 text-background text-sm tracking-[0.15em] uppercase rounded-lg relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">Our Story</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
