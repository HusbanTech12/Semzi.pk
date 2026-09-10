"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, HeartHandshake, Eye, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const ETHOS_PILLARS = [
  {
    icon: Sparkles,
    number: "01",
    title: "Handmade in Small Batches",
    description:
      "Crafted with the patience of an artisan. Nothing is rushed, and nothing is left to machines that don't know the difference between a toddler's skin and an adult's.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "pH-Balanced to Work With Skin",
    description:
      "Formulated to sit close to your skin's natural pH so they cleanse without stripping away what your skin already does naturally. Gentle enough for a child, effective for anyone.",
  },
  {
    icon: Eye,
    number: "03",
    title: "Radical Ingredient Transparency",
    description:
      "Quality and honesty go hand in hand. Every single ingredient is plainly listed on every label so you can look at what goes on your skin and understand exactly what it is.",
  },
  {
    icon: HeartHandshake,
    number: "04",
    title: "The Human Touch",
    description:
      "A deliberate answer to an industry that got too big, too fast. Every single bar carries the care and mindfulness that mass production abandoned decades ago.",
  },
];

const HORIZONS = [
  {
    step: "01",
    category: "Artisan Soap Bars",
    status: "Current Collection",
    description:
      "Hand-poured glycerin and cold-process bars including our signature Beach Collection — Coral, Cloud, Beach, and Sea Voyage.",
  },
  {
    step: "02",
    category: "Botanical Shampoos",
    status: "Now Shaping",
    description:
      "Nourishing, sulfate-free scalp elixirs crafted with the same uncompromising care, organic botanical extracts, and honest INCI standards.",
  },
  {
    step: "03",
    category: "Wash-Off Rituals",
    status: "Coming Soon, InshAllah",
    description:
      "Expanding our artisan philosophy into future gentle body washes, scalp rituals, and skin-safe bath formulations.",
  },
];

