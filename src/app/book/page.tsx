"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, CalendarCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCTABar from "@/components/layout/MobileCTABar";
import DoctorCalendar from "@/components/booking/DoctorCalendar";
import SlotPicker from "@/components/booking/SlotPicker";
import BookingForm from "@/components/booking/BookingForm";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import VisitingDoctorBanner from "@/components/booking/VisitingDoctorBanner";
import type { BookedAppointment } from "@/components/booking/BookingForm";

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

export default function BookPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [step, setStep] = useState<"select" | "details" | "confirmed">("select");
  const [bookedAppointment, setBookedAppointment] = useState<BookedAppointment | null>(null);

  useEffect(() => {
    fetch("/api/doctors")
      .then((r) => r.json())
      .then((data) => setDoctors(data.doctors || []))
      .catch(() => {});
  }, []);

  function handleSelectDoctor(doctor: Doctor) {
    setSelectedDoctor(doctor);
    setSelectedDate("");
    setSelectedSlot("");
  }

  function handleSelectDate(date: string) {
    setSelectedDate(date);
    setSelectedSlot("");
  }

  function handleSelectSlot(time: string) {
    setSelectedSlot(time);
    setStep("details");
  }

  function handleBookingSuccess(appointment: BookedAppointment) {
    setBookedAppointment(appointment);
    setStep("confirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    if (step === "details") {
      setStep("select");
      setSelectedSlot("");
    } else if (step === "confirmed") {
      setStep("select");
      setSelectedDoctor(null);
      setSelectedDate("");
      setSelectedSlot("");
      setBookedAppointment(null);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-alt pt-32 pb-20 md:pb-12">
        <div className="container-custom max-w-2xl">
          {/* Page header */}
          <div className="mb-8">
            {step !== "confirmed" && (
              <div className="flex items-center gap-3 mb-4">
                {step === "details" && (
                  <button onClick={handleBack} className="text-text-muted hover:text-primary transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <div className="flex items-center gap-2 text-primary">
                  <CalendarCheck size={24} />
                  <h1 className="text-2xl font-display font-bold text-text">
                    Book an Appointment
                  </h1>
                </div>
              </div>
            )}

            {step === "select" && (
              <>
                <p className="text-text-muted text-sm mb-2">
                  Select a doctor, pick a date, and choose your time slot. It takes less than a minute.
                </p>

                {/* Progress */}
                <div className="flex items-center gap-2 text-xs text-text-muted mt-4">
                  <span className={`px-2.5 py-1 rounded-full font-medium ${selectedDoctor ? "bg-primary text-white" : "bg-primary-light text-primary"}`}>
                    1. Doctor
                  </span>
                  <span className="text-border">—</span>
                  <span className={`px-2.5 py-1 rounded-full font-medium ${selectedDate ? "bg-primary text-white" : "bg-gray-100 text-text-muted"}`}>
                    2. Date
                  </span>
                  <span className="text-border">—</span>
                  <span className="px-2.5 py-1 rounded-full font-medium bg-gray-100 text-text-muted">
                    3. Time
                  </span>
                  <span className="text-border">—</span>
                  <span className="px-2.5 py-1 rounded-full font-medium bg-gray-100 text-text-muted">
                    4. Confirm
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Visiting doctor banner */}
          {step === "select" && !selectedDoctor && <VisitingDoctorBanner />}

          {/* Content based on step */}
          <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-border/50">
            {step === "confirmed" && bookedAppointment ? (
              <BookingConfirmation appointment={bookedAppointment} />
            ) : step === "details" && selectedDoctor ? (
              <BookingForm
                doctorId={selectedDoctor.id}
                doctorName={selectedDoctor.name}
                date={selectedDate}
                time={selectedSlot}
                onSuccess={handleBookingSuccess}
              />
            ) : (
              <div className="space-y-8">
                <DoctorCalendar
                  doctors={doctors}
                  onSelectDoctor={handleSelectDoctor}
                  onSelectDate={handleSelectDate}
                  selectedDoctor={selectedDoctor}
                  selectedDate={selectedDate}
                />

                {selectedDoctor && selectedDate && (
                  <SlotPicker
                    doctorSlug={selectedDoctor.slug}
                    date={selectedDate}
                    onSelectSlot={handleSelectSlot}
                    selectedSlot={selectedSlot}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
