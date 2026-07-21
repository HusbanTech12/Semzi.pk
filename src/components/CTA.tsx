export default function CTA() {
  return (
    <section className="py-24 lg:py-32 gradient-cta relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-light/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center space-y-8">
        <h2 className="font-serif text-4xl md:text-5xl text-background">
          Start Your Premium
          <br />
          Care Routine Today
        </h2>
        <p className="text-background/60 text-lg max-w-xl mx-auto">
          Join 10,000+ customers who have elevated their daily care ritual with
          nature&apos;s finest ingredients.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-primary-light text-foreground text-sm tracking-wider uppercase rounded-full hover:bg-primary-light/90 transition-all font-semibold">
            Shop Now - Free Shipping
          </button>
          <button className="px-10 py-4 border border-background/30 text-background text-sm tracking-wider uppercase rounded-full hover:bg-background/10 transition-all">
            Subscribe & Save 20%
          </button>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-background/50">
          <span>Free shipping on orders $50+</span>
          <span className="w-1 h-1 rounded-full bg-background/30" />
          <span>30-day money-back guarantee</span>
          <span className="w-1 h-1 rounded-full bg-background/30" />
          <span>Secure checkout</span>
        </div>
      </div>
    </section>
  );
}
