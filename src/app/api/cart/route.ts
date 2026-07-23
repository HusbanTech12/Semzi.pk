import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/db";
import { carts, cartItems, productVariants } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ items: [] });
  }

  const cart = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, userId))
    .limit(1);

  if (cart.length === 0) {
    return NextResponse.json({ items: [] });
  }

  const items = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.cartId, cart[0].id));

  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const { userId, variantId, quantity } = await request.json();

  let cart = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, userId))
    .limit(1);

  let cartId: number;
  if (cart.length === 0) {
    const [newCart] = await db.insert(carts).values({ userId }).returning({ id: carts.id });
    cartId = newCart.id;
  } else {
    cartId = cart[0].id;
  }

  const existing = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.cartId, cartId), eq(cartItems.variantId, variantId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(cartItems)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItems.id, existing[0].id));
  } else {
    await db.insert(cartItems).values({ cartId, variantId, quantity });
  }

  return NextResponse.json({ success: true });
}
