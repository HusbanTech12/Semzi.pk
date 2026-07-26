"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  X,
  MapPin,
  Hash,
} from "lucide-react";

type OrderItem = {
  id: number;
  orderId: number;
  variantId: number;
  quantity: number;
  priceCentsAtPurchase: number;
  variantName: string | null;
  variantSku: string | null;
  productName: string | null;
};

type AdminOrder = {
  id: number;
  userId: string | null;
  status: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  shippingAddress: Record<string, unknown> | null;
  createdAt: string;
  items: OrderItem[];
};

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  pending: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  processing: { icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  shipped: { icon: Truck, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  delivered: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  cancelled: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

const statusFilters = ["All", "pending", "processing", "shipped", "delivered", "cancelled"];

const ITEMS_PER_PAGE = 10;

function formatOrderId(id: number) {
  return `SEMZI-${id.toString().padStart(4, "0")}`;
}

function formatPrice(cents: number) {
  return `Rs. ${(cents / 100).toLocaleString("en-PK")}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getCustomerName(address: Record<string, unknown> | null): string {
  if (!address) return "Unknown";
  return (address.name as string) || "Unknown";
}

function getCustomerEmail(address: Record<string, unknown> | null): string {
  if (!address) return "—";
  return (address.email as string) || "—";
}

function buildCsv(orders: AdminOrder[]): string {
  const header = "Order ID,Customer,Email,Status,Subtotal (PKR),Shipping (PKR),Total (PKR),Date,Items";
  const rows = orders.map((o) => {
    const name = getCustomerName(o.shippingAddress);
    const email = getCustomerEmail(o.shippingAddress);
    const items = o.items.map((i) => `${i.productName ?? "Unknown"} x${i.quantity}`).join("; ");
    return `${formatOrderId(o.id)},"${name}","${email}",${o.status},${o.subtotalCents / 100},${o.shippingCents / 100},${o.totalCents / 100},${formatDate(o.createdAt)},"${items}"`;
  });
  return [header, ...rows].join("\n");
}

function downloadCsv(orders: AdminOrder[]) {
  const csv = buildCsv(orders);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `semzi-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function SkeletonRow() {
  return (
    <tr className="border-b border-white/5 last:border-0">
      <td className="px-6 py-4"><div className="h-4 w-24 bg-white/5 rounded animate-pulse" /></td>
      <td className="px-6 py-4">
        <div className="h-4 w-28 bg-white/5 rounded animate-pulse mb-1" />
        <div className="h-3 w-36 bg-white/5 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 hidden md:table-cell"><div className="h-4 w-32 bg-white/5 rounded animate-pulse" /></td>
      <td className="px-6 py-4 hidden sm:table-cell"><div className="h-4 w-20 bg-white/5 rounded animate-pulse" /></td>
      <td className="px-6 py-4"><div className="h-6 w-20 bg-white/5 rounded-full animate-pulse" /></td>
      <td className="px-6 py-4 text-right"><div className="h-4 w-16 bg-white/5 rounded animate-pulse ml-auto" /></td>
      <td className="px-6 py-4" />
    </tr>
  );
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders ?? []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUpdatingId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    setUpdatingId(null);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch {
      await fetchOrders();
    }
  };

  const filtered = orders.filter((o) => {
    const orderId = formatOrderId(o.id).toLowerCase();
    const customerName = getCustomerName(o.shippingAddress).toLowerCase();
    const q = search.toLowerCase();
    const matchSearch = orderId.includes(q) || customerName.includes(q);
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Orders</h1>
          <p className="text-sm text-white/40 mt-1">Manage and fulfill customer orders</p>
        </div>
        <button
          onClick={() => downloadCsv(filtered)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:bg-white/10 transition-all"
        >
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
            placeholder="Search by order ID or customer name..."
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
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
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                : paginated.map((order, idx) => {
                    const status = statusConfig[order.status] ?? statusConfig.pending;
                    const StatusIcon = status.icon;
                    const isExpanded = expandedId === order.id;
                    const firstItem = order.items[0];
                    const productLabel = firstItem
                      ? `${firstItem.productName ?? "Unknown"}${order.items.length > 1 ? ` +${order.items.length - 1}` : ""}`
                      : "—";
                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.03 }}
                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : order.id)}
                            className="flex items-center gap-2 text-sm font-mono text-white hover:text-[#C79A56] transition-colors"
                          >
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                            />
                            {formatOrderId(order.id)}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-white">{getCustomerName(order.shippingAddress)}</p>
                            <p className="text-xs text-white/30">{getCustomerEmail(order.shippingAddress)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Package className="w-3.5 h-3.5 text-white/30" />
                            <span className="text-sm text-white/60 truncate max-w-[200px]">{productLabel}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <span className="text-sm text-white/40">{formatDate(order.createdAt)}</span>
                        </td>
                        <td className="px-6 py-4 relative">
                          <div className="relative" ref={updatingId === order.id ? dropdownRef : undefined}>
                            <button
                              onClick={() => setUpdatingId(updatingId === order.id ? null : order.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-opacity ${status.bg} ${
                                updatingId === order.id ? "opacity-100" : "group-hover:opacity-100 opacity-70"
                              }`}
                            >
                              <StatusIcon className={`w-3 h-3 ${status.color}`} />
                              <span className="capitalize">{order.status}</span>
                              <ChevronDown className="w-2.5 h-2.5 text-white/30" />
                            </button>
                            <AnimatePresence>
                              {updatingId === order.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute z-50 top-full left-0 mt-1 w-40 py-1 bg-[#1a1a24] border border-white/10 rounded-xl shadow-xl"
                                >
                                  {STATUSES.map((s) => {
                                    const cfg = statusConfig[s];
                                    const Icon = cfg.icon;
                                    return (
                                      <button
                                        key={s}
                                        onClick={() => handleStatusUpdate(order.id, s)}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-white/5 ${
                                          order.status === s ? "text-white" : "text-white/50 hover:text-white/70"
                                        }`}
                                      >
                                        <Icon className={`w-3 h-3 ${cfg.color}`} />
                                        <span className="capitalize">{s}</span>
                                        {order.status === s && <span className="ml-auto text-[#C79A56]">✓</span>}
                                      </button>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-mono text-white">{formatPrice(order.totalCents)}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : order.id)}
                            className="p-1.5 text-white/20 hover:text-white hover:bg-white/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
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
          <p className="text-xs text-white/30">
            {loading ? (
              <span className="inline-block h-3 w-32 bg-white/5 rounded animate-pulse" />
            ) : (
              `Showing ${filtered.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} orders`
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    p === safePage
                      ? "bg-white/10 text-white"
                      : "text-white/30 hover:text-white/60 hover:bg-white/5"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Order Detail */}
      <AnimatePresence>
        {expandedId !== null && (
          (() => {
            const order = orders.find((o) => o.id === expandedId);
            if (!order) return null;
            const status = statusConfig[order.status] ?? statusConfig.pending;
            const StatusIcon = status.icon;
            const addr = order.shippingAddress as Record<string, unknown> | null;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-[#111118] border border-white/5 p-6 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-mono text-white">{formatOrderId(order.id)}</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${status.bg}`}>
                      <StatusIcon className={`w-3 h-3 ${status.color}`} />
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setExpandedId(null)}
                    className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Items */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider">Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                              <Package className="w-4 h-4 text-white/30" />
                            </div>
                            <div>
                              <p className="text-sm text-white">{item.productName ?? "Unknown Product"}</p>
                              <p className="text-xs text-white/30">
                                {item.variantName && <span>{item.variantName}</span>}
                                {item.variantSku && <span className="ml-2">{item.variantSku}</span>}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-mono text-white">{formatPrice(item.priceCentsAtPurchase * item.quantity)}</p>
                            <p className="text-xs text-white/30">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address + Totals */}
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        Shipping Address
                      </h3>
                      {addr ? (
                        <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-sm text-white/60 space-y-1">
                          {typeof addr.name === "string" && addr.name && <p className="text-white">{addr.name}</p>}
                          {typeof addr.email === "string" && addr.email && <p>{addr.email}</p>}
                          {(typeof addr.line1 === "string" || typeof addr.city === "string" || typeof addr.state === "string" || typeof addr.postalCode === "string" || typeof addr.country === "string") && (
                            <p>
                              {[addr.line1, addr.line2, addr.city, addr.state, addr.postalCode, addr.country]
                                .filter((v): v is string => typeof v === "string" && v.length > 0)
                                .join(", ")}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-white/30 italic">No shipping address</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider flex items-center gap-2">
                        <Hash className="w-3 h-3" />
                        Order Summary
                      </h3>
                      <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 space-y-2 text-sm">
                        <div className="flex justify-between text-white/50">
                          <span>Subtotal</span>
                          <span className="font-mono">{formatPrice(order.subtotalCents)}</span>
                        </div>
                        <div className="flex justify-between text-white/50">
                          <span>Shipping</span>
                          <span className="font-mono">{formatPrice(order.shippingCents)}</span>
                        </div>
                        <div className="h-px bg-white/5" />
                        <div className="flex justify-between text-white font-medium">
                          <span>Total</span>
                          <span className="font-mono">{formatPrice(order.totalCents)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-white/20">
                      Placed on {formatDate(order.createdAt)}
                      {order.userId && <span className="ml-2">· User: {order.userId}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
}
