"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";

const revenueData = [
  { month: "Jan", revenue: 4200, orders: 42 },
  { month: "Feb", revenue: 5800, orders: 58 },
  { month: "Mar", revenue: 6400, orders: 64 },
  { month: "Apr", revenue: 7200, orders: 72 },
  { month: "May", revenue: 8100, orders: 81 },
  { month: "Jun", revenue: 9500, orders: 95 },
  { month: "Jul", revenue: 11200, orders: 112 },
  { month: "Aug", revenue: 10800, orders: 108 },
  { month: "Sep", revenue: 12400, orders: 124 },
  { month: "Oct", revenue: 13100, orders: 131 },
  { month: "Nov", revenue: 14800, orders: 148 },
  { month: "Dec", revenue: 16200, orders: 162 },
];

const ordersByDay = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 18 },
  { day: "Wed", orders: 15 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 28 },
  { day: "Sat", orders: 32 },
  { day: "Sun", orders: 24 },
];

const recentOrders = [
  { id: "ORD-2847", customer: "Sarah Laurent", product: "Lavender Dreams", amount: 2400, status: "Delivered", date: "2 hours ago" },
  { id: "ORD-2846", customer: "James Carter", product: "Rose Petal Elixir", amount: 3800, status: "Shipped", date: "4 hours ago" },
  { id: "ORD-2845", customer: "Amara Osei", product: "Charcoal Detox", amount: 2800, status: "Processing", date: "6 hours ago" },
  { id: "ORD-2844", customer: "Michael Chen", product: "Coconut Silk", amount: 3400, status: "Delivered", date: "8 hours ago" },
  { id: "ORD-2843", customer: "Emma Wilson", product: "Honey Oatmeal", amount: 2600, status: "Shipped", date: "12 hours ago" },
  { id: "ORD-2842", customer: "David Park", product: "Tea Tree Fresh", amount: 3200, status: "Delivered", date: "1 day ago" },
  { id: "ORD-2841", customer: "Sofia Rodriguez", product: "Eucalyptus Mint", amount: 2200, status: "Delivered", date: "1 day ago" },
  { id: "ORD-2840", customer: "Alex Kim", product: "Vanilla Amber", amount: 2600, status: "Cancelled", date: "2 days ago" },
];

const topProducts = [
  { name: "Lavender Dreams", sold: 284, revenue: 681600, trend: 12 },
  { name: "Rose Petal Elixir", sold: 198, revenue: 752400, trend: 8 },
  { name: "Charcoal Detox", sold: 176, revenue: 492800, trend: -3 },
  { name: "Coconut Silk", sold: 165, revenue: 561000, trend: 15 },
  { name: "Honey Oatmeal", sold: 142, revenue: 369200, trend: 5 },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Processing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const kpis = [
  {
    label: "Total Revenue",
    value: "$112,400",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    sparkline: [42, 58, 64, 72, 81, 95, 112, 108, 124, 131, 148, 162],
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingBag,
    sparkline: [42, 58, 64, 72, 81, 95, 112, 108, 124, 131, 148, 162],
  },
  {
    label: "Products",
    value: "8",
    change: "+2 new",
    trend: "up" as const,
    icon: Package,
    sparkline: [3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 8],
  },
  {
    label: "Customers",
    value: "847",
    change: "+18.3%",
    trend: "up" as const,
    icon: Users,
    sparkline: [120, 180, 240, 310, 380, 450, 520, 590, 650, 720, 780, 847],
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-white">Dashboard</h1>
          <p className="text-sm text-white/40 mt-1">Welcome back. Here&apos;s what&apos;s happening with your store.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 focus:outline-none focus:border-[#C79A56]/50 transition-all">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group p-6 rounded-2xl bg-[#111118] border border-white/5 hover:border-[#C79A56]/20 hover:shadow-[0_0_40px_-8px_rgba(199,154,86,0.15)] transition-all duration-500"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-xs tracking-[0.15em] uppercase text-white/40">{kpi.label}</p>
                  <p className="text-3xl font-bold text-white tracking-tight">{kpi.value}</p>
                  <div className="flex items-center gap-1.5">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
                    )}
                    <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
                      {kpi.change}
                    </span>
                    <span className="text-xs text-white/30">vs last month</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-[#C79A56]/10 transition-colors">
                  <Icon className="w-5 h-5 text-white/40 group-hover:text-[#C79A56] transition-colors" />
                </div>
              </div>
              {/* Mini Sparkline */}
              <div className="mt-4 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={kpi.sparkline.map((v, i) => ({ v }))}>
                    <defs>
                      <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C79A56" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#C79A56" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#C79A56"
                      strokeWidth={1.5}
                      fill={`url(#grad-${idx})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-[#111118] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-medium text-white">Revenue Overview</h3>
              <p className="text-xs text-white/30 mt-1">Monthly revenue for 2026</p>
            </div>
            <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C79A56" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C79A56" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "#1A1A24", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C79A56" strokeWidth={2} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Orders by Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="p-6 rounded-2xl bg-[#111118] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-medium text-white">Orders This Week</h3>
              <p className="text-xs text-white/30 mt-1">Daily order count</p>
            </div>
            <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "#1A1A24", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  formatter={(value) => [`${value} orders`, "Orders"]}
                />
                <Bar dataKey="orders" fill="#C79A56" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="p-6 rounded-2xl bg-[#111118] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-medium text-white">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs text-[#C79A56] hover:text-[#A47C3B] transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.slice(0, 6).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{order.customer}</p>
                    <p className="text-xs text-white/30">{order.id} · {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColors[order.status] || "bg-white/5 text-white/40 border-white/10"}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-mono text-white">${(order.amount / 100).toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="p-6 rounded-2xl bg-[#111118] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-medium text-white">Top Products</h3>
            <Link href="/admin/products" className="text-xs text-[#C79A56] hover:text-[#A47C3B] transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={product.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/20 w-5">#{idx + 1}</span>
                  <div>
                    <p className="text-sm text-white">{product.name}</p>
                    <p className="text-xs text-white/30">{product.sold} sold</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-white">${(product.revenue / 100).toLocaleString()}</span>
                  <span className={`flex items-center gap-0.5 text-xs ${product.trend > 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {product.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(product.trend)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
