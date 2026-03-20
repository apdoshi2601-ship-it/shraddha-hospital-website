import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const sql = getDb();
    const doctors = await sql`
      SELECT id, name, slug, title, qualifications, specialisation,
             experience, fellowships, affiliation, role, badge,
             highlight_tags, photo_url
      FROM doctors
      WHERE slug = ${params.slug} AND is_active = true
      LIMIT 1
    `;

    if (doctors.length === 0) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({ doctor: doctors[0] });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json({ error: "Failed to fetch doctor" }, { status: 500 });
  }
}
