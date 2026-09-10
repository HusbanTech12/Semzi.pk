"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";
import { useAnimations } from "@/lib/animations";

const testimonials = [
  {
    name: "Sophie Laurent",
    role: "Skincare Enthusiast",
    content:
      "The lavender soap transformed my skincare routine. My skin has never felt this nourished. The natural ingredients make all the difference.",
    rating: 5,
  },
  {
    name: "James Carter",
    role: "Barber & Stylist",
    content:
      "I've recommended Semzi to all my clients. The shampoo leaves hair silky smooth without any harsh chemicals. Truly premium quality.",
    rating: 5,
  },
  {
    name: "Amara Osei",
    role: "Wellness Coach",
    content:
      "Finally, a brand that delivers on its promises. The eco packaging and cruelty-free commitment align perfectly with my values.",
    rating: 5,
  },
];

export default function Testimonials() {
  const { cardHover } = useAnimations();

  return (
    <section className="relative overflow-hidden bg-accent-subtle py-24 lg:py-32">
      <div className="absolute inset-0 bg-linear-to-b from-accent/5 via-transparent to-accent/5" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl font-bold text-heading-gradient md:text-4xl">
              Loved by Thousands
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto max-w-sm text-sm font-medium leading-relaxed text-foreground-muted">
              Hear from our community of customers who have made Semzi part of
              their daily ritual.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <Reveal key={testimonial.name} delay={idx * 0.12} scale>
              <motion.div
                {...cardHover}
                className="group relative h-full cursor-default space-y-6 overflow-hidden rounded-2xl bg-surface p-10 shadow-lg shadow-foreground/5 lg:p-12"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent-strong via-accent to-accent-strong" />

                <Quote
                  className="h-8 w-8 text-accent-strong/60 transition-colors duration-300 group-hover:text-accent-strong"
                  strokeWidth={1}
                />

                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-accent-strong text-accent-strong transition-colors duration-300 group-hover:fill-accent group-hover:text-accent"
                    />
                  ))}
                </div>

                <p className="text-sm font-medium leading-relaxed text-foreground-muted">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="border-t border-accent-strong/20 pt-4 transition-colors duration-300 group-hover:border-accent/40">
                  <p className="text-sm font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-foreground-muted">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
