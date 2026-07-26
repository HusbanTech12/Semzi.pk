"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  ArrowUpRight,
  MoreHorizontal,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const CATEGORY_COLORS = ["#C79A56", "#A47C3B", "#EADFC5", "#6B5D4D"];

interface AdminAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueByMonth: { month: string; revenue: number; orders: number }[];
  categoryBreakdown: { collectionName: string; productCount: number }[];
  ordersByHour: { hour: number; orders: number }[];
  conversionFunnel: {
    visitors: number;
    productViews: number;
    addToCart: number;
    checkout: number;
    purchase: number;
  };
  topLocations: {
    city: string;
    orderCount: number;
    totalRevenue: number;
  }[];
}

const MONTH_SHORT: Record<string, string> = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

function formatMonth(ym: string): string {
  const m = ym.split("-")[1];
  return MONTH_SHORT[m] ?? ym;
}

function formatPKR(cents: number): string {
  return `Rs. ${(cents / 100).toLocaleString("en-PK")}`;
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-white/5 ${className ?? ""}`}
    />
  );
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        if (!res.ok) throw new Error("Failed to load analytics");
        const data = await res.json();
        if (!cancelled) setAnalytics(data.analytics);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAnalytics();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-40 rounded-lg bg-white/5 animate-pulse" />
            <div className="h-4 w-56 rounded-lg bg-white/5 animate-pulse mt-2" />
          </div>
          <div className="h-10 w-36 rounded-xl bg-white/5 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-28" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <SkeletonBlock className="h-96" />
          <SkeletonBlock className="h-96" />
          <SkeletonBlock className="h-80" />
          <SkeletonBlock className="h-80" />
        </div>
        <SkeletonBlock className="h-64" />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-red-400">
          {error ?? "No data available"}
        </p>
      </div>
    );
  }

  const avgOrderValue =
    analytics.totalOrders > 0
      ? Math.round(analytics.totalRevenue / analytics.totalOrders)
      : 0;

  const totalCategoryCount = analytics.categoryBreakdown.reduce(
    (s, c) => s + c.productCount,
    0
  );

  const categoryData = analytics.categoryBreakdown.map((c, i) => ({
    name: c.collectionName,
    value: totalCategoryCount > 0
      ? Math.round((c.productCount / totalCategoryCount) * 100)
      : 0,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
  }));

  const revenueChartData = analytics.revenueByMonth.map((d) => ({
    ...d,
    month: formatMonth(d.month),
  }));

  const hourlyData = analytics.ordersByHour.map((d) => ({
    hour: d.hour === 0
      ? "12am"
      : d.hour < 12
        ? `${d.hour}am`
        : d.hour === 12
          ? "12pm"
          : `${d.hour - 12}pm`,
    orders: d.orders,
  }));

  const funnelSteps: { stage: string; count: number }[] = [
    { stage: "Visitors", count: analytics.conversionFunnel.visitors },
    { stage: "Product Views", count: analytics.conversionFunnel.productViews },
    { stage: "Add to Cart", count: analytics.conversionFunnel.addToCart },
    { stage: "Checkout", count: analytics.conversionFunnel.checkout },
    { stage: "Purchase", count: analytics.conversionFunnel.purchase },
  ];
  const maxFunnelCount = Math.max(
    ...funnelSteps.map((s) => s.count),
    1
  );

  const totalLocationOrders = analytics.topLocations.reduce(
    (s, l) => s + l.orderCount,
    0
  );

  const kpis = [
    {
      label: "Total Revenue",
      value: formatPKR(analytics.totalRevenue),
      icon: DollarSign,
    },
    {
      label: "Total Orders",
      value: analytics.totalOrders.toLocaleString("en-PK"),
      icon: ShoppingBag,
    },
    {
      label: "Avg. Order Value",
      value: formatPKR(avgOrderValue),
      icon: TrendingUp,
    },
    {
      label: "Total Customers",
      value: analytics.totalCustomers.toLocaleString("en-PK"),
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Analytics</h1>
          <p className="text-sm text-white/40 mt-1">
            Deep insights into your store performance
          </p>
        </div>
        <select className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 focus:outline-none focus:border-[#C79A56]/50 transition-all">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
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
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-5 rounded-2xl bg-[#111118] border border-white/5 hover:border-[#C79A56]/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-bold text-white mt-2">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-400">
                      &nbsp;
                    </span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5">
                  <Icon className="w-5 h-5 text-white/40" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="p-6 rounded-2xl bg-[#111118] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-medium text-white">
                Revenue Trend
              </h3>
              <p className="text-xs text-white/30 mt-1">Monthly revenue</p>
            </div>
            <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient
                    id="revGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#C79A56"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="#C79A56"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.03)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "rgba(255,255,255,0.3)",
                    fontSize: 12,
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "rgba(255,255,255,0.3)",
                    fontSize: 12,
                  }}
                  tickFormatter={(v) => `Rs.${(v / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1A1A24",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  formatter={(value) => [
                    formatPKR(Number(value)),
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C79A56"
                  strokeWidth={2}
                  fill="url(#revGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="p-6 rounded-2xl bg-[#111118] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-medium text-white">
                Sales by Category
              </h3>
              <p className="text-xs text-white/30 mt-1">
                Product distribution
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#1A1A24",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {categoryData.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm text-white/60">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-sm font-mono text-white">
                    {cat.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="p-6 rounded-2xl bg-[#111118] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-medium text-white">
                Conversion Funnel
              </h3>
              <p className="text-xs text-white/30 mt-1">
                Visitor to purchase journey
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {funnelSteps.map((step, idx) => {
              const hasData = step.count > 0;
              const pct = hasData
                ? Math.round((step.count / maxFunnelCount) * 100)
                : 0;
              return (
                <div key={step.stage} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white/60">
                      {step.stage}
                    </span>
                    <span className="text-sm font-mono text-white">
                      {hasData ? step.count.toLocaleString("en-PK") : "N/A"}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        delay: 0.8 + idx * 0.1,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-[#C79A56] to-[#A47C3B]"
                    />
                  </div>
                  <span className="text-[10px] text-white/30">
                    {hasData ? `${pct}%` : "N/A"}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Orders by Hour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="p-6 rounded-2xl bg-[#111118] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-medium text-white">
                Orders by Time of Day
              </h3>
              <p className="text-xs text-white/30 mt-1">
                Peak ordering hours
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.03)"
                />
                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "rgba(255,255,255,0.3)",
                    fontSize: 11,
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "rgba(255,255,255,0.3)",
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1A1A24",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="#C79A56"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top Locations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="p-6 rounded-2xl bg-[#111118] border border-white/5"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-medium text-white">
              Top Locations
            </h3>
            <p className="text-xs text-white/30 mt-1">Orders by city</p>
          </div>
        </div>
        <div className="space-y-4">
          {analytics.topLocations.map((loc, idx) => {
            const pct =
              totalLocationOrders > 0
                ? Math.round(
                    (loc.orderCount / totalLocationOrders) * 100
                  )
                : 0;
            return (
              <div key={loc.city} className="flex items-center gap-4">
                <span className="text-xs font-mono text-white/20 w-5">
                  #{idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{loc.city}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-white/40">
                        {loc.orderCount} orders
                      </span>
                      <span className="text-sm font-mono text-white">
                        {formatPKR(loc.totalRevenue)}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        delay: 1 + idx * 0.1,
                        duration: 0.6,
                      }}
                      className="h-full rounded-full bg-[#C79A56]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          {analytics.topLocations.length === 0 && (
            <p className="text-sm text-white/30 text-center py-4">
              No location data available
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
