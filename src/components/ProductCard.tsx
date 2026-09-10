"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, ShoppingBag } from "lucide-react";
import { useAnimations } from "@/lib/animations";
import { useCart } from "@/context/cart-context";
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

  return (
    <motion.article
      {...scaleInView}
      onMouseEnter={() => {
        if (hasMultipleImages) setImgIndex(1);
      }}
      onMouseLeave={() => setImgIndex(0)}
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: "0 8px 40px -8px rgba(43,33,24,0.18), 0 0 0 1px rgba(199,154,86,0.15), 0 0 30px -6px rgba(199,154,86,0.1)",
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_2px_20px_-6px_rgba(43,33,24,0.08)]"
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      <Link href={`/product/${product.slug}`} className="relative block">
        <div className="relative aspect-4/5 overflow-hidden bg-surface-muted">
          <Image
            src={product.images[imgIndex]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 ease-out will-change-transform group-hover:scale-108 group-hover:brightness-[1.03]"
            sizes="(max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />

          <div className="absolute inset-0 bg-linear-to-t from-foreground/25 via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(199,154,86,0.06)_0%,transparent_70%)]" />

          {product.badge && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-surface/90 backdrop-blur-md rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground shadow-sm ring-1 ring-border/50">
              {product.badge}
            </div>
          )}

          {product.inStock && (
            // Visible on hover for pointer devices; always visible on touch devices (no hover).
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0 sm:top-4 sm:right-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setWishlisted(!wishlisted);
                }}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                className={cn(
                  "flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-surface/90 backdrop-blur-md shadow-md ring-1 ring-black/5 transition-all duration-300",
                  wishlisted
                    ? "text-destructive scale-110 shadow-[0_0_16px_-2px_rgba(180,67,46,0.3)]"
                    : "text-foreground-muted hover:text-destructive hover:scale-110"
                )}
              >
                <Heart className={cn("w-4 h-4", wishlisted && "fill-current")} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItem(product, 1);
                  setJustAdded(true);
                }}
                aria-label={justAdded ? "Added to cart" : `Quick add ${product.name} to cart`}
                className={cn(
                  "flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:scale-110",
                  justAdded
                    ? "bg-success"
                    : "bg-accent hover:bg-accent-strong hover:shadow-[0_0_28px_-4px_rgba(199,154,86,0.45)]"
                )}
              >
                {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              </button>
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center">
              <span className="px-5 py-2.5 bg-surface/95 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground-muted shadow-sm ring-1 ring-border/50">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
        <div className="mb-2.5 flex items-center justify-between gap-2 sm:mb-3">
          {product.collection && (
            <span className="truncate text-[10px] tracking-[0.2em] uppercase text-accent/80 font-semibold">
              {product.collection}
            </span>
          )}
          <span className="hidden shrink-0 text-[10px] tracking-[0.12em] uppercase text-foreground-muted/50 font-medium md:inline">
            {product.category}
          </span>
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-serif text-base sm:text-[17px] font-bold leading-snug text-foreground mb-2 group-hover:text-accent-strong transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        <p className="hidden sm:block text-[11px] tracking-[0.06em] text-foreground-muted/60 font-medium mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3 border-t border-border/50">
          <PriceDisplay
            priceCents={product.priceCents}
            compareAtCents={product.compareAtPriceCents}
          />
          {!product.inStock && (
            <span className="text-[10px] tracking-[0.15em] uppercase text-destructive font-semibold">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
