"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  ShoppingBag,
  Star,
  Mail,
  MoreHorizontal,
  Download,
} from "lucide-react";

type AdminCustomer = {
  userId: string;
  orderCount: number;
  totalSpent: number;
  lastOrder: string;
};

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

function getStatus(c: AdminCustomer): string {
  if (c.orderCount >= 10) return "VIP";
  if (c.orderCount >= 3) return "Active";
  return "Inactive";
}

function getInitials(userId: string): string {
  const parts = userId.split("_");
  if (parts.length > 1) return parts.map((p) => p[0]?.toUpperCase() ?? "").join("").slice(0, 2);
  return userId.slice(0, 2).toUpperCase();
}

function formatPrice(cents: number): string {
  return `Rs. ${(cents / 100).toLocaleString("en-PK")}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function exportCSV(customers: AdminCustomer[]) {
  const header = "User ID,Orders,Total Spent,Last Order,Status\n";
  const rows = customers
    .map((c) => `${c.userId},${c.orderCount},${c.totalSpent / 100},${c.lastOrder},${getStatus(c)}`)
    .join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "customers.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function SkeletonRow() {
  return (
    <tr className="border-b border-white/5 last:border-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-28 bg-white/5 rounded animate-pulse" />
            <div className="h-2.5 w-36 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 hidden md:table-cell">
        <div className="h-3.5 w-8 bg-white/5 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 hidden sm:table-cell">
        <div className="h-3.5 w-20 bg-white/5 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 hidden lg:table-cell">
        <div className="h-3.5 w-24 bg-white/5 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4">
        <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse" />
      </td>
      <td className="px-6 py-4" />
    </tr>
  );
}

function SkeletonCard() {
  return (
    <div className="p-5 rounded-2xl bg-[#111118] border border-white/5">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-white/5 w-10 h-10 animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-6 w-14 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/customers");
      const data = await res.json();
      setCustomers(data.customers ?? []);
    } catch {
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filtered = customers.filter((c) => {
    const matchSearch = c.userId.toLowerCase().includes(search.toLowerCase());
    const status = getStatus(c);
    const matchStatus = statusFilter === "All" || status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.orderCount, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const vipCount = customers.filter((c) => c.orderCount >= 10).length;

  function renderTable() {
    if (loading) {
      return (
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
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      );
    }

    return (
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
          {filtered.map((customer, idx) => {
            const status = getStatus(customer);
            return (
              <motion.tr
                key={customer.userId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold ${avatarColors[idx % avatarColors.length]}`}>
                      {getInitials(customer.userId)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{customer.userId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-white/60">{customer.orderCount}</span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="text-sm font-mono text-white">{formatPrice(customer.totalSpent)}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-sm text-white/40">{formatDate(customer.lastOrder)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium border ${statusColors[status]}`}>
                    {status}
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
            );
          })}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-sm text-white/30">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Customers</h1>
          <p className="text-sm text-white/40 mt-1">Manage your customer relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportCSV(customers)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:bg-white/10 transition-all"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
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
                <div className="p-2.5 rounded-xl bg-[#C79A56]/10">
                  <ShoppingBag className="w-5 h-5 text-[#C79A56]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{vipCount}</p>
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
                  <p className="text-2xl font-bold text-white">{formatPrice(Math.round(avgOrderValue))}</p>
                  <p className="text-xs text-white/30">Avg. Order Value</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search by user ID..."
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
        <div className="overflow-x-auto">{renderTable()}</div>
      </div>
    </div>
  );
}
