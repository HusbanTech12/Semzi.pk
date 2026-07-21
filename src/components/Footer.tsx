"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "./Reveal";

const footerLinks = {
  Shop: ["All Products", "Soaps", "Shampoos", "Gift Sets", "Sale"],
  Company: ["Our Story", "Sustainability", "Blog", "Careers", "Press"],
  Support: ["FAQ", "Shipping", "Returns", "Contact", "Size Guide"],
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <Reveal direction="left" delay={0.1} className="lg:col-span-2 space-y-6">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link href="/" className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 h-8 rounded-full bg-primary-light"
                />
                <span className="font-serif text-2xl tracking-wide">LUXE</span>
              </Link>
            </motion.div>
            <p className="text-background/50 max-w-sm leading-relaxed">
              Handcrafted premium soaps and shampoos made with love and the
              finest natural ingredients nature has to offer.
            </p>
            <div className="flex gap-4">
              {["Instagram", "Twitter", "Pinterest", "TikTok"].map(
                (social, i) => (
                  <motion.div
                    key={social}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      href="#"
                      className="text-sm text-background/40 hover:text-primary-light transition-colors"
                    >
                      {social}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </Reveal>

          {Object.entries(footerLinks).map(([category, links], catIdx) => (
            <Reveal
              key={category}
              direction="right"
              delay={0.2 + catIdx * 0.1}
              className="space-y-4"
            >
              <h4 className="text-sm tracking-wider uppercase text-background/60">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIdx) => (
                  <motion.li
                    key={link}
                    custom={linkIdx}
                    variants={linkVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Link
                      href="#"
                      className="text-sm text-background/70 hover:text-primary-light transition-colors"
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/30">
          <p>&copy; 2026 LUXE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-background/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-background/50 transition-colors">
              Terms of Service
            </Link>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
