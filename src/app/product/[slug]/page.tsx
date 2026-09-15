"use client";

import { useState, use, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Minus, Plus, ShoppingBag, ChevronLeft, Check } from "lucide-react";
import { useCart } from "@/context/cart-context";
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

  const resolved = use(params);
  const slug = resolved?.slug ?? "";
  const { product, loading } = useProduct(slug);
  const { products: allProducts } = useProducts();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [justAdded, setJustAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const primaryCartRef = useRef<HTMLButtonElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!justAdded) return;
    const t = window.setTimeout(() => setJustAdded(false), 1800);
    return () => window.clearTimeout(t);
  }, [justAdded]);

  useEffect(() => {
    const target = primaryCartRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCart(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [product?.id, loading]);

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;
    addItem(product, quantity);
    setJustAdded(true);
  };

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
              <Skeleton className="aspect-4/5 w-full rounded-lg" />
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
              <div className="relative aspect-4/5 rounded-lg overflow-hidden bg-surface-muted">
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
                      type="button"
                      onClick={() => setSelectedImage(i)}
                      aria-label={`View image ${i + 1} of ${product.images.length}`}
                      aria-pressed={i === selectedImage}
                      className={cn(
                        "relative w-20 h-20 rounded-lg overflow-hidden bg-surface-muted border-2 transition-all duration-300 hover:shadow-[0_0_16px_-2px_rgba(199,154,86,0.3)]",
                        i === selectedImage ? "border-accent shadow-[0_0_16px_-2px_rgba(199,154,86,0.3)]" : "border-transparent hover:border-accent/50"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} — view ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
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
                {product.tagline && (
                  <p className="text-sm italic text-accent font-medium">
                    &ldquo;{product.tagline}&rdquo;
                  </p>
                )}
                <PriceDisplay
                  priceCents={product.priceCents}
                  compareAtCents={product.compareAtPriceCents}
                  className="text-2xl"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg" role="group" aria-label="Quantity">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    className="p-3 text-foreground-muted hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-mono text-sm" aria-live="polite">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="p-3 text-foreground-muted hover:text-foreground transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  ref={primaryCartRef}
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  aria-live="polite"
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 whitespace-nowrap px-4 sm:px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-lg transition-all",
                    !product.inStock
                      ? "bg-foreground-muted/20 text-foreground-muted cursor-not-allowed"
                      : justAdded
                        ? "bg-success text-white"
                        : "bg-accent text-background hover:bg-accent-strong"
                  )}
                >
                  {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  {!product.inStock ? "Out of Stock" : justAdded ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>

              <div>
                <div className="flex border-b border-border" role="tablist" aria-label="Product details">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={cn(
                        "flex-1 sm:flex-none whitespace-nowrap px-3 sm:px-6 py-3 text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors border-b-2 -mb-px",
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
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs tracking-wider uppercase text-accent font-medium">
                              {(product.slug === "nourish-goat-milk-aloe" ||
                                product.slug === "goat-milk-aloe-soap" ||
                                product.slug === "radiance" ||
                                product.slug === "clarity" ||
                                product.slug === "balance" ||
                                product.slug === "restore")
                                ? "It's handmade"
                                : "It's handcrafted"}
                            </span>
                          </div>
                          <p className="text-sm text-foreground-muted leading-relaxed">
                            {product.description}
                          </p>
                        </div>
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
      </main>
      <Footer />
      {mounted &&
        showStickyCart &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 lg:hidden">
            <div className="pointer-events-auto border-t border-border bg-surface/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-12px_rgba(28,22,18,0.25)] backdrop-blur-md">
              <div className="mx-auto flex max-w-7xl items-center gap-4 px-6">
                <PriceDisplay
                  priceCents={product.priceCents}
                  compareAtCents={product.compareAtPriceCents}
                />
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-all",
                    !product.inStock
                      ? "cursor-not-allowed bg-foreground-muted/20 text-foreground-muted"
                      : justAdded
                        ? "bg-success text-white"
                        : "bg-accent text-background hover:bg-accent-strong"
                  )}
                >
                  {justAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                  {!product.inStock ? "Out of Stock" : justAdded ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
