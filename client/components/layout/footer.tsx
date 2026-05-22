import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-clinical-950 to-[#0a1219] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Clinic Info */}
          <div className="space-y-5">
            <div>
              <h3 className="font-heading text-xl font-semibold tracking-tight text-white">
                Samarth Clinic
              </h3>
              <div className="mt-2 h-px w-12 bg-gradient-to-r from-primary to-transparent" />
            </div>
            <p className="text-sm leading-relaxed text-clinical-300">
              Professional physiotherapy and rehabilitation services in Dehri.
              Expert treatment for joint pain, sports injuries, and neurological conditions.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/imthepremkumarshah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-clinical-400 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-white hover:ring-primary/40"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/dr._prem__prakash?igsh=aGw0dWp0eW9ucHM3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-clinical-400 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-white hover:ring-primary/40"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@dr.premprakash?si=E-idqyuSrDL5HAAN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-clinical-400 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-white hover:ring-primary/40"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold-light/90">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-clinical-300 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-clinical-300 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-clinical-300 transition-colors hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-clinical-300 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold-light/90">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm text-clinical-300">
              <li>Home Physiotherapy</li>
              <li>Speech Therapy</li>
              <li>Occupational Therapy</li>
              <li>Neuro Rehabilitation</li>
              <li>Specialized Physiotherapy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold-light/90">
              Contact Info
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>
                <span className="text-clinical-300 leading-relaxed">
                Canal Road, Near Sunil Bose, Dehri
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <Phone className="h-4 w-4 text-primary" />
                </span>
                <a
                  href="tel:+917004119766"
                  className="text-clinical-200 transition-colors hover:text-white"
                >
                  +91 7004119766
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                <a
                  href="mailto:Samarthclinic.info@gmail.com"
                  className="break-all text-clinical-200 transition-colors hover:text-white"
                >
                  Samarthclinic.info@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-clinical-400">
              © {currentYear} Samarth Clinic. All rights reserved.
            </p>
            <p className="text-sm text-clinical-500">
              Professional physiotherapy services in Dehri
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
