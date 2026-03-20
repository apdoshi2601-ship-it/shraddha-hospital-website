import { MapPin, Clock, Navigation } from "lucide-react";

const contactCards = [
  {
    icon: MapPin,
    title: "Address",
    content: (
      <>
        Shraddha Institute of Spine & Orthopaedic Superspeciality (SISOS)
        <br />
        S NO.494/1 New 191/1/B,
        <br />
        Kolhapur-Sangli Hwy, Opp. Konduskar Kia Showroom,
        <br />
        Dattanagar, Sangli, Maharashtra 416416
      </>
    ),
  },
  {
    icon: Clock,
    title: "OPD Timings",
    content: (
      <>
        <strong>Morning:</strong> 10:00 AM - 1:00 PM
        <br />
        <strong>Evening:</strong> 6:00 PM - 7:00 PM
        <br />
        <strong>Days:</strong> Monday to Saturday
        <br />
        <strong>Emergency:</strong> 24/7
      </>
    ),
  },
  {
    icon: Navigation,
    title: "How to Reach",
    content: (
      <>
        <strong>From Sangli Bus Stand:</strong> 10 min drive
        <br />
        <strong>From Miraj Railway Station:</strong> 15 min drive
        <br />
        <strong>From Kolhapur:</strong> 45 min via NH48
        <br />
        <strong>Landmark:</strong> Opp. Konduskar Kia Showroom, Dattanagar
      </>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-surface-alt">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-tag">Find Us</span>
          <h2>Visit Our New Facility</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-xl p-6 border border-border/50 text-center"
              >
                <Icon size={28} className="mx-auto mb-4 text-primary" />
                <h3 className="text-base font-display font-semibold mb-3">{card.title}</h3>
                <p className="text-sm text-text-light leading-relaxed">{card.content}</p>
              </div>
            );
          })}
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl border border-border/50 overflow-hidden h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.1!2d74.58!3d16.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShraddha+Hospital+Sangli!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shraddha Institute Location"
          />
        </div>
      </div>
    </section>
  );
}
