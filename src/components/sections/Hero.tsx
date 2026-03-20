"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Shield, Clock, Award } from "lucide-react";

const trustItems = [
  { icon: Award, label: "NABH Accredited" },
  { icon: Shield, label: "30+ Insurance Partners" },
  { icon: Clock, label: "24/7 Emergency & Trauma" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Simple fade-in on mount
    requestAnimationFrame(() => {
      el.classList.add("visible");
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 bg-gradient-to-br from-surface-alt via-white to-primary-light/30 reveal"
    >
      {/* Subtle decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Now Open — New State-of-the-Art Facility
            </div>

            <h1 className="text-hero font-display font-bold leading-[1.15] mb-6">
              Sangli&apos;s First Dedicated{" "}
              <span className="text-primary">Spine & Orthopaedic</span>{" "}
              Superspeciality Institute
            </h1>

            <p className="text-text-light text-lg leading-relaxed mb-8 max-w-lg">
              Expert care for your spine, bones & joints — backed by 32+ years
              of surgical excellence and over 50,000 successful procedures.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#book" className="btn btn-primary btn-lg">
                Book Appointment
              </a>
              <a href="#specialities" className="btn btn-outline btn-lg">
                Explore Specialities
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-text-light">
                  <Icon size={18} className="text-primary" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="hidden lg:flex justify-center">
            <div className="relative bg-white rounded-2xl shadow-card-hover p-8 max-w-sm w-full border border-border/50">
              <div className="flex flex-col items-center text-center mb-6">
                <Image
                  src="/images/logo.png"
                  alt="SISOS Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto mb-3"
                />
                <Image
                  src="/images/logo-text.png"
                  alt="Shraddha Institute"
                  width={200}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { num: "32+", label: "Years" },
                  { num: "50K+", label: "Surgeries" },
                  { num: "75", label: "Beds" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-surface-alt rounded-xl p-4">
                    <div className="text-2xl font-bold text-primary font-display">
                      {stat.num}
                    </div>
                    <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
