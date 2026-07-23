import { useState, useEffect } from "react";
import type { ProductResult } from "@/lib/db-queries";

export function useProducts() {
  const [products, setProducts] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { products, loading };
}

export function useProduct(slug: string) {
  const { products, loading } = useProducts();
  const product = products.find((p) => p.slug === slug);
  return { product, loading };
}
