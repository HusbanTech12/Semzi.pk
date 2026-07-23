"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, MapPin, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { useAnimations } from "@/lib/animations";

const recentOrders = [
  { id: "SEMZI-XK4M9P", date: "July 15, 2026", status: "Shipped", total: "$48.00", items: 2 },
  { id: "SEMZI-AB2C7Q", date: "June 28, 2026", status: "Delivered", total: "$34.00", items: 1 },
];

export default function AccountPage() {
  const { fadeUp } = useAnimations();

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-full bg-accent-subtle flex items-center justify-center">
              <User className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="font-serif text-2xl text-foreground">My Account</h1>
              <p className="text-sm text-foreground-muted">Manage your orders and profile</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl text-foreground">Order History</h2>
                  <span className="text-xs text-foreground-muted">{recentOrders.length} orders</span>
                </div>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-16 border border-border rounded-lg">
                    <Package className="w-12 h-12 mx-auto text-foreground-muted/30 mb-4" />
                    <p className="text-foreground-muted text-sm">No orders yet</p>
                    <Link
                      href="/shop"
                      className="inline-block mt-4 px-6 py-2 bg-accent text-background text-sm tracking-wider uppercase rounded-lg"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="space-y-1">
                          <p className="font-mono text-xs text-foreground-muted">{order.id}</p>
                          <p className="text-sm text-foreground">{order.date}</p>
                          <div className="flex items-center gap-3">
                            <span className={[
                              "text-xs px-2 py-0.5 rounded-full",
                              order.status === "Shipped" ? "bg-accent-subtle text-accent-strong" : "bg-success/10 text-success",
                            ].join(" ")}>
                              {order.status}
                            </span>
                            <span className="text-xs text-foreground-muted">{order.items} items</span>
                            <span className="font-mono text-xs">{order.total}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-foreground-muted" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="font-serif text-base text-foreground">Saved Addresses</h3>
                </div>
                <p className="text-sm text-foreground-muted">No addresses saved yet.</p>
                <button className="text-xs tracking-wider uppercase text-accent hover:text-accent-strong transition-colors">
                  + Add Address
                </button>
              </div>

              <div className="border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-accent" />
                  <h3 className="font-serif text-base text-foreground">Profile</h3>
                </div>
                <p className="text-sm text-foreground-muted">
                  Manage your account details and preferences.
                </p>
                <button className="text-xs tracking-wider uppercase text-accent hover:text-accent-strong transition-colors">
                  Edit Profile
                </button>
              </div>

              <Link
                href="/shop"
                className="block w-full text-center py-3 border border-border text-foreground-muted text-sm tracking-wider uppercase rounded-lg hover:text-foreground transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
