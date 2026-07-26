"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import PriceDisplay from "./PriceDisplay";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalItems, totalCents, shippingCents, freeShippingThreshold } = useCart();

  const progress = Math.min((totalCents / freeShippingThreshold) * 100, 100);
  const freeShippingRemaining = freeShippingThreshold - totalCents;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-foreground/40 z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-serif text-lg">Cart ({totalItems})</span>
              </div>
              <button onClick={() => onOpenChange(false)} className="p-1 text-foreground-muted hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {totalCents > 0 && totalCents < freeShippingThreshold && (
              <div className="px-6 py-3 bg-accent-subtle/50 border-b border-border">
                <div className="flex justify-between text-xs text-foreground-muted mb-1">
                  <span>Free shipping</span>
                  <span>${(freeShippingRemaining / 100).toFixed(0)} away</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 mx-auto text-foreground-muted/30 mb-4" />
                  <p className="text-foreground-muted text-sm">Your cart is empty</p>
                  <Link
                    href="/shop"
                    onClick={() => onOpenChange(false)}
                    className="inline-block mt-4 px-6 py-2 bg-accent text-background text-sm tracking-wider uppercase rounded-lg"
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
                    whileHover={{ x: -2 }}
                    className="flex gap-4 p-2 rounded-lg hover:bg-surface-muted/50 transition-colors duration-300"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-muted shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.productId}`} onClick={() => onOpenChange(false)}>
                        <h4 className="text-sm text-foreground truncate">{item.name}</h4>
                      </Link>
                      <PriceDisplay priceCents={item.priceCents} className="text-xs mt-1" />
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="p-1 text-foreground-muted hover:text-foreground"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="p-1 text-foreground-muted hover:text-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-xs text-foreground-muted hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted">Subtotal</span>
                  <span className="font-mono">${(totalCents / 100).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-muted">Shipping</span>
                  <span className="font-mono">{shippingCents === 0 ? "Free" : `$${shippingCents / 100}`}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="font-mono">${((totalCents + shippingCents) / 100).toFixed(0)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => onOpenChange(false)}
                  className="block w-full text-center py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={() => onOpenChange(false)}
                  className="block w-full text-center text-sm text-foreground-muted hover:text-foreground"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
