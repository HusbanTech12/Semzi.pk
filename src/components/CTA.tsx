"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "./Reveal";
import { useAnimations } from "@/lib/animations";

export default function CTA() {
  const { fadeUp } = useAnimations();

  return (
    <section className="py-24 lg:py-32 bg-foreground relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent-subtle/5 blur-3xl"
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
            Natural Care,
            <br />
            Nothing Harsh.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-foreground-muted text-lg max-w-xl mx-auto">
            Join 10,000+ customers who have elevated their daily ritual
            with nature&apos;s finest ingredients.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className="px-10 py-4 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all font-semibold"
          >
            Shop Now
          </Link>
          <Link
            href="/shop"
            className="px-10 py-4 border border-background/30 text-background text-sm tracking-wider uppercase rounded-lg hover:bg-white/10 transition-all"
          >
            Subscribe & Save 20%
          </Link>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="flex items-center justify-center gap-6 text-sm text-foreground-muted">
            <span>Free shipping on orders $50+</span>
            <span className="w-1 h-1 rounded-full bg-foreground-muted" />
            <span>30-day money-back guarantee</span>
            <span className="w-1 h-1 rounded-full bg-foreground-muted" />
            <span>Secure checkout</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
