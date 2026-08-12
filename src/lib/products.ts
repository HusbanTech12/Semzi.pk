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

export const products: Product[] = [
  {
    id: 1,
    slug: "beach-soap",
    name: "Beach Soap",
    category: "Artisan Soap",
    description: "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 2400,
    ingredients: ["Aqua (Water)", "Cocos Nucifera (Coconut) Oil", "Ricinus Communis (Castor) Seed Oil", "Stearic Acid", "Lauric Acid", "Propylene Glycol", "Sucrose", "Sodium Hydroxide", "Tetrasodium EDTA"],
    howToUse: "Lather in warm water. Massage gently onto skin. Rinse thoroughly. For external use only.",
    caution: "For external use only. Avoid contact with eyes. Discontinue use if irritation occurs. Store in a cool, dry place.",
    images: [
      "/images/products-img/beach-soap1.png",
      "/images/products-img/beach-soap2.png",
    ],
    badge: "Bestseller",
    tagline: "A Ritual of Softness, Crafted by Hand.",
    collection: "Beach",
    skinConcern: ["dry", "sensitive"],
    inStock: true,
  },
  {
    id: 2,
    slug: "rose-petal-elixir",
    name: "Rose Petal Elixir",
    category: "Shampoo",
    description: "A luxurious rose-infused shampoo that gently cleanses while nourishing your scalp with natural botanicals.",
    priceCents: 3800,
    compareAtPriceCents: 4200,
    ingredients: ["Aloe Barbadensis Leaf Juice", "Coco-Glucoside", "Glycerin", "Rosa Damascena Flower Oil", "Tocopherol", "Citric Acid"],
    howToUse: "Apply to wet hair. Massage into scalp. Leave for 1-2 minutes. Rinse thoroughly. Follow with conditioner.",
    caution: "For external use only. Avoid contact with eyes. If contact occurs, rinse thoroughly with water.",
    images: [
      "https://yunasop.com/wp-content/uploads/2023/02/%E8%B2%A1%E5%AF%8C%E9%BB%83%E6%8B%89%E9%95%B7%E7%9F%B3-800x800.png",
      "https://yunasop.com/wp-content/uploads/2023/01/%E6%B5%B7%E8%97%8D%E5%AF%B6%E7%A6%AE%E7%9B%92-800x800.png",
    ],
    badge: "New",
    collection: "Beach",
    skinConcern: ["normal", "dry"],
    inStock: true,
  },
  {
    id: 3,
    slug: "sea-voyage-soap",
    name: "Sea Voyage Soap",
    category: "Artisan Soap",
    description: "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 2800,
    ingredients: ["Aqua (Water)", "Cocos Nucifera (Coconut) Oil", "Ricinus Communis (Castor) Seed Oil", "Stearic Acid", "Lauric Acid", "Propylene Glycol", "Sucrose", "Sodium Hydroxide", "Tetrasodium EDTA"],
    howToUse: "Lather in warm water. Massage gently onto skin focusing on problem areas. Rinse thoroughly.",
    caution: "For external use only. May be drying for very sensitive skin types. Discontinue use if irritation occurs.",
    images: [
      "/images/products-img/sea-voyage-soap1.png",
      "/images/products-img/sea-voyage-soap2.png",
    ],
    badge: "Popular",
    tagline: "A Ritual of Softness, Crafted by Hand.",
    collection: "Beach",
    skinConcern: ["oily", "acne-prone"],
    inStock: true,
  },
  {
    id: 4,
    slug: "coconut-silk",
    name: "Coconut Silk",
    category: "Shampoo",
    description: "Silky coconut milk shampoo that hydrates and strengthens hair with natural proteins and essential fatty acids.",
    priceCents: 3400,
    ingredients: ["Cocos Nucifera Oil", "Aloe Barbadensis Leaf Juice", "Coco-Glucoside", "Glycerin", "Hydrolyzed Rice Protein", "Tocopherol"],
    howToUse: "Apply to wet hair. Massage gently. Leave for 2-3 minutes. Rinse thoroughly.",
    caution: "For external use only. Avoid contact with eyes. Store in a cool, dry place away from direct sunlight.",
    images: [
      "https://yunasop.com/wp-content/uploads/2025/07/3.png",
      "https://yunasop.com/wp-content/uploads/2023/01/%E6%B5%B7%E8%97%8D%E5%AF%B6%E7%A6%AE%E7%9B%92-800x800.png",
    ],
    badge: "Eco",
    collection: "Beach",
    skinConcern: ["dry", "damaged"],
    inStock: true,
  },
  {
    id: 5,
    slug: "coral-soap",
    name: "Coral Soap",
    category: "Artisan Soap",
    description: "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 2600,
    ingredients: ["Aqua (Water)", "Cocos Nucifera (Coconut) Oil", "Ricinus Communis (Castor) Seed Oil", "Stearic Acid", "Lauric Acid", "Propylene Glycol", "Sucrose", "Sodium Hydroxide", "Tetrasodium EDTA"],
    howToUse: "Lather in warm water. Massage gently onto skin using circular motions. Rinse thoroughly.",
    caution: "For external use only. Contains natural exfoliants. Avoid use on broken or irritated skin.",
    images: [
      "/images/products-img/coral-soap1.png",
      "/images/products-img/coral-soap2.png",
    ],
    badge: "Soothing",
    tagline: "A Ritual of Softness, Crafted by Hand.",
    collection: "Beach",
    skinConcern: ["sensitive", "dry"],
    inStock: true,
  },
  {
    id: 6,
    slug: "tea-tree-fresh",
    name: "Tea Tree Fresh",
    category: "Shampoo",
    description: "Invigorating tea tree shampoo that clarifies the scalp and promotes healthy hair growth with natural antiseptic properties.",
    priceCents: 3200,
    ingredients: ["Aloe Barbadensis Leaf Juice", "Coco-Glucoside", "Melaleuca Alternifolia Leaf Oil", "Glycerin", "Mentha Piperita Oil", "Tocopherol"],
    howToUse: "Apply to wet hair. Massage thoroughly into scalp. Leave for 1-2 minutes. Rinse well.",
    caution: "For external use only. Avoid contact with eyes. If contact occurs, rinse thoroughly with water.",
    images: [
      "https://yunasop.com/wp-content/uploads/2023/01/%E6%B5%B7%E8%97%8D%E5%AF%B6%E7%A6%AE%E7%9B%92-800x800.png",
      "https://yunasop.com/wp-content/uploads/2024/08/IMG_0272-800x800.jpg",
    ],
    badge: "Natural",
    collection: "Beach",
    skinConcern: ["oily", "acne-prone"],
    inStock: false,
  },
  {
    id: 7,
    slug: "cloud-soap",
    name: "Cloud Soap",
    category: "Artisan Soap",
    description: "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 2200,
    ingredients: ["Aqua (Water)", "Cocos Nucifera (Coconut) Oil", "Ricinus Communis (Castor) Seed Oil", "Stearic Acid", "Lauric Acid", "Propylene Glycol", "Sucrose", "Sodium Hydroxide", "Tetrasodium EDTA"],
    howToUse: "Lather in warm water. Massage onto skin. Rinse thoroughly. Follow with moisturizer.",
    caution: "For external use only. Avoid contact with eyes. May cause tingling sensation on sensitive skin.",
    images: [
      "/images/products-img/cloud-soap1.png",
      "/images/products-img/cloud-soap2.png",
    ],
    tagline: "A Ritual of Softness, Crafted by Hand.",
    collection: "Signature",
    skinConcern: ["normal", "oily"],
    inStock: true,
  },
  {
    id: 8,
    slug: "flora-soap",
    name: "Flora Soap",
    category: "Artisan Soap",
    description: "Expertly handcrafted to help maintain skin softness and suppleness, this gentle cleansing bar is suitable for dry and sensitive skin. The rich, cream-like lather creates a refined, spa-inspired cleansing experience, leaving the skin feeling soft, smooth, and comfortably nourished.",
    priceCents: 2600,
    compareAtPriceCents: 3000,
    ingredients: ["Aqua (Water)", "Cocos Nucifera (Coconut) Oil", "Ricinus Communis (Castor) Seed Oil", "Stearic Acid", "Lauric Acid", "Propylene Glycol", "Sucrose", "Sodium Hydroxide", "Tetrasodium EDTA"],
    howToUse: "Lather in warm water. Massage onto skin. Rinse thoroughly.",
    caution: "For external use only. Avoid contact with eyes.",
    images: [
      "/images/products-img/flora soap1.png",
      "/images/products-img/flora soap2.png",
    ],
    badge: "Sale",
    tagline: "A Ritual of Softness, Crafted by Hand.",
    collection: "Signature",
    skinConcern: ["normal", "dry"],
    inStock: true,
  },
  {
    id: 9,
    slug: "clarity-glycerin-bar",
    name: "Clarity Glycerin Bar",
    category: "Glycerin Soap",
    description: "Crystal-clear glycerin soap enriched with vitamin E and botanical extracts. Gentle on skin, deeply hydrating with a luminous finish.",
    priceCents: 2000,
    ingredients: ["Glycerin", "Aqua", "Sodium Cocoyl Isethionate", "Sorbitol", "Tocopheryl Acetate", "Melaleuca Alternifolia Leaf Oil"],
    howToUse: "Lather in warm water. Massage gently onto damp skin. Rinse thoroughly. For external use only.",
    caution: "For external use only. Avoid contact with eyes. Discontinue use if irritation occurs.",
    images: [
      "https://yunasop.com/wp-content/uploads/2025/07/3.png",
      "https://yunasop.com/wp-content/uploads/2024/08/IMG_0272-800x800.jpg",
    ],
    badge: "New",
    collection: "Signature",
    skinConcern: ["sensitive", "normal"],
    inStock: true,
  },
  {
    id: 10,
    slug: "nourish-goat-milk-aloe",
    name: "Nourish Goat Milk & Aloe",
    category: "Goat Milk & Aloe Vera Soap",
    description: "Handcrafted with goat milk and aloe vera, this gentle cleansing bar helps maintain skin moisture and softness. The creamy lather leaves the skin feeling smooth and comforted, while regular use supports a refined, healthy-looking appearance. Ideal for those who prefer a mild, nourishing cleanse for dry or delicate skin.",
    priceCents: 2800,
    compareAtPriceCents: 3200,
    ingredients: ["Aqua (Water)", "Cocos Nucifera (Coconut) Oil", "Ricinus Communis (Castor) Seed Oil", "Stearic Acid", "Lauric Acid", "Propylene Glycol", "Caprae Lac (Goat Milk)", "Aloe Barbadensis Leaf Juice", "Sodium Hydroxide", "Sucrose", "Disodium EDTA"],
    howToUse: "Lather in warm water. Apply to skin in gentle circular motions. Rinse thoroughly. Follow with moisturizer.",
    caution: "For external use only. Avoid contact with eyes. Contains dairy-derived ingredients.",
    images: [
      "/images/products-img/goat-milk/goat-milk-soap-1.jpg",
      "/images/products-img/goat-milk/goat-milk-soap-2.jpg",
      "/images/products-img/goat-milk/goat-milk-soap-3.jpg",
      "/images/products-img/goat-milk/goat-milk-soap-4.jpg",
    ],
    badge: "Bestseller",
    tagline: "Milk-Rich Softness, Naturally Refined.",
    collection: "Signature",
    skinConcern: ["dry", "sensitive"],
    inStock: true,
  },
];

export const collections = [
  {
    slug: "beach",
    name: "Beach",
    tagline: "Carry the Beach Home",
    description: "Inspired by the coast. Infused with ocean minerals and coastal botanicals. Let the sea reshape your ritual.",
    heroImageUrl: "https://images.pexels.com/photos/15569181/pexels-photo-15569181.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    slug: "signature",
    name: "Signature",
    tagline: "Timeless. Classic. Essential.",
    description: "Our flagship collection of everyday essentials. Crafted for those who demand nothing but the best.",
    heroImageUrl: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection?.toLowerCase() === collectionSlug.toLowerCase());
}
