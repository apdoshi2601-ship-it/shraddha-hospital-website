"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

interface Props {
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  onSuccess: (appointment: BookedAppointment) => void;
}

export interface BookedAppointment {
  id: string;
  token_number: number;
  appointment_date: string;
  appointment_time: string;
  doctor_name: string;
  patient_name: string;
  patient_phone: string;
}

export default function BookingForm({ doctorId, doctorName, date, time, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor_id: doctorId,
          appointment_date: date,
          appointment_time: time,
          patient_name: name,
          patient_phone: phone,
          patient_age: age ? parseInt(age) : null,
          condition_description: condition || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to book appointment");
        setLoading(false);
        return;
      }

      onSuccess(data.appointment);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
      setLoading(false);
    }
  }

  function formatTime12(t: string) {
    const [h, m] = t.split(":").map(Number);
    return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
  }

  function formatDate(d: string) {
    return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-primary-light/50 rounded-xl p-4 border border-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle size={16} className="text-primary" />
          <span className="text-sm font-semibold text-primary">Your Selection</span>
        </div>
        <div className="text-sm text-text space-y-1">
          <p><strong>Doctor:</strong> {doctorName}</p>
          <p><strong>Date:</strong> {formatDate(date)}</p>
          <p><strong>Time:</strong> {formatTime12(time)}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label" htmlFor="book-name">Full Name *</label>
          <input
            className="form-input"
            id="book-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor="book-phone">Phone Number *</label>
            <input
              className="form-input"
              id="book-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="book-age">Age</label>
            <input
              className="form-input"
              id="book-age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              min="1"
              max="120"
            />
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor="book-condition">Describe Your Condition (optional)</label>
          <textarea
            className="form-input"
            id="book-condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            rows={3}
            placeholder="e.g., Lower back pain for 6 months, difficulty walking..."
          />
        </div>

        {error && (
          <div className="bg-red-50 text-emergency text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-full btn-lg"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Booking...
            </>
          ) : (
            "Confirm Appointment"
          )}
        </button>

        <p className="text-xs text-text-muted text-center">
          You&apos;ll receive a WhatsApp confirmation shortly after booking.
        </p>
      </form>
    </div>
  );
}
