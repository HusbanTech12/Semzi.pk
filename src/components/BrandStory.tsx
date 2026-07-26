"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const ingredients = [
  "Olea Europaea (Olive) Fruit Oil",
  "Cocos Nucifera (Coconut) Oil",
  "Butyrospermum Parkii (Shea) Butter",
  "Sodium Hydroxide",
  "Lavandula Angustifolia (Lavender) Oil",
  "Sea Salt",
  "Aloe Barbadensis Leaf Extract",
];

export default function BrandStory() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-muted">
              <Image
                src="https://images.pexels.com/photos/4041402/pexels-photo-4041402.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Natural soap ingredients and handmade process"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal direction="right" className="space-y-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                We Believe in
                <br />
                Honest Ingredients
              </h2>
              <p className="text-foreground-muted leading-relaxed">
                Every Semzi product starts with a simple promise: nothing we
                wouldn&apos;t use on our own skin. We list every ingredient in full
                INCI format because transparency isn&apos;t a marketing
                tactic &mdash; it&apos;s a principle.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="p-6 rounded-xl bg-surface-muted border border-border/40">
                <p className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium mb-3">
                  Ingredient Transparency
                </p>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3 py-1.5 text-[10px] tracking-wider uppercase bg-surface border border-border/50 rounded-md text-foreground-muted"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground tracking-[0.1em] uppercase transition-colors"
              >
                Read Our Full Story
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
