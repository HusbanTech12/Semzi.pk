"use client";

import { Leaf, HandHeart, Rabbit, Truck } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  { icon: HandHeart, label: "Handmade in Small Batches" },
  { icon: Leaf, label: "100% Natural Ingredients" },
  { icon: Rabbit, label: "Cruelty-Free & Vegan" },
  { icon: Truck, label: "Free Shipping Over $50" },
];

export default function TrustBar() {
  return (
    <section className="py-16 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-border/50">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} delay={idx * 0.1} className="flex items-center justify-center gap-3 lg:px-8">
                <Icon className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
                <span className="text-[11px] tracking-[0.15em] uppercase text-foreground-muted">
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
