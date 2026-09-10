import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/products";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Semzi`,
      description: product.tagline ?? product.description,
      images: product.images[0] ? [{ url: product.images[0], alt: product.name }] : undefined,
    },
  };
}

export default function ProductLayout({ children }: Props) {
  return <>{children}</>;
}
