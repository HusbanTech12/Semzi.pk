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
    priceCents: 2400,
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
    name: "Strengthening Shampoo",
    category: "Hair Ritual",
    description:
      "A strengthening shampoo for oily and combination scalp, infused with rosemary and jasmine extract. Gently lifts buildup while fortifying the hair fiber — leaving hair feeling clean, light, and resilient.",
    priceCents: 3800,
    compareAtPriceCents: 4200,
    ingredients: [
      "Aqua (Water)",
      "Coco-Glucoside",
      "Glycerin",
      "Rosmarinus Officinalis (Rosemary) Leaf Extract",
      "Jasminum Officinale (Jasmine) Extract",
      "Aloe Barbadensis Leaf Juice",
      "Tocopherol",
      "Citric Acid",
    ],
    howToUse:
      "Apply to wet hair. Massage into scalp. Leave for 1–2 minutes. Rinse thoroughly. Follow with Balance or Restore as needed.",
    caution:
      "For external use only. Avoid contact with eyes. If contact occurs, rinse thoroughly with water.",
    images: [
      "/images/products-img/shampoo/hair-rituals-hero.jpg",
      "/images/products-img/shampoo/strengthening-shampoo-2.jpg",
    ],
    badge: "New",
    tagline: "Rosemary & jasmine. Stronger strands.",
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
    priceCents: 2800,
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
      "A daily-use botanical shampoo that restores equilibrium to the scalp. Soft coconut proteins and aloe hydrate without weighing hair down — calm, even, and beautifully soft.",
    priceCents: 3400,
    ingredients: [
      "Cocos Nucifera Oil",
      "Aloe Barbadensis Leaf Juice",
      "Coco-Glucoside",
      "Glycerin",
      "Hydrolyzed Rice Protein",
      "Tocopherol",
    ],
    howToUse:
      "Apply to wet hair. Massage gently. Leave for 2–3 minutes. Rinse thoroughly.",
    caution:
      "For external use only. Avoid contact with eyes. Store in a cool, dry place away from direct sunlight.",
    images: [
      "/images/products-img/shampoo/hair-rituals-hero.jpg",
      "/images/products-img/shampoo/strengthening-shampoo-2.jpg",
    ],
    badge: "Eco",
    tagline: "Even scalp. Soft strands. Daily calm.",
    collection: "Hair Rituals",
    skinConcern: ["dry", "normal"],
    inStock: true,
  },
  {
    id: 5,
    slug: "coral-soap",
    name: "Coral Soap",
    category: "Artisan Soap",
    description:
      "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 2600,
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
      "A deeply restorative hair wash for dry, stressed, or color-treated strands. Rich botanical oils rebuild softness and resilience, leaving hair feeling replenished and calm.",
    priceCents: 3600,
    ingredients: [
      "Aloe Barbadensis Leaf Juice",
      "Coco-Glucoside",
      "Argania Spinosa Kernel Oil",
      "Glycerin",
      "Hydrolyzed Wheat Protein",
      "Tocopherol",
    ],
    howToUse:
      "Apply to wet hair. Massage thoroughly into scalp and lengths. Leave for 2–3 minutes. Rinse well.",
    caution:
      "For external use only. Avoid contact with eyes. If contact occurs, rinse thoroughly with water.",
    images: [
      "/images/products-img/shampoo/hair-rituals-hero.jpg",
      "/images/products-img/shampoo/strengthening-shampoo-2.jpg",
    ],
    badge: "Nourish",
    tagline: "Rebuild softness. Restore resilience.",
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
    priceCents: 2200,
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
    priceCents: 2600,
    compareAtPriceCents: 3000,
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
    name: "Radiance",
    category: "Cream Soap",
    description:
      "A luxurious cream soap that cushions the skin in a dense, milk-soft lather. Formulated to leave a luminous, comforted finish — radiant without residue, gentle enough for daily use.",
    priceCents: 3000,
    ingredients: [
      "Aqua (Water)",
      "Glycerin",
      "Cocos Nucifera (Coconut) Oil",
      "Butyrospermum Parkii (Shea) Butter",
      "Stearic Acid",
      "Tocopheryl Acetate",
      "Citrus Aurantium Dulcis (Orange) Peel Oil",
    ],
    howToUse:
      "Wet hands or a soft cloth. Work into a creamy lather. Massage onto damp skin. Rinse thoroughly.",
    caution:
      "For external use only. Avoid contact with eyes. Discontinue use if irritation occurs.",
    images: [
      "/images/products-img/cloud-soap1.png",
      "/images/products-img/cloud-soap2.png",
    ],
    badge: "New",
    tagline: "Cream-soft cleanse. Quiet radiance.",
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
    priceCents: 2800,
    compareAtPriceCents: 3200,
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
    tagline: "Cream-soft cleanse. Quiet radiance.",
    description:
      "A luxurious cream soap ritual designed to cushion the skin in a dense, milk-soft lather and leave a luminous, comforted finish.",
    heroImageUrl: "/images/products-img/radiance-cream-hero.png",
    accent: "#C9A36B",
    productSlugs: ["radiance"],
  },
  {
    slug: "hair-rituals",
    name: "Hair Rituals",
    tagline: "Strengthen. Balance. Restore.",
    description:
      "Wash-off hair rituals shaped with the same care as every Semzi bar — starting with our Strengthening Shampoo for oily and combination scalp, with rosemary and jasmine extract.",
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
