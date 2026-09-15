"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const ingredients = [
  "Aqua (Water)",
  "Cocos Nucifera (Coconut) Oil",
  "Ricinus Communis (Castor) Seed Oil",
  "Stearic Acid",
  "Sucrose",
  "Vegetable Glycerin",
  "Natural Mineral Mica",
];

export default function BrandStory() {
  return (
    <section className="py-24 lg:py-32 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left" scale>
            <motion.div
              className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border/60 bg-surface-muted shadow-xl shadow-foreground/5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/Our-Story-img.jpeg"
                alt="Hand-pouring natural soap into small-batch molds"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-subtle">
                  Artisan Small Batch
                </span>
                <p className="font-serif text-lg italic font-semibold mt-1 text-white/95">
                  Hand-poured with patience, care, and human touch.
                </p>
              </div>
            </motion.div>
          </Reveal>

          <div className="space-y-8">
            <Reveal direction="right" className="space-y-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-bold font-mono">
                Our Ethos
              </span>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-heading-gradient leading-tight md:text-4xl lg:text-5xl">
                Bringing the Soul Back
                <br />
                to Soap-Making
              </h2>
              <blockquote className="border-l-2 border-accent pl-4 font-serif text-lg md:text-xl italic text-foreground font-semibold">
                &ldquo;Semzi exists to bring that soul back.&rdquo;
              </blockquote>
              <div className="space-y-4 text-foreground-muted leading-relaxed text-sm md:text-base font-medium">
                <p>
                  Soap-making is an ancient craft &mdash; one of humanity&apos;s oldest rituals, dating back over 2,000 years. As soap became mass-produced, it stopped being soap in any meaningful sense and started becoming something closer to a harsh disinfectant.
                </p>
                <p>
                  We make our soaps by hand, in small batches, with the same patience an artisan brings to any craft. pH-balanced to work with your skin&apos;s natural barrier: gentle enough for a child, effective enough for anyone.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-6 rounded-2xl bg-surface border border-border/60 hover:border-accent/40 transition-colors duration-300">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-accent font-bold font-mono">
                    Plain-Language INCI Transparency
                  </p>
                  <span className="font-mono text-[10px] font-semibold text-foreground-muted">100% Disclosed</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => (
                    <motion.span
                      key={ing}
                      whileHover={{ scale: 1.04, y: -1 }}
                      transition={{ duration: 0.2 }}
                      className="px-3 py-1.5 text-[10px] font-medium tracking-wider uppercase bg-background border border-border/70 rounded-md text-foreground-muted hover:border-accent/50 hover:text-foreground transition-all duration-300 cursor-default"
                    >
                      {ing}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-xl bg-foreground px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-background hover:bg-accent hover:text-foreground transition-all duration-300 shadow-md shadow-foreground/5"
              >
                <span>Read Our Full Story & Ethos</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
