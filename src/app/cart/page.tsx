"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import PriceDisplay from "@/components/PriceDisplay";
import { useCart } from "@/context/cart-context";
import { useAnimations } from "@/lib/animations";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalCents, shippingCents, freeShippingThreshold } = useCart();
  const { fadeUp } = useAnimations();

  const progress = Math.min((totalCents / freeShippingThreshold) * 100, 100);
  const freeShippingRemaining = freeShippingThreshold - totalCents;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
            <motion.div {...fadeUp} className="space-y-6">
              <ShoppingBag className="w-16 h-16 mx-auto text-foreground-muted/30" />
              <h1 className="font-serif text-3xl text-foreground">Your cart is empty</h1>
              <p className="text-foreground-muted">Looks like you haven&apos;t added anything yet.</p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong"
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
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl text-foreground">Cart</h1>
              <p className="text-sm text-foreground-muted mt-1">{items.length} items</p>
            </div>
            <button
              onClick={clearCart}
              className="text-sm text-foreground-muted hover:text-destructive transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {totalCents > 0 && totalCents < freeShippingThreshold && (
            <div className="mb-8 px-6 py-4 bg-accent-subtle/50 border border-border rounded-lg">
              <div className="flex justify-between text-sm text-foreground-muted mb-2">
                <span>Free shipping</span>
                <span>${(freeShippingRemaining / 100).toFixed(0)} away</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-accent rounded-full"
                />
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.variantId}
                  layout
                  className="flex gap-6 p-4 border border-border rounded-lg"
                >
                  <Link
                    href={`/product/${item.productId}`}
                    className="relative w-24 h-24 rounded-lg overflow-hidden bg-surface-muted shrink-0"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.productId}`}>
                      <h3 className="font-serif text-base text-foreground truncate">{item.name}</h3>
                    </Link>
                    <PriceDisplay priceCents={item.priceCents} className="text-sm mt-1" />
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-border rounded">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-2 text-foreground-muted hover:text-foreground"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-2 text-foreground-muted hover:text-foreground"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-foreground-muted hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-sm">${((item.priceCents * item.quantity) / 100).toFixed(0)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg p-6 space-y-4 sticky top-28">
                <h3 className="font-serif text-lg text-foreground">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Subtotal</span>
                    <span className="font-mono">${(totalCents / 100).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Shipping</span>
                    <span className="font-mono">
                      {shippingCents === 0 ? "Free" : `$${shippingCents / 100}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border font-semibold">
                    <span>Total</span>
                    <span className="font-mono">
                      ${((totalCents + shippingCents) / 100).toFixed(0)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full text-center py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
                >
                  Checkout
                </Link>
                <Link
                  href="/shop"
                  className="flex items-center justify-center gap-1 text-xs text-foreground-muted hover:text-accent transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
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
