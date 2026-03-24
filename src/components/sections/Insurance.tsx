import Image from "next/image";

const insurers = [
  { name: "ICICI Lombard", logo: "icici-lombard.jpg" },
  { name: "Bajaj Allianz", logo: "bajaj-allianz.jpg" },
  { name: "Star Health", logo: "star-health.jpg" },
  { name: "SBI General", logo: "sbi-general.jpg" },
  { name: "HDFC Ergo", logo: "hdfc-ergo.jpg" },
  { name: "Reliance General", logo: "reliance-general.jpg" },
  { name: "Aditya Birla", logo: "aditya-birla.jpg" },
  { name: "Chola MS", logo: "chola-ms.jpg" },
  { name: "Niva Bupa", logo: "niva-bupa.jpg" },
  { name: "Kotak", logo: "kotak.jpg" },
  { name: "Bharti AXA", logo: "bharti-axa.jpg" },
  { name: "IFFCO Tokio", logo: "iffco-tokio.jpg" },
  { name: "Digit", logo: "digit.jpg" },
  { name: "Liberty", logo: "liberty.jpg" },
  { name: "Navi", logo: "navi.jpg" },
  { name: "National Insurance", logo: "national-insurance.jpg" },
  { name: "Universal Sompo", logo: "universal-sompo.jpg" },
  { name: "Future Generali", logo: "future-generali.jpg" },
];

const tpas = [
  { name: "Good Health", logo: "good-health.jpg" },
  { name: "Vidal Health", logo: "vidal-health.jpg" },
  { name: "Safeway", logo: "safeway.jpg" },
  { name: "Paramount", logo: "paramount.jpg" },
  { name: "Medi-Assist", logo: "medi-assist.jpg" },
  { name: "Medsave", logo: "medsave.jpg" },
  { name: "MD India", logo: "md-india.jpg" },
  { name: "Ericson", logo: "ericson.jpg" },
  { name: "Link-K", logo: "link-k.jpg" },
  { name: "Vision TPA", logo: "vision-tpa.jpg" },
  { name: "Health India", logo: "health-india.jpg" },
];

const government = [
  { name: "Maharashtra Govt Scheme", logo: "maharashtra-govt.jpg" },
];

function LogoGrid({ items }: { items: { name: string; logo: string }[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((p) => (
        <div
          key={p.name}
          className="bg-white rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-card transition-all p-3 flex items-center justify-center w-[120px] h-[80px]"
        >
          <Image
            src={`/images/insurance/${p.logo}`}
            alt={p.name}
            width={100}
            height={60}
            className="object-contain max-h-[56px] w-auto"
          />
        </div>
      ))}
    </div>
  );
}

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

        {/* Insurance Companies */}
        <h3 className="text-center text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
          Insurance Companies
        </h3>
        <LogoGrid items={insurers} />

        {/* TPAs */}
        <h3 className="text-center text-sm font-semibold text-text-muted uppercase tracking-wider mt-10 mb-4">
          Third Party Administrators (TPAs)
        </h3>
        <LogoGrid items={tpas} />

        {/* Government */}
        <h3 className="text-center text-sm font-semibold text-text-muted uppercase tracking-wider mt-10 mb-4">
          Government Schemes
        </h3>
        <LogoGrid items={government} />
      </div>
    </section>
  );
}
