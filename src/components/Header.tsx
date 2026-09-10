"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, User, Settings, LogOut, LayoutDashboard, Package } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useAnimations } from "@/lib/animations";
import { useCart } from "@/context/cart-context";
import CartDrawer from "@/components/CartDrawer";

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
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
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
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

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
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          transparent
            ? "border-accent/30 bg-linear-to-r from-foreground/40 via-accent-strong/35 to-foreground/40 shadow-[0_12px_48px_-8px_rgba(201,163,107,0.55),0_0_60px_-10px_rgba(201,163,107,0.45)] backdrop-blur-md"
            : "border-accent/25 bg-linear-to-r from-background via-accent-subtle/80 to-background shadow-[0_16px_50px_-10px_rgba(201,163,107,0.5),0_0_70px_-12px_rgba(142,106,56,0.35)] backdrop-blur-xl"
        }`}
      >
        {/* Heavy ambient gold glow layers */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 -top-8 h-24 bg-[radial-gradient(ellipse_at_center,rgba(201,163,107,0.55)_0%,transparent_70%)] blur-2xl" />
          <div className="absolute left-1/4 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,163,107,0.28)_0%,transparent_75%)] blur-xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent to-transparent shadow-[0_0_20px_4px_rgba(201,163,107,0.8)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="group relative">
              <span
                className={`font-serif text-3xl italic font-bold tracking-tight transition-all duration-300 ${
                  transparent
                    ? "bg-linear-to-r from-white via-accent-subtle to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(201,163,107,0.85)]"
                    : "bg-linear-to-r from-foreground via-accent-strong to-foreground bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(201,163,107,0.65)]"
                } group-hover:drop-shadow-[0_0_28px_rgba(201,163,107,1)]`}
              >
                Semzi
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full ${
                  transparent
                    ? "bg-linear-to-r from-white/40 via-accent to-white/40 shadow-[0_0_12px_2px_rgba(201,163,107,0.9)]"
                    : "bg-linear-to-r from-accent-subtle via-accent to-accent-strong shadow-[0_0_12px_2px_rgba(201,163,107,0.9)]"
                }`}
              />
            </Link>

            <nav className="hidden items-center gap-12 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(201,163,107,0.9)] ${
                    transparent
                      ? "text-white/80 hover:text-white"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-linear-to-r from-accent-subtle via-accent to-accent-strong shadow-[0_0_10px_2px_rgba(201,163,107,0.85)] transition-all duration-300 group-hover:w-full" />
                  <span className="absolute -bottom-1 left-1/2 h-2 w-0 -translate-x-1/2 rounded-full bg-accent opacity-0 blur-md transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                </Link>
              ))}
              {isSignedIn && (
                <Link
                  href="/admin"
                  className={`group relative text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(201,163,107,0.9)] ${
                    transparent
                      ? "text-white/80 hover:text-white"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  Admin
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-linear-to-r from-accent-subtle via-accent to-accent-strong shadow-[0_0_10px_2px_rgba(201,163,107,0.85)] transition-all duration-300 group-hover:w-full" />
                  <span className="absolute -bottom-1 left-1/2 h-2 w-0 -translate-x-1/2 rounded-full bg-accent opacity-0 blur-md transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-3">
              <button
                aria-label="Search"
                className={`rounded-full p-2.5 transition-all duration-300 hover:bg-accent/15 hover:text-accent hover:shadow-[0_0_24px_4px_rgba(201,163,107,0.55)] ${
                  transparent ? "text-white/85" : "text-foreground-muted"
                }`}
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className={`relative rounded-full p-2.5 transition-all duration-300 hover:bg-accent/15 hover:text-accent hover:shadow-[0_0_24px_4px_rgba(201,163,107,0.55)] ${
                  transparent ? "text-white/85" : "text-foreground-muted"
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-strong font-mono text-[9px] font-medium text-background shadow-[0_0_14px_3px_rgba(201,163,107,0.85)]">
                    {totalItems}
                  </span>
                )}
              </button>
              <div
                className={`mx-1 hidden h-6 w-px transition-colors duration-300 md:block ${
                  transparent ? "bg-white/25" : "bg-border"
                }`}
              />

              {isSignedIn ? (
                /* Profile Icon + Dropdown */
                <div ref={profileRef} className="relative hidden md:block">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`rounded-full p-2.5 transition-all duration-300 hover:bg-accent/15 hover:text-accent hover:shadow-[0_0_24px_4px_rgba(201,163,107,0.55)] ${
                      transparent ? "text-white/85" : "text-foreground-muted"
                    }`}
                    aria-label="Profile"
                  >
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt=""
                        className="w-5 h-5 rounded-full object-cover ring-2 ring-accent/30"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 top-full mt-3 w-56 rounded-2xl bg-surface border border-border shadow-xl shadow-foreground/10 overflow-hidden"
                      >
                        {/* User Info */}
                        <div className="px-5 py-4 border-b border-border">
                          <p className="text-sm font-medium text-foreground truncate">
                            {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "Account"}
                          </p>
                          <p className="text-xs text-foreground-muted truncate mt-0.5">
                            {user?.emailAddresses?.[0]?.emailAddress || ""}
                          </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {profileMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-5 py-2.5 text-sm text-foreground-muted hover:text-foreground hover:bg-accent-subtle transition-colors duration-200"
                              >
                                <Icon className="w-4 h-4" />
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>

                        {/* Sign Out */}
                        <div className="border-t border-border py-2">
                          <button
                            onClick={() => {
                              setProfileOpen(false);
                              signOut({ redirectUrl: "/" });
                            }}
                            className="flex items-center gap-3 w-full px-5 py-2.5 text-sm text-foreground-muted hover:text-destructive hover:bg-destructive/5 transition-colors duration-200"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className={`relative group hidden text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 md:inline-flex ${
                    transparent ? "text-white/80 hover:text-white" : "text-foreground-muted hover:text-accent"
                  }`}
                >
                  Sign In
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-linear-to-r from-accent-subtle via-accent to-accent-strong transition-all duration-300 group-hover:w-full" />
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`rounded-full p-2.5 transition-all duration-300 hover:bg-accent/15 hover:text-accent hover:shadow-[0_0_24px_4px_rgba(201,163,107,0.55)] md:hidden ${
                  transparent ? "text-white/85" : "text-foreground-muted"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-border/60 bg-linear-to-b from-accent-subtle/50 via-background to-background backdrop-blur-xl"
            >
              <div className="px-6 py-8 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm tracking-[0.15em] uppercase transition-colors duration-300 text-foreground-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                {isSignedIn && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm tracking-[0.15em] uppercase transition-colors duration-300 text-foreground-muted hover:text-foreground"
                  >
                    Admin
                  </Link>
                )}

                <div className="pt-4 border-t border-border space-y-1">
                  {isSignedIn ? (
                    <>
                      {/* Mobile Profile Info */}
                      <div className="flex items-center gap-3 pb-3 mb-2">
                        {user?.imageUrl ? (
                          <img src={user.imageUrl} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-accent/30" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-accent" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {user?.firstName || "Account"}
                          </p>
                          <p className="text-xs text-foreground-muted truncate max-w-45">
                            {user?.emailAddresses?.[0]?.emailAddress || ""}
                          </p>
                        </div>
                      </div>

                      {profileMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 py-2.5 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                          >
                            <Icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          signOut({ redirectUrl: "/" });
                        }}
                        className="flex items-center gap-3 py-2.5 text-sm text-foreground-muted hover:text-destructive transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileOpen(false)}
                      className={`block text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                        transparent ? "text-white" : "text-foreground"
                      }`}
                    >
                      Sign In
                    </Link>
                  )}
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
