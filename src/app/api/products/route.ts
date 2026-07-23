import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/db-queries";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
