"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye, Check } from "lucide-react";
import Reveal from "./Reveal";

const products = [
  {
    name: "Lavender Dreams",
    category: "Artisan Soap",
    priceCents: 2400,
    image: "/images/soap-packaging.jpg",
    imageHover: "https://images.unsplash.com/photo-1672736810221-611f53c1fc47?w=600&q=80",
    badge: "Bestseller",
  },
  {
    name: "Rose Petal Elixir",
    category: "Shampoo",
    priceCents: 3800,
    image: "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=600&q=80",
    imageHover: "/images/hero-soap.jpg",
    badge: "New",
  },
  {
    name: "Charcoal Detox",
    category: "Artisan Soap",
    priceCents: 2800,
    image: "https://images.unsplash.com/photo-1724682620333-19ee9ff860cb?w=600&q=80",
    imageHover: "/images/soap-natural.jpg",
    badge: "Popular",
  },
  {
    name: "Coconut Silk",
    category: "Shampoo",
    priceCents: 3400,
    image: "https://images.unsplash.com/photo-1747098393451-6b985f62a2c2?w=600&q=80",
    imageHover: "/images/soap-packaging.jpg",
    badge: "Eco",
  },
  {
    name: "Honey Oatmeal",
    category: "Artisan Soap",
    priceCents: 2600,
    image: "https://images.unsplash.com/photo-1607006483224-73ce0729e22a?w=600&q=80",
    imageHover: "/images/hero-soap.jpg",
    badge: "Soothing",
  },
  {
    name: "Tea Tree Fresh",
    category: "Shampoo",
    priceCents: 3200,
    image: "https://images.unsplash.com/photo-1632454672044-db96fe310ad0?w=600&q=80",
    imageHover: "/images/soap-natural.jpg",
    badge: "Natural",
  },
];

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(0)}.00`;
}

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < rating ? "text-accent" : "text-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Products() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [addedIdx, setAddedIdx] = useState<number | null>(null);

  const handleQuickAdd = (idx: number) => {
    setAddedIdx(idx);
    setTimeout(() => setAddedIdx(null), 2000);
  };

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16 space-y-4">
          <span className="text-sm tracking-[0.2em] uppercase text-accent">
            Best Sellers
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Featured Products
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Each product is meticulously crafted using time-honored techniques
            and the purest ingredients nature has to offer.
          </p>
        </Reveal>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
        >
          {products.map((product, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAdded = addedIdx === idx;

            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Link href="/shop" className="block">
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-surface-muted mb-5 shadow-sm transition-shadow duration-500 group-hover:shadow-xl">
                    <Image
                      src={isHovered ? product.imageHover : product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-surface/90 backdrop-blur-sm rounded text-[10px] tracking-[0.15em] uppercase text-foreground font-medium">
                      {product.badge}
                    </div>

                    <div
                      className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${
                        isHovered ? "bg-foreground/15 opacity-100" : "opacity-0"
                      }`}
                    >
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          handleQuickAdd(idx);
                        }}
                        className="p-3 bg-surface/90 backdrop-blur-sm rounded-full text-foreground hover:bg-accent hover:text-background transition-colors cursor-pointer"
                        aria-label="Quick add to cart"
                      >
                        {isAdded ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <ShoppingBag className="w-5 h-5" />
                        )}
                      </span>
                      <span className="p-3 bg-surface/90 backdrop-blur-sm rounded-full text-foreground hover:bg-accent hover:text-background transition-colors cursor-pointer">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>

                    {isAdded && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-accent text-background text-xs tracking-wider uppercase rounded-full shadow-lg">
                        Added to Cart
                      </div>
                    )}
                  </div>
                </Link>

                <div className="space-y-2 px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium">
                      {product.category}
                    </span>
                    <Stars />
                  </div>
                  <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <div className="h-px bg-border/50" />
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-base text-foreground font-mono tracking-tight">
                      {formatPrice(product.priceCents)}
                    </span>
                    <span className="text-[10px] text-foreground-muted tracking-wider uppercase">
                      + Quick Add
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal delay={0.3} className="text-center mt-16">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
