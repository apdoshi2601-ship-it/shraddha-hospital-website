"use client";

import { Phone, MessageCircle, CalendarCheck } from "lucide-react";

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-2 z-50 flex gap-2 md:hidden">
      <a
        href="tel:+919637711122"
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-btn bg-primary-light text-primary text-sm font-semibold"
      >
        <Phone size={16} /> Call
      </a>
      <a
        href="https://wa.me/919637711122?text=Hi%2C%20I%20want%20to%20book%20an%20appointment%20at%20Shraddha%20Institute"
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-btn bg-[#E8F8ED] text-[#128C7E] text-sm font-semibold"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
      <a
        href="#book"
        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-btn bg-primary text-white text-sm font-semibold"
      >
        <CalendarCheck size={16} /> Book
      </a>
    </div>
  );
}
