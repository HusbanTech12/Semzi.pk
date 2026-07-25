"use client";

import { Sparkles, Heart, Leaf, Package } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: Sparkles,
    title: "100% Natural",
    description:
      "Every ingredient is sourced from nature. No synthetic additives, parabens, or sulfates. Full INCI transparency on every product.",
  },
  {
    icon: Heart,
    title: "Handcrafted",
    description:
      "Small-batch production ensures quality and attention to detail in every single bar and bottle.",
  },
  {
    icon: Leaf,
    title: "Cruelty-Free",
    description:
      "We never test on animals. Certified cruelty-free and vegan friendly. Kind to your skin and the planet.",
  },
  {
    icon: Package,
    title: "Eco Packaging",
    description:
      "100% biodegradable packaging made from recycled materials. Because what wraps your soap matters too.",
  },
];

export default function Features() {
  return (
    <section className="py-24 lg:py-32 bg-surface-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium">
            Our Promise
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Crafted with Care,
            <br />
            Backed by Nature
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Reveal
                key={feature.title}
                delay={idx * 0.1}
                className="group relative p-8 rounded-2xl border border-border/50 bg-surface overflow-hidden hover:border-accent/40 hover:shadow-[0_8px_40px_-8px_rgba(43,33,24,0.12),0_0_32px_-4px_rgba(199,154,86,0.15)] transition-all duration-500 cursor-default"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative w-12 h-12 rounded-xl bg-accent-subtle flex items-center justify-center mb-5 group-hover:bg-accent/15 group-hover:shadow-[0_0_24px_-2px_rgba(199,154,86,0.35)] transition-all duration-500">
                  <Icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="relative font-serif text-lg text-foreground mb-3 group-hover:text-accent-strong transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="relative text-[13px] text-foreground-muted/70 leading-relaxed">
                  {feature.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
