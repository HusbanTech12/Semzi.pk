"use server";

import { getFeaturedProducts, getRecentProducts } from "@/lib/db-queries";
import type { Product } from "@/lib/products";

export async function fetchProductsForTab(
  tab: "best-sellers" | "new-arrivals"
): Promise<Product[]> {
  if (tab === "best-sellers") {
    return getFeaturedProducts();
  }
  return getRecentProducts(8);
}
