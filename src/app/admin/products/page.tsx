"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  TrendingDown,
  Grid3X3,
  List,
  Star,
} from "lucide-react";
import Image from "next/image";
import { products } from "@/lib/products";

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Products</h1>
          <p className="text-sm text-white/40 mt-1">Manage your product catalog</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#C79A56] text-white text-sm font-medium rounded-xl hover:bg-[#A47C3B] transition-all shadow-[0_0_20px_-4px_rgba(199,154,86,0.4)]">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C79A56]/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/50 hover:bg-white/5"}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/50 hover:bg-white/5"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="group rounded-2xl bg-[#111118] border border-white/5 overflow-hidden hover:border-[#C79A56]/20 hover:shadow-[0_0_40px_-8px_rgba(199,154,86,0.15)] transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-[#C79A56] transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#C79A56] text-white text-[10px] font-semibold tracking-wider uppercase rounded-full">
                    {product.badge}
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-[#C79A56] font-medium">{product.category}</p>
                    <h3 className="text-sm font-medium text-white mt-1">{product.name}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-mono text-white">${(product.priceCents / 100).toFixed(0)}</p>
                    {product.compareAtPriceCents && (
                      <p className="text-xs text-white/30 line-through">${(product.compareAtPriceCents / 100).toFixed(0)}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span>{product.collection || "No collection"}</span>
                  <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="rounded-2xl bg-[#111118] border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden sm:table-cell">Collection</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider">Price</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, idx) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{product.name}</p>
                        <p className="text-xs text-white/30">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-white/60">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-sm text-white/60">{product.collection || "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-mono text-white">${(product.priceCents / 100).toFixed(0)}</span>
                      {product.compareAtPriceCents && (
                        <span className="text-xs text-white/30 line-through">${(product.compareAtPriceCents / 100).toFixed(0)}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      product.inStock
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
