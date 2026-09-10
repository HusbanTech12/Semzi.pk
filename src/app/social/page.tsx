"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SocialGlyph from "@/components/SocialGlyph";
import { socialPlatforms } from "@/lib/social";
import { useAnimations } from "@/lib/animations";

export default function SocialPage() {
  const { fadeUp } = useAnimations();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <Reveal className="mb-12 space-y-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Community
              </p>
              <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
                Find Semzi everywhere
              </h1>
              <p className="text-foreground-muted font-medium">
                Follow the pour, ask about a bar, or share a ritual. Every link
                opens in a new tab.
              </p>
            </Reveal>

            <motion.ul {...fadeUp} className="flex flex-col gap-3">
              {socialPlatforms.map((platform) => (
                <li key={platform.name}>
                  <Link
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-surface px-4 py-4 transition-all hover:border-accent/40 hover:bg-accent-subtle/40 sm:gap-5 sm:px-6 sm:py-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent-strong transition-colors group-hover:bg-accent group-hover:text-background sm:h-12 sm:w-12">
                      <SocialGlyph name={platform.name} className="h-5 w-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <h2 className="font-serif text-lg font-bold text-foreground sm:text-xl">
                          {platform.name}
                        </h2>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                          {platform.handle}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-foreground-muted sm:whitespace-normal">
                        {platform.description}
                      </p>
                    </div>

                    <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-strong" />
                  </Link>
                </li>
              ))}
            </motion.ul>

            <Reveal delay={0.15} className="mx-auto mt-20 max-w-md space-y-5 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Scan
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Share this page
              </h2>
              <p className="text-sm font-medium text-foreground-muted">
                Opens the Semzi social page — Instagram, Facebook, X, WhatsApp,
                and more.
              </p>
              <div className="mx-auto w-fit rounded-2xl border border-border bg-surface p-6">
                <Image
                  src="/qrcodes/social.png"
                  alt="QR code linking to the Semzi social page"
                  width={280}
                  height={280}
                  className="h-auto w-55 sm:w-70"
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
