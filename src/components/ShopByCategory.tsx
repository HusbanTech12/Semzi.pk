"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { collections, getProductsByCollection } from "@/lib/products";

export default function ShopByCategory() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-14 space-y-3 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
            Explore
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Our Collections
          </h2>
          <p className="mx-auto max-w-xl text-sm font-medium text-foreground-muted">
            Hydrating glycerin bars, botanical edits, cream soap radiance, and
            hair rituals — each series crafted with care.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection, idx) => {
            const count = getProductsByCollection(collection.slug).length;
            return (
              <Reveal key={collection.slug} delay={idx * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-border/70 bg-surface transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-foreground/5"
                  >
                    <div className="relative aspect-4/5 overflow-hidden bg-surface-muted">
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
                    <div className="space-y-1 p-4">
                      <p className="text-sm font-medium text-foreground-muted">
                        {collection.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent transition-all group-hover:gap-2.5">
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
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-foreground-muted transition-colors hover:text-accent"
            >
              View All Collections
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