const FEATURED_SOAPS = [
  {
    id: "01",
    name: "Coral Soap",
    slug: "coral-soap",
    tagline: "Translucent Glycerin · Emerald Coral Relief",
    image: "/images/beach-stills/01-coral.png",
    price: "$26.00",
  },
  {
    id: "02",
    name: "Cloud Soap",
    slug: "cloud-soap",
    tagline: "Sky Blue Cleansing Bar · Whipped Coconut Milk",
    image: "/images/beach-stills/02-cloud.png",
    price: "$22.00",
  },
  {
    id: "03",
    name: "Beach Soap",
    slug: "beach-soap",
    tagline: "Ocean Turquoise · Starfish & Scallop Shells",
    image: "/images/beach-stills/03-beach.png",
    price: "$24.00",
  },
  {
    id: "04",
    name: "Sea Voyage Soap",
    slug: "sea-voyage-soap",
    tagline: "Deep Marine Navy · Helmsman Crest & Golden Oar",
    image: "/images/beach-stills/04-sea-voyage.png",
    price: "$28.00",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-foreground pt-20">
        {/* Editorial Page Header */}
        <section className="relative overflow-hidden border-b border-border/40 py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,163,107,0.12),transparent_70%)]" />
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 backdrop-blur-sm mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground-muted">
                  Our Story · Our Ethos
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal tracking-tight leading-[1.15]">
                Soap-making is an ancient craft.
                <br />
                <span className="italic text-accent-strong">We exist to bring that soul back.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-foreground-muted leading-relaxed font-normal">
                A deliberate answer to an industry that got too big, too fast. Handcrafted in small batches with patience, precision, and complete ingredient honesty.
              </p>
            </Reveal>
          </div>
        </section>

        {/* The Ancient Craft & Industrialization (Act I) */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <Reveal direction="left">
                  <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-border/60 bg-surface-muted shadow-xl shadow-foreground/5">
                    <Image
                      src="/images/soap-collection.jpg"
                      alt="Collection of handmade artisan soaps"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-subtle">
                        Artisan Lineage
                      </p>
                      <p className="font-serif text-lg italic mt-1 text-white/95">
                        Over 2,000 years of soapcraft tradition
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <Reveal direction="right">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                    The Origin
                  </span>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-foreground leading-tight">
                    Where Did the Care Go?
                  </h2>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="space-y-5 text-base sm:text-lg text-foreground-muted leading-relaxed font-normal">
                    <p>
                      Soap-making is an ancient craft &mdash; one of humanity&apos;s oldest rituals, with techniques dating back over 2,000 years. But somewhere along the way, industrialization took the soul out of it.
                    </p>
                    <p>
                      As soap became mass-produced, it stopped being soap in any meaningful sense and started becoming something closer to a disinfectant &mdash; cheaper, faster, but stripped of the care that once went into every bar.
                    </p>
                    <p className="text-foreground/90 font-medium">
                      Ingredients grew harsher, quality slipped, and skin paid the price: rashes, dryness, irritation that had simply never been part of the equation before.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.25}>
                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-foreground-muted">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      Zero Harsh Detergents
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      No Stripping Sulfates
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      Skin Barrier Preserving
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Central Manifesto Moment (Pull Quote) */}
        <section className="py-20 lg:py-24 bg-surface-muted/60 border-y border-border/50 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-strong font-semibold">
                Our Manifesto
              </span>
              <blockquote className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl italic font-normal text-foreground leading-tight">
                &ldquo;Semzi exists to bring that soul back.&rdquo;
              </blockquote>
              <div className="mt-8 flex justify-center items-center gap-3">
                <span className="h-px w-12 bg-accent/40" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-muted">
                  Handmade with Purpose
                </span>
                <span className="h-px w-12 bg-accent/40" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* The Human Touch & Artisan Craft (Act II) */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Reveal direction="left">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                    Craftsmanship
                  </span>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-foreground leading-tight">
                    Every Bar Carries That Human Touch
                  </h2>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="space-y-5 text-base sm:text-lg text-foreground-muted leading-relaxed font-normal">
                    <p>
                      We make our soaps the way they were always meant to be made &mdash; by hand, in small batches, with the same patience and attention an artisan would bring to any craft.
                    </p>
                    <p className="border-l-2 border-accent pl-5 text-foreground italic">
                      Nothing here is rushed, and nothing is left to a machine that doesn&apos;t know the difference between a toddler&apos;s skin and an adult&apos;s.
                    </p>
                    <p>
                      Every bar carries that human touch, because a soap made with care simply is different from one made at scale.
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal direction="right">
                  <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-border/60 bg-surface-muted shadow-xl shadow-foreground/5">
                    <Image
                      src="/images/Our-Story-img.jpeg"
                      alt="Pouring handmade soap by hand into artisan molds"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/30 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-subtle">
                        Small Batch Studio
                      </p>
                      <p className="font-serif text-base italic text-white/95">
                        Hand-poured with plant oils and pure botanicals
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Working With Skin & Radical Honesty (Act III) */}
        <section className="py-20 lg:py-28 bg-surface border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <Reveal>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                  Skin First Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal mt-2">
                  Work With the Skin, Not Against It
                </h2>
                <p className="text-base sm:text-lg text-foreground-muted leading-relaxed font-normal mt-4">
                  At the heart of every formula is a simple principle: work with the skin, not against it. Our soaps are pH-balanced to sit close to skin&apos;s own natural pH, so they cleanse without disrupting what your skin already does well on its own.
                </p>
                <p className="text-foreground font-medium text-base">
                  Gentle enough for a child, effective enough for anyone. We believe quality and honesty go hand in hand.
                </p>
              </Reveal>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ETHOS_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Reveal key={pillar.title}>
                    <div className="h-full p-8 rounded-2xl bg-background border border-border/70 hover:border-accent/40 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-strong">
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="font-mono text-xs font-semibold text-accent">
                            {pillar.number}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-medium text-foreground">
                          {pillar.title}
                        </h3>
                        <p className="mt-2.5 text-xs sm:text-sm text-foreground-muted leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-12 rounded-2xl border border-accent/30 bg-accent-subtle/20 p-6 sm:p-8 text-center max-w-3xl mx-auto">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-strong font-semibold">
                Radical Transparency Promise
              </p>
              <p className="mt-2 text-sm sm:text-base text-foreground leading-relaxed">
                That&apos;s why every ingredient we use is listed, plainly, on every label &mdash; you should be able to look at what you&apos;re putting on your skin and understand exactly what it is.
              </p>
            </div>
          </div>
        </section>

        {/* The Horizon: Soap, Shampoo & Beyond (Act IV) */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <Reveal>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                  The Journey Ahead
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal mt-2">
                  This Is Only the Beginning
                </h2>
                <p className="text-base sm:text-lg text-foreground-muted leading-relaxed font-normal mt-4">
                  Semzi is a small, deliberate answer to an industry that got too big, too fast. And this is only the beginning &mdash; the same care we bring to every bar of soap is now shaping our shampoos, and will soon carry more wash off products, InshAllah. One product, one batch, one honest ingredients list at a time.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {HORIZONS.map((item) => (
                <Reveal key={item.step}>
                  <div className="h-full rounded-2xl border border-border/80 bg-surface p-7 sm:p-8 shadow-sm flex flex-col justify-between hover:border-accent/50 transition-colors">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-accent-strong">
                          Phase {item.step}
                        </span>
                        <span className="rounded-full bg-accent-subtle/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-strong">
                          {item.status}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-2xl font-normal text-foreground">
                        {item.category}
                      </h3>
                      <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Artisan Beach Collection Gallery */}
        <section className="py-20 bg-surface-muted/50 border-t border-border/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
                  Handcrafted Series
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal mt-1">
                  The Beach Collection
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground hover:text-accent-strong transition-colors"
              >
                View Full Catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_SOAPS.map((soap) => (
                <Reveal key={soap.id}>
                  <Link
                    href={`/product/${soap.slug}`}
                    className="group block rounded-2xl border border-border/80 bg-surface p-4 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-foreground/5"
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-background mb-4">
                      <Image
                        src={soap.image}
                        alt={soap.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-accent-strong">
                      <span>No. {soap.id} / 04</span>
                      <span className="text-foreground font-semibold">{soap.price}</span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-foreground mt-1 group-hover:text-accent-strong transition-colors">
                      {soap.name}
                    </h3>
                    <p className="text-[11px] text-foreground-muted line-clamp-1 mt-0.5">
                      {soap.tagline}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Invitation CTA */}
        <section className="py-24 bg-foreground text-background text-center relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,163,107,0.18),transparent_70%)]" />
          <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10 space-y-6">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Carry the Ritual Home
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF3E7]">
                Experience Soap the Way It Was Meant to Be Made
              </h2>
              <p className="mt-4 text-sm sm:text-base text-foreground-muted max-w-xl mx-auto leading-relaxed">
                One product, one batch, one honest ingredients list at a time. Natural soap. Nothing harsh.
              </p>
              <div className="pt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 font-mono text-xs uppercase tracking-wider text-background font-medium hover:bg-accent-strong transition-colors shadow-lg shadow-accent/20"
                >
                  Shop the Beach Collection
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
