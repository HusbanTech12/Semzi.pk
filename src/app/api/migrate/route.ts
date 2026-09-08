import { NextResponse } from "next/server";

export async function GET() {
  const { default: postgres } = await import("postgres");
  const { readFileSync } = await import("fs");
  const { join } = await import("path");

  const sql = postgres(process.env.DATABASE_URL!, { ssl: "require", idle_timeout: 30 });

  try {
    const migration = readFileSync(join(process.cwd(), "drizzle/0000_sticky_blockbuster.sql"), "utf8");
    const statements = migration
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter(Boolean);

    for (const stmt of statements) {
      await sql.unsafe(stmt);
    }

    await sql.end();
    return NextResponse.json({ success: true, message: "Migration completed" });
  } catch (e: any) {
    await sql.end().catch(() => {});
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
