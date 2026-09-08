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
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-foreground group">
      <motion.div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
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
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={href}
                className="group/btn inline-block px-8 py-3 bg-accent text-background text-sm tracking-wider uppercase rounded-lg relative overflow-hidden"
              >
                <span className="relative z-10">Shop the Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-strong to-accent-strong opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_-4px_rgba(199,154,86,0.6)]" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
