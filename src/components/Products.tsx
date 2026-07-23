"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { useAnimations } from "@/lib/animations";

const products = [
  {
    name: "Lavender Dreams",
    category: "Artisan Soap",
    price: "$24.00",
    image:
      "https://images.unsplash.com/photo-1672736810221-611f53c1fc47?w=600&q=80",
    badge: "Bestseller",
  },
  {
    name: "Rose Petal Elixir",
    category: "Shampoo",
    price: "$38.00",
    image:
      "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=600&q=80",
    badge: "New",
  },
  {
    name: "Charcoal Detox",
    category: "Artisan Soap",
    price: "$28.00",
    image:
      "https://images.unsplash.com/photo-1724682620333-19ee9ff860cb?w=600&q=80",
    badge: "Popular",
  },
  {
    name: "Coconut Silk",
    category: "Shampoo",
    price: "$34.00",
    image:
      "https://images.unsplash.com/photo-1747098393451-6b985f62a2c2?w=600&q=80",
    badge: "Eco",
  },
  {
    name: "Honey Oatmeal",
    category: "Artisan Soap",
    price: "$26.00",
    image:
      "https://images.unsplash.com/photo-1607006483224-73ce0729e22a?w=600&q=80",
    badge: "Soothing",
  },
  {
    name: "Tea Tree Fresh",
    category: "Shampoo",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1632454672044-db96fe310ad0?w=600&q=80",
    badge: "Natural",
  },
];

export default function Products() {
  const { staggerContainer, scaleIn } = useAnimations();

  return (
    <section id="products" className="py-24 lg:py-32 bg-background">
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
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.article
              key={product.name}
              {...scaleIn}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-surface-muted mb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-surface/90 backdrop-blur-sm rounded text-xs tracking-wider uppercase text-foreground">
                  {product.badge}
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              </div>
              <div className="space-y-1">
                <div className="text-xs tracking-wider uppercase text-accent">
                  {product.category}
                </div>
                <h3 className="font-serif text-xl text-foreground">
                  {product.name}
                </h3>
                <div className="text-lg text-foreground-muted font-mono">
                  {product.price}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.3} className="text-center mt-16">
          <Link
            href="/shop"
            className="inline-block px-10 py-4 border-2 border-accent text-accent text-sm tracking-wider uppercase rounded-lg hover:bg-accent hover:text-background transition-all"
          >
            View All Products
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
