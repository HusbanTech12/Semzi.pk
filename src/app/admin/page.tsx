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

const MONTH_NAMES: Record<string, string> = {
  "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
  "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
  "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatMonth(monthStr: string) {
  const parts = monthStr.split("-");
  return MONTH_NAMES[parts[1]] || monthStr;
}

function formatDayName(dateStr: string) {
  const d = new Date(dateStr);
  return DAY_NAMES[d.getDay()];
}

function formatCurrency(cents: number) {
  return `Rs. ${(cents / 100).toLocaleString()}`;
}

function relativeTime(dateStr: string) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1) return "1 day ago";
  return `${diffDay} days ago`;
}

interface DashboardData {
  dashboard: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    revenueByMonth: { month: string; revenue: number; orders: number }[];
    ordersByDay: { day: string; orders: number }[];
    recentOrders: {
      id: number;
      userId: string;
      status: string;
      totalCents: number;
      shippingAddress: Record<string, unknown>;
      createdAt: string;
      items: { variantName: string; productName: string }[];
    }[];
    topProducts: {
      productId: number;
      productName: string;
      totalSold: number;
      totalRevenue: number;
    }[];
  };
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

function Skeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-40 rounded-lg bg-white/5" />
          <div className="h-4 w-64 rounded-lg bg-white/5" />
        </div>
        <div className="h-10 w-36 rounded-xl bg-white/5" />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#111118] border border-white/5">
            <div className="space-y-3">
              <div className="h-3 w-20 rounded bg-white/5" />
              <div className="h-8 w-28 rounded bg-white/5" />
              <div className="h-3 w-24 rounded bg-white/5" />
            </div>
            <div className="mt-4 h-10 rounded bg-white/5" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#111118] border border-white/5">
          <div className="h-5 w-40 rounded bg-white/5 mb-6" />
          <div className="h-72 rounded-xl bg-white/5" />
        </div>
        <div className="p-6 rounded-2xl bg-[#111118] border border-white/5">
          <div className="h-5 w-36 rounded bg-white/5 mb-6" />
          <div className="h-72 rounded-xl bg-white/5" />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#111118] border border-white/5">
            <div className="h-5 w-32 rounded bg-white/5 mb-6" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex items-center justify-between p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5" />
                    <div className="space-y-1.5">
                      <div className="h-3 w-28 rounded bg-white/5" />
                      <div className="h-2.5 w-20 rounded bg-white/5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-14 rounded-full bg-white/5" />
                    <div className="h-3 w-16 rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData["dashboard"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load dashboard");
        return res.json();
      })
      .then((json: DashboardData) => setData(json.dashboard))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-white/40">
        <p className="text-lg text-white/60">Failed to load dashboard</p>
        <p className="text-sm mt-1">{error}</p>
        <button onClick={() => { setLoading(true); setError(null); fetch("/api/admin/dashboard").then(r => r.json()).then(j => { setData(j.dashboard); setLoading(false); }).catch(e => { setError(e.message); setLoading(false); }); }} className="mt-4 px-4 py-2 bg-[#C79A56]/10 text-[#C79A56] rounded-xl text-sm hover:bg-[#C79A56]/20 transition-colors">Retry</button>
      </div>
    );
  }

  if (!data) return null;

  const revenueData = data.revenueByMonth.map((d) => ({
    month: formatMonth(d.month),
    revenue: d.revenue,
    orders: d.orders,
  }));

  const chartOrdersByDay = data.ordersByDay.map((d) => ({
    day: formatDayName(d.day),
    orders: d.orders,
  }));

  const kpis = [
    {
      label: "Total Revenue",
      value: formatCurrency(data.totalRevenue),
      trend: "up" as const,
      change: "",
      icon: DollarSign,
      sparkline: revenueData.map((d) => d.revenue),
    },
    {
      label: "Total Orders",
      value: data.totalOrders.toLocaleString(),
      trend: "up" as const,
      change: "",
      icon: ShoppingBag,
      sparkline: revenueData.map((d) => d.orders),
    },
    {
      label: "Products",
      value: data.totalProducts.toString(),
      trend: "up" as const,
      change: "",
      icon: Package,
      sparkline: [data.totalProducts],
    },
    {
      label: "Customers",
      value: data.totalCustomers.toLocaleString(),
      trend: "up" as const,
      change: "",
      icon: Users,
      sparkline: [data.totalCustomers],
    },
  ];

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
                      {kpi.change || "—"}
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
                  <AreaChart data={kpi.sparkline.map((v) => ({ v }))}>
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
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} tickFormatter={(v) => `Rs.${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "#1A1A24", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                  formatter={(value) => [`Rs. ${Number(value).toLocaleString()}`, "Revenue"]}
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
              <BarChart data={chartOrdersByDay}>
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
            {data.recentOrders.slice(0, 6).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{order.items?.[0]?.productName || "Unknown product"}</p>
                    <p className="text-xs text-white/30">ORD-{String(order.id).padStart(4, "0")} · {relativeTime(order.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColors[order.status] || "bg-white/5 text-white/40 border-white/10"}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="text-sm font-mono text-white">{formatCurrency(order.totalCents)}</span>
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
            {data.topProducts.map((product, idx) => (
              <div key={product.productId} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/20 w-5">#{idx + 1}</span>
                  <div>
                    <p className="text-sm text-white">{product.productName}</p>
                    <p className="text-xs text-white/30">{product.totalSold} sold</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-white">{formatCurrency(product.totalRevenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
