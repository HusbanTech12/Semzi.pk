import { getFeaturedProducts, getRecentProducts } from "@/lib/db-queries";
import { products as staticProducts } from "@/lib/products";
import type { Product } from "@/lib/products";
import FeaturedProductsClient from "./FeaturedProductsClient";

function getStaticFeatured(): Product[] {
  return staticProducts.filter((p) => p.badge !== undefined);
}

function getStaticNewArrivals(): Product[] {
  return staticProducts;
}

export default async function FeaturedProducts() {
  let featured: Product[] = [];
  let newArrivals: Product[] = [];

  try {
    [featured, newArrivals] = await Promise.all([
      getFeaturedProducts(),
      getRecentProducts(8),
    ]);
  } catch {
    featured = getStaticFeatured();
    newArrivals = getStaticNewArrivals();
  }

  return (
    <FeaturedProductsClient featured={featured} newArrivals={newArrivals} />
  );
}
