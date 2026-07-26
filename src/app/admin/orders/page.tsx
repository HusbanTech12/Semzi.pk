"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const orders = [
  { id: "ORD-2847", customer: "Sarah Laurent", email: "sarah@example.com", product: "Lavender Dreams", quantity: 2, amount: 4800, status: "Delivered", date: "2026-07-26", payment: "Paid" },
  { id: "ORD-2846", customer: "James Carter", email: "james@example.com", product: "Rose Petal Elixir", quantity: 1, amount: 3800, status: "Shipped", date: "2026-07-26", payment: "Paid" },
  { id: "ORD-2845", customer: "Amara Osei", email: "amara@example.com", product: "Charcoal Detox", quantity: 3, amount: 8400, status: "Processing", date: "2026-07-25", payment: "Paid" },
  { id: "ORD-2844", customer: "Michael Chen", email: "michael@example.com", product: "Coconut Silk", quantity: 1, amount: 3400, status: "Delivered", date: "2026-07-25", payment: "Paid" },
  { id: "ORD-2843", customer: "Emma Wilson", email: "emma@example.com", product: "Honey Oatmeal", quantity: 2, amount: 5200, status: "Shipped", date: "2026-07-24", payment: "Paid" },
  { id: "ORD-2842", customer: "David Park", email: "david@example.com", product: "Tea Tree Fresh", quantity: 1, amount: 3200, status: "Delivered", date: "2026-07-24", payment: "Paid" },
  { id: "ORD-2841", customer: "Sofia Rodriguez", email: "sofia@example.com", product: "Eucalyptus Mint", quantity: 4, amount: 8800, status: "Delivered", date: "2026-07-23", payment: "Paid" },
  { id: "ORD-2840", customer: "Alex Kim", email: "alex@example.com", product: "Vanilla Amber", quantity: 1, amount: 2600, status: "Cancelled", date: "2026-07-23", payment: "Refunded" },
  { id: "ORD-2839", customer: "Nina Patel", email: "nina@example.com", product: "Lavender Dreams", quantity: 2, amount: 4800, status: "Delivered", date: "2026-07-22", payment: "Paid" },
  { id: "ORD-2838", customer: "Tom Hardy", email: "tom@example.com", product: "Rose Petal Elixir", quantity: 1, amount: 3800, status: "Shipped", date: "2026-07-22", payment: "Paid" },
  { id: "ORD-2837", customer: "Lisa Wang", email: "lisa@example.com", product: "Charcoal Detox", quantity: 2, amount: 5600, status: "Processing", date: "2026-07-21", payment: "Paid" },
  { id: "ORD-2836", customer: "Omar Hassan", email: "omar@example.com", product: "Coconut Silk", quantity: 3, amount: 10200, status: "Delivered", date: "2026-07-21", payment: "Paid" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  Delivered: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  Shipped: { icon: Truck, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  Processing: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  Cancelled: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

const statusFilters = ["All", "Delivered", "Shipped", "Processing", "Cancelled"];

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Orders</h1>
          <p className="text-sm text-white/40 mt-1">Manage and fulfill customer orders</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:bg-white/10 transition-all">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C79A56]/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {statusFilters.map((status) => (
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

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#111118] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider">Order</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden md:table-cell">Product</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider">Amount</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, idx) => {
                const status = statusConfig[order.status];
                const StatusIcon = status.icon;
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-white">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-white">{order.customer}</p>
                        <p className="text-xs text-white/30">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-white/30" />
                        <span className="text-sm text-white/60">{order.product} × {order.quantity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-sm text-white/40">{order.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${status.bg}`}>
                        <StatusIcon className={`w-3 h-3 ${status.color}`} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-mono text-white">${(order.amount / 100).toFixed(0)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-white/20 hover:text-white hover:bg-white/5 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-xs text-white/30">Showing {filtered.length} of {orders.length} orders</p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all disabled:opacity-30" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 bg-white/10 rounded-lg text-xs text-white">1</span>
            <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all disabled:opacity-30" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
