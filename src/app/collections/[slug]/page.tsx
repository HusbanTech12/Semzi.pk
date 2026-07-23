"use client";

import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionBanner from "@/components/CollectionBanner";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/use-products";
import { useAnimations } from "@/lib/animations";
import { Skeleton } from "@/components/ui/skeleton";

const collectionMeta: Record<string, { name: string; tagline: string; description: string; image: string }> = {
  beach: {
    name: "Beach",
    tagline: "Carry the Beach Home",
    description: "Inspired by the coast. Infused with ocean minerals and coastal botanicals.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  },
  signature: {
    name: "Signature",
    tagline: "Timeless. Classic. Essential.",
    description: "Our flagship collection of everyday essentials.",
    image: "https://images.unsplash.com/photo-1607006483224-73ce0729e22a?w=1200&q=80",
  },
};

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = params instanceof Promise ? { slug: "" } : params;
  const slug = resolved?.slug ?? "";
  const meta = collectionMeta[slug];
  const { products, loading } = useProducts();
  const { fadeUp } = useAnimations();

  if (!loading && !meta) notFound();

  const collectionProducts = products.filter((p) => p.collection?.toLowerCase() === slug);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {meta && (
          <CollectionBanner
            name={meta.name}
            tagline={meta.tagline}
            imageUrl={meta.image}
            href={`/collections/${slug}`}
          />
        )}

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {meta && (
            <motion.div {...fadeUp} className="text-center mb-12 space-y-4">
              <p className="text-sm tracking-[0.2em] uppercase text-accent">
                {meta.name} Collection
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                {meta.tagline}
              </h2>
              <p className="text-foreground-muted max-w-2xl mx-auto">
                {meta.description}
              </p>
            </motion.div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-[4/5] w-full rounded-lg" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : collectionProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-foreground-muted">No products in this collection yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {collectionProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
