import { db } from "@/db";
import { products, productImages, productVariants, collections, orders, orderItems } from "@/db/schema";
import { products as catalogProducts } from "@/lib/products";
import { eq, and, asc, desc } from "drizzle-orm";

export interface ProductResult {
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
  createdAt?: string;
}

export interface OrderResult {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  total: string;
  items: number;
}

function catalogFallback(): ProductResult[] {
  return catalogProducts.map((product) => ({ ...product }));
}

async function withCatalogFallback(
  query: () => Promise<ProductResult[]>,
  fallback: () => ProductResult[] = catalogFallback
): Promise<ProductResult[]> {
  try {
    return await query();
  } catch (error) {
    console.error("Database product query failed; using catalog fallback.", error);
    return fallback();
  }
}

export async function getAllProducts(): Promise<ProductResult[]> {
  return withCatalogFallback(async () => {
    const rows = await getAllProductsRaw();
    return Array.from(buildProductMap(rows).values());
  });
}

function buildProductMap(rows: Awaited<ReturnType<typeof getAllProductsRaw>>): Map<number, ProductResult> {
  const map = new Map<number, ProductResult>();

  const taglines: Record<string, string> = {
    "beach": "A Ritual of Softness, Crafted by Hand.",
    "sea-voyage": "A Ritual of Softness, Crafted by Hand.",
    "coral": "A Ritual of Softness, Crafted by Hand.",
    "cloud": "A Ritual of Softness, Crafted by Hand.",
    "flora": "A Ritual of Softness, Crafted by Hand.",
    "goat-milk-aloe-soap": "Milk-Rich Softness, Naturally Refined.",
  };

  const catalogBySlug = new Map(catalogProducts.map((item) => [item.slug, item]));

  for (const row of rows) {
    const p = row.product;
    if (!map.has(p.id)) {
      const catalog = catalogBySlug.get(p.slug);
      map.set(p.id, {
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category ?? "Artisan Soap",
        description: p.description ?? "",
        priceCents: p.priceCents,
        compareAtPriceCents: p.compareAtPriceCents ?? undefined,
        ingredients: (p.ingredients ?? "").split(", ").filter(Boolean),
        howToUse: p.howToUse ?? "",
        caution: catalog?.caution ?? "",
        images: [],
        badge: catalog?.badge,
        tagline: taglines[p.slug] ?? catalog?.tagline ?? undefined,
        collection: row.collection?.name ?? catalog?.collection ?? undefined,
        skinConcern: catalog?.skinConcern,
        inStock: true,
        createdAt: p.createdAt?.toISOString(),
      });
    }

    const entry = map.get(p.id)!;
    if (row.image && !entry.images.includes(row.image.url)) {
      entry.images.push(row.image.url);
    }

    if (row.variant) {
      entry.priceCents = row.variant.priceCents;
      entry.inStock = row.variant.inventoryCount > 0;
    }
  }

  for (const entry of map.values()) {
    const catalog =
      catalogBySlug.get(entry.slug) ??
      (entry.slug === "goat-milk-aloe-soap"
        ? catalogBySlug.get("nourish-goat-milk-aloe")
        : undefined);
    if (!catalog?.images?.length) continue;
    const preferCatalog =
      entry.slug === "nourish-goat-milk-aloe" ||
      entry.slug === "goat-milk-aloe-soap" ||
      entry.slug === "clarity" ||
      entry.slug === "balance" ||
      entry.slug === "restore" ||
      entry.images.length === 0 ||
      entry.images.every((url) => url.startsWith("http"));
    if (preferCatalog) {
      entry.images = [...catalog.images];
    }
  }

  return map;
}

type AwaitedAllProductsRaw = {
  product: typeof products.$inferSelect;
  image: typeof productImages.$inferSelect | null;
  variant: typeof productVariants.$inferSelect | null;
  collection: typeof collections.$inferSelect | null;
}[];

async function getAllProductsRaw() {
  return db
    .select({
      product: products,
      image: productImages,
      variant: productVariants,
      collection: collections,
    })
    .from(products)
    .leftJoin(productImages, eq(productImages.productId, products.id))
    .leftJoin(productVariants, eq(productVariants.productId, products.id))
    .leftJoin(collections, eq(collections.id, products.collectionId))
    .where(eq(products.isActive, true))
    .orderBy(asc(products.id));
}

export async function getFeaturedProducts(): Promise<ProductResult[]> {
  return withCatalogFallback(async () => {
    const rows = await db
      .select({
        product: products,
        image: productImages,
        variant: productVariants,
        collection: collections,
      })
      .from(products)
      .leftJoin(productImages, eq(productImages.productId, products.id))
      .leftJoin(productVariants, eq(productVariants.productId, products.id))
      .leftJoin(collections, eq(collections.id, products.collectionId))
      .where(and(eq(products.isActive, true), eq(products.isFeatured, true)))
      .orderBy(asc(products.id));

    const featured = Array.from(buildProductMap(rows).values());
    if (featured.length > 0) return featured;

    return catalogFallback()
      .filter((p) => p.inStock && p.category !== "Shampoo" && p.category !== "Glycerin Soap")
      .slice(0, 4);
  });
}

export async function getRecentProducts(
  limit: number = 8
): Promise<ProductResult[]> {
  return withCatalogFallback(async () => {
    const rows = await db
      .select({
        product: products,
        image: productImages,
        variant: productVariants,
        collection: collections,
      })
      .from(products)
      .leftJoin(productImages, eq(productImages.productId, products.id))
      .leftJoin(productVariants, eq(productVariants.productId, products.id))
      .leftJoin(collections, eq(collections.id, products.collectionId))
      .where(eq(products.isActive, true))
      .orderBy(desc(products.createdAt))
      .limit(limit);

    return Array.from(buildProductMap(rows).values());
  }, () => catalogFallback().slice(0, limit));
}

export async function getProductBySlug(slug: string): Promise<ProductResult | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug);
}

export async function getOrdersByUser(userId: string): Promise<OrderResult[]> {
  const rows = await db
    .select()
    .from(orders)
    .leftJoin(orderItems, eq(orderItems.orderId, orders.id))
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));

  const map = new Map<number, OrderResult>();

  for (const row of rows) {
    const o = row.orders;
    if (!map.has(o.id)) {
      map.set(o.id, {
        id: o.id,
        orderNumber: `SEMZI-${o.id.toString().padStart(4, "0")}`,
        date: o.createdAt?.toISOString().split("T")[0] ?? "",
        status: o.status,
        total: `$${(o.totalCents / 100).toFixed(0)}`,
        items: 0,
      });
    }
    const entry = map.get(o.id)!;
    entry.items += row.order_items?.quantity ?? 0;
  }

  return Array.from(map.values());
}

export async function createOrder(data: {
  userId?: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  shippingAddress?: Record<string, unknown>;
  items: { variantId: number; quantity: number; priceCents: number }[];
}): Promise<number> {
  const [order] = await db
    .insert(orders)
    .values({
      userId: data.userId,
      subtotalCents: data.subtotalCents,
      shippingCents: data.shippingCents,
      totalCents: data.totalCents,
      shippingAddress: data.shippingAddress ?? null,
    })
    .returning({ id: orders.id });

  for (const item of data.items) {
    await db.insert(orderItems).values({
      orderId: order.id,
      variantId: item.variantId,
      quantity: item.quantity,
      priceCentsAtPurchase: item.priceCents,
    });
  }

  return order.id;
}
