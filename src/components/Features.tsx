const features = [
  {
    title: "100% Natural",
    description:
      "Every ingredient is sourced from nature. No synthetic additives, parabens, or sulfates.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M16 4C12 4 8 8 8 14C8 20 16 28 16 28C16 28 24 20 24 14C24 8 20 4 16 4Z" />
      </svg>
    ),
  },
  {
    title: "Handcrafted",
    description:
      "Small-batch production ensures quality and attention to detail in every single bar and bottle.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="16" cy="16" r="12" />
        <path d="M16 10v12M10 16h12" />
      </svg>
    ),
  },
  {
    title: "Cruelty Free",
    description:
      "We never test on animals. Our products are certified cruelty-free and vegan friendly.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M16 28C16 28 6 20 6 12C6 8 10 4 14 6L16 10L18 6C22 4 26 8 26 12C26 20 16 28 16 28Z" />
      </svg>
    ),
  },
  {
    title: "Eco Packaging",
    description:
      "Our packaging is 100% biodegradable and made from recycled materials.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 28L16 8L20 28" />
        <path d="M8 20H24" />
        <path d="M6 24H26" />
        <path d="M10 12H22" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="story" className="py-24 lg:py-32 bg-accent-light/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm tracking-[0.2em] uppercase text-primary">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Crafted with Care
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            We believe in the power of nature combined with the art of
            traditional craftsmanship.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center space-y-4 p-8 rounded-2xl bg-background/80 hover:bg-background transition-all card-hover"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light/30 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
