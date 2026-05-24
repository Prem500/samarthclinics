"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, UserCog, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div className="bg-stone-900 text-stone-300 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href="tel:+917004119766" className="flex items-center gap-1.5 transition-colors hover:text-amber-400">
              <Phone className="h-3 w-3" />
              +91 70041 19766
            </a>
            <span className="hidden items-center gap-1.5 sm:flex">
              <MapPin className="h-3 w-3" />
              Canal Rd, Rajputana Mohalla, Dehri, Bihar
            </span>
          </div>
          <span className="hidden shrink-0 rounded bg-amber-900/40 px-2.5 py-1 text-amber-300 md:block">
            Mon–Sat · 10 AM–8 PM · 4.9 ★
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b border-stone-200/70 bg-white/90 backdrop-blur-xl transition-shadow duration-300",
          scrolled && "shadow-md"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex flex-col leading-tight">
            <span
              className="text-xl font-bold text-stone-900"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.01em" }}
            >
              Samarth Clinic
            </span>
            <span className="text-[10px] tracking-[0.2em] text-amber-700 uppercase">
              Physiotherapy & Rehabilitation · Dehri
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="text-sm font-medium text-stone-700 transition-colors hover:text-amber-700"
              >
                {name}
              </Link>
            ))}
            <Link
              href="/doctor-auth"
              className="flex items-center gap-1.5 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-all hover:border-amber-600 hover:text-amber-700"
            >
              <UserCog className="h-4 w-4" />
              Doctor Login
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-stone-700 hover:bg-stone-100 md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-stone-200 bg-white px-4 py-4 md:hidden">
            {nav.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-stone-700 hover:text-amber-700"
              >
                {name}
              </Link>
            ))}
            <Link
              href="/doctor-auth"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-2 py-2.5 text-stone-700 hover:text-amber-700"
            >
              <UserCog className="h-4 w-4" />
              Doctor Login
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
