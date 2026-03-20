"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Award } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  slug: string;
  title: string;
  qualifications: string;
  role: string;
  badge: string | null;
  affiliation: string | null;
}

interface ScheduleDay {
  date: string;
  dayName: string;
  dayNum: number;
  month: string;
  hasSlots: boolean;
  isToday: boolean;
  isPast: boolean;
}

interface Props {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectDate: (date: string) => void;
  selectedDoctor: Doctor | null;
  selectedDate: string;
}

function getNext14Days(): ScheduleDay[] {
  const days: ScheduleDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dayOfWeek = d.getDay();

    days.push({
      date: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-IN", { weekday: "short" }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      hasSlots: dayOfWeek !== 0, // Sunday = no OPD by default
      isToday: i === 0,
      isPast: false,
    });
  }
  return days;
}

export default function DoctorCalendar({
  doctors,
  onSelectDoctor,
  onSelectDate,
  selectedDoctor,
  selectedDate,
}: Props) {
  const [days] = useState(getNext14Days);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Separate resident and visiting doctors
  const residentDoctors = doctors.filter((d) => d.role !== "visiting");
  const visitingDoctors = doctors.filter((d) => d.role === "visiting");

  return (
    <div className="space-y-8">
      {/* Doctor Selection */}
      <div>
        <h3 className="text-lg font-display font-semibold mb-4">Select a Doctor</h3>

        {/* Resident doctors */}
        <div className="space-y-3 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            In-House Specialists
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {residentDoctors.map((doc) => (
              <button
                key={doc.id}
                onClick={() => onSelectDoctor(doc)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selectedDoctor?.id === doc.id
                    ? "border-primary bg-primary-light/50"
                    : "border-border/50 hover:border-primary/30 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                    <Award size={18} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-text">{doc.name}</div>
                    <div className="text-xs text-primary font-medium truncate">{doc.title}</div>
                    {doc.badge && (
                      <span className="inline-block mt-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        {doc.badge}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Visiting doctors */}
        {visitingDoctors.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Visiting Specialists
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {visitingDoctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => onSelectDoctor(doc)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    selectedDoctor?.id === doc.id
                      ? "border-primary bg-primary-light/50"
                      : "border-border/50 hover:border-primary/30 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-text">{doc.name}</div>
                      <div className="text-xs text-primary font-medium truncate">{doc.title}</div>
                      {doc.affiliation && (
                        <div className="text-[11px] text-text-muted mt-0.5">{doc.affiliation}</div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Date Selection */}
      {selectedDoctor && (
        <div>
          <h3 className="text-lg font-display font-semibold mb-4">Select a Date</h3>
          <div className="relative">
            <button
              onClick={() => setScrollOffset(Math.max(0, scrollOffset - 5))}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-card rounded-full flex items-center justify-center text-text-muted hover:text-primary"
              disabled={scrollOffset === 0}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="overflow-hidden">
              <div
                className="flex gap-2 transition-transform duration-300"
                style={{ transform: `translateX(-${scrollOffset * 76}px)` }}
              >
                {days.map((day) => (
                  <button
                    key={day.date}
                    onClick={() => onSelectDate(day.date)}
                    disabled={day.isPast}
                    className={`flex-shrink-0 w-[68px] py-3 rounded-xl text-center transition-all ${
                      selectedDate === day.date
                        ? "bg-primary text-white shadow-primary"
                        : day.isToday
                        ? "bg-primary-light text-primary border-2 border-primary/20"
                        : "bg-white border border-border/50 text-text hover:border-primary/30"
                    } ${day.isPast ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    <div className="text-[10px] font-medium uppercase opacity-70">{day.dayName}</div>
                    <div className="text-xl font-bold font-display">{day.dayNum}</div>
                    <div className="text-[10px] font-medium opacity-70">{day.month}</div>
                    {day.isToday && (
                      <div className="text-[9px] font-bold mt-0.5">TODAY</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setScrollOffset(Math.min(days.length - 5, scrollOffset + 5))}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-card rounded-full flex items-center justify-center text-text-muted hover:text-primary"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
