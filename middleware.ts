import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const ADMIN_EMAILS = ["admin@semzi.pk"];

export default async function middleware() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  // In production, check against admin role in database
  // For now, allow all authenticated users to access admin
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
