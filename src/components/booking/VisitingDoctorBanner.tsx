"use client";

import { useEffect, useState } from "react";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

interface UpcomingVisit {
  doctor_name: string;
  doctor_slug: string;
  specific_date: string;
  affiliation: string | null;
  notes: string | null;
}

export default function VisitingDoctorBanner() {
  const [visits, setVisits] = useState<UpcomingVisit[]>([]);

  useEffect(() => {
    fetch("/api/doctors/upcoming-visits")
      .then((r) => r.json())
      .then((data) => setVisits(data.visits || []))
      .catch(() => {});
  }, []);

  if (visits.length === 0) return null;

  function formatDate(d: string) {
    return new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={16} className="text-amber-600" />
        <span className="text-sm font-semibold text-amber-800">
          Upcoming Visiting Specialists
        </span>
      </div>
      <div className="space-y-2">
        {visits.map((v, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-100"
          >
            <div>
              <div className="text-sm font-semibold text-text">{v.doctor_name}</div>
              {v.affiliation && (
                <div className="text-xs text-text-muted">{v.affiliation}</div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-amber-700 font-medium">
                  <Calendar size={12} /> {formatDate(v.specific_date)}
                </div>
              </div>
              <a
                href={`/book?doctor=${v.doctor_slug}`}
                className="text-primary hover:text-primary-dark"
              >
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
