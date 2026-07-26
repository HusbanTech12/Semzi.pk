"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  ShoppingBag,
  Star,
  Mail,
  MoreHorizontal,
  UserPlus,
  Download,
} from "lucide-react";

const customers = [
  { id: 1, name: "Sarah Laurent", email: "sarah@example.com", orders: 12, spent: 28800, lastOrder: "2026-07-26", joined: "2026-01-15", status: "Active", avatar: "SL" },
  { id: 2, name: "James Carter", email: "james@example.com", orders: 8, spent: 30400, lastOrder: "2026-07-25", joined: "2026-02-20", status: "Active", avatar: "JC" },
  { id: 3, name: "Amara Osei", email: "amara@example.com", orders: 15, spent: 42000, lastOrder: "2026-07-24", joined: "2026-01-05", status: "VIP", avatar: "AO" },
  { id: 4, name: "Michael Chen", email: "michael@example.com", orders: 6, spent: 20400, lastOrder: "2026-07-23", joined: "2026-03-10", status: "Active", avatar: "MC" },
  { id: 5, name: "Emma Wilson", email: "emma@example.com", orders: 22, spent: 57200, lastOrder: "2026-07-22", joined: "2025-11-20", status: "VIP", avatar: "EW" },
  { id: 6, name: "David Park", email: "david@example.com", orders: 4, spent: 12800, lastOrder: "2026-07-21", joined: "2026-04-05", status: "Active", avatar: "DP" },
  { id: 7, name: "Sofia Rodriguez", email: "sofia@example.com", orders: 9, spent: 19800, lastOrder: "2026-07-20", joined: "2026-02-28", status: "Active", avatar: "SR" },
  { id: 8, name: "Alex Kim", email: "alex@example.com", orders: 3, spent: 7800, lastOrder: "2026-07-19", joined: "2026-05-12", status: "Inactive", avatar: "AK" },
  { id: 9, name: "Nina Patel", email: "nina@example.com", orders: 18, spent: 43200, lastOrder: "2026-07-18", joined: "2025-12-10", status: "VIP", avatar: "NP" },
  { id: 10, name: "Tom Hardy", email: "tom@example.com", orders: 5, spent: 19000, lastOrder: "2026-07-17", joined: "2026-03-22", status: "Active", avatar: "TH" },
  { id: 11, name: "Lisa Wang", email: "lisa@example.com", orders: 11, spent: 24200, lastOrder: "2026-07-16", joined: "2026-01-28", status: "Active", avatar: "LW" },
  { id: 12, name: "Omar Hassan", email: "omar@example.com", orders: 7, spent: 21000, lastOrder: "2026-07-15", joined: "2026-02-14", status: "Active", avatar: "OH" },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  VIP: "bg-[#C79A56]/10 text-[#C79A56] border-[#C79A56]/20",
  Inactive: "bg-white/5 text-white/40 border-white/10",
};

const avatarColors = [
  "bg-blue-500/20 text-blue-400",
  "bg-purple-500/20 text-purple-400",
  "bg-amber-500/20 text-amber-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-rose-500/20 text-rose-400",
  "bg-cyan-500/20 text-cyan-400",
];

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = customers.reduce((sum, c) => sum + c.spent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.orders, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Customers</h1>
          <p className="text-sm text-white/40 mt-1">Manage your customer relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#C79A56] text-white text-sm font-medium rounded-xl hover:bg-[#A47C3B] transition-all">
            <UserPlus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#111118] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#C79A56]/10">
              <Users className="w-5 h-5 text-[#C79A56]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{customers.length}</p>
              <p className="text-xs text-white/30">Total Customers</p>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#111118] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{customers.filter(c => c.status === "VIP").length}</p>
              <p className="text-xs text-white/30">VIP Customers</p>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#111118] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10">
              <Star className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">${(avgOrderValue / 100).toFixed(0)}</p>
              <p className="text-xs text-white/30">Avg. Order Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C79A56]/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Active", "VIP", "Inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === status
                  ? "bg-[#C79A56]/20 text-[#C79A56] border border-[#C79A56]/30"
                  : "bg-white/5 text-white/40 border border-white/10 hover:text-white/60"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl bg-[#111118] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden md:table-cell">Orders</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden sm:table-cell">Total Spent</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden lg:table-cell">Last Order</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer, idx) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold ${avatarColors[idx % avatarColors.length]}`}>
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{customer.name}</p>
                        <p className="text-xs text-white/30">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-white/60">{customer.orders}</span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-sm font-mono text-white">${(customer.spent / 100).toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-white/40">{customer.lastOrder}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium border ${statusColors[customer.status]}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
