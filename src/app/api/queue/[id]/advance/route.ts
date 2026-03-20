import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// POST: Advance to next patient
export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sql = getDb();

    // Get current queue state
    const queues = await sql`
      SELECT id, current_token, status FROM opd_queues WHERE id = ${params.id}
    `;
    if (queues.length === 0) {
      return NextResponse.json({ error: "Queue not found" }, { status: 404 });
    }

    const queue = queues[0];
    if (queue.status !== "active") {
      return NextResponse.json({ error: "Queue is not active" }, { status: 400 });
    }

    // Mark current token as completed (if any)
    if (queue.current_token > 0) {
      await sql`
        UPDATE queue_tokens
        SET status = 'completed', consultation_ended_at = NOW()
        WHERE queue_id = ${params.id} AND token_number = ${queue.current_token} AND status = 'in_consultation'
      `;
    }

    // Find next waiting token (priority first, then by token number)
    const nextTokens = await sql`
      SELECT id, token_number, patient_name, is_priority
      FROM queue_tokens
      WHERE queue_id = ${params.id} AND status = 'waiting'
      ORDER BY
        CASE WHEN is_priority THEN 0 ELSE 1 END,
        token_number
      LIMIT 1
    `;

    if (nextTokens.length === 0) {
      // No more patients — mark queue as completed
      await sql`
        UPDATE opd_queues SET status = 'completed' WHERE id = ${params.id}
      `;
      return NextResponse.json({
        message: "All patients served. Queue completed.",
        queue_status: "completed",
        current_token: queue.current_token,
      });
    }

    const nextToken = nextTokens[0];

    // Update the token to in_consultation
    await sql`
      UPDATE queue_tokens
      SET status = 'in_consultation', consultation_started_at = NOW()
      WHERE id = ${nextToken.id}
    `;

    // Update queue current_token
    await sql`
      UPDATE opd_queues
      SET current_token = ${nextToken.token_number}
      WHERE id = ${params.id}
    `;

    // Calculate remaining wait info
    const waitingCount = await sql`
      SELECT COUNT(*) as count FROM queue_tokens
      WHERE queue_id = ${params.id} AND status = 'waiting'
    `;

    return NextResponse.json({
      current_token: nextToken.token_number,
      current_patient: nextToken.patient_name,
      is_priority: nextToken.is_priority,
      waiting_count: parseInt(String(waitingCount[0].count)),
      queue_status: "active",
    });
  } catch (error) {
    console.error("Error advancing queue:", error);
    return NextResponse.json({ error: "Failed to advance queue" }, { status: 500 });
  }
}
