"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";

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
  return (
    <section className="py-24 lg:py-32 bg-surface-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Reveal>
            <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Loved by Thousands
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-foreground-muted max-w-sm mx-auto text-sm leading-relaxed">
              Hear from our community of customers who have made Semzi part of
              their daily ritual.
            </p>
          </Reveal>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-surface p-10 lg:p-12 space-y-6"
            >
              <Quote className="w-8 h-8 text-accent/40" strokeWidth={1} />

              <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-accent text-accent"
                  />
                ))}
              </div>

              <p className="text-foreground-muted leading-relaxed text-sm">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                <p className="text-xs text-foreground-muted mt-0.5">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
