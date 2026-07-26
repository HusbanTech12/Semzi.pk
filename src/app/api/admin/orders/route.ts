import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Mock orders data - in production this would come from the database
const orders = [
  { id: "ORD-2847", customer: "Sarah Laurent", email: "sarah@example.com", product: "Lavender Dreams", quantity: 2, amount: 4800, status: "Delivered", date: "2026-07-26", payment: "Paid" },
  { id: "ORD-2846", customer: "James Carter", email: "james@example.com", product: "Rose Petal Elixir", quantity: 1, amount: 3800, status: "Shipped", date: "2026-07-26", payment: "Paid" },
  { id: "ORD-2845", customer: "Amara Osei", email: "amara@example.com", product: "Charcoal Detox", quantity: 3, amount: 8400, status: "Processing", date: "2026-07-25", payment: "Paid" },
  { id: "ORD-2844", customer: "Michael Chen", email: "michael@example.com", product: "Coconut Silk", quantity: 1, amount: 3400, status: "Delivered", date: "2026-07-25", payment: "Paid" },
  { id: "ORD-2843", customer: "Emma Wilson", email: "emma@example.com", product: "Honey Oatmeal", quantity: 2, amount: 5200, status: "Shipped", date: "2026-07-24", payment: "Paid" },
];

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ orders });
}

export async function PATCH(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { orderId, status } = body;

  // In production, update the order in the database
  return NextResponse.json({ success: true, orderId, status });
}
