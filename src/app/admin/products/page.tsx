"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Grid3X3,
  List,
  X,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Package,
} from "lucide-react";
import Image from "next/image";

type AdminProductImage = {
  id: number;
  url: string;
  alt: string | null;
  sortOrder: number | null;
};

type AdminProductVariant = {
  id: number;
  name: string;
  sku: string;
  priceCents: number;
  inventoryCount: number;
};

type AdminProduct = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  priceCents: number;
  compareAtPriceCents: number | null;
  ingredients: string | null;
  howToUse: string | null;
  category: string | null;
  collectionId: number | null;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  images: AdminProductImage[];
  variants: AdminProductVariant[];
  collectionName: string | null;
};

type ProductFormData = {
  name: string;
  slug: string;
  description: string;
  priceCents: string;
  compareAtPriceCents: string;
  ingredients: string;
  howToUse: string;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  images: { url: string; alt: string }[];
  variants: { name: string; sku: string; priceCents: string; inventoryCount: string }[];
};

const availableCategories = ["Artisan Soap", "Shampoo", "Glycerin Soap", "Goat Milk & Aloe Vera Soap"];

const emptyForm: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  priceCents: "",
  compareAtPriceCents: "",
  ingredients: "",
  howToUse: "",
  category: "",
  isActive: true,
  isFeatured: false,
  images: [],
  variants: [],
};

