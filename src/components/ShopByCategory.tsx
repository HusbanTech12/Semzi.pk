"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

const categories = [
  {
    name: "Soaps",
    href: "/shop?category=soaps",
    image: "/images/soap-packaging.jpg",
  },
  {
    name: "Cream Soaps",
    href: "/shop?category=cream-soaps",
    image: "https://images.unsplash.com/photo-1607006483224-73ce0729e22a?w=400&q=80",
  },
  {
    name: "Shampoos",
    href: "/shop?category=shampoos",
    image: "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400&q=80",
  },
];

export default function ShopByCategory() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-14 space-y-3">
          <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium">
            Explore
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Shop By Category
          </h2>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-10 lg:gap-14">
          {categories.map((category, idx) => (
            <Reveal
              key={category.name}
              delay={idx * 0.08}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4 group"
              >
                <Link href={category.href}>
                  <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden ring-2 ring-border/50 ring-offset-4 ring-offset-background group-hover:ring-accent group-hover:ring-offset-background transition-all duration-500 group-hover:shadow-[0_0_32px_-4px_rgba(199,154,86,0.3)]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 128px, 176px"
                    />
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 rounded-full" />
                  </div>
                </Link>
                <span className="text-sm tracking-[0.1em] uppercase text-foreground-muted group-hover:text-accent-strong transition-colors duration-300">
                  {category.name}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
