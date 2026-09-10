"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, X, User, Settings, LogOut, LayoutDashboard, Package } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useAnimations } from "@/lib/animations";
import { useCart } from "@/context/cart-context";
import CartDrawer from "@/components/CartDrawer";
import SemziLogo from "@/components/SemziLogo";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const isHome = pathname === "/";
  const { totalItems } = useCart();
  const { fadeUp } = useAnimations();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      if (pathnameRef.current === "/") {
        const hero = document.getElementById("scroll-hero");
        if (hero) {
          setScrolled(hero.getBoundingClientRect().bottom <= 88);
          return;
        }
      }
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const profileMenuItems = [
    { label: "Profile", href: "/account", icon: User },
    { label: "My Orders", href: "/account", icon: Package },
    ...(isSignedIn ? [{ label: "Admin Panel", href: "/admin", icon: LayoutDashboard }] : []),
    { label: "Settings", href: "/account", icon: Settings },
  ];

  return (
    <>
      <motion.header
        {...fadeUp}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      >
        <div className="flex h-20 w-full items-center justify-between pl-5 pr-5 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
          <Link href="/" className="group relative shrink-0">
            <SemziLogo
              priority
              surface={transparent ? "onDark" : "onLight"}
              className="transition-all duration-300 group-hover:opacity-90"
            />
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

              <div className="relative space-y-3 border-t border-border/60 px-6 py-6 lg:px-8">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setCartOpen(true);
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-border/70 bg-surface px-4 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50"
                >
                  <span className="inline-flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-accent" />
                    Cart
                  </span>
                  {totalItems > 0 && (
                    <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-bold text-background">
                      {totalItems}
                    </span>
                  )}
                </button>

                {isSignedIn ? (
                  <>
                    <div className="mb-1 flex items-center gap-3 pt-2">
                      {user?.imageUrl ? (
                        <img src={user.imageUrl} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/30" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                          <User className="h-4 w-4 text-accent" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {user?.firstName || "Account"}
                        </p>
                        <p className="truncate text-xs text-foreground-muted">
                          {user?.emailAddresses?.[0]?.emailAddress || ""}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {profileMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 rounded-lg border border-border/70 bg-surface px-3 py-2.5 text-xs font-semibold text-foreground-muted transition-colors duration-200 hover:border-accent/50 hover:text-foreground"
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => {
                          setMobileOpen(false);
                          signOut({ redirectUrl: "/" });
                        }}
                        className="flex items-center gap-2 rounded-lg border border-border/70 bg-surface px-3 py-2.5 text-xs font-semibold text-foreground-muted transition-colors duration-200 hover:border-destructive/40 hover:text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-background transition-colors duration-300 hover:bg-accent hover:text-foreground"
                  >
                    <User className="h-4 w-4" />
                    Sign In / Create Account
                  </Link>
                )}

                <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted/60">
                  Natural soap. Nothing harsh.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
