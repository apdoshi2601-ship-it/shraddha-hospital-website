"use client";

import { useState, useEffect } from "react";
import { Clock, Loader2, AlertCircle } from "lucide-react";

interface Slot {
  time: string;
  available: boolean;
}

interface Props {
  doctorSlug: string;
  date: string;
  onSelectSlot: (time: string) => void;
  selectedSlot: string;
}

function formatTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function SlotPicker({ doctorSlug, date, onSelectSlot, selectedSlot }: Props) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!doctorSlug || !date) return;

    setLoading(true);
    setSlots([]);
    setMessage("");

    fetch(`/api/doctors/${doctorSlug}/slots?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.slots || []);
        setMessage(data.message || "");
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load slots. Please try again.");
        setLoading(false);
      });
  }, [doctorSlug, date]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-text-muted">
        <Loader2 size={20} className="animate-spin mr-2" />
        Loading available slots...
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-10">
        <AlertCircle size={32} className="mx-auto mb-3 text-text-muted" />
        <p className="text-sm text-text-muted">
          {message || "No slots available on this date"}
        </p>
        <p className="text-xs text-text-muted mt-1">Try selecting a different date</p>
      </div>
    );
  }

  // Group by session
  const morningSlots = slots.filter((s) => {
    const h = parseInt(s.time.split(":")[0]);
    return h < 14;
  });
  const eveningSlots = slots.filter((s) => {
    const h = parseInt(s.time.split(":")[0]);
    return h >= 14;
  });

  const availableCount = slots.filter((s) => s.available).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-semibold">Available Slots</h3>
        <span className="text-sm text-text-muted">
          {availableCount} of {slots.length} available
        </span>
      </div>

      {morningSlots.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-1.5">
            <Clock size={12} /> Morning (10 AM - 1 PM)
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {morningSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && onSelectSlot(slot.time)}
                disabled={!slot.available}
                className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedSlot === slot.time
                    ? "bg-primary text-white shadow-primary"
                    : slot.available
                    ? "bg-white border border-border/50 text-text hover:border-primary/40 hover:text-primary"
                    : "bg-gray-50 text-text-muted/50 line-through cursor-not-allowed"
                }`}
              >
                {formatTime(slot.time)}
              </button>
            ))}
          </div>
        </div>
      )}

      {eveningSlots.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-1.5">
            <Clock size={12} /> Evening (6 PM - 7 PM)
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {eveningSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && onSelectSlot(slot.time)}
                disabled={!slot.available}
                className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  selectedSlot === slot.time
                    ? "bg-primary text-white shadow-primary"
                    : slot.available
                    ? "bg-white border border-border/50 text-text hover:border-primary/40 hover:text-primary"
                    : "bg-gray-50 text-text-muted/50 line-through cursor-not-allowed"
                }`}
              >
                {formatTime(slot.time)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
