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
    { label: "Our Ethos", href: "/about" },
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
    <footer className="bg-footer pt-16 text-white lg:pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6"
        >
          <div className="space-y-6 lg:col-span-2">
            <Link href="/" className="group inline-block">
              <SemziLogo
                surface="onDark"
                className="h-9 opacity-100 transition-opacity duration-300 group-hover:opacity-85 sm:h-10"
              />
            </Link>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-white/90">
              Handmade natural soap, crafted with patience and care. Nothing harsh.
              Nothing synthetic. Just honest ingredients you can trust.
            </p>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-white/75">
                Join the Journal
              </p>
              <form
                className="flex max-w-sm gap-2"
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
                  className="flex-1 rounded-sm border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 transition-all duration-300 focus:border-accent focus:outline-none focus:shadow-[0_0_20px_-4px_rgba(199,154,86,0.25)]"
                />
                <motion.button
                  type="submit"
                  aria-label="Subscribe to the journal"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-sm bg-accent px-4 py-2.5 text-footer transition-colors hover:bg-accent-strong"
                >
                  <ChevronRight className="h-4 w-4" />
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-all duration-300 hover:border-accent/50 hover:bg-accent/15 hover:text-accent"
                >
                  <SocialGlyph name={social.name} className="h-4 w-4" />
                </Link>
              ))}
              <Link
                href="/social"
                className="flex h-10 items-center rounded-full border border-white/25 bg-white/10 px-3 text-[10px] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-accent/50 hover:text-accent"
              >
                All
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/70">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative inline-block text-sm font-medium text-white transition-colors duration-300 hover:text-accent"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/20 pb-8 pt-8 sm:flex-row"
        >
          <p className="text-xs text-white/65">
            &copy; 2026 Semzi. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/65">
            <Link href="#" className="group relative transition-colors duration-300 hover:text-accent">
              Privacy Policy
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="#" className="group relative transition-colors duration-300 hover:text-accent">
              Terms of Service
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
