"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { totalItems } = useCart();
  const { fadeUp } = useAnimations();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        {...fadeUp}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent
            ? "bg-transparent border-b border-white/10"
            : "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-foreground/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="relative group">
              <span className={`font-serif text-3xl italic tracking-tight transition-colors duration-300 ${
                transparent ? "text-white" : "text-foreground"
              }`}>
                Semzi
              </span>
              <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] group-hover:w-full transition-all duration-300 ${
                transparent ? "bg-white/80" : "bg-foreground/80"
              }`} />
            </Link>

            <nav className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative group text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                    transparent
                      ? "text-white/70 hover:text-white"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full group-hover:w-full transition-all duration-300 bg-accent`} />
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[4px] blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-accent`} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                aria-label="Search"
                className={`p-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_16px_-2px_rgba(199,154,86,0.4)] ${
                  transparent
                    ? "text-white/70 hover:text-accent hover:bg-accent/10"
                    : "text-foreground-muted hover:text-accent hover:bg-accent/10"
                }`}
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className={`relative p-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_16px_-2px_rgba(199,154,86,0.4)] ${
                  transparent
                    ? "text-white/70 hover:text-accent hover:bg-accent/10"
                    : "text-foreground-muted hover:text-accent hover:bg-accent/10"
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
                transparent ? "bg-white/20" : "bg-border"
              }`} />
              <Link
                href="/sign-in"
                className={`hidden md:inline-flex text-sm tracking-[0.15em] uppercase transition-all duration-300 relative group ${
                  transparent
                    ? "text-white/70 hover:text-white"
                    : "text-foreground-muted hover:text-accent"
                }`}
              >
                Sign In
                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] rounded-full group-hover:w-full transition-all duration-300 bg-accent`} />
                <span className={`absolute -bottom-1 left-0 w-0 h-[4px] blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-accent`} />
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_16px_-2px_rgba(199,154,86,0.4)] ${
                  transparent
                    ? "text-white/70 hover:text-accent hover:bg-accent/10"
                    : "text-foreground-muted hover:text-accent hover:bg-accent/10"
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
                transparent
                  ? "border-white/10 bg-foreground/90"
                  : "border-border bg-background/95"
              }`}
            >
              <div className="px-6 py-8 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                      transparent
                        ? "text-white/70 hover:text-white"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className={`pt-4 border-t ${
                  transparent ? "border-white/10" : "border-border"
                }`}>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                      transparent ? "text-white" : "text-foreground"
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
