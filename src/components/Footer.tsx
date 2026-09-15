"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAnimations } from "@/lib/animations";
import { socialPlatforms } from "@/lib/social";
import SocialGlyph from "@/components/SocialGlyph";
import SemziLogo from "@/components/SemziLogo";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Our Collections", href: "/collections" },
    { label: "Hydrating Glycerin Bars", href: "/collections/hydrating-glycerin-bars" },
    { label: "Hair Rituals", href: "/collections/hair-rituals" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Social", href: "/social" },
    { label: "Botanical Edits", href: "/collections/botanical-edits" },
    { label: "Radiance Cream Soap", href: "/collections/radiance-cream-soap" },
    { label: "Contact", href: "/contact" },
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
            <Link href="/" className="inline-block group">
              <SemziLogo
                surface="onDark"
                className="h-9 opacity-95 transition-opacity duration-300 group-hover:opacity-80 sm:h-10"
              />
            </Link>
            <p className="text-foreground-muted max-w-sm leading-relaxed text-sm font-medium">
              Handmade natural soap, crafted with patience and care. Nothing harsh.
              Nothing synthetic. Just honest ingredients you can trust.
            </p>

            <div className="space-y-4">
              <p className="text-xs tracking-widest uppercase text-foreground-muted font-bold">
                Join the Journal
              </p>
              <form
                className="flex gap-2 max-w-sm"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-background placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_-4px_rgba(199,154,86,0.2)] transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  aria-label="Subscribe to the journal"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 bg-accent text-background rounded-sm hover:bg-accent-strong transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </form>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialPlatforms.slice(0, 4).map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground-muted transition-all duration-300 hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                >
                  <SocialGlyph name={social.name} className="h-4 w-4" />
                </Link>
              ))}
              <Link
                href="/social"
                className="flex h-10 items-center rounded-full border border-white/10 bg-white/5 px-3 text-[10px] uppercase tracking-[0.16em] text-foreground-muted transition-all duration-300 hover:border-accent/30 hover:text-accent"
              >
                All
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-xs tracking-widest uppercase text-foreground-muted font-bold">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted/80 hover:text-accent transition-colors duration-300 relative group inline-block"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
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
            <Link href="#" className="hover:text-accent transition-colors duration-300 relative group">
              Privacy Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#" className="hover:text-accent transition-colors duration-300 relative group">
              Terms of Service
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
