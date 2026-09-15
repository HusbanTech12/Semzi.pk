export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  priceCents: number;
  compareAtPriceCents?: number;
  ingredients: string[];
  howToUse: string;
  caution: string;
  images: string[];
  badge?: string;
  tagline?: string;
  collection?: string;
  skinConcern?: string[];
  inStock: boolean;
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImageUrl: string;
  accent: string;
  productSlugs: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "beach-soap",
    name: "Beach Soap",
    category: "Artisan Soap",
    description:
      "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 69900,
    ingredients: [
      "Aqua (Water)",
      "Cocos Nucifera (Coconut) Oil",
      "Ricinus Communis (Castor) Seed Oil",
      "Stearic Acid",
      "Lauric Acid",
      "Propylene Glycol",
      "Sucrose",
      "Sodium Hydroxide",
      "Tetrasodium EDTA",
    ],
    howToUse:
      "Lather in water. Massage gently onto skin. Rinse thoroughly. For external use only.",
    caution:
      "For external use only. Avoid contact with eyes. Discontinue use if irritation occurs. Store in a cool, dry place.",
    images: [
      "/images/products-img/beach-soap1.png",
      "/images/products-img/beach-soap2.png",
    ],
    badge: "Bestseller",
    tagline: "Carry the Beach home. Natural Soap. Nothing Harsh.",
    collection: "Hydrating Glycerin Bars",
    skinConcern: ["dry", "sensitive"],
    inStock: true,
  },
  {
    id: 2,
    slug: "clarity",
    name: "Clarity",
    category: "Hair Ritual",
    description:
      "Handcrafted and sulfate-free. This clarifying formula targets dandruff at the source, soothing the scalp while gently cleansing — leaving hair clean, flake-free, and refreshed from root to tip. With argan oil & natural extracts.",
    priceCents: 149900,
    ingredients: [
      "Aqua (Water)",
      "Sodium Cocoyl Isethionate",
      "Cocamidopropyl Betaine",
      "Decyl Glucoside",
      "Cetyl Alcohol",
      "Glycerin",
      "Panthenol",
      "Hydrolyzed Keratin",
      "Hydrolyzed Wheat Protein",
      "Polyquaternium-7",
      "Hydrolyzed Silk",
      "Rosmarinus Officinalis (Rosemary) Leaf Extract",
      "Vitis Vinifera (Grape) Seed Extract",
      "Argania Spinosa Kernel Oil",
      "Zinc Pyrithione",
      "Tocopherol",
      "Parfum",
      "Preservative",
    ],
    howToUse:
      "Apply to wet hair, gently massage into scalp and lengths, then rinse thoroughly. Repeat if desired.",
    caution:
      "For external use only. Avoid contact with eyes. Keep out of reach of children. Store in a cool, dry place.",
    images: [
      "/images/products-img/shampoo/hair-rituals-hero.jpg",
      "/images/products-img/shampoo/strengthening-shampoo-2.jpg",
    ],
    badge: "New",
    tagline: "Clarity From Root to Tip.",
    collection: "Hair Rituals",
    skinConcern: ["oily", "normal"],
    inStock: true,
  },
  {
    id: 3,
    slug: "sea-voyage-soap",
    name: "Sea Voyage Soap",
    category: "Artisan Soap",
    description:
      "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 69900,
    ingredients: [
      "Aqua (Water)",
      "Cocos Nucifera (Coconut) Oil",
      "Ricinus Communis (Castor) Seed Oil",
      "Stearic Acid",
      "Lauric Acid",
      "Propylene Glycol",
      "Sucrose",
      "Sodium Hydroxide",
      "Tetrasodium EDTA",
    ],
    howToUse:
      "Lather in water. Massage gently onto skin focusing on problem areas. Rinse thoroughly.",
    caution:
      "For external use only. May be drying for very sensitive skin types. Discontinue use if irritation occurs.",
    images: [
      "/images/products-img/sea-voyage-soap1.png",
      "/images/products-img/sea-voyage-soap2.png",
    ],
    badge: "Popular",
    tagline: "Every Bar Tells a Voyage. Natural Soap. Nothing Harsh.",
    collection: "Hydrating Glycerin Bars",
    skinConcern: ["oily", "acne-prone"],
    inStock: true,
  },
  {
    id: 4,
    slug: "balance",
    name: "Balance",
    category: "Hair Ritual",
    description:
      "Handcrafted and sulfate-free. This lightweight formula gently removes excess oil without over-stripping, leaving scalp refreshed, balanced, and hair feeling clean and light. With rosemary & licorice extract — for oily & combination scalp.",
    priceCents: 149900,
    ingredients: [
      "Aqua (Water)",
      "Sodium Cocoyl Isethionate",
      "Cocamidopropyl Betaine",
      "Decyl Glucoside",
      "Cetyl Alcohol",
      "Glycerin",
      "Panthenol",
      "Hydrolyzed Keratin",
      "Hydrolyzed Wheat Protein",
      "Polyquaternium-7",
      "Hydrolyzed Silk",
      "Rosmarinus Officinalis (Rosemary) Leaf Extract",
      "Glycyrrhiza Glabra (Licorice) Root Extract",
      "Vitis Vinifera (Grape) Seed Extract",
      "Tocopherol",
      "Parfum",
      "Preservative",
    ],
    howToUse:
      "Apply to wet hair, gently massage into scalp and lengths, then rinse thoroughly. Repeat if desired.",
    caution:
      "For external use only. Avoid contact with eyes. Keep out of reach of children. Store in a cool, dry place.",
    images: [
      "/images/products-img/shampoo/hair-rituals-hero.jpg",
      "/images/products-img/shampoo/strengthening-shampoo-2.jpg",
    ],
    badge: "Eco",
    tagline: "Reset. Rebalance. Refresh.",
    collection: "Hair Rituals",
    skinConcern: ["oily", "normal"],
    inStock: true,
  },
  {
    id: 5,
    slug: "coral-soap",
    name: "Coral Soap",
    category: "Artisan Soap",
    description:
      "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 69900,
    ingredients: [
      "Aqua (Water)",
      "Cocos Nucifera (Coconut) Oil",
      "Ricinus Communis (Castor) Seed Oil",
      "Stearic Acid",
      "Lauric Acid",
      "Propylene Glycol",
      "Sucrose",
      "Sodium Hydroxide",
      "Tetrasodium EDTA",
    ],
    howToUse:
      "Lather in water. Massage gently onto skin using circular motions. Rinse thoroughly.",
    caution:
      "For external use only. Contains natural exfoliants. Avoid use on broken or irritated skin.",
    images: [
      "/images/products-img/coral-soap1.png",
      "/images/products-img/coral-soap2.png",
    ],
    badge: "Soothing",
    tagline: "Where the Ocean Blushes. Natural Soap. Nothing Harsh.",
    collection: "Hydrating Glycerin Bars",
    skinConcern: ["sensitive", "dry"],
    inStock: true,
  },
  {
    id: 6,
    slug: "restore",
    name: "Restore",
    category: "Hair Ritual",
    description:
      "Handcrafted and sulfate-free. This gentle formula cleanses without stripping, restoring smoothness, shine, and natural bounce — leaving hair soft, manageable, and beautifully cared for. With keratin & natural extracts — for dry & damaged hair.",
    priceCents: 149900,
    ingredients: [
      "Aqua (Water)",
      "Sodium Cocoyl Isethionate",
      "Cocamidopropyl Betaine",
      "Decyl Glucoside",
      "Cetyl Alcohol",
      "Glycerin",
      "Panthenol",
      "Hydrolyzed Keratin",
      "Hydrolyzed Wheat Protein",
      "Polyquaternium-7",
      "Hydrolyzed Silk",
      "Rosmarinus Officinalis (Rosemary) Leaf Extract",
      "Vitis Vinifera (Grape) Seed Extract",
      "Argania Spinosa Kernel Oil",
      "Tocopherol",
      "Parfum",
      "Preservative",
    ],
    howToUse:
      "Apply to wet hair, gently massage into scalp and lengths, then rinse thoroughly. Repeat if desired.",
    caution:
      "For external use only. Avoid contact with eyes. Keep out of reach of children. Store in a cool, dry place.",
    images: [
      "/images/products-img/shampoo/hair-rituals-hero.jpg",
      "/images/products-img/shampoo/strengthening-shampoo-2.jpg",
    ],
    badge: "Nourish",
    tagline: "What Hair Remembers",
    collection: "Hair Rituals",
    skinConcern: ["dry", "damaged"],
    inStock: true,
  },
  {
    id: 7,
    slug: "cloud-soap",
    name: "Cloud Soap",
    category: "Artisan Soap",
    description:
      "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 69900,
    ingredients: [
      "Aqua (Water)",
      "Cocos Nucifera (Coconut) Oil",
      "Ricinus Communis (Castor) Seed Oil",
      "Stearic Acid",
      "Lauric Acid",
      "Propylene Glycol",
      "Sucrose",
      "Sodium Hydroxide",
      "Tetrasodium EDTA",
    ],
    howToUse:
      "Lather in water. Massage onto skin. Rinse thoroughly. Follow with moisturizer.",
    caution:
      "For external use only. Avoid contact with eyes. May cause tingling sensation on sensitive skin.",
    images: [
      "/images/products-img/cloud-soap1.png",
      "/images/products-img/cloud-soap2.png",
    ],
    tagline: "Above Everything, On Your Skin. Natural Soap. Nothing Harsh.",
    collection: "Hydrating Glycerin Bars",
    skinConcern: ["normal", "oily"],
    inStock: true,
  },
  {
    id: 8,
    slug: "flora-soap",
    name: "Flora Soap",
    category: "Artisan Soap",
    description:
      "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 69900,
    ingredients: [
      "Aqua (Water)",
      "Cocos Nucifera (Coconut) Oil",
      "Ricinus Communis (Castor) Seed Oil",
      "Stearic Acid",
      "Lauric Acid",
      "Propylene Glycol",
      "Sucrose",
      "Sodium Hydroxide",
      "Tetrasodium EDTA",
    ],
    howToUse: "Lather in water. Massage onto skin. Rinse thoroughly.",
    caution: "For external use only. Avoid contact with eyes.",
    images: [
      "/images/products-img/flora soap1.png",
      "/images/products-img/flora soap2.png",
    ],
    badge: "Sale",
    tagline: "From Petals to Your Palm. Natural Soap. Nothing Harsh.",
    collection: "Hydrating Glycerin Bars",
    skinConcern: ["normal", "dry"],
    inStock: true,
  },
  {
    id: 9,
    slug: "radiance",
    name: "Brightening Cream Soap",
    category: "Cream Soap",
    description:
      "This handcrafted brightening cream soap gently cleanses while helping to improve the appearance of dullness and uneven skin tone. Enriched with a carefully balanced blend of skin-conditioning ingredients, it supports a smoother, softer-looking complexion and enhances natural radiance. The rich, creamy lather leaves the skin feeling fresh, comfortable, and beautifully refined after every wash. pH 5.0.",
    priceCents: 119900,
    ingredients: [
      "Glycerin",
      "Sodium Cocoyl Isethionate",
      "Cocamidopropyl Betaine",
      "Niacinamide",
      "Alpha-Arbutin",
      "Glycyrrhiza Glabra (Licorice) Root Extract",
      "Camellia Sinensis Leaf Extract",
      "Allantoin",
      "Panthenol",
      "Sorbitol",
      "Disodium EDTA",
      "Preservative",
    ],
    howToUse:
      "Apply a small pea-size amount on damp face and massage gently for at least 30 seconds, then rinse with water.",
    caution:
      "For external use only. Avoid contact with eyes. Discontinue use if irritation occurs. Store in a cool, dry place.",
    images: [
      "/images/products-img/cloud-soap1.png",
      "/images/products-img/cloud-soap2.png",
    ],
    badge: "New",
    tagline: "Cleanse. Brighten. Glow.",
    collection: "Radiance Cream Soap",
    skinConcern: ["dry", "normal", "sensitive"],
    inStock: true,
  },
  {
    id: 10,
    slug: "nourish-goat-milk-aloe",
    name: "Goat Milk & Aloe Vera Soap",
    category: "Goat Milk & Aloe Vera Soap",
    description:
      "Handcrafted with goat milk and aloe vera, this gentle cleansing bar helps maintain skin moisture and softness. The creamy lather leaves the skin feeling smooth and comforted, while regular use supports a refined, healthy-looking appearance. Ideal for those who prefer a mild, nourishing cleanse for dry or delicate skin.",
    priceCents: 69900,
    ingredients: [
      "Aqua (Water)",
      "Cocos Nucifera (Coconut) Oil",
      "Ricinus Communis (Castor) Seed Oil",
      "Stearic Acid",
      "Lauric Acid",
      "Propylene Glycol",
      "Caprae Lac (Goat Milk)",
      "Aloe Barbadensis Leaf Juice",
      "Sodium Hydroxide",
      "Sucrose",
      "Disodium EDTA",
    ],
    howToUse:
      "Lather in water. Apply to skin in gentle circular motions. Rinse thoroughly. Follow with moisturizer.",
    caution:
      "For external use only. Avoid contact with eyes. Contains dairy-derived ingredients.",
    images: [
      "/images/products-img/goat-milk/botanical-edits-hero.jpg",
      "/images/products-img/goat-milk/goat-milk-soap-2.jpg",
    ],
    badge: "Bestseller",
    tagline: "Most Gentle Combination. Natural Soap. Nothing Harsh.",
    collection: "Botanical Edits",
    skinConcern: ["dry", "sensitive"],
    inStock: true,
  },
];

