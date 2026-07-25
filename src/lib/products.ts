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
  collection?: string;
  skinConcern?: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "lavender-dreams",
    name: "Lavender Dreams",
    category: "Artisan Soap",
    description: "Handcrafted lavender soap made with organic essential oils and shea butter for a calming, nourishing experience.",
    priceCents: 2400,
    ingredients: ["Sodium Olivate", "Sodium Cocoate", "Aqua", "Butyrospermum Parkii Butter", "Lavandula Angustifolia Oil", "Kaolin"],
    howToUse: "Lather in warm water. Massage gently onto skin. Rinse thoroughly. For external use only.",
    caution: "For external use only. Avoid contact with eyes. Discontinue use if irritation occurs. Store in a cool, dry place.",
    images: [
      "https://images.pexels.com/photos/8128521/pexels-photo-8128521.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/8177939/pexels-photo-8177939.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    badge: "Bestseller",
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
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4154194/pexels-photo-4154194.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    badge: "New",
    collection: "Beach",
    skinConcern: ["normal", "dry"],
    inStock: true,
  },
  {
    id: 3,
    slug: "charcoal-detox",
    name: "Charcoal Detox",
    category: "Artisan Soap",
    description: "Deep-cleansing activated charcoal soap that draws out impurities while maintaining your skin's natural moisture barrier.",
    priceCents: 2800,
    ingredients: ["Sodium Olivate", "Sodium Cocoate", "Aqua", "Activated Charcoal Powder", "Tea Tree Oil", "Kaolin Clay"],
    howToUse: "Lather in warm water. Massage gently onto skin focusing on problem areas. Rinse thoroughly.",
    caution: "For external use only. May be drying for very sensitive skin types. Discontinue use if irritation occurs.",
    images: [
      "https://images.pexels.com/photos/8076393/pexels-photo-8076393.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    badge: "Popular",
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
      "https://images.pexels.com/photos/16749129/pexels-photo-16749129.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/16749131/pexels-photo-16749131.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    badge: "Eco",
    collection: "Beach",
    skinConcern: ["dry", "damaged"],
    inStock: true,
  },
  {
    id: 5,
    slug: "honey-oatmeal",
    name: "Honey Oatmeal",
    category: "Artisan Soap",
    description: "Soothing honey and oatmeal soap for sensitive skin. Gently exfoliates while locking in moisture.",
    priceCents: 2600,
    ingredients: ["Sodium Olivate", "Sodium Cocoate", "Aqua", "Avena Sativa Kernel Flour", "Mel", "Butyrospermum Parkii Butter"],
    howToUse: "Lather in warm water. Massage gently onto skin using circular motions. Rinse thoroughly.",
    caution: "For external use only. Contains natural exfoliants. Avoid use on broken or irritated skin.",
    images: [
      "https://images.pexels.com/photos/6984427/pexels-photo-6984427.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    badge: "Soothing",
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
      "https://images.pexels.com/photos/8178965/pexels-photo-8178965.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    badge: "Natural",
    collection: "Beach",
    skinConcern: ["oily", "acne-prone"],
    inStock: false,
  },
  {
    id: 7,
    slug: "eucalyptus-mint",
    name: "Eucalyptus Mint",
    category: "Artisan Soap",
    description: "Awaken your senses with cooling eucalyptus and peppermint. The perfect morning shower companion.",
    priceCents: 2200,
    ingredients: ["Sodium Olivate", "Sodium Cocoate", "Aqua", "Eucalyptus Globulus Leaf Oil", "Mentha Piperita Oil", "Chlorophyll"],
    howToUse: "Lather in warm water. Massage onto skin. Rinse thoroughly. Follow with moisturizer.",
    caution: "For external use only. Avoid contact with eyes. May cause tingling sensation on sensitive skin.",
    images: [
      "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    collection: "Signature",
    skinConcern: ["normal", "oily"],
    inStock: true,
  },
  {
    id: 8,
    slug: "vanilla-amber",
    name: "Vanilla Amber",
    category: "Artisan Soap",
    description: "Warm vanilla and amber notes combine in this decadent, moisturizing soap bar.",
    priceCents: 2600,
    compareAtPriceCents: 3000,
    ingredients: ["Sodium Olivate", "Sodium Cocoate", "Aqua", "Vanilla Planifolia Extract", "Amber Fragrance Oil", "Kaolin"],
    howToUse: "Lather in warm water. Massage onto skin. Rinse thoroughly.",
    caution: "For external use only. Avoid contact with eyes.",
    images: [
      "https://images.pexels.com/photos/5648100/pexels-photo-5648100.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    badge: "Sale",
    collection: "Signature",
    skinConcern: ["normal", "dry"],
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
