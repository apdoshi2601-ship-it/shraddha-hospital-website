"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919637711122?text=Hi%2C%20I%20want%20to%20book%20an%20appointment%20at%20Shraddha%20Institute"
      className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-50 group"
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={24} fill="white" />
      <span className="absolute right-16 bg-white text-text text-sm px-3 py-1.5 rounded-lg shadow-card opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
