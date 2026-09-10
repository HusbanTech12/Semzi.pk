"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAnimations } from "@/lib/animations";
import PriceDisplay from "@/components/PriceDisplay";
import type { Product } from "@/lib/products";

interface FeaturedProductsClientProps {
  featured: Product[];
  newArrivals?: Product[];
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { scaleInView, cardHover } = useAnimations();

  return (
    <motion.article
      {...scaleInView}
      transition={{
        ...(scaleInView.transition ?? {}),
        delay: index * 0.08,
      }}
      {...cardHover}
      className="group flex flex-col"
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative mb-4 block overflow-hidden rounded-2xl bg-surface-muted"
      >
        <div className="relative aspect-4/5">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 50vw, 25vw"
            priority={index < 4}
          />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/0 transition-all duration-500 group-hover:ring-border/50" />
      </Link>

      <div className="flex flex-col gap-1.5 px-0.5">
        <span className="truncate text-[10px] font-bold uppercase tracking-[0.2em] text-accent/70">
          {product.collection
            ? `【${product.collection}】`
            : `【${product.category}】`}
        </span>

        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent-strong">
            {product.name}
          </h3>
        </Link>

        <PriceDisplay
          priceCents={product.priceCents}
          compareAtCents={product.compareAtPriceCents}
          className="mt-1"
        />

        <Link
          href={`/product/${product.slug}`}
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground-muted/60 transition-colors duration-300 hover:text-accent"
        >
          Shop Now
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function FeaturedProductsClient({
  featured,
}: FeaturedProductsClientProps) {
  const { fadeUpView } = useAnimations();

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUpView}
          className="mb-16 space-y-3 text-center"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
            Best Sellers
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Our Favorites
          </h2>
          <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-foreground-muted">
            Handpicked soaps our community can&apos;t stop raving about.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div {...fadeUpView} className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-10 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-background transition-colors duration-300 hover:bg-accent-strong"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
