import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-light/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-20 lg:pt-48 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/30 rounded-full text-primary text-sm tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              New Collection 2026
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground">
              Where Nature
              <br />
              <span className="text-primary">Meets Luxury</span>
            </h1>

            <p className="text-lg text-foreground/60 max-w-lg leading-relaxed">
              Handcrafted with the finest natural ingredients. Each bar and
              bottle is a testament to the art of premium skincare.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3.5 bg-primary text-background text-sm tracking-wider uppercase rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Explore Collection
              </button>
              <button className="px-8 py-3.5 border border-primary/30 text-primary text-sm tracking-wider uppercase rounded-full hover:bg-primary/5 transition-all">
                Our Story
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-primary-light/50"
                  />
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  10,000+
                </div>
                <div className="text-xs text-foreground/50">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1636846528145-46195929433c?w=800&q=80"
                alt="Premium soap collection"
                fill
                className="object-cover"
                preload
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-serif text-primary">100%</span>
                <div className="text-xs text-foreground/60">
                  Natural
                  <br />
                  Ingredients
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
