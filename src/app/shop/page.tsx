"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Check, SlidersHorizontal } from "lucide-react";
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

function DropdownFilter({
  group,
  selected,
  onToggle,
}: {
  group: (typeof filterGroups)[number];
  selected: string[];
  onToggle: (key: FilterKey, val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const activeCount = selected.length;

  return (
    <div ref={ref} className="relative flex-1">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
          open
            ? "bg-accent/10 border-accent/40 text-accent"
            : activeCount > 0
            ? "bg-accent/5 border-accent/20 text-accent"
            : "bg-surface border-border text-foreground-muted hover:border-accent/30"
        }`}
      >
        <span className="flex items-center gap-2">
          <span>{group.label}</span>
          {activeCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-[0_12px_40px_-8px_rgba(43,33,24,0.15)] z-40 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 p-3">
              {group.options.map((opt) => {
                const active = selected.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => onToggle(group.key, opt)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all duration-200 ${
                      active
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "bg-background border-border text-foreground-muted hover:border-accent/20 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-4 h-4 rounded border transition-all duration-200 ${
                        active
                          ? "bg-accent border-accent text-white"
                          : "border-border"
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          <motion.div {...fadeUp} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground">Shop</h1>
                <p className="text-sm text-foreground-muted mt-1">
                  {loading ? "Loading..." : `${filtered.length} products`}
                </p>
              </div>
              {totalActive > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-foreground-muted hover:text-foreground border border-border rounded-xl hover:border-accent/30 transition-all"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Clear all ({totalActive})
                </button>
              )}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              {filterGroups.map((group) => (
                <DropdownFilter
                  key={group.key}
                  group={group}
                  selected={selectedFilters[group.key]}
                  onToggle={toggleFilter}
                />
              ))}
            </div>

            {totalActive > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {Object.entries(selectedFilters).flatMap(([key, vals]) =>
                  vals.map((val) => (
                    <button
                      key={`${key}-${val}`}
                      onClick={() => toggleFilter(key as FilterKey, val)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-lg border border-accent/20 hover:bg-accent/20 transition-colors"
                    >
                      {val}
                      <X className="w-3 h-3" />
                    </button>
                  ))
                )}
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
