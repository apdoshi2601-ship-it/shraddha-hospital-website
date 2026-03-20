import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Very good experience with Shraddha hospital. All staff are very good and helpful. Good management.",
    author: "Shraddha Badiger",
    source: "Google Review",
  },
  {
    text: "Very good experience. Doctor and all staff is careful and kind and all work management is good.",
    author: "Varada Dixit",
    source: "Google Review",
  },
  {
    text: "Best treatment for ankle fracture of my brother. Best orthopedic hospital in Sangli.",
    author: "Priya Reddy",
    source: "Google Review",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={16} className="text-gold fill-gold" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-tag">Patient Stories</span>
          <h2 className="mb-4">Hear From Our Patients</h2>
          <p className="text-text-light max-w-xl mx-auto">
            Real stories from real patients who trusted us with their care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="bg-surface-alt rounded-xl p-6 border border-border/50"
            >
              <Stars />
              <p className="text-text-light text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-bold">
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-text">{t.author}</div>
                  <div className="text-xs text-text-muted">{t.source}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google review bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-surface-alt rounded-xl p-5 border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lg">
              G
            </div>
            <div>
              <strong className="text-text text-sm">4.8 out of 5</strong>
              <span className="text-text-muted text-sm"> based on 500+ Google Reviews</span>
            </div>
          </div>
          <a href="#" className="btn btn-outline btn-sm">
            View All Reviews
          </a>
        </div>
      </div>
    </section>
  );
}
