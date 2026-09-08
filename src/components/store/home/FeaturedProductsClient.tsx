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
  const { scaleIn, cardHover } = useAnimations();
  const hoverImage = product.images[1];

  return (
    <motion.article
      {...scaleIn}
      {...cardHover}
      transition={{ delay: index * 0.06, ...scaleIn.transition }}
      className="group flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="relative mb-4 block overflow-hidden rounded-2xl bg-surface-muted">
        <div className="relative aspect-[4/5]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-105 ${hoverImage ? "group-hover:opacity-0" : ""}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 4}
          />
          {hoverImage && (
            <Image
              src={hoverImage}
              alt=""
              fill
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 px-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          {product.collection ?? product.category}
        </span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-base leading-snug text-foreground transition-colors duration-300 group-hover:text-accent-strong">
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
          className="mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-foreground-muted/70 hover:text-accent"
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
  const { fadeUp } = useAnimations();

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mb-16 space-y-3 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
            Best Sellers
          </span>
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
            Bars for the ritual
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-foreground-muted">
            Four soaps we pour most — coastal, floral, and milk-rich.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-10 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-foreground hover:bg-accent-strong hover:text-background"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
