"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Leaf, Package } from "lucide-react";
import Reveal from "./Reveal";
import { useAnimations } from "@/lib/animations";

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
  const { cardHover } = useAnimations();

  return (
    <section className="bg-surface-muted py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-16 max-w-xl space-y-4 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
            Our Promise
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Crafted with Care,
            <br />
            Backed by Nature
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={idx * 0.1} scale>
                <motion.div
                  {...cardHover}
                  className="group relative h-full cursor-default overflow-hidden rounded-2xl border border-border/50 bg-surface p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle transition-all duration-500 group-hover:bg-accent/15">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Icon
                        className="h-5 w-5 text-accent transition-colors duration-300 group-hover:text-accent-strong"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>
                  <h3 className="relative mb-3 font-serif text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent-strong">
                    {feature.title}
                  </h3>
                  <p className="relative text-[13px] font-medium leading-relaxed text-foreground-muted/70">
                    {feature.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
