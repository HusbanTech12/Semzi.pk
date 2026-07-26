"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAnimations } from "@/lib/animations";
import ProductGrid from "@/components/ProductGrid";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

type Tab = "best-sellers" | "new-arrivals";

interface FeaturedProductsClientProps {
  featured: Product[];
  newArrivals: Product[];
}

const tabs: { key: Tab; label: string }[] = [
  { key: "best-sellers", label: "Best Sellers" },
  { key: "new-arrivals", label: "New Arrivals" },
];

export default function FeaturedProductsClient({
  featured,
  newArrivals,
}: FeaturedProductsClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("best-sellers");
  const { fadeUp } = useAnimations();

  const products = activeTab === "best-sellers" ? featured : newArrivals;

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
            Our Favorites
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Handpicked soaps and shampoos our community can&apos;t stop raving
            about.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-lg text-sm tracking-wide transition-colors ${
                activeTab === tab.key
                  ? "bg-accent text-white"
                  : "bg-surface-muted text-foreground-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <ProductGrid>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </ProductGrid>

        <motion.div {...fadeUp} className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 border border-foreground/20 text-foreground text-sm tracking-wider uppercase rounded-lg hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-4px_rgba(199,154,86,0.3)] transition-all duration-300"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
