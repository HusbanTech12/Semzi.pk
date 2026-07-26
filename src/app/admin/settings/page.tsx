"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Store,
  Bell,
  Shield,
  CreditCard,
  Truck,
  Mail,
  Globe,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

const sections = [
  { id: "general", label: "General", icon: Store },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "shipping", label: "Shipping", icon: Truck },
];

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-white">Settings</h1>
          <p className="text-sm text-white/40 mt-1">Configure your store settings</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C79A56] text-white text-sm font-medium rounded-xl hover:bg-[#A47C3B] transition-all shadow-[0_0_20px_-4px_rgba(199,154,86,0.4)]"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? "text-white bg-white/10"
                      : "text-white/40 hover:text-white/60 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeSection === section.id ? "text-[#C79A56]" : ""}`} />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-4">
          {activeSection === "general" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#111118] border border-white/5 space-y-6"
            >
              <h3 className="text-lg font-medium text-white">General Settings</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Store Name</label>
                  <input
                    type="text"
                    defaultValue="Semzi"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Store URL</label>
                  <input
                    type="text"
                    defaultValue="https://semzi.pk"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="hello@semzi.pk"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Currency</label>
                  <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C79A56]/50 transition-all">
                    <option>PKR (₨)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-wider">Store Description</label>
                <textarea
                  rows={3}
                  defaultValue="Handmade natural soap crafted in small batches. Full INCI ingredient transparency, seasonal collections, and gift-worthy packaging."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C79A56]/50 transition-all resize-none"
                />
              </div>
            </motion.div>
          )}

          {activeSection === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#111118] border border-white/5 space-y-6"
            >
              <h3 className="text-lg font-medium text-white">Notification Settings</h3>
              <div className="space-y-4">
                {[
                  { label: "New Order Notifications", description: "Get notified when a new order is placed", enabled: true },
                  { label: "Low Stock Alerts", description: "Alert when product inventory is low", enabled: true },
                  { label: "Customer Reviews", description: "Notify when a customer leaves a review", enabled: false },
                  { label: "Weekly Sales Report", description: "Receive a weekly summary of sales", enabled: true },
                  { label: "Marketing Emails", description: "Product updates and promotional content", enabled: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div>
                      <p className="text-sm text-white">{item.label}</p>
                      <p className="text-xs text-white/30 mt-0.5">{item.description}</p>
                    </div>
                    <button className={`relative w-11 h-6 rounded-full transition-colors ${item.enabled ? "bg-[#C79A56]" : "bg-white/10"}`}>
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${item.enabled ? "left-6" : "left-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#111118] border border-white/5 space-y-6"
            >
              <h3 className="text-lg font-medium text-white">Security Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Admin Email</label>
                  <input
                    type="email"
                    defaultValue="admin@semzi.pk"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  />
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-sm text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-white/30">Secured via Clerk</p>
                    </div>
                    <span className="ml-auto px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-medium">
                      Enabled
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#C79A56]" />
                    <div>
                      <p className="text-sm text-white">API Keys</p>
                      <p className="text-xs text-white/30">Manage your API keys for integrations</p>
                    </div>
                    <button className="ml-auto px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 hover:text-white transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "payments" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#111118] border border-white/5 space-y-6"
            >
              <h3 className="text-lg font-medium text-white">Payment Settings</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#C79A56]" />
                    <div>
                      <p className="text-sm text-white">Stripe</p>
                      <p className="text-xs text-white/30">Accept credit cards and digital wallets</p>
                    </div>
                    <span className="ml-auto px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-medium">
                      Connected
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-white/30" />
                    <div>
                      <p className="text-sm text-white">Cash on Delivery</p>
                      <p className="text-xs text-white/30">Accept cash payments on delivery</p>
                    </div>
                    <button className={`ml-auto relative w-11 h-6 rounded-full bg-[#C79A56]`}>
                      <span className="absolute top-1 left-6 w-4 h-4 rounded-full bg-white transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "shipping" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#111118] border border-white/5 space-y-6"
            >
              <h3 className="text-lg font-medium text-white">Shipping Settings</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Free Shipping Threshold</label>
                  <input
                    type="number"
                    defaultValue="5000"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  />
                  <p className="text-[10px] text-white/20">In cents (5000 = ₨50)</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Standard Shipping Rate</label>
                  <input
                    type="number"
                    defaultValue="2000"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  />
                  <p className="text-[10px] text-white/20">In cents (2000 = ₨20)</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#C79A56]" />
                  <div>
                    <p className="text-sm text-white">Shipping Zones</p>
                    <p className="text-xs text-white/30">Pakistan nationwide delivery</p>
                  </div>
                  <button className="ml-auto px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 hover:text-white transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
