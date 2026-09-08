"use client";

import { Star } from "lucide-react";
import Reveal from "./Reveal";

const testimonials = [
  {
    name: "Maya R.",
    detail: "Dry skin · Beach Soap",
    content:
      "The lather is cream, not foam. My winter tightness is gone after a week of Beach.",
  },
  {
    name: "Daniel K.",
    detail: "Sensitive · Goat Milk & Aloe",
    content:
      "First bar that did not sting. The goat milk one is the only soap I travel with now.",
  },
  {
    name: "Priya S.",
    detail: "Gifted · Flora",
    content:
      "Packaging felt like a small apothecary. She kept the wrapper on the shelf.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 space-y-3 text-center">
          <Reveal>
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
              From the ritual
            </span>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">
              Notes from skin that knows
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <Reveal key={testimonial.name} delay={idx * 0.08}>
              <article className="h-full space-y-5 rounded-2xl border border-border/70 bg-background p-8 shadow-[0_18px_40px_-18px_rgba(26,20,16,0.12)]">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground-muted">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="border-t border-border/60 pt-4">
                  <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-accent">
                    {testimonial.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
