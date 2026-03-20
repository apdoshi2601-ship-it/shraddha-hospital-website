import {
  CarFront,
  Bone,
  Baby,
  HandHeart,
  Footprints,
  Dumbbell,
  ArrowRight,
  Hand,
} from "lucide-react";

const specialities = [
  {
    icon: CarFront,
    name: "Complex Trauma Surgery",
    desc: "24/7 trauma care for fractures, polytrauma, road accident injuries, pelvic & acetabular fractures, and post-traumatic reconstruction.",
    doctor: "Dr. G.S. Kulkarni",
    cta: "Emergency & Trauma Care",
  },
  {
    icon: null, // Custom SVG for spine
    name: "Spine Surgery",
    desc: "Minimally invasive spine surgery, microdiscectomy, endoscopic procedures, scoliosis correction, and spinal deformity management.",
    doctor: "Dr. Himanshu G. Kulkarni",
    cta: "Consult a Spine Specialist",
  },
  {
    icon: Bone,
    name: "Arthroplasty (Joint Replacement)",
    desc: "Total and partial knee replacement, hip replacement using latest implant technology. Visiting surgeons from Pune's top hospitals.",
    doctor: "Dr. Surendra Patil & Dr. Kailas Patil",
    cta: "Consult for Joint Replacement",
  },
  {
    icon: Baby,
    name: "Paediatric Orthopaedics",
    desc: "Specialized care for children's bone and joint conditions including clubfoot, limb deformities, growth plate injuries, and congenital conditions.",
    doctor: "Dr. Prajakta Bhide",
    cta: "Consult Paediatric Specialist",
  },
  {
    icon: HandHeart,
    name: "Plastic & Reconstruction Surgery",
    desc: "Reconstructive surgery, post-trauma plastic surgery, head and neck oncosurgery, and cosmetic reconstruction procedures.",
    doctor: "Dr. Akshay Kulkarni & Dr. Sanika Kulkarni",
    cta: "Consult for Reconstruction",
  },
  {
    icon: Footprints,
    name: "Foot & Ankle Surgery",
    desc: "Specialized surgical and non-surgical treatment for foot and ankle conditions, sports injuries, and deformity correction.",
    doctor: "Dr. Kapil Saoji",
    cta: "Consult for Foot & Ankle",
  },
  {
    icon: Hand,
    name: "Rheumatology",
    desc: "Diagnosis and management of autoimmune and inflammatory joint conditions including rheumatoid arthritis, lupus, and gout.",
    doctor: "Dr. Wasim Kazi",
    cta: "Consult Rheumatologist",
  },
  {
    icon: Dumbbell,
    name: "Physiotherapy & Rehabilitation",
    desc: "Comprehensive post-surgical and injury rehabilitation with a well-equipped physiotherapy unit, pain management, and recovery programmes.",
    doctor: "Dr. Nikhil Patil",
    cta: "Start Your Recovery",
  },
];

function SpineIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M8 4h8M9 8h6M8 12h8M9 16h6M8 20h8" />
    </svg>
  );
}

export default function Specialities() {
  return (
    <section id="specialities" className="py-20 bg-surface-alt">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-tag">Our Specialities</span>
          <h2 className="mb-4">
            Comprehensive Spine &<br />
            Orthopaedic Care
          </h2>
          <p className="text-text-light max-w-xl mx-auto">
            From minimally invasive spine surgery to complex trauma
            reconstruction, our team covers the full spectrum of musculoskeletal
            conditions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialities.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.name}
                className="bg-white rounded-xl p-6 border border-border/50 hover:shadow-card-hover hover:border-primary/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {Icon ? <Icon size={24} /> : <SpineIcon />}
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{spec.name}</h3>
                <p className="text-sm text-text-light leading-relaxed mb-4">{spec.desc}</p>
                <div className="text-xs text-text-muted mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {spec.doctor}
                </div>
                <a
                  href="#book"
                  className="text-sm font-medium text-primary flex items-center gap-1.5 hover:gap-2.5 transition-all"
                >
                  {spec.cta} <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
