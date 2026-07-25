import { getFeaturedProducts, getRecentProducts } from "@/lib/db-queries";
import FeaturedProductsClient from "./FeaturedProductsClient";

export default async function FeaturedProducts() {
  const [featured, newArrivals] = await Promise.all([
    getFeaturedProducts(),
    getRecentProducts(8),
  ]);

  return (
    <FeaturedProductsClient featured={featured} newArrivals={newArrivals} />
  );
}
