"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 gradient-cta relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-light/5 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        />
      </motion.div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center space-y-8">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl text-background">
            Start Your Premium
            <br />
            Care Routine Today
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-background/60 text-lg max-w-xl mx-auto">
            Join 10,000+ customers who have elevated their daily care ritual
            with nature&apos;s finest ingredients.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(212,184,150,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-primary-light text-foreground text-sm tracking-wider uppercase rounded-full transition-all font-semibold"
          >
            Shop Now - Free Shipping
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border border-background/30 text-background text-sm tracking-wider uppercase rounded-full transition-all"
          >
            Subscribe & Save 20%
          </motion.button>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="flex items-center justify-center gap-6 text-sm text-background/50">
            <span>Free shipping on orders $50+</span>
            <span className="w-1 h-1 rounded-full bg-background/30" />
            <span>30-day money-back guarantee</span>
            <span className="w-1 h-1 rounded-full bg-background/30" />
            <span>Secure checkout</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
