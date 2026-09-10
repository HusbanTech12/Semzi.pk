"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { collections } from "@/lib/products";

export default function CollectionShowcase() {
  const featured = collections[0];

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
            Featured Collection
          </span>
          <h2 className="font-serif text-3xl font-bold text-heading-gradient md:text-4xl">
            {featured.name}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href={`/collections/${featured.slug}`}
            className="group relative block aspect-21/9 overflow-hidden rounded-2xl border border-border/50 bg-surface-muted transition-all duration-500 hover:border-accent/30 hover:shadow-[0_8px_40px_-8px_rgba(199,154,86,0.2)]"
          >
            <Image
              src={featured.heroImageUrl}
              alt={`${featured.name} — ${featured.tagline}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-r from-foreground/70 via-foreground/30 to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-lg space-y-5 px-10 lg:px-16">
                <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
                  {featured.tagline}
                </p>
                <h3 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                  {featured.name}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-white/70">
                  {featured.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-white transition-all group-hover:gap-3">
                  Explore Collection
                  <svg
                    className="h-4 w-4"
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
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {collections.slice(1).map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="rounded-2xl border border-border/70 bg-surface p-5 transition-all hover:border-accent/50 hover:shadow-md hover:shadow-foreground/5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Collection
                </p>
                <p className="mt-2 font-serif text-xl font-bold text-foreground">
                  {collection.name}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {collection.tagline}
                </p>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
