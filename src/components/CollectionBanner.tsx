"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAnimations } from "@/lib/animations";

interface CollectionBannerProps {
  name: string;
  tagline: string;
  imageUrl: string;
  href: string;
}

export default function CollectionBanner({ name, tagline, imageUrl, href }: CollectionBannerProps) {
  const { fadeUp } = useAnimations();

  return (
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-foreground">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      <motion.div
        {...fadeUp}
        className="absolute inset-0 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-lg space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-accent-subtle">
              Collection
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-background">
              {name}
            </h1>
            <p className="text-lg text-accent-subtle/80 font-serif italic">
              {tagline}
            </p>
            <Link
              href={href}
              className="inline-block px-8 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
