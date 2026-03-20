import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const sql = getDb();
    const body = await request.json();

    const { doctor_id, speciality, appointment_date, appointment_time, patient_name, patient_phone, patient_age, condition_description } = body;

    // Validate required fields
    if (!doctor_id || !appointment_date || !appointment_time || !patient_name || !patient_phone) {
      return NextResponse.json(
        { error: "Missing required fields: doctor_id, appointment_date, appointment_time, patient_name, patient_phone" },
        { status: 400 }
      );
    }

    // Check if slot is still available
    const existing = await sql`
      SELECT id FROM appointments
      WHERE doctor_id = ${doctor_id}
        AND appointment_date = ${appointment_date}
        AND appointment_time = ${appointment_time}
        AND status NOT IN ('cancelled')
    `;
    if (existing.length > 0) {
      return NextResponse.json({ error: "This slot has already been booked" }, { status: 409 });
    }

    // Look up speciality ID if name provided
    let speciality_id = null;
    if (speciality) {
      const specs = await sql`
        SELECT id FROM specialities WHERE name = ${speciality} LIMIT 1
      `;
      if (specs.length > 0) speciality_id = specs[0].id;
    }

    // Create or find patient by phone
    const patients = await sql`
      INSERT INTO patients (phone, name, age)
      VALUES (${patient_phone}, ${patient_name}, ${patient_age || null})
      ON CONFLICT (phone) DO UPDATE SET
        name = COALESCE(NULLIF(${patient_name}, ''), patients.name),
        age = COALESCE(${patient_age || null}, patients.age),
        updated_at = NOW()
      RETURNING id
    `;
    const patient_id = patients[0].id;

    // Generate token number for this doctor on this date
    const tokenResult = await sql`
      SELECT COALESCE(MAX(token_number), 0) + 1 as next_token
      FROM appointments
      WHERE doctor_id = ${doctor_id}
        AND appointment_date = ${appointment_date}
        AND status NOT IN ('cancelled')
    `;
    const token_number = tokenResult[0].next_token;

    // Create appointment
    const appointment = await sql`
      INSERT INTO appointments (
        patient_id, doctor_id, speciality_id,
        appointment_date, appointment_time,
        patient_name, patient_phone, patient_age,
        condition_description, token_number,
        status, booking_source
      ) VALUES (
        ${patient_id}, ${doctor_id}, ${speciality_id},
        ${appointment_date}, ${appointment_time},
        ${patient_name}, ${patient_phone}, ${patient_age || null},
        ${condition_description || null}, ${token_number},
        'confirmed', 'web'
      )
      RETURNING id, token_number, appointment_date, appointment_time, status
    `;

    // Get doctor name for confirmation
    const doctor = await sql`SELECT name FROM doctors WHERE id = ${doctor_id}`;

    return NextResponse.json({
      appointment: {
        ...appointment[0],
        doctor_name: doctor[0]?.name,
        patient_name,
        patient_phone,
      },
      message: "Appointment booked successfully",
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sql = getDb();
    const phone = request.nextUrl.searchParams.get("phone");

    if (!phone) {
      return NextResponse.json({ error: "phone query param required" }, { status: 400 });
    }

    const appointments = await sql`
      SELECT a.id, a.appointment_date, a.appointment_time, a.token_number, a.status,
             a.condition_description, a.patient_name,
             d.name as doctor_name, d.title as doctor_title, d.slug as doctor_slug,
             s.name as speciality_name
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      LEFT JOIN specialities s ON a.speciality_id = s.id
      WHERE a.patient_phone = ${phone}
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
      LIMIT 20
    `;

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
