"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Copy, ArrowRight } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { useAnimations } from "@/lib/animations";
import { toast } from "@/lib/toast";

function OrderSuccessContent() {
  const { fadeUp } = useAnimations();
  const searchParams = useSearchParams();
  const orderNumber =
    searchParams.get("order")?.trim() || "SEMZI-PENDING";
  const [copied, setCopied] = useState(false);

  async function copyOrderNumber() {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      toast.success("Copied", "Order number copied to clipboard.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed", "Could not copy the order number.");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-8">
      <motion.div {...fadeUp} className="space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success"
        >
          <Check className="h-10 w-10 text-background" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-foreground md:text-4xl">
            Order Confirmed
          </h1>
          <p className="text-foreground-muted">
            Thank you for your order. It&apos;s saved and we&apos;ll start
            preparing it shortly.
          </p>
        </div>

        <div className="inline-flex items-center gap-3 rounded-lg bg-surface-muted px-6 py-4">
          <span className="font-mono text-sm text-foreground">{orderNumber}</span>
          <button
            type="button"
            onClick={() => void copyOrderNumber()}
            className="text-foreground-muted transition-colors hover:text-accent"
            aria-label="Copy order number"
          >
            <Copy className="h-4 w-4" />
          </button>
          {copied && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-success">
              Copied
            </span>
          )}
        </div>

        <div className="space-y-3 rounded-lg border border-border p-6 text-left text-sm">
          <h3 className="font-serif text-base text-foreground">What&apos;s Next?</h3>
          <ol className="space-y-2 text-foreground-muted">
            <li className="flex gap-2">
              <span className="font-mono text-accent">1.</span>
              <span>
                We&apos;ll carefully hand-pack your order within 1–2 business
                days.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-accent">2.</span>
              <span>
                You&apos;ll receive a shipping confirmation with tracking
                information.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-accent">3.</span>
              <span>Expected delivery within 5–7 business days.</span>
            </li>
          </ol>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3 text-sm uppercase tracking-wider text-background transition-all hover:bg-accent-strong"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-3 text-sm uppercase tracking-wider text-foreground-muted transition-all hover:text-foreground"
          >
            View Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <Suspense
          fallback={
            <div className="mx-auto max-w-2xl px-6 py-24 text-center text-foreground-muted">
              Confirming your order…
            </div>
          }
        >
          <OrderSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
