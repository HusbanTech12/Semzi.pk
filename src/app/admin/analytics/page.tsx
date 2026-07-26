"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
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
  LineChart,
  Line,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200, orders: 42, customers: 28 },
  { month: "Feb", revenue: 5800, orders: 58, customers: 35 },
  { month: "Mar", revenue: 6400, orders: 64, customers: 42 },
  { month: "Apr", revenue: 7200, orders: 72, customers: 48 },
  { month: "May", revenue: 8100, orders: 81, customers: 55 },
  { month: "Jun", revenue: 9500, orders: 95, customers: 62 },
  { month: "Jul", revenue: 11200, orders: 112, customers: 78 },
  { month: "Aug", revenue: 10800, orders: 108, customers: 72 },
  { month: "Sep", revenue: 12400, orders: 124, customers: 85 },
  { month: "Oct", revenue: 13100, orders: 131, customers: 92 },
  { month: "Nov", revenue: 14800, orders: 148, customers: 105 },
  { month: "Dec", revenue: 16200, orders: 162, customers: 118 },
];

const categoryData = [
  { name: "Artisan Soap", value: 58, color: "#C79A56" },
  { name: "Shampoo", value: 28, color: "#A47C3B" },
  { name: "Gift Sets", value: 9, color: "#EADFC5" },
  { name: "Body Care", value: 5, color: "#6B5D4D" },
];

const hourlyData = [
  { hour: "12am", orders: 2 },
  { hour: "3am", orders: 1 },
  { hour: "6am", orders: 3 },
  { hour: "9am", orders: 8 },
  { hour: "12pm", orders: 15 },
  { hour: "3pm", orders: 12 },
  { hour: "6pm", orders: 18 },
  { hour: "9pm", orders: 10 },
];

const conversionFunnel = [
  { stage: "Visitors", count: 12480, percentage: 100 },
  { stage: "Product Views", count: 8340, percentage: 66.8 },
  { stage: "Add to Cart", count: 2840, percentage: 22.8 },
  { stage: "Checkout", count: 1420, percentage: 11.4 },
  { stage: "Purchase", count: 1120, percentage: 9.0 },
];

const topLocations = [
  { city: "Karachi", orders: 284, revenue: 681600, percentage: 25 },
  { city: "Lahore", orders: 198, revenue: 475200, percentage: 18 },
  { city: "Islamabad", orders: 156, revenue: 374400, percentage: 14 },
  { city: "Faisalabad", orders: 98, revenue: 235200, percentage: 9 },
  { city: "Rawalpindi", orders: 76, revenue: 182400, percentage: 7 },
];

const kpis = [
  { label: "Total Revenue", value: "$112,400", change: "+12.5%", trend: "up", icon: DollarSign },
  { label: "Conversion Rate", value: "9.0%", change: "+1.2%", trend: "up", icon: TrendingUp },
  { label: "Avg. Order Value", value: "$87.50", change: "+5.8%", trend: "up", icon: ShoppingBag },
  { label: "Customer Retention", value: "68%", change: "-2.1%", trend: "down", icon: Users },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Analytics</h1>
          <p className="text-sm text-white/40 mt-1">Deep insights into your store performance</p>
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
                  <p className="text-xs text-white/40 uppercase tracking-wider">{kpi.label}</p>
                  <p className="text-2xl font-bold text-white mt-2">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
                      {kpi.change}
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
              <h3 className="text-base font-medium text-white">Revenue vs Orders</h3>
              <p className="text-xs text-white/30 mt-1">Monthly comparison</p>
            </div>
            <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C79A56" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C79A56" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ background: "#1A1A24", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
                <Area type="monotone" dataKey="revenue" stroke="#C79A56" strokeWidth={2} fill="url(#revGrad)" />
                <Area type="monotone" dataKey="customers" stroke="#4ade80" strokeWidth={2} fill="url(#custGrad)" />
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
              <h3 className="text-base font-medium text-white">Sales by Category</h3>
              <p className="text-xs text-white/30 mt-1">Product distribution</p>
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
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1A1A24", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm text-white/60">{cat.name}</span>
                  </div>
                  <span className="text-sm font-mono text-white">{cat.value}%</span>
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
              <h3 className="text-base font-medium text-white">Conversion Funnel</h3>
              <p className="text-xs text-white/30 mt-1">Visitor to purchase journey</p>
            </div>
          </div>
          <div className="space-y-3">
            {conversionFunnel.map((step, idx) => (
              <div key={step.stage} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white/60">{step.stage}</span>
                  <span className="text-sm font-mono text-white">{step.count.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${step.percentage}%` }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#C79A56] to-[#A47C3B]"
                  />
                </div>
                <span className="text-[10px] text-white/30">{step.percentage}%</span>
              </div>
            ))}
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
              <h3 className="text-base font-medium text-white">Orders by Time of Day</h3>
              <p className="text-xs text-white/30 mt-1">Peak ordering hours</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#1A1A24", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
                <Bar dataKey="orders" fill="#C79A56" radius={[6, 6, 0, 0]} />
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
            <h3 className="text-base font-medium text-white">Top Locations</h3>
            <p className="text-xs text-white/30 mt-1">Orders by city</p>
          </div>
        </div>
        <div className="space-y-4">
          {topLocations.map((loc, idx) => (
            <div key={loc.city} className="flex items-center gap-4">
              <span className="text-xs font-mono text-white/20 w-5">#{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white">{loc.city}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/40">{loc.orders} orders</span>
                    <span className="text-sm font-mono text-white">${(loc.revenue / 100).toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${loc.percentage}%` }}
                    transition={{ delay: 1 + idx * 0.1, duration: 0.6 }}
                    className="h-full rounded-full bg-[#C79A56]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
