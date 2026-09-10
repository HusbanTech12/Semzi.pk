"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { collections, getProductsByCollection } from "@/lib/products";
import { useAnimations } from "@/lib/animations";

export default function ShopByCategory() {
  const { cardHover } = useAnimations();

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-14 space-y-3 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
            Explore
          </span>
          <h2 className="font-serif text-3xl font-bold text-heading-gradient md:text-4xl">
            Our Collections
          </h2>
          <p className="mx-auto max-w-xl text-sm font-medium text-foreground-muted">
            Hydrating glycerin bars, botanical edits, cream soap radiance, and
            hair rituals — each series crafted with care.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection, idx) => {
            const count = getProductsByCollection(collection.slug).length;
            return (
              <Reveal key={collection.slug} delay={idx * 0.1} scale className="h-full">
                <motion.div {...cardHover} className="h-full">
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface card-glow-brown hover:border-accent/50"
                  >
                    <div className="relative aspect-4/5 shrink-0 overflow-hidden bg-surface-muted">
                      <Image
                        src={collection.heroImageUrl}
                        alt={collection.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-foreground/55 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-subtle">
                          {count} {count === 1 ? "Product" : "Products"}
                        </p>
                        <h3 className="mt-1 font-serif text-xl font-bold text-white">
                          {collection.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-4">
                      <p className="min-h-10 text-sm font-medium leading-snug text-foreground-muted line-clamp-2">
                        {collection.tagline}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent transition-all group-hover:gap-2.5">
                        Shop Collection
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.35}>
          <div className="mt-10 text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 rounded-lg border border-foreground/20 bg-surface px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-foreground shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent-strong hover:shadow-[0_0_24px_-4px_rgba(201,163,107,0.45)]"
            >
              View All Collections
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
