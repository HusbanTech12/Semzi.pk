"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const process = [
  { step: "01", title: "Pour", body: "Plant oils, never a harsh cocktail." },
  { step: "02", title: "Cure", body: "Slow rest until the bar is mild." },
  { step: "03", title: "Wrap", body: "Gift-ready, with every INCI named." },
];

export default function BrandStory() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="left">
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/Our-Story-img.jpeg"
                alt="Natural soap ingredients and handmade process"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </Reveal>

          <div className="space-y-8">
            <Reveal direction="right" className="space-y-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
                Our Story
              </span>
              <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
                We believe in
                <br />
                honest ingredients
              </h2>
              <p className="leading-relaxed text-foreground-muted">
                Every Semzi bar starts with a promise: nothing we would not use
                on our own skin. Full INCI is a principle, not a marketing line.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <ol className="space-y-4 border-l border-border pl-6">
                {process.map((item) => (
                  <li key={item.step} className="relative">
                    <span className="absolute -left-[1.85rem] top-1 font-mono text-[10px] text-accent">
                      {item.step}
                    </span>
                    <p className="font-serif text-lg text-foreground">{item.title}</p>
                    <p className="text-sm text-foreground-muted">{item.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/collections/beach"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-foreground-muted transition-colors hover:text-accent-strong"
              >
                Shop the Beach collection
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
