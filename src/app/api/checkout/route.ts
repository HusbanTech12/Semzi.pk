import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createOrder } from "@/lib/db-queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = await createOrder({
      userId: body.userId,
      subtotalCents: body.subtotalCents,
      shippingCents: body.shippingCents ?? 0,
      totalCents: body.totalCents,
      shippingAddress: body.shippingAddress,
      items: body.items ?? [],
    });

    return NextResponse.json({
      success: true,
      orderId: `SEMZI-${orderId.toString().padStart(4, "0")}`,
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
