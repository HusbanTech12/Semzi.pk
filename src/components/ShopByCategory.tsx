"use client";

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
    name: "Shampoos",
    href: "/shop?category=shampoos",
    image: "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400&q=80",
  },
  {
    name: "Gift Sets",
    href: "/shop?category=gift-sets",
    image: "https://images.unsplash.com/photo-1724682620333-19ee9ff860cb?w=400&q=80",
  },
  {
    name: "Body Care",
    href: "/shop?category=body-care",
    image: "https://images.unsplash.com/photo-1607006483224-73ce0729e22a?w=400&q=80",
  },
  {
    name: "Beach",
    href: "/collections/beach",
    image: "/images/soap-natural.jpg",
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
              className="flex flex-col items-center gap-4 group"
            >
              <Link href={category.href}>
                <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden ring-2 ring-border/50 ring-offset-4 ring-offset-background transition-all duration-300 group-hover:ring-accent group-hover:ring-offset-background">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 128px, 176px"
                  />
                </div>
              </Link>
              <span className="text-sm tracking-[0.1em] uppercase text-foreground-muted group-hover:text-foreground transition-colors">
                {category.name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
