"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { useAnimations } from "@/lib/animations";
import { Leaf, Heart, Users, Droplets } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description: "Every ingredient is chosen for its purity and efficacy. No synthetic additives, no shortcuts.",
  },
  {
    icon: Heart,
    title: "Handmade in Small Batches",
    description: "Each batch is handcrafted with care. Small batches mean better quality and attention to detail.",
  },
  {
    icon: Users,
    title: "Full Transparency",
    description: "We publish every ingredient following INCI standards. You deserve to know exactly what goes on your skin.",
  },
  {
    icon: Droplets,
    title: "Cruelty-Free & Eco-Conscious",
    description: "Never tested on animals. Our packaging is biodegradable and made from recycled materials.",
  },
];

export default function AboutPage() {
  const { fadeUp } = useAnimations();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal direction="left">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1607006483224-73ce0729e22a?w=800&q=80"
                    alt="Handmade soap crafting"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
              <Reveal direction="right" className="space-y-6">
                <p className="text-xs tracking-[0.2em] uppercase text-accent">
                  Our Story
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground">
                  Natural Soap.
                  <br />
                  <span className="text-accent">Nothing Harsh.</span>
                </h1>
                <div className="space-y-4 text-foreground-muted leading-relaxed">
                  <p>
                    Semzi was born from a simple belief: your skin deserves better. 
                    In a world of chemical-laden products and misleading labels, we 
                    wanted to create something honest.
                  </p>
                  <p>
                    Every bar and bottle is crafted in small batches using time-honored 
                    techniques. We source the finest natural ingredients and formulate 
                    each product to nourish your skin without compromise.
                  </p>
                  <p>
                    Our name comes from the coast — where salt, sun, and botanicals 
                    come together in perfect harmony. It&apos;s a reminder that the 
                    best things in life are natural.
                  </p>
                </div>
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="font-serif text-3xl text-accent">50+</p>
                    <p className="text-xs text-foreground-muted">Natural Ingredients</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl text-accent">10K+</p>
                    <p className="text-xs text-foreground-muted">Happy Customers</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl text-accent">100%</p>
                    <p className="text-xs text-foreground-muted">Cruelty-Free</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface-muted">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal className="text-center mb-16 space-y-4">
              <p className="text-xs tracking-[0.2em] uppercase text-accent">
                Our Values
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                What We Stand For
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Reveal key={value.title}>
                    <div className="text-center space-y-4 p-8 rounded-lg bg-surface border border-border/50 hover:border-accent/30 hover:shadow-[0_8px_40px_-8px_rgba(199,154,86,0.15)] transition-all duration-500 group">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-subtle text-accent group-hover:bg-accent/15 group-hover:shadow-[0_0_24px_-2px_rgba(199,154,86,0.35)] transition-all duration-500">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg text-foreground group-hover:text-accent-strong transition-colors duration-300">{value.title}</h3>
                      <p className="text-sm text-foreground-muted leading-relaxed">{value.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center space-y-8">
            <Reveal>
              <p className="text-xs tracking-[0.2em] uppercase text-accent">
                Our Process
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Made by Hand, With Purpose
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 text-left">
                {[
                  { step: "01", title: "Source", desc: "We source organic botanicals and essential oils from trusted partners who share our commitment to quality and sustainability." },
                  { step: "02", title: "Craft", desc: "Each batch is hand-mixed and poured in small quantities. No automation — just skilled craftsmanship passed down through generations." },
                  { step: "03", title: "Cure", desc: "Our soaps are cured for 4-6 weeks to develop the perfect bar — hard, long-lasting, and gentle on skin." },
                  { step: "04", title: "Pack", desc: "Every product is wrapped in biodegradable, recycled packaging that reflects the care inside. Ready to gift or enjoy." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start">
                    <span className="font-mono text-accent text-lg shrink-0">{item.step}</span>
                    <div>
                      <h3 className="font-serif text-lg text-foreground">{item.title}</h3>
                      <p className="text-sm text-foreground-muted mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-24 bg-foreground text-background">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center space-y-8">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl">Ready to Try?</h2>
              <p className="text-foreground-muted">Experience the difference of truly natural skincare.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/shop"
                className="inline-block px-10 py-4 bg-accent text-background text-sm tracking-wider uppercase rounded-lg hover:bg-accent-strong transition-all"
              >
                Shop the Collection
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
