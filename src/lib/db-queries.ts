import { db } from "@/db";
import { products, productImages, productVariants, collections, orders, orderItems } from "@/db/schema";
import { eq, and, asc, desc, like, inArray } from "drizzle-orm";

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
  collection?: string;
  skinConcern?: string[];
  inStock: boolean;
}

export interface OrderResult {
  id: number;
  orderNumber: string;
  date: string;
  status: string;
  total: string;
  items: number;
}

export async function getAllProducts(): Promise<ProductResult[]> {
  const rows = await getAllProductsRaw();
  return Array.from(buildProductMap(rows).values());
}

function buildProductMap(rows: Awaited<ReturnType<typeof getAllProductsRaw>>): Map<number, ProductResult> {
  const map = new Map<number, ProductResult>();

  for (const row of rows) {
    const p = row.product;
    if (!map.has(p.id)) {
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
        caution: "",
        images: [],
        collection: row.collection?.name ?? undefined,
        inStock: true,
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

  return Array.from(buildProductMap(rows).values());
}

export async function getRecentProducts(
  limit: number = 8
): Promise<ProductResult[]> {
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