function formatPrice(cents: number) {
  return `Rs. ${(cents / 100).toLocaleString("en-PK")}`;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-[#111118] border border-white/5 overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-white/5" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-white/5 rounded w-1/3" />
        <div className="h-4 bg-white/5 rounded w-2/3" />
        <div className="flex justify-between">
          <div className="h-3 bg-white/5 rounded w-1/4" />
          <div className="h-3 bg-white/5 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-white/5">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-lg bg-white/5" />
          <div className="space-y-2">
            <div className="h-3 bg-white/5 rounded w-24" />
            <div className="h-2 bg-white/5 rounded w-16" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 hidden md:table-cell"><div className="h-3 bg-white/5 rounded w-16 animate-pulse" /></td>
      <td className="px-6 py-4 hidden sm:table-cell"><div className="h-3 bg-white/5 rounded w-20 animate-pulse" /></td>
      <td className="px-6 py-4"><div className="h-3 bg-white/5 rounded w-14 animate-pulse" /></td>
      <td className="px-6 py-4 hidden md:table-cell"><div className="h-5 bg-white/5 rounded-full w-16 animate-pulse" /></td>
      <td className="px-6 py-4"><div className="h-3 bg-white/5 rounded w-16 animate-pulse ml-auto" /></td>
    </tr>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
  saving,
}: {
  product: AdminProduct | null;
  onSave: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<ProductFormData>(() => {
    if (product) {
      return {
        name: product.name,
        slug: product.slug,
        description: product.description ?? "",
        priceCents: String(product.priceCents / 100),
        compareAtPriceCents: product.compareAtPriceCents ? String(product.compareAtPriceCents / 100) : "",
        ingredients: product.ingredients ?? "",
        howToUse: product.howToUse ?? "",
        category: product.category ?? "",
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        images: product.images.map((img) => ({ url: img.url, alt: img.alt ?? "" })),
        variants: product.variants.map((v) => ({
          name: v.name,
          sku: v.sku,
          priceCents: String(v.priceCents / 100),
          inventoryCount: String(v.inventoryCount),
        })),
      };
    }
    return { ...emptyForm };
  });

  const set = (key: keyof ProductFormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageAdd = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, { url: "", alt: "" }] }));
  };

  const handleImageRemove = (idx: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const handleImageChange = (idx: number, key: "url" | "alt", value: string) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === idx ? { ...img, [key]: value } : img)),
    }));
  };

  const handleVariantAdd = () => {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { name: "", sku: "", priceCents: "", inventoryCount: "0" }],
    }));
  };

  const handleVariantRemove = (idx: number) => {
    setForm((prev) => ({ ...prev, variants: prev.variants.filter((_, i) => i !== idx) }));
  };

  const handleVariantChange = (idx: number, key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) => (i === idx ? { ...v, [key]: value } : v)),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="rounded-2xl bg-[#111118] border border-[#C79A56]/20 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif text-white">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button onClick={onCancel} className="p-1.5 text-white/30 hover:text-white rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => { set("name", e.target.value); set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")); }}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all"
              placeholder="Product name"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all"
              placeholder="product-slug"
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Price (PKR) *</label>
            <input
              type="number"
              value={form.priceCents}
              onChange={(e) => set("priceCents", e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all font-mono"
              placeholder="0"
            />
          </div>

          {/* Compare At Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Compare At Price (PKR)</label>
            <input
              type="number"
              value={form.compareAtPriceCents}
              onChange={(e) => set("compareAtPriceCents", e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all font-mono"
              placeholder="0"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C79A56]/50 transition-all appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#111118]">Select category</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#111118]">{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all resize-none"
              placeholder="Product description"
            />
          </div>

          {/* Ingredients */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Ingredients (INCI)</label>
            <textarea
              value={form.ingredients}
              onChange={(e) => set("ingredients", e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all resize-none"
              placeholder="Sodium Olivate, Sodium Cocoate, ..."
            />
          </div>

          {/* How to Use */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">How to Use</label>
            <textarea
              value={form.howToUse}
              onChange={(e) => set("howToUse", e.target.value)}
              rows={2}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all resize-none"
              placeholder="Lather with warm water..."
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => set("isActive", e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#C79A56] focus:ring-[#C79A56]/50"
              />
              <span className="text-sm text-white/60">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => set("isFeatured", e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#C79A56] focus:ring-[#C79A56]/50"
              />
              <span className="text-sm text-white/60">Featured</span>
            </label>
          </div>
        </div>

        {/* Images Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Images</label>
            <button
              type="button"
              onClick={handleImageAdd}
              className="flex items-center gap-1 text-xs text-[#C79A56] hover:text-[#A47C3B] transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Image
            </button>
          </div>
          {form.images.length === 0 && (
            <p className="text-xs text-white/20">No images added yet.</p>
          )}
          <div className="space-y-2">
            {form.images.map((img, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-white/20 shrink-0" />
                <input
                  type="text"
                  value={img.url}
                  onChange={(e) => handleImageChange(idx, "url", e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  placeholder="Image URL"
                />
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => handleImageChange(idx, "alt", e.target.value)}
                  className="w-32 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  placeholder="Alt text"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(idx)}
                  className="p-1.5 text-white/20 hover:text-red-400 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Variants Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Variants</label>
            <button
              type="button"
              onClick={handleVariantAdd}
              className="flex items-center gap-1 text-xs text-[#C79A56] hover:text-[#A47C3B] transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Variant
            </button>
          </div>
          {form.variants.length === 0 && (
            <p className="text-xs text-white/20">No variants added yet.</p>
          )}
          <div className="space-y-2">
            {form.variants.map((v, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Package className="w-4 h-4 text-white/20 shrink-0" />
                <input
                  type="text"
                  value={v.name}
                  onChange={(e) => handleVariantChange(idx, "name", e.target.value)}
                  className="w-28 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={v.sku}
                  onChange={(e) => handleVariantChange(idx, "sku", e.target.value)}
                  className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all"
                  placeholder="SKU"
                />
                <input
                  type="number"
                  value={v.priceCents}
                  onChange={(e) => handleVariantChange(idx, "priceCents", e.target.value)}
                  className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all font-mono"
                  placeholder="Price"
                />
                <input
                  type="number"
                  value={v.inventoryCount}
                  onChange={(e) => handleVariantChange(idx, "inventoryCount", e.target.value)}
                  className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C79A56]/50 transition-all font-mono"
                  placeholder="Stock"
                />
                <button
                  type="button"
                  onClick={() => handleVariantRemove(idx)}
                  className="p-1.5 text-white/20 hover:text-red-400 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={saving || !form.name || !form.slug || !form.priceCents}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C79A56] text-white text-sm font-medium rounded-xl hover:bg-[#A47C3B] transition-all shadow-[0_0_20px_-4px_rgba(199,154,86,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {product ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (formData: ProductFormData) => {
    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        priceCents: Math.round(parseFloat(formData.priceCents) * 100),
        compareAtPriceCents: formData.compareAtPriceCents ? Math.round(parseFloat(formData.compareAtPriceCents) * 100) : null,
        ingredients: formData.ingredients || null,
        howToUse: formData.howToUse || null,
        category: formData.category || null,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        images: formData.images.filter((img) => img.url.trim() !== ""),
        variants: formData.variants.filter((v) => v.name.trim() !== "" && v.sku.trim() !== "").map((v) => ({
          name: v.name,
          sku: v.sku,
          priceCents: Math.round(parseFloat(v.priceCents || "0") * 100),
          inventoryCount: parseInt(v.inventoryCount || "0", 10),
        })),
      };

      if (editingProduct) {
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update product");
        showNotification("success", "Product updated successfully");
        setEditingProduct(null);
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create product");
        showNotification("success", "Product created successfully");
        setShowAddForm(false);
      }
      await fetchProducts();
    } catch (err) {
      showNotification("error", err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: AdminProduct) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      showNotification("success", "Product deleted");
      if (editingProduct?.id === product.id) setEditingProduct(null);
      await fetchProducts();
    } catch (err) {
      showNotification("error", err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.collectionName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (p.category ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const isInStock = (p: AdminProduct) => p.variants.some((v) => v.inventoryCount > 0);

  return (
    <div className="space-y-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-lg backdrop-blur-sm border ${
              notification.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white">Products</h1>
          <p className="text-sm text-white/40 mt-1">
            {loading ? "Loading..." : `${products.length} products total`}
          </p>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setEditingProduct(null); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#C79A56] text-white text-sm font-medium rounded-xl hover:bg-[#A47C3B] transition-all shadow-[0_0_20px_-4px_rgba(199,154,86,0.4)]"
        >
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
            placeholder="Search by name or collection..."
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

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <ProductForm
            product={null}
            onSave={handleSave}
            onCancel={() => setShowAddForm(false)}
            saving={saving}
          />
        )}
      </AnimatePresence>

      {/* Edit Form */}
      <AnimatePresence>
        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={() => setEditingProduct(null)}
            saving={saving}
          />
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
          <button onClick={fetchProducts} className="ml-auto text-xs underline hover:no-underline">Retry</button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="group rounded-2xl bg-[#111118] border border-white/5 overflow-hidden hover:border-[#C79A56]/20 hover:shadow-[0_0_40px_-8px_rgba(199,154,86,0.15)] transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                    {product.images.length > 0 ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt ?? product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => { setEditingProduct(product); setShowAddForm(false); }}
                        className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-[#C79A56] transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {product.isFeatured && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#C79A56] text-white text-[10px] font-semibold tracking-wider uppercase rounded-full">
                        Featured
                      </span>
                    )}
                    {!isInStock(product) && (
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
                        <p className="text-xs text-[#C79A56] font-medium">{product.category ?? product.collectionName ?? "No category"}</p>
                        <h3 className="text-sm font-medium text-white mt-1">{product.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-mono text-white">{formatPrice(product.priceCents)}</p>
                        {product.compareAtPriceCents && (
                          <p className="text-xs text-white/30 line-through">{formatPrice(product.compareAtPriceCents)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                        product.isActive
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-white/5 text-white/30 border-white/10"
                      }`}>
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                        isInStock(product)
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        {isInStock(product) ? "In Stock" : "Out of Stock"}
                      </span>
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
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden md:table-cell">Collection</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider">Price</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider hidden md:table-cell">Stock</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-white/30 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : filtered.map((product, idx) => (
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
                            {product.images.length > 0 ? (
                              <Image src={product.images[0].url} alt={product.images[0].alt ?? product.name} fill className="object-cover" sizes="48px" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-4 h-4 text-white/10" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{product.name}</p>
                            <p className="text-xs text-white/30">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-white/60">{product.category ?? "—"}</span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-white/60">{product.collectionName ?? "—"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-mono text-white">{formatPrice(product.priceCents)}</span>
                          {product.compareAtPriceCents && (
                            <span className="text-xs text-white/30 line-through">{formatPrice(product.compareAtPriceCents)}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          product.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-white/5 text-white/30 border-white/10"
                        }`}>
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          isInStock(product)
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {isInStock(product) ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setEditingProduct(product); setShowAddForm(false); }}
                            className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          >
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

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-sm text-white/30">
            {search ? "No products match your search." : "No products yet. Add your first product above."}
          </p>
        </div>
      )}
    </div>
  );
}
