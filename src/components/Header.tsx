"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Collections", href: "#products" },
  { label: "Our Story", href: "#story" },
  { label: "Reviews", href: "#testimonials" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
};

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/" className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 rounded-full bg-primary"
              />
              <span className="font-serif text-2xl tracking-wide text-foreground">
                LUXE
              </span>
            </Link>
          </motion.div>

          <motion.nav
            variants={container}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center gap-10"
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={item}>
                <Link
                  href={link.href}
                  className="text-sm tracking-wider uppercase text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-primary text-background text-sm tracking-wider uppercase rounded-full hover:bg-primary/90 transition-all"
          >
            Shop Now
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
