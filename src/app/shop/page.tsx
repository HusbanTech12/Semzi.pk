"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/use-products";
import { useAnimations } from "@/lib/animations";
import { Skeleton } from "@/components/ui/skeleton";

const filterGroups = [
  { label: "Category", key: "category" as const, options: ["Artisan Soap", "Shampoo", "Glycerin Soap", "Goat Milk & Aloe Vera Soap"] },
  { label: "Collection", key: "collection" as const, options: ["Beach", "Signature"] },
  { label: "Skin Concern", key: "concern" as const, options: ["dry", "sensitive", "oily", "acne-prone", "normal", "damaged"] },
];

type FilterKey = "category" | "collection" | "concern";

export default function ShopPage() {
  const [selectedFilters, setSelectedFilters] = useState<Record<FilterKey, string[]>>({
    category: [],
    collection: [],
    concern: [],
  });
  const { products, loading } = useProducts();
  const { fadeUp } = useAnimations();

  const totalActive = Object.values(selectedFilters).reduce((sum, arr) => sum + arr.length, 0);

  function toggleFilter(key: FilterKey, val: string) {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(val) ? prev[key].filter((v) => v !== val) : [...prev[key], val],
    }));
  }

  function clearAll() {
    setSelectedFilters({ category: [], collection: [], concern: [] });
  }

  const filtered = products.filter((p) => {
    if (selectedFilters.category.length && !selectedFilters.category.includes(p.category)) return false;
    if (selectedFilters.concern.length && !p.skinConcern?.some((c) => selectedFilters.concern.includes(c))) return false;
    if (selectedFilters.collection.length && !selectedFilters.collection.includes(p.collection ?? "")) return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <motion.div {...fadeUp} className="mb-6">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground">Shop</h1>
            <p className="text-sm text-foreground-muted mt-1">
              {loading ? "Loading..." : `${filtered.length} products`}
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="mb-8 space-y-4">
            {filterGroups.map((group) => (
              <div key={group.key} className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground-muted font-semibold min-w-[80px]">
                  {group.label}
                </span>
                {group.options.map((opt) => {
                  const active = selectedFilters[group.key].includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleFilter(group.key, opt)}
                      className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
                        active
                          ? "bg-accent text-white border-accent shadow-[0_0_16px_-4px_rgba(199,154,86,0.4)]"
                          : "bg-surface text-foreground-muted border-border hover:border-accent/40 hover:text-accent"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ))}

            {totalActive > 0 && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-foreground-muted">Active filters:</span>
                {Object.entries(selectedFilters).flatMap(([key, vals]) =>
                  vals.map((val) => (
                    <button
                      key={`${key}-${val}`}
                      onClick={() => toggleFilter(key as FilterKey, val)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20 hover:bg-accent/20 transition-colors"
                    >
                      {val}
                      <X className="w-3 h-3" />
                    </button>
                  ))
                )}
                <button
                  onClick={clearAll}
                  className="text-xs text-foreground-muted hover:text-foreground underline transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[4/5] w-full rounded-lg" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-foreground-muted">No products match your filters.</p>
              <button onClick={clearAll} className="mt-4 text-sm text-accent hover:text-accent-strong underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
