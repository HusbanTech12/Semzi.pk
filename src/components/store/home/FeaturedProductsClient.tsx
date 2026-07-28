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
  const { scaleIn } = useAnimations();

  return (
    <motion.article
      {...scaleIn}
      transition={{ delay: index * 0.06, ...scaleIn.transition }}
      whileHover={{ y: -6 }}
      className="group flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden rounded-2xl bg-surface-muted mb-4">
        <div className="relative aspect-[4/5]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 4}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="absolute inset-0 ring-1 ring-inset ring-border/0 group-hover:ring-border/50 transition-all duration-500 rounded-2xl" />
      </Link>

      <div className="flex flex-col gap-1.5 px-0.5">
        <span className="text-[10px] tracking-[0.2em] uppercase text-accent/70 font-semibold">
          {product.collection ? `【${product.collection}】` : `【${product.category}】`}
        </span>

        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-base leading-snug text-foreground group-hover:text-accent-strong transition-colors duration-300">
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
          className="inline-flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase text-foreground-muted/60 hover:text-accent transition-colors duration-300 mt-2"
        >
          Shop Now
          <ArrowRight className="w-3 h-3" />
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
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-3">
          <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium">
            Best Sellers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
            Our Favorites
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto text-sm leading-relaxed">
            Handpicked soaps and shampoos our community can&apos;t stop raving about.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div {...fadeUp} className="text-center mt-14">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-3.5 bg-accent text-background text-sm tracking-[0.15em] uppercase rounded-lg font-medium hover:bg-accent-strong transition-colors duration-300"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
