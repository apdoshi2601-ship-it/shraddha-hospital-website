import Image from "next/image";

const quickLinks = [
  { href: "#about", label: "About Us" },
  { href: "#specialities", label: "Specialities" },
  { href: "#doctors", label: "Our Doctors" },
  { href: "#spine-hub", label: "Spine Hub" },
  { href: "#book", label: "Book Appointment" },
];

const specialityLinks = [
  "Complex Trauma",
  "Spine Surgery",
  "Arthroplasty",
  "Plastic Surgery",
  "Foot & Ankle",
  "Rheumatology",
];

const patientLinks = [
  { href: "/queue", label: "Live OPD Queue" },
  { href: "/prescription", label: "Prescription Explainer" },
  { href: "/cost-estimator", label: "Cost Estimator" },
  { href: "#testimonials", label: "Patient Stories" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
              <Image
                src="/images/logo-text.png"
                alt="Shraddha Institute"
                width={140}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Sangli&apos;s first dedicated spine & orthopaedic superspeciality
              institute. 32+ years of surgical excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4 font-body">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Specialities */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4 font-body">
              Specialities
            </h4>
            <div className="flex flex-col gap-2.5">
              {specialityLinks.map((name) => (
                <a
                  key={name}
                  href="#specialities"
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Patient Tools */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4 font-body">
              Patient Tools
            </h4>
            <div className="flex flex-col gap-2.5">
              {patientLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Shraddha Institute of Spine & Orthopaedic
            Superspeciality. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
