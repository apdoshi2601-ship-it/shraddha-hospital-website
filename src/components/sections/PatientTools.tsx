import {
  CalendarCheck,
  Users,
  FileText,
  Stethoscope,
  Calculator,
  Activity,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    icon: CalendarCheck,
    name: "Live Doctor Calendar",
    desc: "See real-time slot availability for all doctors — including visiting specialists from Pune. Book instantly.",
    href: "/book",
    tag: "Available Now",
    color: "bg-primary-light text-primary",
  },
  {
    icon: Users,
    name: "Live OPD Queue",
    desc: "Check your token number and estimated wait time from home. No more sitting in the waiting room.",
    href: "/queue",
    tag: "Available Now",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: FileText,
    name: "Prescription Explainer",
    desc: "Upload a photo of your prescription — we'll explain every medicine in simple language, in English or Marathi.",
    href: "/prescription",
    tag: "AI-Powered",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Stethoscope,
    name: "Symptom Navigator",
    desc: "Not sure which specialist you need? Tap where it hurts and we'll guide you to the right doctor.",
    href: "/symptom-navigator",
    tag: "Coming Soon",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Calculator,
    name: "Cost Estimator",
    desc: "Get transparent cost estimates for procedures, including what your insurance covers.",
    href: "/cost-estimator",
    tag: "Coming Soon",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Activity,
    name: "Recovery Tracker",
    desc: "After surgery, track your recovery milestones, exercises, and follow-up schedule — all in one place.",
    href: "/my-records/recovery",
    tag: "Coming Soon",
    color: "bg-rose-50 text-rose-600",
  },
];

export default function PatientTools() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-tag">Patient Tools</span>
          <h2 className="mb-4">
            Your Health, At Your Fingertips
          </h2>
          <p className="text-text-light max-w-xl mx-auto">
            We&apos;re building the most patient-friendly hospital experience in
            Western Maharashtra. These tools put you in control of your care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.name}
                href={tool.href}
                className="group bg-surface-alt rounded-xl p-6 border border-border/50 hover:border-primary/20 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${tool.color}`}>
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-text-light leading-relaxed mb-4">{tool.desc}</p>
                <span className="text-sm font-medium text-primary flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Learn More <ArrowRight size={14} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
