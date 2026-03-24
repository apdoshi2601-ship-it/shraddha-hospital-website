import Image from "next/image";
import { ChevronRight, Award, Globe, Dumbbell, Microscope, TrendingUp } from "lucide-react";

const credentials = [
  { icon: Award, title: "Fellow, AO Spine", sub: "Global Spine Diploma, Switzerland" },
  { icon: Globe, title: "Fellow, Royal Orthopaedic Hospital", sub: "England" },
  { icon: Globe, title: "Fellow, Schön Klinik", sub: "Germany" },
  { icon: Globe, title: "Fellow, Daejeon Woori Hospital", sub: "South Korea" },
];

const expertiseTags = [
  "Minimally Invasive Spine Surgery",
  "Endoscopic Spine Surgery",
  "Scoliosis Surgery",
  "Minimally Invasive Spinal Fusion",
  "Spinal Infections",
  "Spinal Fractures",
];

const stats = [
  { icon: TrendingUp, num: "95%", label: "Managed without surgery" },
  { icon: Dumbbell, num: "State-of-the-Art", label: "Physiotherapy department" },
  { icon: Microscope, num: "Cutting-Edge OT", label: "Set up for spine surgery" },
  { icon: Globe, num: "World-Class", label: "UK, Germany, Switzerland, S. Korea" },
];

const conditions = [
  { name: "Mechanical Back Pain", desc: "The most common cause of back pain — conservative management, physiotherapy, and targeted treatment." },
  { name: "Disc Herniation (Slipped Disc)", desc: "Microdiscectomy, endoscopic procedures, and minimally invasive treatment options." },
  { name: "Spinal Canal Stenosis", desc: "When the spinal canal narrows — decompression surgery and minimally invasive options." },
  { name: "Spinal Infections", desc: "Diagnosis and treatment of vertebral osteomyelitis, discitis, and spinal tuberculosis." },
  { name: "Congenital Spinal Deformities", desc: "Scoliosis, kyphosis — screening, bracing & surgical correction in children and adults." },
  { name: "Spinal Fractures", desc: "Trauma, osteoporotic & pathological fractures — emergency and reconstructive care." },
  { name: "Cranio-Vertebral Junction Anomalies", desc: "Complex conditions at the skull-spine junction requiring specialised surgical expertise." },
];

const fellows = [
  { name: "Dr. Ranjit Y. Rajure", city: "Pune", photo: "/images/spine-hub/fellow-ranjit-rajure.jpg" },
  { name: "Dr. Siddheshwar Thhosar", city: "Chhatrapati Sambhajinagar", photo: "/images/spine-hub/fellow-siddheshwar-thhosar.jpg" },
  { name: "Dr. Vishal U. Bansode", city: "Nanded", photo: "/images/spine-hub/fellow-vishal-bansode.jpg" },
];

export default function SpineHub() {
  return (
    <section id="spine-hub" className="py-20 bg-surface-alt">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-tag">Spine Hub</span>
          <h2 className="mb-4">Spine Solutions Under One Roof</h2>
          <p className="text-text-light max-w-xl mx-auto">
            Comprehensive spine care — from conservative management and physiotherapy
            to minimally invasive and endoscopic spine surgery.
          </p>
        </div>

        {/* Dr. Himanshu Profile Card */}
        <div className="bg-white rounded-2xl border border-border/50 overflow-hidden mb-12">
          <div className="grid lg:grid-cols-[320px_1fr] gap-0">
            <div className="relative bg-primary-light">
              <Image
                src="/images/spine-hub/dr-himanshu-spine.png"
                alt="Dr. Himanshu G. Kulkarni — Spine Surgeon"
                width={320}
                height={400}
                className="w-full h-full object-cover min-h-[300px]"
              />
              <span className="absolute bottom-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                Head — Spine Hub
              </span>
            </div>
            <div className="p-6 lg:p-8">
              <h3 className="text-xl font-display font-bold mb-1">Dr. Himanshu G. Kulkarni</h3>
              <p className="text-sm text-primary font-medium mb-1">Consulting Spine Surgeon & Head of Spine Hub</p>
              <p className="text-xs text-text-muted mb-4">M.S. Ortho · F.I.S.S · Global Diploma, AO Spine</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {credentials.map((c) => (
                  <div key={c.title} className="flex items-start gap-2.5">
                    <c.icon size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-text">{c.title}</div>
                      <div className="text-xs text-text-muted">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {expertiseTags.map((tag) => (
                  <span key={tag} className="bg-primary-light text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <a href="#book" className="btn btn-primary btn-sm">
                Book with Dr. Himanshu
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 border border-border/50 text-center">
              <s.icon size={24} className="text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-text font-display">{s.num}</div>
              <div className="text-xs text-text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Conditions */}
        <h3 className="text-lg font-display font-semibold text-center mb-6">
          Common Conditions We Treat
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {conditions.map((c) => (
            <a
              key={c.name}
              href="#"
              className="flex items-start gap-3 p-4 bg-white rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-card transition-all group"
            >
              <ChevronRight
                size={18}
                className="text-primary flex-shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform"
              />
              <div>
                <div className="text-sm font-semibold text-text">{c.name}</div>
                <div className="text-xs text-text-muted mt-1">{c.desc}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mb-16">
          <a href="#book" className="btn btn-primary btn-lg">
            Get a Spine Consultation
          </a>
        </div>

        {/* Fellowship Programme */}
        <div className="border-t border-border/50 pt-12">
          <div className="text-center mb-8">
            <span className="section-tag">Academic Programme</span>
            <h2 className="mb-4">Spine Fellowship Programme</h2>
            <p className="text-text-light max-w-2xl mx-auto">
              MCI-recognised post-graduate training in spine surgery — running successfully since 2021.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-border/50 p-6 lg:p-8 mb-8">
            <p className="text-text-light text-sm leading-relaxed mb-4">
              The goal of the Spine Surgery Fellowship is to provide MCI (Medical Council of India)
              recognised post graduates of orthopaedic surgery with clinical experience in preparation
              for an academic or private practice career in spine surgery. It is designed to provide
              fellows with intensive training and broad exposure in diagnosis and treatment of common
              spinal disorders, and research.
            </p>
            <p className="text-text-light text-sm leading-relaxed mb-6">
              The fellow will learn to evaluate and treat routine and complicated areas of the spine:
              cervical, thoracic, lumbar, and lumbo-sacral — both surgical and non-surgical methods of treatment.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Course Director", value: "Dr. Himanshu Kulkarni" },
                { label: "Running Since", value: "2021 (ongoing)" },
                { label: "Tenure", value: "1 Year" },
                { label: "Fellows Trained", value: "3 (till 2025)" },
              ].map((d) => (
                <div key={d.label} className="bg-surface-alt rounded-xl p-4 text-center">
                  <div className="text-xs text-text-muted mb-1">{d.label}</div>
                  <div className="text-sm font-semibold text-text">{d.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Fellows */}
          <h3 className="text-lg font-display font-semibold text-center mb-6">Our Alumni Fellows</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {fellows.map((f) => (
              <div key={f.name} className="bg-white rounded-xl overflow-hidden border border-border/50">
                <Image
                  src={f.photo}
                  alt={f.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <div className="text-sm font-semibold text-text">{f.name}</div>
                  <div className="text-xs text-text-muted">{f.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
