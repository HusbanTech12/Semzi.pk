"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useAnimations } from "@/lib/animations";
import PriceDisplay from "./PriceDisplay";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const { scaleIn } = useAnimations();

  return (
    <motion.article
      {...scaleIn}
      className="group"
      onMouseEnter={() => product.images.length > 1 && setImgIndex(1)}
      onMouseLeave={() => setImgIndex(0)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-surface-muted mb-4">
          <Image
            src={product.images[imgIndex]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
          {product.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-surface/90 backdrop-blur-sm rounded text-[10px] tracking-wider uppercase text-foreground">
              {product.badge}
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
              <span className="bg-surface px-4 py-2 rounded text-xs tracking-wider uppercase text-foreground">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-base text-foreground truncate">
              {product.name}
            </h3>
          </Link>
          <p className="text-[10px] tracking-wider uppercase text-foreground-muted">
            {product.category}
          </p>
          <PriceDisplay priceCents={product.priceCents} compareAtCents={product.compareAtPriceCents} />
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => setWishlisted(!wishlisted)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="p-2 text-foreground-muted hover:text-destructive transition-colors"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-destructive text-destructive" : ""}`} />
          </button>
          {product.inStock && (
            <button
              aria-label="Quick add to cart"
              className="p-2 text-foreground-muted hover:text-accent transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
