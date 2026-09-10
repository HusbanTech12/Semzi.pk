import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { collections, getProductsByCollection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Collections",
  description:
    "Explore Semzi collections — Hydrating Glycerin Bars, Botanical Edits, Radiance Cream Soap, and Hair Rituals.",
};

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <section className="relative overflow-hidden border-b border-border/40 py-20 lg:py-28">
          <Image
            src="/images/soap-collection.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden
          />
          <div className="absolute inset-0 bg-background/78" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,163,107,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground-muted">
                  Semzi Catalog
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-serif text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Our Collections
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                Four deliberate series — hydrating glycerin bars, botanical edits,
                cream soap radiance, and wash-off hair rituals. One honest
                ingredients list at a time.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl space-y-20 px-6 lg:px-8">
            {collections.map((collection, index) => {
              const items = getProductsByCollection(collection.slug);
              const isReversed = index % 2 === 1;

              return (
                <Reveal key={collection.slug}>
                  <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    <div
                      className={`min-w-0 lg:col-span-5 ${
                        isReversed ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="group relative block aspect-4/5 overflow-hidden rounded-2xl border border-border/60 bg-surface-muted shadow-xl shadow-foreground/5"
                      >
                        <Image
                          src={collection.heroImageUrl}
                          alt={collection.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-foreground/50 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-subtle">
                            Collection 0{index + 1}
                          </p>
                          <p className="mt-1 font-serif text-xl italic text-white">
                            {collection.tagline}
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div
                      className={`min-w-0 lg:col-span-7 ${
                        isReversed ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                        Collection 0{index + 1} · {items.length}{" "}
                        {items.length === 1 ? "Product" : "Products"}
                      </p>
                      <h2 className="mt-2 font-serif text-3xl font-normal text-foreground sm:text-4xl">
                        {collection.name}
                      </h2>
                      <p className="mt-3 max-w-xl text-base leading-relaxed text-foreground-muted">
                        {collection.description}
                      </p>

                      <ul className="mt-8 space-y-3">
                        {items.map((product, productIndex) => (
                          <li key={product.slug}>
                            <Link
                              href={`/product/${product.slug}`}
                              className="group flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-surface px-4 py-3.5 transition-all hover:border-accent/50 hover:shadow-md hover:shadow-foreground/5"
                            >
                              <div className="flex min-w-0 items-center gap-4">
                                <span className="font-mono text-xs font-semibold text-accent-strong">
                                  {String(productIndex + 1).padStart(2, "0")}
                                </span>
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-background">
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate font-serif text-lg text-foreground group-hover:text-accent-strong">
                                    {product.name}
                                  </p>
                                  <p className="truncate text-xs text-foreground-muted">
                                    {product.tagline ?? product.category}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight className="h-4 w-4 shrink-0 text-foreground-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/collections/${collection.slug}`}
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-background transition-colors hover:bg-accent hover:text-foreground"
                      >
                        Explore {collection.name}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="border-t border-border/50 bg-surface-muted/40 py-16 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <Reveal>
              <h2 className="font-serif text-3xl text-foreground">
                Prefer to browse everything?
              </h2>
              <p className="mt-3 text-foreground-muted">
                Shop the full Semzi catalog — bars, botanical edits, cream soap,
                and hair rituals.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:bg-accent/10"
              >
                Visit the Shop
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
