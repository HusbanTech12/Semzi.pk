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
  return `$${(cents / 100).toFixed(2)}`;
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
        <Reveal className="text-center mb-14 space-y-3">
          <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium">
            Best Sellers
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Featured Products
          </h2>
        </Reveal>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAdded = addedIdx === idx;

            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Link href="/shop" className="block">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-muted">
                    <Image
                      src={isHovered ? product.imageHover : product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-background/80 backdrop-blur-sm rounded-md text-[10px] tracking-[0.12em] uppercase text-foreground font-medium">
                      {product.badge}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/70 mb-0.5">
                        {product.category}
                      </p>
                      <h3 className="font-serif text-lg text-white leading-tight">
                        {product.name}
                      </h3>
                      <span className="block text-sm text-white font-mono mt-1">
                        {formatPrice(product.priceCents)}
                      </span>
                    </div>

                    <div
                      className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 p-5 transition-all duration-300 ${
                        isHovered ? "bg-foreground/20 backdrop-blur-sm opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                      }`}
                    >
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          handleQuickAdd(idx);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-background text-foreground text-xs tracking-wider uppercase rounded-full hover:bg-accent hover:text-background transition-colors cursor-pointer"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Quick Add
                          </>
                        )}
                      </span>
                      <span className="p-2.5 bg-background/90 backdrop-blur-sm rounded-full text-foreground hover:bg-accent hover:text-background transition-colors cursor-pointer">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="sm:hidden text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
