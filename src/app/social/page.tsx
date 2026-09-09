"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SocialGlyph from "@/components/SocialGlyph";
import { socialPlatforms } from "@/lib/social";
import { useAnimations } from "@/lib/animations";

export default function SocialPage() {
  const { fadeUp, cardHover } = useAnimations();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Community</p>
              <h1 className="font-serif text-4xl text-foreground md:text-5xl">
                Find Semzi everywhere
              </h1>
              <p className="text-foreground-muted">
                Follow the pour, ask about a bar, or share a ritual. Every platform below
                opens in a new tab.
              </p>
            </Reveal>

            <motion.div
              {...fadeUp}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {socialPlatforms.map((platform, index) => (
                <motion.div key={platform.name} {...cardHover} transition={{ delay: index * 0.04 }}>
                  <Link
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-surface p-6 shadow-[0_18px_40px_-18px_rgba(43,33,24,0.12)] transition-colors hover:border-accent/40"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle text-accent-strong transition-colors group-hover:bg-accent group-hover:text-background">
                      <SocialGlyph name={platform.name} />
                    </span>
                    <div className="space-y-1">
                      <h2 className="font-serif text-xl text-foreground">{platform.name}</h2>
                      <p className="text-xs uppercase tracking-[0.16em] text-accent">
                        {platform.handle}
                      </p>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-foreground-muted">
                      {platform.description}
                    </p>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted transition-colors group-hover:text-accent-strong">
                      Visit {platform.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <Reveal delay={0.15} className="mx-auto mt-20 max-w-md space-y-5 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Scan</p>
              <h2 className="font-serif text-3xl text-foreground">Share this page</h2>
              <p className="text-sm text-foreground-muted">
                Opens the Semzi social page — Instagram, Facebook, X, WhatsApp, and more.
              </p>
              <div className="mx-auto w-fit rounded-2xl border border-border bg-surface p-6">
                <Image
                  src="/qrcodes/social.png"
                  alt="QR code linking to the Semzi social page"
                  width={280}
                  height={280}
                  className="h-auto w-[220px] sm:w-[280px]"
                />
              </div>
              <p className="font-mono text-xs text-foreground-muted">
                semzi-pk.vercel.app/social
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
