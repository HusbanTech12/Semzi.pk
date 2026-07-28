import { products as staticProducts } from "@/lib/products";
import type { Product } from "@/lib/products";
import FeaturedProductsClient from "./FeaturedProductsClient";

function getStaticFeatured(): Product[] {
  return staticProducts.filter((p) => p.badge !== undefined);
}

export default function FeaturedProducts() {
  const featured = getStaticFeatured();

  return <FeaturedProductsClient featured={featured} />;
}
