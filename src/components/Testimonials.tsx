"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
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
  const { staggerContainer, scaleIn } = useAnimations();

  return (
    <section className="py-24 lg:py-32 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16 space-y-4">
          <span className="text-sm tracking-[0.2em] uppercase text-accent-subtle">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl">
            Loved by Thousands
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Hear from our community of customers who have made Semzi part of
            their daily ritual.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              {...scaleIn}
              whileHover={{ y: -4 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-8 space-y-6 border border-white/10"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent-subtle text-accent-subtle"
                  />
                ))}
              </div>
              <p className="text-background/80 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-foreground-muted">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
