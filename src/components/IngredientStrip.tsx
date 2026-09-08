"use client";

import Reveal from "./Reveal";

const items = [
  "Aqua (Water)",
  "Cocos Nucifera (Coconut) Oil",
  "Olea Europaea (Olive) Fruit Oil",
  "Butyrospermum Parkii (Shea) Butter",
  "Caprae Lac (Goat Milk)",
  "Aloe Barbadensis Leaf Juice",
  "Ricinus Communis (Castor) Seed Oil",
  "Lavandula Angustifolia (Lavender) Oil",
  "Sea Salt",
];

export default function IngredientStrip() {
  const line = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-border/70 bg-surface-muted py-10 lg:py-14">
      <div className="mx-auto mb-8 max-w-3xl px-6 text-center">
        <Reveal>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            Full INCI
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            What touches your skin, named honestly.
          </h2>
        </Reveal>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-surface-muted to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-surface-muted to-transparent" />
        <div className="flex w-max animate-inci-marquee gap-0 motion-reduce:animate-none">
          {line.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-5 whitespace-nowrap text-[11px] uppercase tracking-[0.22em] text-foreground-muted"
            >
              {item}
              <span className="ml-5 text-accent/50">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