export const collections: Collection[] = [
  {
    slug: "hydrating-glycerin-bars",
    name: "Hydrating Glycerin Bars",
    tagline: "Pure glycerin. Deeply hydrating. Nothing harsh.",
    description:
      "A collection of hand-poured glycerin bars, crafted for a cream-like lather that cleanses without stripping.",
    heroImageUrl: "/images/products-img/hydrating-glycerin-hero.png",
    accent: "#2E8D9E",
    productSlugs: [
      "coral-soap",
      "beach-soap",
      "flora-soap",
      "sea-voyage-soap",
      "cloud-soap",
    ],
  },
  {
    slug: "botanical-edits",
    name: "Botanical Edits",
    tagline: "Nature's calm. Botanical care.",
    description:
      "A focused edit of botanical soaps, crafted with nature's most nourishing ingredients — gentle, calming, and ideal for sensitive or delicate skin.",
    heroImageUrl: "/images/products-img/goat-milk/botanical-edits-hero.jpg",
    accent: "#8E6A38",
    productSlugs: ["nourish-goat-milk-aloe"],
  },
  {
    slug: "radiance-cream-soap",
    name: "Radiance Cream Soap",
    tagline: "Cleanse. Brighten. Glow.",
    description:
      "A brightening cream soap ritual — Cleanse. Brighten. Glow. — with niacinamide and botanical extracts for a luminous, comforted finish.",
    heroImageUrl: "/images/products-img/radiance-cream-hero.png",
    accent: "#C9A36B",
    productSlugs: ["radiance"],
  },
  {
    slug: "hair-rituals",
    name: "Hair Rituals",
    tagline: "Clarity. Balance. Restore.",
    description:
      "Wash-off hair rituals shaped with the same care as every Semzi bar — formulated with natural botanicals for every scalp type.",
    heroImageUrl: "/images/products-img/shampoo/hair-rituals-hero.jpg",
    accent: "#5C5146",
    productSlugs: ["clarity", "balance", "restore"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  const collection = getCollectionBySlug(collectionSlug);
  if (!collection) return [];
  return collection.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}

export function getCollectionProductCount(collectionSlug: string): number {
  return getProductsByCollection(collectionSlug).length;
}
