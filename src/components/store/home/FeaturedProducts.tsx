import { getAllProducts, getFeaturedProducts } from "@/lib/db-queries";
import FeaturedProductsClient from "./FeaturedProductsClient";

export const dynamic = "force-dynamic";

const COUNT = 4;

export default async function FeaturedProducts() {
  const [featuredFromDb, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getAllProducts(),
  ]);

  const inStock = allProducts.filter((p) => p.inStock);
  const byBadge = (labels: string[]) =>
    inStock.filter((p) =>
      labels.includes((p.badge ?? "").toLowerCase())
    );

  const prioritized = [
    ...byBadge(["bestseller"]),
    ...byBadge(["popular", "sale"]),
    ...featuredFromDb.filter(
      (p) => p.inStock && !byBadge(["bestseller", "popular", "sale"]).some((b) => b.id === p.id)
    ),
    ...inStock,
  ];

  const seen = new Set<number>();
  const featured = prioritized
    .filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    })
    .slice(0, COUNT);

  return <FeaturedProductsClient featured={featured} />;
}
