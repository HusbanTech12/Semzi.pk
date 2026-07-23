import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOrdersByUser, createOrder } from "@/lib/db-queries";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ orders: [] });
  }

  const orders = await getOrdersByUser(userId);
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = await createOrder(body);
    return NextResponse.json({ success: true, orderId });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
