import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sql = getDb();

      async function sendUpdate() {
        try {
          const queues = await sql`
            SELECT q.id, q.current_token, q.total_tokens, q.status,
                   q.avg_consultation_minutes, q.session,
                   d.name as doctor_name, d.slug as doctor_slug
            FROM opd_queues q
            JOIN doctors d ON q.doctor_id = d.id
            WHERE q.queue_date = CURRENT_DATE
            ORDER BY q.session, d.display_order
          `;

          const enriched = await Promise.all(
            queues.map(async (q) => {
              const waitResult = await sql`
                SELECT COUNT(*) as count FROM queue_tokens
                WHERE queue_id = ${q.id} AND status = 'waiting'
              `;
              const currentPatient = await sql`
                SELECT patient_name FROM queue_tokens
                WHERE queue_id = ${q.id} AND status = 'in_consultation'
                LIMIT 1
              `;
              return {
                id: q.id,
                doctor_name: q.doctor_name,
                doctor_slug: q.doctor_slug,
                session: q.session,
                current_token: q.current_token,
                total_tokens: q.total_tokens,
                waiting_count: parseInt(String(waitResult[0].count)),
                status: q.status,
                avg_wait_minutes: q.avg_consultation_minutes,
                current_patient_name: currentPatient[0]?.patient_name || null,
              };
            })
          );

          const data = `event: queue_update\ndata: ${JSON.stringify({ queues: enriched, timestamp: new Date().toISOString() })}\n\n`;
          controller.enqueue(encoder.encode(data));
        } catch (error) {
          console.error("SSE error:", error);
        }
      }

      // Send initial data immediately
      await sendUpdate();

      // Poll every 5 seconds
      const interval = setInterval(sendUpdate, 5000);

      // Send heartbeat every 30s to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        } catch {
          clearInterval(interval);
          clearInterval(heartbeat);
        }
      }, 30000);

      // Cleanup on close
      const cleanup = () => {
        clearInterval(interval);
        clearInterval(heartbeat);
      };

      // Auto-close after 5 minutes (client will reconnect)
      setTimeout(() => {
        cleanup();
        try {
          controller.close();
        } catch {}
      }, 5 * 60 * 1000);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
