"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Reveal from "./Reveal";

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

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

export default function Products() {
  return (
    <section id="products" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16 space-y-4">
          <span className="text-sm tracking-[0.2em] uppercase text-primary">
            Our Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Premium Essentials
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Each product is meticulously crafted using time-honored techniques
            and the purest ingredients nature has to offer.
          </p>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, i) => (
            <motion.article
              key={product.name}
              variants={cardItem}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer card-hover"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-accent-light/30 mb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-xs tracking-wider uppercase text-foreground"
                >
                  {product.badge}
                </motion.div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              </div>
              <div className="space-y-1">
                <div className="text-xs tracking-wider uppercase text-primary">
                  {product.category}
                </div>
                <h3 className="font-serif text-xl text-foreground">
                  {product.name}
                </h3>
                <div className="text-lg text-foreground/70">
                  {product.price}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.3} className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#8B7355", color: "#FFFCF8" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border-2 border-primary text-primary text-sm tracking-wider uppercase rounded-full transition-all"
          >
            View All Products
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
