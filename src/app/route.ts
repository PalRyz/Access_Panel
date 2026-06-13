import { readFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  // Light DB ping to keep parity with the starter health convention.
  try {
    await db.execute(sql`select 1`);
  } catch {
    // Ignore — the standalone HTML app doesn't depend on the DB.
  }

  const filePath = path.join(process.cwd(), "public", "access-manager.html");
  const html = await readFile(filePath, "utf8");

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
