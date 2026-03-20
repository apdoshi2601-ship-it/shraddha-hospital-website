"use client";

import { CheckCircle, Calendar, Clock, User, Hash, MessageCircle, Phone } from "lucide-react";
import type { BookedAppointment } from "./BookingForm";

interface Props {
  appointment: BookedAppointment;
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

export default function BookingConfirmation({ appointment }: Props) {
  const whatsappMsg = encodeURIComponent(
    `Hi, I have booked an appointment at Shraddha Institute.\n\nToken: #${appointment.token_number}\nDoctor: ${appointment.doctor_name}\nDate: ${formatDate(appointment.appointment_date)}\nTime: ${formatTime12(appointment.appointment_time)}\nName: ${appointment.patient_name}`
  );

  return (
    <div className="text-center space-y-6">
      {/* Success icon */}
      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle size={40} className="text-emerald-500" />
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold text-text mb-2">
          Appointment Confirmed!
        </h2>
        <p className="text-text-muted text-sm">
          Your appointment has been booked successfully. Please save these details.
        </p>
      </div>

      {/* Details card */}
      <div className="bg-surface-alt rounded-2xl p-6 text-left space-y-4 max-w-sm mx-auto border border-border/50">
        <div className="flex items-center gap-3">
          <Hash size={18} className="text-primary" />
          <div>
            <div className="text-xs text-text-muted">Token Number</div>
            <div className="text-3xl font-bold font-display text-primary">
              #{appointment.token_number}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <User size={16} className="text-text-muted" />
            <div>
              <div className="text-xs text-text-muted">Doctor</div>
              <div className="text-sm font-semibold">{appointment.doctor_name}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-text-muted" />
            <div>
              <div className="text-xs text-text-muted">Date</div>
              <div className="text-sm font-semibold">{formatDate(appointment.appointment_date)}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={16} className="text-text-muted" />
            <div>
              <div className="text-xs text-text-muted">Time</div>
              <div className="text-sm font-semibold">{formatTime12(appointment.appointment_time)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
        <a
          href={`https://wa.me/919637711122?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-full bg-whatsapp text-white hover:bg-[#1DAE50]"
        >
          <MessageCircle size={18} /> Share on WhatsApp
        </a>
        <a href="tel:+919637711122" className="btn btn-outline btn-full">
          <Phone size={18} /> Call Hospital
        </a>
      </div>

      <div className="space-y-2">
        <a href="/book" className="text-sm font-medium text-primary hover:underline">
          Book Another Appointment
        </a>
        <p className="text-xs text-text-muted">
          On the day of your appointment, check{" "}
          <a href="/queue" className="text-primary hover:underline">Live OPD Queue</a>{" "}
          to see your wait time.
        </p>
      </div>
    </div>
  );
}
