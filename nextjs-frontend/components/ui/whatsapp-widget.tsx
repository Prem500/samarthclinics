"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppWidget() {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+917004119766";
    const message = "Hello Doctor, I would like to get treatment from you!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 animate-pulse hover:animate-none"
      style={{
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isHovered 
          ? '0 8px 25px rgba(34, 197, 94, 0.4)' 
          : '0 4px 15px rgba(34, 197, 94, 0.3)'
      }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      
      {/* Pulse animation rings */}
      <div className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping" />
      <div className="absolute inset-0 rounded-full bg-green-500 opacity-50 animate-ping" style={{ animationDelay: '1s' }} />
    </button>
  );
}