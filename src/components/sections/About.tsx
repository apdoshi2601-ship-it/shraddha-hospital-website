import Image from "next/image";
import { CheckCircle, Award } from "lucide-react";

const features = [
  "State-of-the-art operation theatre",
  "Laminar airflow systems",
  "Stryker Arthroscopy unit",
  "High-speed burr for spine surgery",
  "Mindray anaesthesia workstation",
  "Post-operative ICU",
  "Well-equipped physiotherapy unit",
  "NABH accredited",
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <Image
              src="/images/gallery/front-view.png"
              alt="Shraddha Institute of Spine and Orthopaedic Superspeciality — New Facility"
              width={600}
              height={400}
              className="rounded-2xl shadow-card w-full object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-card-hover p-4 flex items-center gap-3 border border-border/50">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-text-muted font-medium">Founded by</div>
                <div className="text-sm font-semibold text-text">Dr. G.S. Kulkarni</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="section-tag">About SISOS</span>
            <h2 className="mb-6">
              A Legacy of Orthopaedic Excellence,
              <br />
              Now in a New Avatar
            </h2>
            <p className="text-text-light leading-relaxed mb-4">
              Starting with a modest setup of 10 beds in 1992,{" "}
              <strong className="text-text">Dr. G.S. Kulkarni</strong> built
              Shraddha Hospital into Western Maharashtra&apos;s trusted name for
              orthopaedic care — expanding to a 30-bed, 4-story facility with all
              orthopaedic branches under one roof. Because medicine is not
              mathematics — we combine clinical expertise with the human touch,
              sympathy, and empathy towards our patients.
            </p>
            <p className="text-text-light leading-relaxed mb-8">
              Today, we take a bold step forward as the{" "}
              <strong className="text-text">
                Shraddha Institute of Spine & Orthopaedic Superspeciality (SISOS)
              </strong>{" "}
              — Sangli&apos;s first dedicated spine and orthopaedic centre — in our
              brand-new, purpose-built facility on Kolhapur-Sangli Highway,
              equipped with state-of-the-art infrastructure and a team of
              visiting specialists from Pune&apos;s leading hospitals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-text-light">{f}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn btn-primary">
              Visit Our New Facility
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
