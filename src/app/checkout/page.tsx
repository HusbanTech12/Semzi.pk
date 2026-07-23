"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";
import Navbar from "@/components/Header";
import PriceDisplay from "@/components/PriceDisplay";
import { useCart } from "@/context/cart-context";
import { useAnimations } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Step = "information" | "shipping" | "payment";

const steps: { key: Step; label: string }[] = [
  { key: "information", label: "Information" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("information");
  const { items, totalCents, shippingCents } = useCart();
  const { fadeUp } = useAnimations();

  const currentIdx = steps.findIndex((s) => s.key === step);

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-accent transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-colors",
                    i <= currentIdx
                      ? "bg-accent text-background"
                      : "bg-surface-muted text-foreground-muted"
                  )}
                >
                  {i + 1}
                </div>
                <span
                  className={cn(
                    "text-xs tracking-wider uppercase hidden sm:inline transition-colors",
                    i <= currentIdx ? "text-foreground" : "text-foreground-muted"
                  )}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 h-px mx-1",
                      i < currentIdx ? "bg-accent" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <motion.div
                key={step}
                {...fadeUp}
                className="space-y-6"
              >
                {step === "information" && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl text-foreground">Contact</h2>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                        />
                      </div>
                      <button
                        onClick={() => setStep("shipping")}
                        className="w-full py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
                      >
                        Continue to Shipping
                      </button>
                    </div>
                  </div>
                )}

                {step === "shipping" && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl text-foreground">Shipping</h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Address"
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                      />
                      <div className="grid sm:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                        />
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setStep("information")}
                          className="px-6 py-3 border border-border text-foreground-muted text-sm tracking-wider uppercase rounded-lg hover:text-foreground transition-all"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setStep("payment")}
                          className="flex-1 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === "payment" && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl text-foreground">Payment</h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setStep("shipping")}
                          className="px-6 py-3 border border-border text-foreground-muted text-sm tracking-wider uppercase rounded-lg hover:text-foreground transition-all"
                        >
                          Back
                        </button>
                        <Link
                          href="/order/success"
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
                        >
                          <Lock className="w-4 h-4" />
                          Pay ${((totalCents + shippingCents) / 100).toFixed(0)}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <div className="border border-border rounded-lg p-6 space-y-4 sticky top-28">
                <h3 className="font-serif text-lg text-foreground">Order Summary</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-surface-muted shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-foreground-muted">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-mono text-sm shrink-0">
                        ${((item.priceCents * item.quantity) / 100).toFixed(0)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Subtotal</span>
                    <span className="font-mono">${(totalCents / 100).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Shipping</span>
                    <span className="font-mono">{shippingCents === 0 ? "Free" : `$${shippingCents / 100}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border font-semibold">
                    <span>Total</span>
                    <span className="font-mono">${((totalCents + shippingCents) / 100).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
