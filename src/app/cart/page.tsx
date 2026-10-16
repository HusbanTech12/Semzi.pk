"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import PriceDisplay from "@/components/PriceDisplay";
import { formatPkr, useCart } from "@/context/cart-context";
import { useAnimations } from "@/lib/animations";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalCents,
    shippingCents,
    freeShippingThreshold,
    totalItems,
  } = useCart();
  const { fadeUp } = useAnimations();

  const progress = Math.min((totalCents / freeShippingThreshold) * 100, 100);
  const freeShippingRemaining = freeShippingThreshold - totalCents;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
            <motion.div {...fadeUp} className="space-y-6">
              <ShoppingBag className="mx-auto h-16 w-16 text-foreground-muted/30" />
              <h1 className="font-serif text-3xl text-foreground">Your cart is empty</h1>
              <p className="text-foreground-muted">
                Looks like you haven&apos;t added anything yet.
              </p>
              <Link
                href="/shop"
                className="inline-block rounded-lg bg-accent px-8 py-3 text-sm uppercase tracking-wider text-background transition-colors hover:bg-accent-strong"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl text-foreground">Cart</h1>
              <p className="mt-1 text-sm text-foreground-muted">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            </div>
            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-foreground-muted transition-colors hover:text-destructive"
            >
              Clear Cart
            </button>
          </div>

          {totalCents > 0 && totalCents < freeShippingThreshold && (
            <div className="mb-8 rounded-lg border border-border bg-accent-subtle/50 px-6 py-4">
              <div className="mb-2 flex justify-between text-sm text-foreground-muted">
                <span>Free shipping</span>
                <span>{formatPkr(freeShippingRemaining)} away</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <motion.div
                  key={item.variantId}
                  layout
                  whileHover={{ y: -2 }}
                  className="group flex gap-6 rounded-lg border border-border bg-surface p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_24px_-4px_rgba(199,154,86,0.12)]"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-muted"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${item.slug}`}>
                      <h3 className="truncate font-serif text-base text-foreground">
                        {item.name}
                      </h3>
                    </Link>
                    <PriceDisplay priceCents={item.priceCents} className="mt-1 text-sm" />
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center rounded border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          className="p-2 text-foreground-muted hover:text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 text-center font-mono text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          className="p-2 text-foreground-muted hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        aria-label={`Remove ${item.name}`}
                        className="text-foreground-muted transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-sm">
                      {formatPkr(item.priceCents * item.quantity)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4 rounded-lg border border-border p-6">
                <h3 className="font-serif text-lg text-foreground">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Subtotal</span>
                    <span className="font-mono">{formatPkr(totalCents)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Shipping</span>
                    <span className="font-mono">
                      {shippingCents === 0 ? "Free" : formatPkr(shippingCents)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 font-semibold">
                    <span>Total</span>
                    <span className="font-mono">
                      {formatPkr(totalCents + shippingCents)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full rounded-lg bg-accent py-3 text-center text-sm uppercase tracking-wider text-background transition-all hover:bg-accent-strong"
                >
                  Checkout
                </Link>
                <Link
                  href="/shop"
                  className="flex items-center justify-center gap-1 text-xs text-foreground-muted transition-colors hover:text-accent"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
