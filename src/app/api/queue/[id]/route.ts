import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// GET: Single queue with all tokens
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sql = getDb();

    const queues = await sql`
      SELECT q.*, d.name as doctor_name, d.slug as doctor_slug, d.title as doctor_title
      FROM opd_queues q
      JOIN doctors d ON q.doctor_id = d.id
      WHERE q.id = ${params.id}
    `;
    if (queues.length === 0) {
      return NextResponse.json({ error: "Queue not found" }, { status: 404 });
    }

    const tokens = await sql`
      SELECT id, token_number, patient_name, patient_phone, is_priority,
             status, checked_in_at, consultation_started_at, consultation_ended_at
      FROM queue_tokens
      WHERE queue_id = ${params.id}
      ORDER BY
        CASE WHEN is_priority THEN 0 ELSE 1 END,
        token_number
    `;

    return NextResponse.json({ queue: queues[0], tokens });
  } catch (error) {
    console.error("Error fetching queue:", error);
    return NextResponse.json({ error: "Failed to fetch queue" }, { status: 500 });
  }
}

// PATCH: Update queue status (start, pause, complete)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sql = getDb();
    const { status } = await request.json();

    const validStatuses = ["active", "paused", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: `status must be one of: ${validStatuses.join(", ")}` }, { status: 400 });
    }

    const updated = await sql`
      UPDATE opd_queues
      SET status = ${status}
      ${status === "active" ? sql`, started_at = COALESCE(started_at, NOW())` : sql``}
      WHERE id = ${params.id}
      RETURNING id, status, started_at
    `;

    if (updated.length === 0) {
      return NextResponse.json({ error: "Queue not found" }, { status: 404 });
    }

    return NextResponse.json({ queue: updated[0] });
  } catch (error) {
    console.error("Error updating queue:", error);
    return NextResponse.json({ error: "Failed to update queue" }, { status: 500 });
  }
}
