"use client";

import { motion } from "framer-motion";
import { Leaf, HandHeart, Rabbit, Truck } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  { icon: HandHeart, label: "Handmade in small batches" },
  { icon: Leaf, label: "Full INCI, nothing hidden" },
  { icon: Rabbit, label: "Cruelty-free & vegan" },
  { icon: Truck, label: "Free shipping over $50" },
];

export default function TrustBar() {
  return (
    <section className="border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border/60">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.label}
                delay={idx * 0.08}
                className="flex items-center justify-center gap-3 lg:px-8"
              >
                <Icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                <span className="text-[11px] uppercase tracking-[0.16em] text-foreground-muted">
                  {item.label}
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
