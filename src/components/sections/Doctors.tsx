import { UserRound, Award, GraduationCap, Globe } from "lucide-react";

interface Doctor {
  name: string;
  title: string;
  qualifications: string;
  specialisation: string;
  experience?: string;
  badge?: string;
  highlights?: { icon: "award" | "grad" | "globe"; label: string }[];
  featured?: boolean;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Gurunath S. Kulkarni",
    title: "Director, Consulting Orthopaedic & Trauma Surgeon",
    qualifications: "M.S. (Gen), D.Ortho",
    specialisation: "Complex Trauma Surgery, Orthopaedic Surgery",
    experience: "32+ years | Founder, Shraddha Hospital (1992)",
    badge: "Director",
    highlights: [{ icon: "award", label: "Founder & Director" }],
    featured: true,
  },
  {
    name: "Dr. Himanshu G. Kulkarni",
    title: "Consulting Spine Surgeon",
    qualifications: "M.S. Ortho, FISS, Global Spine Diploma (AO Spine, Switzerland)",
    specialisation: "Minimally Invasive Spine Surgery, Scoliosis, Spinal Deformity",
    experience: "MUHS, Royal Orthopaedic Hospital (England), Schon Clinic (Germany)",
    badge: "Spine Lead",
    highlights: [
      { icon: "grad", label: "AO Spine Fellow" },
      { icon: "globe", label: "UK & Germany Trained" },
    ],
    featured: true,
  },
  {
    name: "Dr. Namdev Gorgile",
    title: "Consulting Shoulder & Knee Surgeon",
    qualifications: "M.B.B.S, D.N.B. Ortho",
    specialisation: "Shoulder & Knee Surgery, Arthroscopy",
    experience: "Shoulder & Elbow (Funabashi Centre, Japan), Shoulder (Baylor University, USA)",
    highlights: [{ icon: "globe", label: "Japan & USA Trained" }],
  },
  {
    name: "Dr. Surendra Patil",
    title: "Visiting Arthroplasty Surgeon",
    qualifications: "D.N.B. Ortho, D. Ortho",
    specialisation: "Hip & Knee Arthroplasty (Joint Replacement)",
    experience: "Director, Polaris Hospital, Pune",
  },
  {
    name: "Dr. Kailas Patil",
    title: "Visiting Arthroplasty Surgeon",
    qualifications: "D.N.B. Ortho, D. Ortho",
    specialisation: "Knee Arthroplasty (Joint Replacement)",
    experience: "Sancheti Hospital, Pune",
  },
  {
    name: "Dr. Kapil Saoji",
    title: "Visiting Foot & Ankle Surgeon",
    qualifications: "M.S. Ortho, FIFA, FIJR",
    specialisation: "Foot & Ankle Surgery",
    experience: "Director, Step Ahead Clinic, Pune",
  },
  {
    name: "Dr. Akshay Kulkarni",
    title: "Consulting Plastic & Reconstruction Surgeon",
    qualifications: "M.S., MCh (Plastic)",
    specialisation: "Plastic Surgery, Reconstruction Surgery",
  },
  {
    name: "Dr. Wasim Kazi",
    title: "Visiting Rheumatologist",
    qualifications: "M.D., D.N.B (Rheumatology)",
    specialisation: "Rheumatology",
    experience: "Director, Kolhapur Rheumatology Center",
  },
  {
    name: "Dr. Nikhil Patil",
    title: "Chief of Physiotherapy & Rehabilitation",
    qualifications: "B.PTH",
    specialisation: "Physiotherapy, Post-Surgical Rehabilitation",
  },
];

const iconMap = {
  award: Award,
  grad: GraduationCap,
  globe: Globe,
};

export default function Doctors() {
  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-tag">Our Doctors</span>
          <h2 className="mb-4">
            Led by Nationally Recognised
            <br />
            Orthopaedic Surgeons
          </h2>
          <p className="text-text-light max-w-xl mx-auto">
            Our team combines decades of experience with fellowship training
            from India&apos;s premier institutions.
          </p>
        </div>

        {/* Featured doctors */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {doctors
            .filter((d) => d.featured)
            .map((doc) => (
              <div
                key={doc.name}
                className="bg-surface-alt rounded-2xl p-6 border-2 border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="flex gap-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-primary-light flex items-center justify-center">
                      <UserRound size={36} className="text-primary" />
                    </div>
                    {doc.badge && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                        {doc.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-display font-bold">{doc.name}</h3>
                    <p className="text-sm text-primary font-medium">{doc.title}</p>
                    <p className="text-xs text-text-muted mt-1">{doc.qualifications}</p>
                    <p className="text-sm text-text-light mt-2">
                      <strong className="text-text">Specialisation:</strong>{" "}
                      {doc.specialisation}
                    </p>
                    {doc.experience && (
                      <p className="text-sm text-text-light mt-1">
                        <strong className="text-text">Experience:</strong>{" "}
                        {doc.experience}
                      </p>
                    )}
                    {doc.highlights && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {doc.highlights.map((h) => {
                          const HIcon = iconMap[h.icon];
                          return (
                            <span
                              key={h.label}
                              className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full text-xs font-medium text-primary border border-primary/15"
                            >
                              <HIcon size={12} /> {h.label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    <a
                      href="#book"
                      className="btn btn-primary btn-sm mt-4"
                    >
                      Book with {doc.name.split(" ")[1]}
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Other doctors grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctors
            .filter((d) => !d.featured)
            .map((doc) => (
              <div
                key={doc.name}
                className="bg-white rounded-xl p-5 border border-border/50 hover:shadow-card transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                    <UserRound size={24} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-display font-semibold">{doc.name}</h3>
                    <p className="text-xs text-primary font-medium">{doc.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{doc.qualifications}</p>
                  </div>
                </div>
                <p className="text-sm text-text-light mt-3">
                  <strong className="text-text">Specialisation:</strong>{" "}
                  {doc.specialisation}
                </p>
                {doc.experience && (
                  <p className="text-xs text-text-muted mt-1">{doc.experience}</p>
                )}
                {doc.highlights && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {doc.highlights.map((h) => {
                      const HIcon = iconMap[h.icon];
                      return (
                        <span
                          key={h.label}
                          className="inline-flex items-center gap-1 bg-primary-light px-2 py-0.5 rounded-full text-[11px] font-medium text-primary"
                        >
                          <HIcon size={10} /> {h.label}
                        </span>
                      );
                    })}
                  </div>
                )}
                <a href="#book" className="btn btn-primary btn-sm mt-4 w-full">
                  Book Appointment
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
