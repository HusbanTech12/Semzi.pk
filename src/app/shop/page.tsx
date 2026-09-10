"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Check, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/use-products";
import { useAnimations } from "@/lib/animations";
import { Skeleton } from "@/components/ui/skeleton";
import { collections } from "@/lib/products";

type FilterKey = "collection";

function DropdownFilter({
  label,
  filterKey,
  options,
  selected,
  onToggle,
}: {
  label: string;
  filterKey: FilterKey;
  options: string[];
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
    <div ref={ref} className="relative min-w-0 w-full sm:max-w-xs">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-xl border px-5 py-3 text-sm font-medium transition-all duration-300 ${
          open
            ? "border-accent/40 bg-accent/10 text-accent"
            : activeCount > 0
              ? "border-accent/20 bg-accent/5 text-accent"
              : "border-border bg-surface text-foreground-muted hover:border-accent/30"
        }`}
      >
        <span className="flex items-center gap-2">
          <span>{label}</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 left-0 z-40 mt-2 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_12px_40px_-8px_rgba(43,33,24,0.15)]"
          >
            <div className="flex flex-wrap gap-2 p-3">
              {options.map((opt) => {
                const active = selected.includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => onToggle(filterKey, opt)}
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all duration-200 ${
                      active
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : "border-border bg-background text-foreground-muted hover:border-accent/20 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded border transition-all duration-200 ${
                        active
                          ? "border-accent bg-accent text-white"
                          : "border-border"
                      }`}
                    >
                      {active && <Check className="h-3 w-3" />}
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
    collection: [],
  });
  const [inStockOnly, setInStockOnly] = useState(false);
  const { products, loading } = useProducts();
  const { fadeUp } = useAnimations();

  const collectionOptions = useMemo(() => {
    const fromProducts = products
      .map((p) => p.collection)
      .filter((name): name is string => Boolean(name));
    const fromCatalog = collections.map((c) => c.name);
    return Array.from(new Set([...fromCatalog, ...fromProducts])).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [products]);

  const totalActive =
    selectedFilters.collection.length + (inStockOnly ? 1 : 0);

  function toggleFilter(key: FilterKey, val: string) {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(val)
        ? prev[key].filter((v) => v !== val)
        : [...prev[key], val],
    }));
  }

  function clearAll() {
    setSelectedFilters({ collection: [] });
    setInStockOnly(false);
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (inStockOnly && !p.inStock) return false;
      if (
        selectedFilters.collection.length &&
        !selectedFilters.collection.includes(p.collection ?? "")
      ) {
        return false;
      }
      return true;
    });
  }, [products, selectedFilters, inStockOnly]);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <motion.div {...fadeUp} className="mb-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl text-foreground md:text-4xl">Shop</h1>
                <p className="mt-1 text-sm text-foreground-muted">
                  {loading ? "Loading..." : `${filtered.length} products`}
                </p>
              </div>
              {totalActive > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-foreground-muted transition-all hover:border-accent/30 hover:text-foreground"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Clear all ({totalActive})
                </button>
              )}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="mb-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <DropdownFilter
                label="Collection"
                filterKey="collection"
                options={collectionOptions}
                selected={selectedFilters.collection}
                onToggle={toggleFilter}
              />
              <button
                type="button"
                onClick={() => setInStockOnly((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  inStockOnly
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-border bg-surface text-foreground-muted hover:border-accent/20 hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border transition-all duration-200 ${
                    inStockOnly
                      ? "border-accent bg-accent text-white"
                      : "border-border"
                  }`}
                >
                  {inStockOnly && <Check className="h-3 w-3" />}
                </span>
                In stock only
              </button>
            </div>

            {totalActive > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {selectedFilters.collection.map((val) => (
                  <button
                    type="button"
                    key={`collection-${val}`}
                    onClick={() => toggleFilter("collection", val)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                  >
                    {val}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {inStockOnly && (
                  <button
                    type="button"
                    onClick={() => setInStockOnly(false)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                  >
                    In stock
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-4/5 w-full rounded-lg" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-foreground-muted">No products match your filters.</p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-4 text-sm text-accent underline hover:text-accent-strong"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
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
