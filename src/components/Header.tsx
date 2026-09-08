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
  { label: "Collections", href: "/collections/beach" },
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
  const isHome = pathname === "/";
  const { totalItems } = useCart();
  const { fadeUp } = useAnimations();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
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
              {isSignedIn && (
                <Link
                  href="/admin"
                  className={`relative group text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                    transparent
                      ? "text-white/70 hover:text-white"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  Admin
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full group-hover:w-full transition-all duration-300 bg-accent`} />
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[4px] blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-accent`} />
                </Link>
              )}
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

              {isSignedIn ? (
                /* Profile Icon + Dropdown */
                <div ref={profileRef} className="hidden md:block relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`p-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_16px_-2px_rgba(199,154,86,0.4)] ${
                      transparent
                        ? "text-white/70 hover:text-accent hover:bg-accent/10"
                        : "text-foreground-muted hover:text-accent hover:bg-accent/10"
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
              )}

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

        {/* Mobile Drawer */}
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
                {isSignedIn && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                      transparent ? "text-white/70 hover:text-white" : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    Admin
                  </Link>
                )}

                <div className={`pt-4 border-t space-y-1 ${
                  transparent ? "border-white/10" : "border-border"
                }`}>
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
                          <p className="text-xs text-foreground-muted truncate max-w-[180px]">
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
