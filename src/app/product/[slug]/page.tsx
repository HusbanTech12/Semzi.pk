"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Minus, Plus, ShoppingBag, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PriceDisplay from "@/components/PriceDisplay";
import IngredientList from "@/components/IngredientList";
import CautionNotice from "@/components/CautionNotice";
import { useProduct, useProducts } from "@/lib/use-products";
import { useAnimations } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type Tab = "description" | "ingredients" | "how-to-use";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { fadeUp } = useAnimations();

  const resolved = params instanceof Promise ? { slug: "" } : params;
  const slug = resolved?.slug ?? "";
  const { product, loading } = useProduct(slug);
  const { products: allProducts } = useProducts();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");

  if (!loading && !product) notFound();

  const tabs: { key: Tab; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "ingredients", label: "Ingredients" },
    { key: "how-to-use", label: "How to Use" },
  ];

  const related = allProducts
    .filter((p) => p.collection === product?.collection && p.id !== product?.id)
    .slice(0, 4);

  if (loading || !product) {
    return (
      <>
        <Navbar />
        <main className="pt-20 max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-4">
              <Skeleton className="aspect-[4/5] w-full rounded-lg" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-accent transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div {...fadeUp} className="space-y-4">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-surface-muted">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={cn(
                        "relative w-20 h-20 rounded-lg overflow-hidden bg-surface-muted border-2 transition-colors",
                        i === selectedImage ? "border-accent" : "border-transparent"
                      )}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div {...fadeUp} className="space-y-8">
              <div className="space-y-4">
                <p className="text-xs tracking-wider uppercase text-foreground-muted">
                  {product.collection} Collection
                </p>
                <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                  {product.name}
                </h1>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {product.category}
                </p>
                <PriceDisplay
                  priceCents={product.priceCents}
                  compareAtCents={product.compareAtPriceCents}
                  className="text-2xl"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-foreground-muted hover:text-foreground transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-mono text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-foreground-muted hover:text-foreground transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  disabled={!product.inStock}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-8 py-3 text-sm tracking-wider uppercase rounded-lg transition-all",
                    product.inStock
                      ? "bg-accent text-background hover:bg-accent-strong"
                      : "bg-foreground-muted/20 text-foreground-muted cursor-not-allowed"
                  )}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>

              <div>
                <div className="flex border-b border-border">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={cn(
                        "px-6 py-3 text-xs tracking-wider uppercase transition-colors border-b-2 -mb-[1px]",
                        activeTab === tab.key
                          ? "text-accent border-accent"
                          : "text-foreground-muted border-transparent hover:text-foreground"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="pt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === "description" && (
                        <p className="text-sm text-foreground-muted leading-relaxed">
                          {product.description}
                        </p>
                      )}
                      {activeTab === "ingredients" && (
                        <IngredientList items={product.ingredients} />
                      )}
                      {activeTab === "how-to-use" && (
                        <div className="space-y-4">
                          <p className="text-sm text-foreground-muted leading-relaxed">
                            {product.howToUse}
                          </p>
                          <CautionNotice text={product.caution} />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {related.length > 0 && (
            <section className="mt-24 pt-16 border-t border-border">
              <h2 className="font-serif text-2xl text-foreground mb-8">
                Complete the Collection
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 lg:hidden">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <PriceDisplay priceCents={product.priceCents} compareAtCents={product.compareAtPriceCents} />
            <button
              disabled={!product.inStock}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-wider uppercase rounded-lg transition-all",
                product.inStock
                  ? "bg-accent text-background hover:bg-accent-strong"
                  : "bg-foreground-muted/20 text-foreground-muted cursor-not-allowed"
              )}
            >
              <ShoppingBag className="w-4 h-4" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
