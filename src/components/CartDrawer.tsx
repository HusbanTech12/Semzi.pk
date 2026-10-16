"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPkr, useCart } from "@/context/cart-context";
import PriceDisplay from "./PriceDisplay";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalCents,
    shippingCents,
    freeShippingThreshold,
    isCartOpen,
    closeCart,
  } = useCart();

  const progress = Math.min((totalCents / freeShippingThreshold) * 100, 100);
  const freeShippingRemaining = freeShippingThreshold - totalCents;

  useEffect(() => {
    if (!isCartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-foreground/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col border-l border-border bg-background shadow-[-24px_0_80px_-20px_rgba(28,22,18,0.45)]"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-accent-strong" />
                <span className="font-serif text-lg text-foreground">
                  Cart ({totalItems})
                </span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-2 text-foreground-muted transition-colors hover:bg-accent/10 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {totalCents > 0 && totalCents < freeShippingThreshold && (
              <div className="border-b border-border bg-accent-subtle/50 px-6 py-3">
                <div className="mb-1 flex justify-between text-xs text-foreground-muted">
                  <span>Free shipping</span>
                  <span>{formatPkr(freeShippingRemaining)} away</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full rounded-full bg-accent"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-foreground-muted/30" />
                  <p className="text-sm text-foreground-muted">Your cart is empty</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-4 inline-block rounded-lg bg-accent px-6 py-2 text-sm uppercase tracking-wider text-background transition-colors hover:bg-accent-strong"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.variantId}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 rounded-lg p-2 transition-colors duration-300 hover:bg-surface-muted/50"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-muted"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                      >
                        <h4 className="truncate text-sm font-medium text-foreground">
                          {item.name}
                        </h4>
                      </Link>
                      <PriceDisplay priceCents={item.priceCents} className="mt-1 text-xs" />
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center rounded border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            className="p-1 text-foreground-muted hover:text-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            className="p-1 text-foreground-muted hover:text-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.variantId)}
                          className="text-xs text-foreground-muted transition-colors hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 font-mono text-xs text-foreground">
                      {formatPkr(item.priceCents * item.quantity)}
                    </p>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-4 border-t border-border px-6 py-5">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted">Subtotal</span>
                  <span className="font-mono">{formatPkr(totalCents)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted">Shipping</span>
                  <span className="font-mono">
                    {shippingCents === 0 ? "Free" : formatPkr(shippingCents)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                  <span>Total</span>
                  <span className="font-mono">
                    {formatPkr(totalCents + shippingCents)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full rounded-lg bg-accent py-3 text-center text-sm uppercase tracking-wider text-background transition-all hover:bg-accent-strong"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full text-center text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
