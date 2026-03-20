"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, UserCheck, Activity, BedDouble, Star } from "lucide-react";

const stats = [
  { icon: CalendarCheck, target: 32, suffix: "+", label: "Years of Excellence" },
  { icon: UserCheck, target: 15, suffix: "+", label: "Specialist Doctors" },
  { icon: Activity, target: 50000, suffix: "+", label: "Successful Surgeries" },
  { icon: BedDouble, target: 75, suffix: "", label: "Bed Capacity" },
  { icon: Star, target: 4.8, suffix: "/ 5", label: "Google Rating", decimal: true },
];

function AnimatedNumber({ target, decimal }: { target: number; decimal?: boolean }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setValue(current);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const display = decimal
    ? value.toFixed(1)
    : target >= 1000
    ? Math.floor(value).toLocaleString("en-IN")
    : Math.floor(value).toString();

  return <div ref={ref}>{display}</div>;
}

export default function Stats() {
  return (
    <section className="py-16 bg-white border-y border-border/50">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map(({ icon: Icon, target, suffix, label, decimal }) => (
            <div
              key={label}
              className="text-center p-6 rounded-xl hover:bg-surface-alt transition-colors"
            >
              <Icon size={28} className="mx-auto mb-3 text-primary" />
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-text font-display">
                  <AnimatedNumber target={target} decimal={decimal} />
                </span>
                {suffix && (
                  <span className="text-sm text-text-muted font-medium">{suffix}</span>
                )}
              </div>
              <div className="text-sm text-text-muted mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
