"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAnimations } from "@/lib/animations";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

interface FeaturedProductsClientProps {
  featured: Product[];
  newArrivals?: Product[];
}

export default function FeaturedProductsClient({
  featured,
}: FeaturedProductsClientProps) {
  const { fadeUpView } = useAnimations();

  return (
    <section className="bg-surface-muted/40 py-24 lg:py-28">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-10">
        <motion.div {...fadeUpView} className="mb-14 space-y-3 text-center sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
            Customer Favorites
          </span>
          <h2 className="font-serif text-3xl font-bold text-heading-gradient sm:text-4xl">
            Best Selling Products
          </h2>
          <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-foreground-muted">
            The bars and rituals our community reaches for again and again.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-[84rem] grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-8">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < 4}
            />
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
