"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/use-products";
import { useAnimations } from "@/lib/animations";
import { Skeleton } from "@/components/ui/skeleton";

const allConcerns = ["dry", "sensitive", "oily", "acne-prone", "normal", "damaged"];
const allCategories = ["Artisan Soap", "Shampoo", "Glycerin Soap", "Goat Milk & Aloe Vera Soap"];
const allCollections = ["Beach", "Signature"];

export default function ShopPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const { products, loading } = useProducts();
  const { fadeUp } = useAnimations();

  const filtered = products.filter((p) => {
    if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
    if (selectedConcerns.length && !p.skinConcern?.some((c) => selectedConcerns.includes(c))) return false;
    if (selectedCollections.length && !selectedCollections.includes(p.collection ?? "")) return false;
    return true;
  });

  function toggleFilter(arr: string[], val: string) {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <motion.div {...fadeUp} className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">Shop</h1>
              <p className="text-sm text-foreground-muted mt-1">
                {loading ? "Loading..." : `${filtered.length} products`}
              </p>
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-foreground-muted"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </motion.div>

          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 shrink-0 space-y-8">
              <div>
                <h4 className="text-xs tracking-widest uppercase text-foreground-muted mb-4">Category</h4>
                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => setSelectedCategories(toggleFilter(selectedCategories, cat))}
                        className="accent-accent"
                      />
                      <span className="text-sm text-foreground-muted">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs tracking-widest uppercase text-foreground-muted mb-4">Collection</h4>
                <div className="space-y-2">
                  {allCollections.map((col) => (
                    <label key={col} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCollections.includes(col)}
                        onChange={() => setSelectedCollections(toggleFilter(selectedCollections, col))}
                        className="accent-accent"
                      />
                      <span className="text-sm text-foreground-muted">{col}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs tracking-widest uppercase text-foreground-muted mb-4">Skin Concern</h4>
                <div className="space-y-2">
                  {allConcerns.map((concern) => (
                    <label key={concern} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedConcerns.includes(concern)}
                        onChange={() => setSelectedConcerns(toggleFilter(selectedConcerns, concern))}
                        className="accent-accent"
                      />
                      <span className="text-sm text-foreground-muted capitalize">{concern}</span>
                    </label>
                  ))}
                </div>
              </div>

            </aside>

            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileFiltersOpen(false)} />
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-lg text-foreground">Filters</h3>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Same filter content as desktop */}
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full mt-6 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            <div className="flex-1">
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
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} priority={i < 3} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
