"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import CollectionBanner from "@/components/CollectionBanner";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  getCollectionBySlug,
  getProductsByCollection,
  collections,
} from "@/lib/products";

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = getProductsByCollection(slug);
  const otherCollections = collections.filter((c) => c.slug !== slug);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <CollectionBanner
          name={collection.name}
          tagline={collection.tagline}
          imageUrl={collection.heroImageUrl}
          href="/shop"
        />

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <Reveal className="mb-12 space-y-4 text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-muted transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Collections
            </Link>
            <p className="text-sm tracking-[0.2em] uppercase text-accent">
              {collection.name}
            </p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">
              {collection.tagline}
            </h2>
            <p className="mx-auto max-w-2xl text-foreground-muted">
              {collection.description}
            </p>
          </Reveal>

          {collectionProducts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-foreground-muted">
                No products in this collection yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
              {collectionProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={i < 3}
                />
              ))}
            </div>
          )}

          {otherCollections.length > 0 && (
            <div className="mt-20 border-t border-border/50 pt-16">
              <Reveal className="mb-8 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  Continue Exploring
                </p>
                <h3 className="mt-2 font-serif text-2xl text-foreground">
                  Other Collections
                </h3>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherCollections.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/collections/${item.slug}`}
                    className="rounded-2xl border border-border/70 bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-md hover:shadow-foreground/5"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      Collection
                    </p>
                    <p className="mt-2 font-serif text-xl text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {item.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
