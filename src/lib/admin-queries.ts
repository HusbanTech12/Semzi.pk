import { eq, desc, asc, sql, and, count, sum, gte, lte, inArray } from "drizzle-orm";
import { db } from "@/db";
import {
  collections,
  products,
  productImages,
  productVariants,
  carts,
  cartItems,
  orders,
  orderItems,
  reviews,
} from "@/db/schema";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AdminProductImage {
  id: number;
  productId: number;
  url: string;
  alt: string | null;
  sortOrder: number | null;
}

export interface AdminProductVariant {
  id: number;
  productId: number;
  name: string;
  sku: string;
  priceCents: number;
  inventoryCount: number;
}

export interface AdminProduct {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  priceCents: number;
  compareAtPriceCents: number | null;
  ingredients: string | null;
  howToUse: string | null;
  collectionId: number | null;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  images: AdminProductImage[];
  variants: AdminProductVariant[];
  collectionName: string | null;
}

export interface AdminOrderItem {
  id: number;
  orderId: number;
  variantId: number;
  quantity: number;
  priceCentsAtPurchase: number;
  variantName: string | null;
  variantSku: string | null;
  productName: string | null;
  productSlug: string | null;
}

export interface AdminOrder {
  id: number;
  userId: string | null;
  status: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  shippingAddress: unknown;
  createdAt: Date;
  items: AdminOrderItem[];
}

export interface AdminCustomer {
  userId: string;
  orderCount: number;
  totalSpent: number;
  lastOrder: Date;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  orders: number;
}

export interface DailyOrders {
  day: string;
  orders: number;
}

export interface AdminDashboard {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueByMonth: MonthlyRevenue[];
  ordersByDay: DailyOrders[];
  recentOrders: AdminOrder[];
  topProducts: {
    productId: number;
    productName: string;
    totalSold: number;
    totalRevenue: number;
  }[];
}

export interface CategoryBreakdown {
  collectionName: string;
  productCount: number;
}

export interface HourlyOrders {
  hour: number;
  orders: number;
}

export interface ConversionFunnel {
  visitors: number;
  productViews: number;
  addToCart: number;
  checkout: number;
  purchase: number;
}

export interface TopLocation {
  city: string;
  orderCount: number;
  totalRevenue: number;
}

export interface AdminAnalytics extends Omit<AdminDashboard, "recentOrders" | "topProducts" | "ordersByDay"> {
  categoryBreakdown: CategoryBreakdown[];
  ordersByHour: HourlyOrders[];
  conversionFunnel: ConversionFunnel;
  topLocations: TopLocation[];
}

export interface CreateProductInput {
  slug: string;
  name: string;
  description?: string | null;
  priceCents: number;
  compareAtPriceCents?: number | null;
  ingredients?: string | null;
  howToUse?: string | null;
  collectionId?: number | null;
  isActive?: boolean;
  isFeatured?: boolean;
  images: { url: string; alt?: string | null; sortOrder?: number | null }[];
  variants: { name: string; sku: string; priceCents: number; inventoryCount?: number }[];
}

