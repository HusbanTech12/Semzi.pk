"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useAnimations } from "@/lib/animations";
import { useCart } from "@/context/cart-context";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections/beach" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { fadeUp } = useAnimations();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        {...fadeUp}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-foreground/5"
            : "bg-transparent border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="relative group">
              <span className={`font-serif text-3xl italic tracking-tight transition-colors duration-300 ${
                scrolled ? "text-foreground" : "text-white"
              }`}>
                Semzi
              </span>
              <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] group-hover:w-full transition-all duration-300 ${
                scrolled ? "bg-foreground/80" : "bg-white/80"
              }`} />
            </Link>

            <nav className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative group text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                    scrolled
                      ? "text-foreground-muted hover:text-foreground"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300 ${
                    scrolled ? "bg-foreground/80" : "bg-white/80"
                  }`} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                aria-label="Search"
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  scrolled
                    ? "text-foreground-muted hover:text-foreground hover:bg-foreground/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className={`relative p-2.5 rounded-full transition-all duration-300 ${
                  scrolled
                    ? "text-foreground-muted hover:text-foreground hover:bg-foreground/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-background text-[9px] font-mono flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
              <div className={`hidden md:block w-px h-6 mx-1 transition-colors duration-300 ${
                scrolled ? "bg-border" : "bg-white/20"
              }`} />
              <Link
                href="/sign-in"
                className={`hidden md:inline-flex text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                  scrolled
                    ? "text-foreground-muted hover:text-foreground"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Sign In
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2.5 rounded-full transition-all duration-300 ${
                  scrolled
                    ? "text-foreground-muted hover:text-foreground hover:bg-foreground/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`border-t overflow-hidden backdrop-blur-xl ${
                scrolled
                  ? "border-border bg-background/95"
                  : "border-white/10 bg-foreground/90"
              }`}
            >
              <div className="px-6 py-8 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                      scrolled
                        ? "text-foreground-muted hover:text-foreground"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className={`pt-4 border-t ${
                  scrolled ? "border-border" : "border-white/10"
                }`}>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                      scrolled ? "text-foreground" : "text-white"
                    }`}
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
