"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, ShoppingBag } from "lucide-react";
import { useAnimations } from "@/lib/animations";
import { useCart } from "@/context/cart-context";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import PriceDisplay from "./PriceDisplay";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const { scaleInView } = useAnimations();
  const { addItem } = useCart();

  useEffect(() => {
    if (!justAdded) return;
    const t = window.setTimeout(() => setJustAdded(false), 1500);
    return () => window.clearTimeout(t);
  }, [justAdded]);

  const hasMultipleImages = product.images.length > 1;
  const blurb =
    product.tagline?.trim() ||
    (() => {
      const first = product.description.split(/[.!?]/).find((part) => part.trim());
      if (!first) return product.description.slice(0, 90);
      const sentence = first.trim();
      return sentence.length > 96 ? `${sentence.slice(0, 93)}…` : `${sentence}.`;
    })();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product, 1);
    setJustAdded(true);
  }

  return (
    <motion.article
      {...scaleInView}
      onMouseEnter={() => {
        if (hasMultipleImages) setImgIndex(1);
      }}
      onMouseLeave={() => setImgIndex(0)}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow:
          "0 8px 40px -8px rgba(43,33,24,0.18), 0 0 0 1px rgba(199,154,86,0.15), 0 0 30px -6px rgba(199,154,86,0.1)",
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface card-glow-brown"
    >
      <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <Link href={`/product/${product.slug}`} className="relative block">
        <div className="relative aspect-4/5 overflow-hidden bg-surface-muted">
          <Image
            src={product.images[imgIndex] ?? product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 ease-out will-change-transform group-hover:scale-108 group-hover:brightness-[1.03]"
            sizes="(max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />

          <div className="absolute inset-0 bg-linear-to-t from-foreground/25 via-foreground/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {product.inStock && (
            <div className="absolute top-3 right-3 z-10 sm:top-4 sm:right-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const next = !wishlisted;
                  setWishlisted(next);
                  if (next) {
                    toast.success("Saved to wishlist", product.name);
                  } else {
                    toast.info("Removed from wishlist", product.name);
                  }
                }}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 shadow-md ring-1 ring-black/5 backdrop-blur-md transition-all duration-300 sm:h-11 sm:w-11",
                  wishlisted
                    ? "scale-110 text-destructive shadow-[0_0_16px_-2px_rgba(180,67,46,0.3)]"
                    : "text-foreground-muted hover:scale-110 hover:text-destructive"
                )}
              >
                <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
              </button>
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
              <span className="rounded-full bg-surface/95 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground-muted shadow-sm ring-1 ring-border/50">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
        <div className="mb-2.5 flex items-center justify-between gap-2 sm:mb-3">
          {product.collection && (
            <span className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/80">
              {product.collection}
            </span>
          )}
          <span className="hidden shrink-0 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground-muted/50 md:inline">
            {product.category}
          </span>
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="mb-2 font-serif text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent-strong sm:text-[17px]">
            {product.name}
          </h3>
        </Link>

        <p className="mb-4 hidden text-[11px] font-medium leading-snug tracking-[0.04em] text-foreground-muted/70 line-clamp-2 sm:block">
          {blurb}
        </p>

        <div className="mt-auto space-y-3 border-t border-border/50 pt-3">
          <div className="flex items-end justify-between gap-2">
            <PriceDisplay
              priceCents={product.priceCents}
              compareAtCents={product.compareAtPriceCents}
            />
            {!product.inStock && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-destructive">
                Unavailable
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={
              !product.inStock
                ? `${product.name} is out of stock`
                : justAdded
                  ? `${product.name} added to cart`
                  : `Add ${product.name} to cart`
            }
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300",
              !product.inStock
                ? "cursor-not-allowed bg-foreground-muted/15 text-foreground-muted"
                : justAdded
                  ? "bg-success text-white shadow-md"
                  : "bg-accent text-background shadow-[0_8px_24px_-10px_rgba(142,106,56,0.55)] hover:bg-accent-strong hover:shadow-[0_10px_28px_-8px_rgba(199,154,86,0.5)]"
            )}
          >
            {justAdded ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <ShoppingBag className="h-3.5 w-3.5" />
            )}
            {!product.inStock
              ? "Out of Stock"
              : justAdded
                ? "Added"
                : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
