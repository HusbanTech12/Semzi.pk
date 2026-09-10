import type { Metadata } from "next";
import { getCollectionBySlug } from "@/lib/products";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };

  return {
    title: collection.name,
    description: `${collection.tagline} ${collection.description}`,
    openGraph: {
      title: `${collection.name} | Semzi`,
      description: collection.tagline,
      images: [{ url: collection.heroImageUrl, alt: collection.name }],
    },
  };
}

export default function CollectionLayout({ children }: Props) {
  return <>{children}</>;
}
