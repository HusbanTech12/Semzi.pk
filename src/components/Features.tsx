"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Leaf, Package } from "lucide-react";
import Reveal from "./Reveal";
import { useAnimations } from "@/lib/animations";

const features = [
  {
    title: "100% Natural",
    description:
      "Every ingredient is sourced from nature. No synthetic additives, parabens, or sulfates.",
    icon: Sparkles,
  },
  {
    title: "Handcrafted",
    description:
      "Small-batch production ensures quality and attention to detail in every single bar and bottle.",
    icon: Heart,
  },
  {
    title: "Cruelty Free",
    description:
      "We never test on animals. Our products are certified cruelty-free and vegan friendly.",
    icon: Leaf,
  },
  {
    title: "Eco Packaging",
    description:
      "Our packaging is 100% biodegradable and made from recycled materials.",
    icon: Package,
  },
];

export default function Features() {
  const { scaleIn, staggerContainer } = useAnimations();

  return (
    <section className="py-24 lg:py-32 bg-surface-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16 space-y-4">
          <span className="text-sm tracking-[0.2em] uppercase text-accent">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Crafted with Care
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            We believe in the power of nature combined with the art of
            traditional craftsmanship.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                {...scaleIn}
                whileHover={{ y: -4 }}
                className="text-center space-y-4 p-8 rounded-lg bg-surface hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-accent-subtle text-accent">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
