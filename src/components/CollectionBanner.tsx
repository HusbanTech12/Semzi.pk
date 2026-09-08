"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
    <section className="group relative h-[50vh] min-h-[400px] overflow-hidden bg-foreground">
      <Image
        src={imageUrl}
        alt={`${name} collection`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-r from-foreground/80 via-foreground/50 to-transparent" />
      <motion.div {...fadeUp} className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-lg space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-subtle">Collection</p>
            <h2 className="font-serif text-5xl text-background md:text-6xl">{name}</h2>
            <p className="font-serif text-lg italic text-accent-subtle/80">{tagline}</p>
            <Link
              href={href}
              className="inline-block rounded-lg bg-accent px-8 py-3 text-sm uppercase tracking-wider text-foreground hover:bg-accent-strong hover:text-background"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
