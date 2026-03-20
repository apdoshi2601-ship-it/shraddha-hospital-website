import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const sql = getDb();
    const visits = await sql`
      SELECT d.name as doctor_name, d.slug as doctor_slug, d.affiliation,
             ds.specific_date, ds.notes
      FROM doctor_schedules ds
      JOIN doctors d ON ds.doctor_id = d.id
      WHERE ds.schedule_type = 'one_time'
        AND ds.specific_date >= CURRENT_DATE
        AND ds.is_active = true
        AND d.is_active = true
      ORDER BY ds.specific_date
      LIMIT 5
    `;
    return NextResponse.json({ visits });
  } catch (error) {
    console.error("Error fetching upcoming visits:", error);
    return NextResponse.json({ visits: [] });
  }
}
