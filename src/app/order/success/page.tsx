"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Copy, ArrowRight } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { useAnimations } from "@/lib/animations";

const orderNumber = "SEMZI-" + Math.random().toString(36).substring(2, 8).toUpperCase();

export default function OrderSuccessPage() {
  const { fadeUp } = useAnimations();

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 py-24 text-center">
          <motion.div {...fadeUp} className="space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 mx-auto rounded-full bg-success flex items-center justify-center"
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Check className="w-10 h-10 text-background" />
              </motion.div>
            </motion.div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                Order Confirmed
              </h1>
              <p className="text-foreground-muted">
                Thank you for your order. You&apos;ll receive a confirmation email shortly.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-4 bg-surface-muted rounded-lg">
              <span className="font-mono text-sm text-foreground">{orderNumber}</span>
              <button
                onClick={() => navigator.clipboard.writeText(orderNumber)}
                className="text-foreground-muted hover:text-accent transition-colors"
                aria-label="Copy order number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-border rounded-lg p-6 space-y-3 text-sm text-left">
              <h3 className="font-serif text-base text-foreground">What&apos;s Next?</h3>
              <ol className="space-y-2 text-foreground-muted">
                <li className="flex gap-2">
                  <span className="font-mono text-accent">1.</span>
                  <span>We&apos;ll carefully hand-pack your order within 1-2 business days.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-accent">2.</span>
                  <span>You&apos;ll receive a shipping confirmation with tracking information.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-accent">3.</span>
                  <span>Expected delivery within 5-7 business days.</span>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/account"
                className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground-muted text-sm tracking-wider uppercase rounded-lg hover:text-foreground transition-all"
              >
                View Orders
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
