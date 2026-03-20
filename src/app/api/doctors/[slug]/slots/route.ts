import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const sql = getDb();
    const dateParam = request.nextUrl.searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json({ error: "date query param required (YYYY-MM-DD)" }, { status: 400 });
    }

    // Get doctor
    const doctors = await sql`
      SELECT id, name, role FROM doctors WHERE slug = ${params.slug} AND is_active = true LIMIT 1
    `;
    if (doctors.length === 0) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }
    const doctor = doctors[0];

    // Check for schedule override (blocked day)
    const overrides = await sql`
      SELECT is_available, start_time, end_time FROM schedule_overrides
      WHERE doctor_id = ${doctor.id} AND override_date = ${dateParam}
    `;
    if (overrides.length > 0 && !overrides[0].is_available) {
      return NextResponse.json({ slots: [], message: overrides[0].reason || "Doctor unavailable on this date" });
    }

    // Get the day of week (0=Sun, 1=Mon, ..., 6=Sat)
    const dateObj = new Date(dateParam + "T00:00:00");
    const dayOfWeek = dateObj.getDay();

    // Get schedules: recurring for this day OR one-time for this date
    const schedules = await sql`
      SELECT start_time, end_time, slot_duration_minutes, max_patients_per_slot, notes
      FROM doctor_schedules
      WHERE doctor_id = ${doctor.id}
        AND is_active = true
        AND (
          (schedule_type = 'recurring' AND day_of_week = ${dayOfWeek})
          OR
          (schedule_type = 'one_time' AND specific_date = ${dateParam})
        )
      ORDER BY start_time
    `;

    if (schedules.length === 0) {
      return NextResponse.json({ slots: [], message: "No schedule for this date" });
    }

    // Get existing appointments for this doctor on this date
    const bookedSlots = await sql`
      SELECT appointment_time FROM appointments
      WHERE doctor_id = ${doctor.id}
        AND appointment_date = ${dateParam}
        AND status NOT IN ('cancelled')
    `;
    const bookedTimes = new Set(
      bookedSlots.map((b) => String(b.appointment_time).slice(0, 5))
    );

    // Generate slots from schedules
    const slots: { time: string; available: boolean }[] = [];

    for (const schedule of schedules) {
      const startParts = schedule.start_time.split(":");
      const endParts = schedule.end_time.split(":");
      const startMin = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
      const endMin = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
      const duration = schedule.slot_duration_minutes;

      for (let t = startMin; t + duration <= endMin; t += duration) {
        const hours = Math.floor(t / 60).toString().padStart(2, "0");
        const mins = (t % 60).toString().padStart(2, "0");
        const timeStr = `${hours}:${mins}`;
        slots.push({
          time: timeStr,
          available: !bookedTimes.has(timeStr),
        });
      }
    }

    return NextResponse.json({
      doctor: { id: doctor.id, name: doctor.name, role: doctor.role },
      date: dateParam,
      slots,
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json({ error: "Failed to fetch slots" }, { status: 500 });
  }
}
