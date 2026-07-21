"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Reveal from "./Reveal";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-light/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-20 lg:pt-48 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/30 rounded-full text-primary text-sm tracking-wider uppercase"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
              New Collection 2026
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground"
            >
              Where Nature
              <br />
              <span className="text-primary">Meets Luxury</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-foreground/60 max-w-lg leading-relaxed"
            >
              Handcrafted with the finest natural ingredients. Each bar and
              bottle is a testament to the art of premium skincare.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(139,115,85,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-primary text-background text-sm tracking-wider uppercase rounded-full transition-all"
              >
                Explore Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(139,115,85,0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 border border-primary/30 text-primary text-sm tracking-wider uppercase rounded-full transition-all"
              >
                Our Story
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="w-10 h-10 rounded-full border-2 border-background bg-primary-light/50"
                  />
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  10,000+
                </div>
                <div className="text-xs text-foreground/50">
                  Happy Customers
                </div>
              </div>
            </motion.div>
          </motion.div>

          <Reveal direction="right" delay={0.3} duration={0.8}>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1636846528145-46195929433c?w=800&q=80"
                  alt="Premium soap collection"
                  fill
                  className="object-cover"
                  preload
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}
                className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-3xl font-serif text-primary"
                  >
                    100%
                  </motion.span>
                  <div className="text-xs text-foreground/60">
                    Natural
                    <br />
                    Ingredients
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
