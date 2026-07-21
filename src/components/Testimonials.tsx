"use client";

import { motion } from "framer-motion";
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
      "I&apos;ve recommended LUXE to all my clients. The shampoo leaves hair silky smooth without any harsh chemicals. Truly premium quality.",
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

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-secondary text-background"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16 space-y-4">
          <span className="text-sm tracking-[0.2em] uppercase text-primary-light">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-background">
            Loved by Thousands
          </h2>
          <p className="text-background/60 max-w-2xl mx-auto">
            Hear from our community of customers who have made LUXE part of
            their daily ritual.
          </p>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardItem}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-background/5 backdrop-blur-sm rounded-2xl p-8 space-y-6 border border-background/10"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-1"
              >
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="#D4B896"
                  >
                    <path d="M9 1l2.2 4.5L16 6.2l-3.5 3.4.8 4.9L9 12.5l-4.3 2 .8-4.9L2 6.2l4.8-.7L9 1z" />
                  </motion.svg>
                ))}
              </motion.div>
              <p className="text-background/80 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-background">
                  {testimonial.name}
                </div>
                <div className="text-sm text-background/50">
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
