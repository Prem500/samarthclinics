"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, UserCog, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="relative border-b border-white/10 bg-gradient-to-r from-clinical-950 via-clinical-900 to-clinical-950 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-2.5 text-sm sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
              <div className="flex items-center gap-2 text-white/95">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <Phone className="h-3.5 w-3.5 text-gold-light" aria-hidden />
                </span>
                <span className="tracking-wide">+91 7004119766</span>
              </div>
              <div className="hidden items-center gap-2 text-white/85 sm:flex">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <MapPin className="h-3.5 w-3.5 text-gold-light" aria-hidden />
                </span>
                <span>Nahar Road, Near Sunil Bose, Dehri</span>
              </div>
            </div>
            <div className="hidden shrink-0 text-white/80 md:block">
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium tracking-wide ring-1 ring-white/10">
                Open: Mon-Sat 9:00 AM - 8:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-clinical-200/60 bg-background/85 backdrop-blur-xl transition-all duration-300",
          isScrolled && "shadow-premium"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[4.25rem] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <span className="hidden h-10 w-px shrink-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent sm:block" aria-hidden />
              <div className="flex flex-col">
                <span className="font-heading text-xl font-semibold tracking-tight text-clinical-950 transition-colors group-hover:text-primary">
                  Samarth Clinic
                </span>
                <span className="-mt-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-clinical-500">
                  Physiotherapy Rehabilitation Center
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-10 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link-premium text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/doctor-auth"
                className="btn-medical-outline flex items-center gap-2 px-5 py-2 text-sm"
              >
                <UserCog className="h-4 w-4" />
                Doctor Login
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-2.5 text-clinical-700 transition-colors hover:bg-clinical-100/80 hover:text-primary md:hidden"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-clinical-200/80 bg-background/95 backdrop-blur-xl md:hidden">
            <div className="space-y-1 px-4 py-5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-xl px-3 py-3 font-medium text-clinical-800 transition-colors hover:bg-clinical-50 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/doctor-auth"
                className="btn-medical-outline mt-2 flex w-full items-center justify-center gap-2 px-4 py-3 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCog className="h-4 w-4" />
                Doctor Login
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
