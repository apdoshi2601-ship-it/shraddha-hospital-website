"use client";

import { useState } from "react";
import { MessageCircle, Phone, Ambulance } from "lucide-react";

const specialityOptions = [
  "Complex Trauma Surgery",
  "Spine Surgery",
  "Joint Replacement (Arthroplasty)",
  "Shoulder & Knee Surgery",
  "Paediatric Orthopaedics",
  "Plastic & Reconstruction Surgery",
  "Foot & Ankle Surgery",
  "Rheumatology",
  "Physiotherapy & Rehabilitation",
];

const doctorOptions = [
  "Dr. G.S. Kulkarni — Ortho & Trauma",
  "Dr. Himanshu Kulkarni — Spine",
  "Dr. Namdev Gorgile — Shoulder & Knee",
  "Dr. Surendra Patil — Arthroplasty",
  "Dr. Kailas Patil — Arthroplasty",
  "Dr. Akshay Kulkarni — Plastic Surgery",
  "Dr. Kapil Saoji — Foot & Ankle",
  "Dr. Wasim Kazi — Rheumatology",
  "Dr. Nikhil Patil — Physiotherapy",
];

export default function Appointment() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Replace with server action to create appointment in DB
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="book" className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <span className="section-tag">Book an Appointment</span>
            <h2 className="mb-4">
              Take the First Step
              <br />
              Towards Recovery
            </h2>
            <p className="text-text-light leading-relaxed mb-8">
              Schedule a consultation with our specialists. We&apos;ll get back to
              you within 2 hours during working hours.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-[#E8F8ED] flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-[#128C7E]" />
                </div>
                <div>
                  <div className="font-semibold text-text text-sm">WhatsApp Us</div>
                  <div className="text-xs text-text-muted mb-1">Quick response, share reports</div>
                  <a
                    href="https://wa.me/919637711122?text=Hi%2C%20I%20want%20to%20book%20an%20appointment%20at%20Shraddha%20Institute"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-text text-sm">Call Us</div>
                  <div className="text-xs text-text-muted mb-1">Speak with our team directly</div>
                  <a href="tel:+919637711122" className="text-sm font-medium text-primary hover:underline">
                    +91 96377 11122
                  </a>
                  {" / "}
                  <a href="tel:+919326024081" className="text-sm font-medium text-primary hover:underline">
                    093260 24081
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Ambulance size={20} className="text-emergency" />
                </div>
                <div>
                  <div className="font-semibold text-text text-sm">Emergency / Trauma</div>
                  <div className="text-xs text-text-muted mb-1">24/7 emergency care available</div>
                  <a href="tel:+919637711122" className="text-sm font-medium text-emergency hover:underline">
                    Call Emergency Line
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-surface-alt rounded-2xl p-6 md:p-8 border border-border/50">
            <h3 className="text-lg font-display font-semibold mb-6">Request an Appointment</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input className="form-input" type="text" id="name" name="name" required placeholder="Enter your full name" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="phone">Phone Number *</label>
                  <input className="form-input" type="tel" id="phone" name="phone" required placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="form-label" htmlFor="age">Age</label>
                  <input className="form-input" type="number" id="age" name="age" placeholder="Age" />
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="speciality">Speciality *</label>
                <select className="form-input" id="speciality" name="speciality" required>
                  <option value="">Select a speciality</option>
                  {specialityOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="doctor">Preferred Doctor</label>
                <select className="form-input" id="doctor" name="doctor">
                  <option value="">No preference</option>
                  {doctorOptions.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="date">Preferred Date</label>
                <input className="form-input" type="date" id="date" name="date" />
              </div>

              <div>
                <label className="form-label" htmlFor="message">Brief Description of Your Condition</label>
                <textarea
                  className="form-input"
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="e.g., Lower back pain for 6 months, difficulty walking..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={submitted}
              >
                {submitted ? "Request Submitted!" : "Submit Appointment Request"}
              </button>

              <p className="text-xs text-text-muted text-center">
                We&apos;ll contact you within 2 hours to confirm your appointment.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
