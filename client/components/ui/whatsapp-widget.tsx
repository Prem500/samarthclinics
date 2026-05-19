"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppWidget() {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+917004119766";
    const message = "Hello Doctor, I would like to get treatment from you!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleWhatsAppClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 p-4 text-white shadow-[0_12px_40px_-8px_rgba(16,185,129,0.55)] ring-2 ring-white/90 transition-all duration-300 hover:from-emerald-600 hover:to-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      style={{
        transform: isHovered ? "scale(1.06)" : "scale(1)",
      }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="relative z-10 h-6 w-6" />
    </button>
  );
}
