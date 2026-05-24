import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-1 text-xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Samarth Clinic
            </p>
            <p className="mb-4 text-xs tracking-widest text-amber-500 uppercase">
              Physiotherapy & Rehabilitation · Dehri
            </p>
            <p className="text-sm leading-relaxed">
              Expert physiotherapy, neuro rehabilitation & home visit services in Dehri on Sone, Rohtas, Bihar. Rated 4.9★ on Google.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Facebook, href: "https://www.facebook.com/imthepremkumarshah" },
                { icon: Instagram, href: "https://www.instagram.com/dr._prem__prakash?igsh=aGw0dWp0eW9ucHM3" },
                { icon: Youtube, href: "https://youtube.com/@dr.premprakash?si=E-idqyuSrDL5HAAN" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800 text-stone-400 transition-all hover:bg-amber-700 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Quick Links</p>
            {["Home", "About", "Services", "Contact"].map((l) => (
              <Link
                key={l}
                href={`/${l === "Home" ? "" : l.toLowerCase()}`}
                className="mb-2 block text-sm transition-colors hover:text-amber-400"
              >
                {l}
              </Link>
            ))}
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Treatments</p>
            {[
              "Electrotherapy",
              "Neuro Rehabilitation",
              "Orthopedic Rehabilitation",
              "Child Rehabilitation",
              "Sports Rehabilitation",
              "Pain Management",
              "Home Physiotherapy",
              "Occupational Therapy",
              "Speech Therapy",
            ].map((s) => (
              <p key={s} className="mb-2 text-sm">
                {s}
              </p>
            ))}
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Contact</p>
            <div className="space-y-3 text-sm">
              <p className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                Canal Rd, Rajputana Mohalla, Dehri, Bihar 821307
              </p>
              <a href="tel:+917004119766" className="flex gap-2 transition-colors hover:text-amber-400">
                <Phone className="h-4 w-4 shrink-0 text-amber-600" />
                +91 70041 19766
              </a>
              <a
                href="mailto:Samarthclinic.info@gmail.com"
                className="flex gap-2 break-all transition-colors hover:text-amber-400"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                Samarthclinic.info@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-stone-800 pt-8 text-center text-xs text-stone-600">
          © {new Date().getFullYear()} Samarth Clinic, Dehri. Best Physiotherapy Clinic in Dehri on Sone, Rohtas, Bihar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
