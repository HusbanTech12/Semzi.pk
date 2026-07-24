"use client";

import { useState } from "react";
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
  const { totalItems } = useCart();
  const { fadeUp } = useAnimations();

  return (
    <>
      <motion.header
        {...fadeUp}
        className="fixed top-0 left-0 right-0 z-50 bg-accent backdrop-blur-lg border-b border-accent-strong/30"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="relative group">
              <span className="font-serif text-3xl italic text-background tracking-tight">
                Semzi
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-background/80 group-hover:w-full transition-all duration-300" />
            </Link>

            <nav className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group text-sm tracking-[0.15em] uppercase text-background/70 hover:text-background transition-colors"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-background/80 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                aria-label="Search"
                className="p-2.5 text-background/70 hover:text-background hover:bg-background/10 rounded-full transition-all"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="relative p-2.5 text-background/70 hover:text-background hover:bg-background/10 rounded-full transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-background text-accent text-[9px] font-mono flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
              <div className="hidden md:block w-px h-6 bg-background/20 mx-1" />
              <Link
                href="/sign-in"
                className="hidden md:inline-flex text-sm tracking-[0.15em] uppercase text-background/70 hover:text-background transition-colors"
              >
                Sign In
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 text-background/70 hover:text-background hover:bg-background/10 rounded-full transition-all"
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
              className="border-t border-background/20 bg-accent overflow-hidden"
            >
              <div className="px-6 py-8 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm tracking-[0.15em] uppercase text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-background/20">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm tracking-[0.15em] uppercase text-background/90 hover:text-background transition-colors"
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
