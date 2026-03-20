import { ChevronRight } from "lucide-react";

const conditions = [
  { name: "Disc Herniation (Slip Disc)", desc: "Causes, symptoms & treatment options" },
  { name: "Spinal Stenosis", desc: "When the spinal canal narrows" },
  { name: "Scoliosis", desc: "Screening, bracing & surgical correction" },
  { name: "Spondylolisthesis", desc: "Vertebral slippage — conservative to surgical" },
  { name: "Spinal Fractures", desc: "Trauma, osteoporotic & pathological fractures" },
];

export default function SpineHub() {
  return (
    <section id="spine-hub" className="py-20 bg-surface-alt">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="section-tag">Spine Hub</span>
            <h2 className="mb-4">
              Your Trusted Resource for
              <br />
              Spine Health
            </h2>
            <p className="text-text-light leading-relaxed mb-8">
              Understand your spine condition, explore treatment options, and
              make informed decisions with our comprehensive spine knowledge
              centre.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {conditions.map((c) => (
                <a
                  key={c.name}
                  href="#"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-card transition-all group"
                >
                  <ChevronRight
                    size={18}
                    className="text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform"
                  />
                  <div>
                    <div className="text-sm font-semibold text-text">{c.name}</div>
                    <div className="text-xs text-text-muted">{c.desc}</div>
                  </div>
                </a>
              ))}
            </div>

            <a href="#book" className="btn btn-primary">
              Get a Spine Consultation
            </a>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex flex-col gap-6 items-center">
            <div className="bg-white rounded-2xl shadow-card p-8 text-center max-w-sm w-full border border-border/50">
              <svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                className="mx-auto mb-4 text-primary"
              >
                <ellipse cx="12" cy="3" rx="3" ry="1.5" />
                <ellipse cx="12" cy="7" rx="2.5" ry="1.2" />
                <ellipse cx="12" cy="10.5" rx="3" ry="1.3" />
                <ellipse cx="12" cy="14" rx="2.5" ry="1.2" />
                <ellipse cx="12" cy="17.5" rx="2.8" ry="1.3" />
                <ellipse cx="12" cy="21" rx="2" ry="1" />
              </svg>
              <h3 className="text-lg font-display font-semibold mb-2">
                Understanding Your Spine
              </h3>
              <p className="text-sm text-text-light">
                The spine is made up of 33 vertebrae, protecting the spinal cord
                while enabling movement. Learn how conditions develop and how we
                treat them.
              </p>
            </div>

            <div className="bg-primary rounded-2xl p-6 text-center max-w-sm w-full">
              <span className="text-4xl font-bold text-white font-display">95%</span>
              <p className="text-white/80 text-sm mt-2">
                of spine conditions can be managed without surgery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
