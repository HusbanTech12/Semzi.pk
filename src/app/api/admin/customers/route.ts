import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getAdminCustomers } from "@/lib/admin-queries";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const customers = await getAdminCustomers();
    return NextResponse.json({ customers });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
