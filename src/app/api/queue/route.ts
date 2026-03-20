import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// GET: All active queues for today
export async function GET() {
  try {
    const sql = getDb();
    const queues = await sql`
      SELECT q.id, q.queue_date, q.session, q.current_token, q.total_tokens,
             q.avg_consultation_minutes, q.status, q.started_at,
             d.name as doctor_name, d.slug as doctor_slug, d.title as doctor_title,
             d.role as doctor_role
      FROM opd_queues q
      JOIN doctors d ON q.doctor_id = d.id
      WHERE q.queue_date = CURRENT_DATE
      ORDER BY q.session, d.display_order
    `;

    // For each queue, get the waiting count
    const enriched = await Promise.all(
      queues.map(async (q) => {
        const waitingCount = await sql`
          SELECT COUNT(*) as count FROM queue_tokens
          WHERE queue_id = ${q.id} AND status = 'waiting'
        `;
        return {
          ...q,
          waiting_count: parseInt(String(waitingCount[0].count)),
        };
      })
    );

    return NextResponse.json({ queues: enriched });
  } catch (error) {
    console.error("Error fetching queues:", error);
    return NextResponse.json({ error: "Failed to fetch queues" }, { status: 500 });
  }
}

// POST: Create a new queue for today (admin/receptionist)
export async function POST(request: NextRequest) {
  try {
    const sql = getDb();
    const { doctor_id, session } = await request.json();

    if (!doctor_id || !session) {
      return NextResponse.json({ error: "doctor_id and session required" }, { status: 400 });
    }

    // Check if queue already exists
    const existing = await sql`
      SELECT id FROM opd_queues
      WHERE queue_date = CURRENT_DATE AND doctor_id = ${doctor_id} AND session = ${session}
    `;
    if (existing.length > 0) {
      return NextResponse.json({ error: "Queue already exists for this doctor/session", queue_id: existing[0].id }, { status: 409 });
    }

    const queue = await sql`
      INSERT INTO opd_queues (doctor_id, session, status)
      VALUES (${doctor_id}, ${session}, 'not_started')
      RETURNING id, queue_date, session, current_token, total_tokens, status
    `;

    return NextResponse.json({ queue: queue[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating queue:", error);
    return NextResponse.json({ error: "Failed to create queue" }, { status: 500 });
  }
}
