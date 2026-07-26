"use client";

import Link from "next/link";
import { Globe, ChevronRight } from "lucide-react";
import { useAnimations } from "@/lib/animations";
import { motion } from "framer-motion";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Soaps", href: "/shop?category=soaps" },
    { label: "Shampoos", href: "/shop?category=shampoos" },
    { label: "Gift Sets", href: "/shop?category=gift-sets" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Sustainability", href: "/about#sustainability" },
    { label: "Ingredient Glossary", href: "/ingredients" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Contact", href: "/contact" },
    { label: "Size Guide", href: "/size-guide" },
  ],
};

export default function Footer() {
  const { fadeUp } = useAnimations();

  return (
    <footer className="bg-foreground text-background pt-16 lg:pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="grid sm:grid-cols-2 lg:grid-cols-6 gap-12"
        >
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl italic">Semzi</span>
            </Link>
            <p className="text-foreground-muted max-w-sm leading-relaxed text-sm">
              Handmade natural soap crafted in small batches. Nothing harsh.
              Nothing synthetic. Just honest ingredients you can trust.
            </p>

            <div className="space-y-4">
              <p className="text-xs tracking-widest uppercase text-foreground-muted">
                Join the Journal
              </p>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-background placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent/50"
                />
                <button className="px-4 py-2.5 bg-accent text-background rounded-sm hover:bg-accent-strong transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="#" aria-label="Instagram" className="text-xs tracking-widest uppercase text-foreground-muted hover:text-accent transition-colors">
                Instagram
              </Link>
              <Link href="#" aria-label="Twitter" className="text-xs tracking-widest uppercase text-foreground-muted hover:text-accent transition-colors">
                Twitter
              </Link>
              <Link href="#" aria-label="Pinterest" className="text-xs tracking-widest uppercase text-foreground-muted hover:text-accent transition-colors">
                Pinterest
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-xs tracking-widest uppercase text-foreground-muted">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted/80 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp}
          className="mt-16 pt-8 pb-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-foreground-muted/50">
            &copy; 2026 Semzi. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-foreground-muted/50">
            <Link href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
