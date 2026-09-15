"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useAnimations } from "@/lib/animations";
import SemziLogo from "@/components/SemziLogo";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const isHome = pathname === "/";
  const { fadeUp } = useAnimations();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (pathnameRef.current === "/") {
        const hero = document.getElementById("scroll-hero");
        if (hero) {
          setScrolled(hero.getBoundingClientRect().bottom <= 88);
          return;
        }
      }
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const transparent = isHome && !scrolled;
  const frosted = scrolled;

  return (
    <>
      <motion.header
        {...fadeUp}
        className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          transparent
            ? "border-b border-transparent bg-transparent"
            : frosted
              ? "border-b border-border/70 bg-background/70 shadow-[0_10px_40px_-20px_rgba(28,22,18,0.45)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-20 w-full items-center justify-between pl-5 pr-5 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
          <Link href="/" className="group relative shrink-0">
            <SemziLogo
              priority
              surface={transparent ? "onDark" : "onLight"}
              className="transition-all duration-300 group-hover:opacity-90"
            />
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={isSignedIn ? "/shop" : "/sign-up"}
              className={`inline-flex items-center rounded-xl px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 sm:px-5 ${
                transparent
                  ? "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                  : "bg-accent text-background hover:bg-accent-strong"
              }`}
            >
              Get Started
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="site-menu"
              className={`group/menu inline-flex shrink-0 items-center gap-2.5 rounded-full px-2 py-2.5 transition-all duration-300 hover:bg-white/10 sm:px-3 ${
                transparent ? "text-white" : "text-foreground hover:bg-accent/10"
              }`}
            >
              <span className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.2em] sm:inline">
                Menu
              </span>
              <span className="relative flex h-4 w-5 flex-col justify-between" aria-hidden>
                <span className="h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 group-hover/menu:translate-x-0.5" />
                <span className="h-[1.5px] w-3/4 self-end rounded-full bg-current transition-all duration-300 group-hover/menu:w-full" />
                <span className="h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 group-hover/menu:-translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-60 bg-foreground/50 backdrop-blur-sm"
              aria-hidden
            />
            <motion.aside
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed inset-y-0 right-0 z-70 flex w-full max-w-md flex-col overflow-y-auto border-l border-border/50 bg-linear-to-b from-accent-subtle via-background to-background shadow-[-24px_0_80px_-20px_rgba(28,22,18,0.45)]"
            >
              <div className="relative flex h-20 items-center justify-between px-6 lg:px-8">
                <SemziLogo className="h-8 sm:h-9" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full border border-border/80 p-2.5 text-foreground transition-all duration-300 hover:bg-accent/15 hover:text-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="relative flex flex-1 flex-col justify-center px-6 pb-10 lg:px-8" aria-label="Primary">
                <p className="mb-8 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">
                  Navigate
                </p>
                <ul>
                  {[...navLinks, ...(isSignedIn ? [{ label: "Admin", href: "/admin" }] : [])].map(
                    (link, i) => {
                      const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={`group flex items-baseline gap-5 border-b border-border/40 py-5 transition-colors duration-300 ${
                              active ? "text-accent-strong" : "text-foreground hover:text-accent-strong"
                            }`}
                          >
                            <span className="shrink-0 font-mono text-[11px] font-medium tracking-[0.18em] text-foreground-muted/55">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-serif text-2xl font-medium leading-none tracking-tight">
                              {link.label}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    }
                  )}
                </ul>
              </nav>

              <div className="relative border-t border-border/60 px-6 py-6 lg:px-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted/60">
                  Natural soap. Nothing harsh.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
