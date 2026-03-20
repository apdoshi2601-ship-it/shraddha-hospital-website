import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const sql = getDb();
    const doctors = await sql`
      SELECT id, name, slug, title, qualifications, specialisation,
             experience, fellowships, affiliation, role, badge,
             highlight_tags, photo_url, display_order
      FROM doctors
      WHERE is_active = true
      ORDER BY display_order
    `;
    return NextResponse.json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}
