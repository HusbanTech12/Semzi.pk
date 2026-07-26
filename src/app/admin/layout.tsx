"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full bg-[#111118] border-r border-white/5">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
            {sidebarOpen && (
              <Link href="/admin" className="flex items-center gap-2">
                <span className="font-serif text-xl italic text-white">Semzi</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium">Admin</span>
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    active
                      ? "text-white bg-white/10"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-xl bg-white/10 border border-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 relative z-10 ${active ? "text-[#C79A56]" : ""}`} />
                  {sidebarOpen && (
                    <span className="relative z-10">{item.label}</span>
                  )}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#C79A56] rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="px-3 py-4 border-t border-white/5">
            <div className={`flex items-center gap-3 px-3 py-2 rounded-xl ${sidebarOpen ? "" : "justify-center"}`}>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.fullName || "Admin"}</p>
                  <p className="text-xs text-white/30 truncate">{user?.emailAddresses?.[0]?.emailAddress}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-[#111118] border-r border-white/5 lg:hidden"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
                <Link href="/admin" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <span className="font-serif text-xl italic text-white">Semzi</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium">Admin</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="px-3 py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
                        active
                          ? "text-white bg-white/10"
                          : "text-white/40 hover:text-white/70 hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? "text-[#C79A56]" : ""}`} />
                      <span>{item.label}</span>
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#C79A56] rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C79A56]/50 focus:ring-1 focus:ring-[#C79A56]/20 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C79A56] rounded-full" />
              </button>
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                View Store
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
