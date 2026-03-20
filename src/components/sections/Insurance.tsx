import { Shield } from "lucide-react";

const partners = [
  "ICICI Lombard", "Bajaj Allianz", "Star Health", "SBI General",
  "HDFC Ergo", "Reliance General", "Chola MS", "Niva Bupa",
  "Kotak Insurance", "Bharti AXA", "Medi-Assist", "Vidal Health",
  "Paramount", "MD India", "Good Health", "IFFCO Tokio",
  "Future General", "Maharashtra Govt",
];

export default function Insurance() {
  return (
    <section className="py-20 bg-surface-alt">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-tag">Insurance & Cashless</span>
          <h2 className="mb-4">We Accept 30+ Insurance Partners</h2>
          <p className="text-text-light max-w-xl mx-auto">
            Cashless treatment available. We are empanelled with major
            government and private health schemes.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {partners.map((p) => (
            <div
              key={p}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-border/50 text-sm text-text-light hover:border-primary/20 hover:text-primary transition-colors"
            >
              <Shield size={14} className="text-primary/60" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
