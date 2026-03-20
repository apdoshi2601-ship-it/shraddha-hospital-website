import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// POST: Add a token (walk-in or priority booking)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sql = getDb();
    const { patient_name, patient_phone, appointment_id, is_priority, priority_fee_paid } = await request.json();

    if (!patient_name) {
      return NextResponse.json({ error: "patient_name required" }, { status: 400 });
    }

    // Get next token number
    const tokenResult = await sql`
      SELECT COALESCE(MAX(token_number), 0) + 1 as next_token
      FROM queue_tokens WHERE queue_id = ${params.id}
    `;
    const tokenNum = tokenResult[0].next_token;

    // Insert token
    const token = await sql`
      INSERT INTO queue_tokens (
        queue_id, appointment_id, token_number, patient_name, patient_phone,
        is_priority, priority_fee_paid, status, checked_in_at
      ) VALUES (
        ${params.id}, ${appointment_id || null}, ${tokenNum},
        ${patient_name}, ${patient_phone || null},
        ${is_priority || false}, ${priority_fee_paid || 0},
        'waiting', NOW()
      )
      RETURNING id, token_number, patient_name, is_priority, status
    `;

    // Update total count on queue
    await sql`
      UPDATE opd_queues
      SET total_tokens = total_tokens + 1
      WHERE id = ${params.id}
    `;

    return NextResponse.json({ token: token[0] }, { status: 201 });
  } catch (error) {
    console.error("Error adding token:", error);
    return NextResponse.json({ error: "Failed to add token" }, { status: 500 });
  }
}
