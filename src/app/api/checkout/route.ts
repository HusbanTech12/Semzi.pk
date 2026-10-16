import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createOrder } from "@/lib/db-queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId: clerkUserId } = await auth();

    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    const subtotalCents = Number(body.subtotalCents);
    const shippingCents = Number(body.shippingCents ?? 0);
    const totalCents = Number(body.totalCents);

    if (
      !Number.isFinite(subtotalCents) ||
      !Number.isFinite(totalCents) ||
      subtotalCents < 0 ||
      totalCents < 0
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid order totals" },
        { status: 400 }
      );
    }

    const orderId = await createOrder({
      userId: clerkUserId ?? body.userId ?? undefined,
      subtotalCents,
      shippingCents: Number.isFinite(shippingCents) ? shippingCents : 0,
      totalCents,
      shippingAddress: body.shippingAddress ?? null,
      items: items.map(
        (item: {
          variantId: number;
          productId?: number;
          quantity: number;
          priceCents: number;
        }) => ({
          variantId: Number(item.variantId),
          productId:
            item.productId !== undefined ? Number(item.productId) : undefined,
          quantity: Number(item.quantity),
          priceCents: Number(item.priceCents),
        })
      ),
    });

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber: `SEMZI-${orderId.toString().padStart(4, "0")}`,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create order";
    console.error("Checkout error:", e);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