export interface UpdateProductInput {
  slug?: string;
  name?: string;
  description?: string | null;
  priceCents?: number;
  compareAtPriceCents?: number | null;
  ingredients?: string | null;
  howToUse?: string | null;
  collectionId?: number | null;
  isActive?: boolean;
  isFeatured?: boolean;
  images?: { url: string; alt?: string | null; sortOrder?: number | null }[];
  variants?: { name: string; sku: string; priceCents: number; inventoryCount?: number }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

async function assembleProducts(
  rows: (typeof products.$inferSelect)[]
): Promise<AdminProduct[]> {
  if (rows.length === 0) return [];

  const productIds = rows.map((r) => r.id);

  const [allImages, allVariants, allCollections] = await Promise.all([
    db
      .select()
      .from(productImages)
      .where(inArray(productImages.productId, productIds))
      .orderBy(asc(productImages.sortOrder)),
    db
      .select()
      .from(productVariants)
      .where(inArray(productVariants.productId, productIds))
      .orderBy(asc(productVariants.id)),
    db
      .select()
      .from(collections)
      .where(
        inArray(
          collections.id,
          rows.map((r) => r.collectionId).filter((id): id is number => id !== null)
        )
      ),
  ]);

  const imagesByProduct = new Map<number, AdminProductImage[]>();
  for (const img of allImages) {
    const list = imagesByProduct.get(img.productId) ?? [];
    list.push(img);
    imagesByProduct.set(img.productId, list);
  }

  const variantsByProduct = new Map<number, AdminProductVariant[]>();
  for (const v of allVariants) {
    const list = variantsByProduct.get(v.productId) ?? [];
    list.push(v);
    variantsByProduct.set(v.productId, list);
  }

  const collectionMap = new Map<number, string>();
  for (const c of allCollections) {
    collectionMap.set(c.id, c.name);
  }

  return rows.map((row) => ({
    ...row,
    images: imagesByProduct.get(row.id) ?? [],
    variants: variantsByProduct.get(row.id) ?? [],
    collectionName: row.collectionId !== null ? (collectionMap.get(row.collectionId) ?? null) : null,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. getAdminProducts
// ─────────────────────────────────────────────────────────────────────────────

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const rows = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt));

  return assembleProducts(rows);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. getAdminProductById
// ─────────────────────────────────────────────────────────────────────────────

export async function getAdminProductById(id: number): Promise<AdminProduct | null> {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (rows.length === 0) return null;

  const [assembled] = await assembleProducts(rows);
  return assembled;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. createAdminProduct
// ─────────────────────────────────────────────────────────────────────────────

export async function createAdminProduct(data: CreateProductInput): Promise<number> {
  const [product] = await db
    .insert(products)
    .values({
      slug: data.slug,
      name: data.name,
      description: data.description ?? null,
      priceCents: data.priceCents,
      compareAtPriceCents: data.compareAtPriceCents ?? null,
      ingredients: data.ingredients ?? null,
      howToUse: data.howToUse ?? null,
      collectionId: data.collectionId ?? null,
      isActive: data.isActive ?? true,
      isFeatured: data.isFeatured ?? false,
    })
    .returning({ id: products.id });

  const productId = product.id;

  if (data.images.length > 0) {
    await db.insert(productImages).values(
      data.images.map((img, index) => ({
        productId,
        url: img.url,
        alt: img.alt ?? null,
        sortOrder: img.sortOrder ?? index,
      }))
    );
  }

  if (data.variants.length > 0) {
    await db.insert(productVariants).values(
      data.variants.map((v) => ({
        productId,
        name: v.name,
        sku: v.sku,
        priceCents: v.priceCents,
        inventoryCount: v.inventoryCount ?? 0,
      }))
    );
  }

  return productId;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. updateAdminProduct
// ─────────────────────────────────────────────────────────────────────────────

export async function updateAdminProduct(
  id: number,
  data: UpdateProductInput
): Promise<AdminProduct | null> {
  const updatePayload: Record<string, unknown> = {};
  if (data.slug !== undefined) updatePayload.slug = data.slug;
  if (data.name !== undefined) updatePayload.name = data.name;
  if (data.description !== undefined) updatePayload.description = data.description;
  if (data.priceCents !== undefined) updatePayload.priceCents = data.priceCents;
  if (data.compareAtPriceCents !== undefined) updatePayload.compareAtPriceCents = data.compareAtPriceCents;
  if (data.ingredients !== undefined) updatePayload.ingredients = data.ingredients;
  if (data.howToUse !== undefined) updatePayload.howToUse = data.howToUse;
  if (data.collectionId !== undefined) updatePayload.collectionId = data.collectionId;
  if (data.isActive !== undefined) updatePayload.isActive = data.isActive;
  if (data.isFeatured !== undefined) updatePayload.isFeatured = data.isFeatured;

  if (Object.keys(updatePayload).length > 0) {
    await db.update(products).set(updatePayload).where(eq(products.id, id));
  }

  if (data.images !== undefined) {
    await db.delete(productImages).where(eq(productImages.productId, id));
    if (data.images.length > 0) {
      await db.insert(productImages).values(
        data.images.map((img, index) => ({
          productId: id,
          url: img.url,
          alt: img.alt ?? null,
          sortOrder: img.sortOrder ?? index,
        }))
      );
    }
  }

  if (data.variants !== undefined) {
    await db.delete(productVariants).where(eq(productVariants.productId, id));
    if (data.variants.length > 0) {
      await db.insert(productVariants).values(
        data.variants.map((v) => ({
          productId: id,
          name: v.name,
          sku: v.sku,
          priceCents: v.priceCents,
          inventoryCount: v.inventoryCount ?? 0,
        }))
      );
    }
  }

  return getAdminProductById(id);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. deleteAdminProduct
// ─────────────────────────────────────────────────────────────────────────────

export async function deleteAdminProduct(id: number): Promise<void> {
  const variantRows = await db
    .select({ id: productVariants.id })
    .from(productVariants)
    .where(eq(productVariants.productId, id));
  const variantIds = variantRows.map((v) => v.id);

  if (variantIds.length > 0) {
    await db.delete(cartItems).where(inArray(cartItems.variantId, variantIds));
    await db.delete(orderItems).where(inArray(orderItems.variantId, variantIds));
  }

  await db.delete(productImages).where(eq(productImages.productId, id));
  await db.delete(productVariants).where(eq(productVariants.productId, id));
  await db.delete(products).where(eq(products.id, id));
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. getAdminOrders
// ─────────────────────────────────────────────────────────────────────────────

export async function getAdminOrders(): Promise<AdminOrder[]> {
  const orderRows = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  if (orderRows.length === 0) return [];

  const orderIds = orderRows.map((o) => o.id);

  const items = await db
    .select({
      id: orderItems.id,
      orderId: orderItems.orderId,
      variantId: orderItems.variantId,
      quantity: orderItems.quantity,
      priceCentsAtPurchase: orderItems.priceCentsAtPurchase,
      variantName: productVariants.name,
      variantSku: productVariants.sku,
      productName: products.name,
      productSlug: products.slug,
    })
    .from(orderItems)
    .innerJoin(productVariants, eq(orderItems.variantId, productVariants.id))
    .leftJoin(products, eq(productVariants.productId, products.id))
    .where(inArray(orderItems.orderId, orderIds));

  const itemsByOrder = new Map<number, AdminOrderItem[]>();
  for (const item of items) {
    const list = itemsByOrder.get(item.orderId) ?? [];
    list.push(item);
    itemsByOrder.set(item.orderId, list);
  }

  return orderRows.map((order) => ({
    ...order,
    items: itemsByOrder.get(order.id) ?? [],
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. updateOrderStatus
// ─────────────────────────────────────────────────────────────────────────────

export async function updateOrderStatus(
  id: number,
  status: string
): Promise<AdminOrder | null> {
  await db.update(orders).set({ status }).where(eq(orders.id, id));

  const orderRows = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1);

  if (orderRows.length === 0) return null;

  const [order] = orderRows;

  const items = await db
    .select({
      id: orderItems.id,
      orderId: orderItems.orderId,
      variantId: orderItems.variantId,
      quantity: orderItems.quantity,
      priceCentsAtPurchase: orderItems.priceCentsAtPurchase,
      variantName: productVariants.name,
      variantSku: productVariants.sku,
      productName: products.name,
      productSlug: products.slug,
    })
    .from(orderItems)
    .innerJoin(productVariants, eq(orderItems.variantId, productVariants.id))
    .leftJoin(products, eq(productVariants.productId, products.id))
    .where(eq(orderItems.orderId, id));

  return { ...order, items };
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. getAdminCustomers
// ─────────────────────────────────────────────────────────────────────────────

export async function getAdminCustomers(): Promise<AdminCustomer[]> {
  return db
    .select({
      userId: orders.userId,
      orderCount: count(orders.id),
      totalSpent: sum(orders.totalCents),
      lastOrder: sql<Date>`max(${orders.createdAt})`,
    })
    .from(orders)
    .where(sql`${orders.userId} IS NOT NULL`)
    .groupBy(orders.userId)
    .orderBy(desc(sql<Date>`max(${orders.createdAt})`))
    .then((rows) =>
      rows.map((row) => ({
        userId: row.userId!,
        orderCount: Number(row.orderCount),
        totalSpent: Number(row.totalSpent),
        lastOrder: new Date(row.lastOrder),
      }))
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. getAdminDashboard
// ─────────────────────────────────────────────────────────────────────────────

export async function getAdminDashboard(): Promise<AdminDashboard> {
  const [
    kpiRow,
    monthlyRows,
    dailyRows,
    recentOrderRows,
    topProductRows,
    productCountRow,
    customerCountRow,
  ] = await Promise.all([
    db
      .select({
        totalRevenue: sql<number>`coalesce(sum(${orders.totalCents}), 0)`,
        totalOrders: count(orders.id),
      })
      .from(orders),

    db
      .select({
        month: sql<string>`to_char(${orders.createdAt}, 'YYYY-MM')`,
        revenue: sql<number>`coalesce(sum(${orders.totalCents}), 0)`,
        orders: count(orders.id),
      })
      .from(orders)
      .groupBy(sql`to_char(${orders.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`to_char(${orders.createdAt}, 'YYYY-MM')`),

    db
      .select({
        day: sql<string>`to_char(${orders.createdAt}, 'YYYY-MM-DD')`,
        orders: count(orders.id),
      })
      .from(orders)
      .where(gte(orders.createdAt, sql`now() - interval '7 days'`))
      .groupBy(sql`to_char(${orders.createdAt}, 'YYYY-MM-DD')`)
      .orderBy(sql`to_char(${orders.createdAt}, 'YYYY-MM-DD')`),

    db.select().from(orders).orderBy(desc(orders.createdAt)).limit(10),

    db
      .select({
        productId: productVariants.productId,
        productName: products.name,
        totalSold: sql<number>`sum(${orderItems.quantity})`,
        totalRevenue: sql<number>`sum(${orderItems.priceCentsAtPurchase} * ${orderItems.quantity})`,
      })
      .from(orderItems)
      .innerJoin(productVariants, eq(orderItems.variantId, productVariants.id))
      .innerJoin(products, eq(productVariants.productId, products.id))
      .groupBy(productVariants.productId, products.name)
      .orderBy(desc(sql`sum(${orderItems.quantity})`))
      .limit(5),

    db.select({ c: count(products.id) }).from(products),

    db
      .select({ c: sql<number>`count(distinct ${orders.userId})` })
      .from(orders)
      .where(sql`${orders.userId} IS NOT NULL`),
  ]);

  const recentIds = recentOrderRows.map((o) => o.id);
  let recentItems: {
    orderId: number;
    variantName: string | null;
    productName: string | null;
  }[] = [];

  if (recentIds.length > 0) {
    recentItems = await db
      .select({
        orderId: orderItems.orderId,
        variantName: productVariants.name,
        productName: products.name,
      })
      .from(orderItems)
      .innerJoin(productVariants, eq(orderItems.variantId, productVariants.id))
      .innerJoin(products, eq(productVariants.productId, products.id))
      .where(inArray(orderItems.orderId, recentIds));
  }

  const firstItemByOrder = new Map<number, { variantName: string | null; productName: string | null }>();
  for (const item of recentItems) {
    if (!firstItemByOrder.has(item.orderId)) {
      firstItemByOrder.set(item.orderId, {
        variantName: item.variantName,
        productName: item.productName,
      });
    }
  }

  const kpi = kpiRow[0];

  return {
    totalRevenue: Number(kpi.totalRevenue),
    totalOrders: Number(kpi.totalOrders),
    totalProducts: Number(productCountRow[0].c),
    totalCustomers: Number(customerCountRow[0].c),
    revenueByMonth: monthlyRows.map((r) => ({
      month: r.month,
      revenue: Number(r.revenue),
      orders: Number(r.orders),
    })),
    ordersByDay: dailyRows.map((r) => ({
      day: r.day,
      orders: Number(r.orders),
    })),
    recentOrders: recentOrderRows.map((order) => {
      const first = firstItemByOrder.get(order.id);
      const items: AdminOrderItem[] = first
        ? [
            {
              id: 0,
              orderId: order.id,
              variantId: 0,
              quantity: 0,
              priceCentsAtPurchase: 0,
              variantName: first.variantName,
              variantSku: null,
              productName: first.productName,
              productSlug: null,
            },
          ]
        : [];
      return { ...order, items };
    }),
    topProducts: topProductRows.map((r) => ({
      productId: r.productId,
      productName: r.productName ?? "Unknown",
      totalSold: Number(r.totalSold),
      totalRevenue: Number(r.totalRevenue),
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. getAdminAnalytics
// ─────────────────────────────────────────────────────────────────────────────

export async function getAdminAnalytics(): Promise<AdminAnalytics> {
  const [
    kpiRow,
    monthlyRows,
    categoryRows,
    hourlyRows,
    locationRows,
    productCountRow,
    customerCountRow,
  ] = await Promise.all([
    db
      .select({
        totalRevenue: sql<number>`coalesce(sum(${orders.totalCents}), 0)`,
        totalOrders: count(orders.id),
      })
      .from(orders),

    db
      .select({
        month: sql<string>`to_char(${orders.createdAt}, 'YYYY-MM')`,
        revenue: sql<number>`coalesce(sum(${orders.totalCents}), 0)`,
        orders: count(orders.id),
      })
      .from(orders)
      .groupBy(sql`to_char(${orders.createdAt}, 'YYYY-MM')`)
      .orderBy(sql`to_char(${orders.createdAt}, 'YYYY-MM')`),

    db
      .select({
        collectionName: sql<string>`coalesce(${collections.name}, 'Uncategorized')`,
        productCount: count(products.id),
      })
      .from(products)
      .leftJoin(collections, eq(products.collectionId, collections.id))
      .groupBy(collections.name)
      .orderBy(desc(count(products.id))),

    db
      .select({
        hour: sql<number>`extract(hour from ${orders.createdAt})`,
        orders: count(orders.id),
      })
      .from(orders)
      .groupBy(sql`extract(hour from ${orders.createdAt})`)
      .orderBy(sql`extract(hour from ${orders.createdAt})`),

    db
      .select({
        city: sql<string>`coalesce(${orders.shippingAddress}->>'city', 'Unknown')`,
        orderCount: count(orders.id),
        totalRevenue: sql<number>`coalesce(sum(${orders.totalCents}), 0)`,
      })
      .from(orders)
      .groupBy(sql`${orders.shippingAddress}->>'city'`)
      .orderBy(desc(count(orders.id)))
      .limit(10),

    db.select({ c: count(products.id) }).from(products),

    db
      .select({ c: sql<number>`count(distinct ${orders.userId})` })
      .from(orders)
      .where(sql`${orders.userId} IS NOT NULL`),
  ]);

  const kpi = kpiRow[0];

  return {
    totalRevenue: Number(kpi.totalRevenue),
    totalOrders: Number(kpi.totalOrders),
    totalProducts: Number(productCountRow[0].c),
    totalCustomers: Number(customerCountRow[0].c),
    revenueByMonth: monthlyRows.map((r) => ({
      month: r.month,
      revenue: Number(r.revenue),
      orders: Number(r.orders),
    })),
    categoryBreakdown: categoryRows.map((r) => ({
      collectionName: r.collectionName,
      productCount: Number(r.productCount),
    })),
    ordersByHour: hourlyRows.map((r) => ({
      hour: Number(r.hour),
      orders: Number(r.orders),
    })),
    conversionFunnel: {
      visitors: 0,
      productViews: 0,
      addToCart: 0,
      checkout: 0,
      purchase: Number(kpi.totalOrders),
    },
    topLocations: locationRows.map((r) => ({
      city: r.city,
      orderCount: Number(r.orderCount),
      totalRevenue: Number(r.totalRevenue),
    })),
  };
}
