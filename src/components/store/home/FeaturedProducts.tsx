import { getAllProducts } from "@/lib/db-queries";
import FeaturedProductsClient from "./FeaturedProductsClient";

export const dynamic = "force-dynamic";

export default async function FeaturedProducts() {
  const allProducts = await getAllProducts();
  const featured = allProducts.filter((p) => p.inStock).slice(0, 4);

  return <FeaturedProductsClient featured={featured} />;
}
