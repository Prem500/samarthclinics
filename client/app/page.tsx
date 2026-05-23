"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award, Brain, Calendar, CheckCircle, Clock, Facebook,
  Hand, Heart, Home,HeartPulse, Zap, Dumbbell, Instagram, Mail, MapPin, Menu, MessageCircle,
  Navigation, Phone, Shield, Star, Stethoscope, Trophy, User,
  UserCog, Users, X, Youtube, Bone, Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AppointmentForm from "@/components/booking/appointment-form";

/* ── Shared fade variant ── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  viewport: { once: true },
});

/* ══════════════════════════════════════════
   APPOINTMENT MODAL
══════════════════════════════════════════ */
function AppointmentModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto p-0">
        <div className="bg-gradient-to-br from-stone-50 to-amber-50/40 p-6 md:p-10">
          <DialogHeader className="mb-8 text-center">
            <DialogTitle className="text-3xl font-bold text-stone-900 md:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Book Your Consultation
            </DialogTitle>
            <p className="mt-2 text-stone-500">With Dr. Prem Prakash — Samarth Clinic, Dehri</p>
          </DialogHeader>
          <div className="grid gap-8 lg:grid-cols-2">
            <AppointmentForm />
            <div className="space-y-4">
              {[
                { icon: User, title: "Dr. Prem Prakash", sub: "Senior Physiotherapist · BPT · 5+ yrs" },
                { icon: MapPin, title: "Canal Rd, Rajputana Mohalla, Dehri, Bihar 821307", sub: "", href: "https://maps.app.goo.gl/3Ey94eDkMNvhsrQf7" },
                { icon: Clock, title: "Mon–Sat: 10 AM – 8 PM", sub: "Sunday Closed" },
                { icon: Phone, title: "+91 70041 19766", sub: "Emergency & Appointments", href: "tel:+917004119766" },
              ].map((item, i) => (
                <Card key={i} className="border-stone-200 bg-white/80 backdrop-blur-sm">
                  <CardContent className="flex items-start gap-4 p-4">
                    <span className="mt-0.5 rounded-xl bg-amber-100 p-2.5"><item.icon className="h-5 w-5 text-amber-700" /></span>
                    <div>
                      <p className="font-semibold text-stone-900">{item.title}</p>
                      {item.sub && <p className="text-sm text-stone-500">{item.sub}</p>}
                      {item.href && <a href={item.href} className="text-sm text-amber-700 underline-offset-2 hover:underline">Open →</a>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ══════════════════════════════════════════
   HEADER
══════════════════════════════════════════ */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const nav = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }, { name: "Services", href: "/services" }, { name: "Contact", href: "/contact" }];
  return (
    <>
      {/* top bar */}
      <div className="bg-stone-900 text-stone-300 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href="tel:+917004119766" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"><Phone className="h-3 w-3" />+91 70041 19766</a>
            <span className="hidden items-center gap-1.5 sm:flex"><MapPin className="h-3 w-3" />Canal Rd, Rajputana Mohalla, Dehri, Bihar</span>
          </div>
          <span className="hidden shrink-0 rounded bg-amber-900/40 px-2.5 py-1 text-amber-300 md:block">Mon–Sat · 10 AM–8 PM · 4.9 ★</span>
        </div>
      </div>
      {/* main header */}
      <header className={cn("sticky top-0 z-50 border-b border-stone-200/70 bg-white/90 backdrop-blur-xl transition-shadow duration-300", scrolled && "shadow-md")}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-stone-900" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.01em" }}>Samarth Clinic</span>
            <span className="text-[10px] tracking-[0.2em] text-amber-700 uppercase">Physiotherapy & Rehabilitation · Dehri</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map(({ name, href }) => (
              <Link key={name} href={href} className="text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors">{name}</Link>
            ))}
            <Link href="/doctor-auth" className="flex items-center gap-1.5 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-600 hover:text-amber-700 transition-all">
              <UserCog className="h-4 w-4" />Doctor Login
            </Link>
          </nav>
          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-stone-700 hover:bg-stone-100 md:hidden" aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-stone-200 bg-white px-4 py-4 md:hidden">
            {nav.map(({ name, href }) => (
              <Link key={name} href={href} onClick={() => setOpen(false)} className="block py-2.5 text-stone-700 hover:text-amber-700">{name}</Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-1 text-xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Samarth Clinic</p>
            <p className="mb-4 text-xs tracking-widest text-amber-500 uppercase">Physiotherapy & Rehabilitation · Dehri</p>
            <p className="text-sm leading-relaxed">Expert physiotherapy, neuro rehabilitation & home visit services in Dehri on Sone, Rohtas, Bihar. Rated 4.9★ on Google.</p>
            <div className="mt-5 flex gap-3">
              {[{ icon: Facebook, href: "https://www.facebook.com/imthepremkumarshah" }, { icon: Instagram, href: "https://www.instagram.com/dr._prem__prakash?igsh=aGw0dWp0eW9ucHM3" }, { icon: Youtube, href: "https://youtube.com/@dr.premprakash?si=E-idqyuSrDL5HAAN" }].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-amber-700 hover:text-white transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Quick Links</p>
            {["Home", "About", "Services", "Contact"].map(l => (
              <Link key={l} href={`/${l === "Home" ? "" : l.toLowerCase()}`} className="mb-2 block text-sm hover:text-amber-400 transition-colors">{l}</Link>
            ))}
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Treatments</p>
            {["Home Physiotherapy", "Neuro Rehabilitation", "Speech Therapy", "Occupational Therapy", "Sports Injury", "Orthopedic Rehabilitation"].map(s => (
              <p key={s} className="mb-2 text-sm">{s}</p>
            ))}
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Contact</p>
            <div className="space-y-3 text-sm">
              <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />Canal Rd, Rajputana Mohalla, Dehri, Bihar 821307</p>
              <a href="tel:+917004119766" className="flex gap-2 hover:text-amber-400"><Phone className="h-4 w-4 shrink-0 text-amber-600" />+91 70041 19766</a>
              <a href="mailto:Samarthclinic.info@gmail.com" className="flex gap-2 hover:text-amber-400 break-all"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />Samarthclinic.info@gmail.com</a>
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

/* ══════════════════════════════════════════
   WHATSAPP
══════════════════════════════════════════ */
function WhatsApp() {
  return (
    <a href="https://wa.me/917004119766?text=Hello%20Doctor%2C%20I%20would%20like%20to%20book%20an%20appointment!" target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_30px_rgba(16,185,129,0.5)] ring-2 ring-white hover:bg-emerald-600 hover:scale-110 transition-all duration-300"
      aria-label="WhatsApp">
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
const WA_PHONE = "917004119766";
const waLink = (text: string) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(160deg, rgba(12,10,8,0.72) 0%, rgba(20,15,10,0.85) 60%, rgba(8,6,4,0.92) 100%), url('/images/hero_bg_1.jpg')` }} />
      {/* gold accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div {...fade()}>
          {/* Google badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-950/60 px-4 py-2 text-sm text-amber-300 backdrop-blur-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>4.9  Google Rating · Dehri's Most Trusted Clinic</span>
          </div>

          <h1 className="mb-5 text-5xl font-bold leading-[1.1] text-white md:text-6xl lg:text-7xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Best Physiotherapy<br />
            <span className="text-amber-400">Clinic in Dehri</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg font-light leading-relaxed text-stone-300 md:text-xl">
            Expert Physiotherapy, Ortho and Neuro rehabilitation in Dehri on Sone, Rohtas, Bihar. Serving 5000+ patients with 100% dedication.
          </p>

          {/* Schema-friendly service keywords */}
          <p className="mx-auto mb-10 max-w-3xl text-sm text-stone-500">
            Joint Pain · Spinal Promlems · Stroke Rehab · Sports Injury · Home Physiotherapy · Speech Therapy ·  Occupational Therapy · Neurological Rehabilitation
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={waLink("Hello, I would like to connect with Samarth Clinic.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-[0_8px_30px_rgba(5,150,105,0.4)] hover:bg-emerald-500 transition-all duration-300">
              <MessageCircle className="h-5 w-5" />Chat on WhatsApp
            </a>
            <a
              href={waLink("I wanted to know more about home physiotherapy")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-amber-400/60 bg-amber-600/20 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:border-amber-400 hover:bg-amber-600/30 transition-all">
              <Home className="h-5 w-5" />I Want Home Physiotherapy
            </a>
            <a href="tel:+917004119766"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:border-amber-500/60 hover:bg-white/15 transition-all">
              <Phone className="h-5 w-5" />Call Now
            </a>
          </div>
        </motion.div>
      </div>

      {/* stats bar */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto grid max-w-4xl grid-cols-4 divide-x divide-white/10">
          {[["5000+", "Happy Patients"], ["5+", "Years"], ["4.9★", "Google Rating"], ["100%", "Satisfaction"]].map(([n, l]) => (
            <div key={l} className="py-4 text-center">
              <p className="text-xl font-bold text-amber-400" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{n}</p>
              <p className="text-xs text-stone-400">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICES
══════════════════════════════════════════ */
const SERVICES = [ 
  { icon: Zap, title: "Electrotherapy", desc: "Advanced electrical stimulation therapies for pain relief, muscle recovery, and faster healing.", img: "/servicesimages/electrotherapy1.jpg" },

  { icon: Brain, title: "Neuro Rehabilitation", desc: "Specialized programs for stroke, spinal cord injuries & neurological conditions.", img: "/servicesimages/neurological rehabilitation samarth clinics dehri on sone.png" },

  { icon: Bone, title: "Orthopedic Rehabilitation", desc: "Expert treatment for bone, muscle & joint injuries with modern techniques.", img: "/servicesimages/Orthopedic_Rehabilitation.jpeg" },

  { icon: User, title: "Child Rehabilitation", desc: "Dedicated therapy programs for children with developmental delays and physical challenges.", img: "/servicesimages/childrehabilitation.jpeg" },

  { icon: Stethoscope, title: "Orthopedic Consultation", desc: "Professional assessment and guidance for bone, joint, and musculoskeletal conditions.", img: "/servicesimages/Orthopedic_Rehabilitation.jpg" },

  { icon: Dumbbell, title: "Sports Rehabilitation", desc: "Injury recovery and performance enhancement programs tailored for athletes.", img: "/servicesimages/sportsrehabilitation.jpeg" },

  { icon: HeartPulse, title: "Pain Management", desc: "Comprehensive pain relief solutions using modern physiotherapy techniques.", img: "/servicesimages/painmanagement.png" },

  { icon: Home, title: "Home Physiotherapy", desc: "Professional physiotherapy at your doorstep for optimal comfort and recovery.", img: "/servicesimages/physiotherapyathome.jpg" },

  { icon: Hand, title: "Occupational Therapy", desc: "Regain independence in daily activities and improve your quality of life.", img: "/servicesimages/Occupational Therapy samarth clinics dehri on sone.webp" },

  { icon: MessageCircle, title: "Speech Therapy", desc: "Improve communication, speech clarity and language development.", img: "/servicesimages/speechtherapy.jpeg" },
];

function Services({ onBook }: { onBook: () => void }) {
  return (
    <section id="services" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fade()} className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">Treatments & Services</p>
          <h2 className="text-4xl font-bold text-stone-900 md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Specialized Care in Dehri & Rohtas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-500">Comprehensive physiotherapy services — from knee & back pain to stroke rehab, speech therapy & home visits across Dehri on Sone, Bihar.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc, img }, i) => (
            <motion.div key={title} {...fade(i * 0.07)}>
              <Card className="group h-full overflow-hidden border-stone-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <Image src={img} alt={`${title} - Samarth Clinic Dehri`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
                  <div className="absolute left-4 bottom-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/90 backdrop-blur-sm">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-sm font-semibold text-white">{title}</span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-sm leading-relaxed text-stone-600">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade(0.2)} className="mt-16 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 p-10 text-center text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-600/20 blur-3xl" />
          <p className="mb-2 text-sm uppercase tracking-widest text-amber-400">Dehri's Premier Rehabilitation Center</p>
          <h3 className="mb-4 text-3xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Start Your Recovery Today</h3>
          <p className="mb-8 text-stone-400">Trusted by 4500+ patients across Dehri, Sasaram, Aurangabad & Rohtas district.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button onClick={onBook} className="rounded-full bg-amber-600 px-8 py-3 font-semibold hover:bg-amber-500 transition-colors">Book Appointment</button>
            <Link href="/services" className="rounded-full border border-white/30 px-8 py-3 font-semibold hover:border-amber-500 transition-colors">All Services →</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

 /* ══════════════════════════════════════════
    TEAM
 ══════════════════════════════════════════ */
 const DOCTORS = [
  {
    name: "Dr. Prem Prakash", 
    role: "Senior Physiotherapist", 
    highlight: "Founder & Director, Samarth Clinic",
    qual: "BPT · 5+ Years Experience", 
    img: "/servicesimages/drprem.jpeg", 
    bio: (
      <>
        Certified in Manual Therapy. 
        <br />
        Certified in Neuro Developmental Technique (Neurology department AIIMS, New Delhi).
        <br />
        Pioneer of advanced rehabilitation in Dehri on Sone.
      </>
    )
  },
  { 
    name: "Dr. Sushil Kamal", 
    role: "Consultant Orthopaedic", 
    qual: "MBBS (Kolkata) · MS Ortho (Delhi)", 
    img: "/servicesimages/susheelkamalorthopedicsurgeon.jpeg", 
    bio: "Orthopedic surgeon with expertise in pain management, joint replacement, spinal disorders, fractures & post-surgical rehabilitation. Trained in Delhi's top institutions." 
  },
];

const ASSOC = { 
  name: "Dr. Nitish Singh", 
  role: "Physiotherapist", 
  qual: "BPT · GNSU",
  img: "/servicesimages/nitishkumarphysiotherapist.jpeg",
  bio: "Specialist in musculoskeletal physiotherapy, Neuromuscular physio care with manual and electrotherapy." 
};

function Team() {
  return (
    <section id="about" className="bg-gradient-to-b from-white to-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fade()} className="mb-20 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
            Expert Medical Team
          </p>
          <h2 className="text-4xl font-bold text-stone-900 md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
           Experts Team Only 
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-500">
            Qualified, compassionate professionals dedicated to your complete recovery at our physiotherapy center in Dehri.
          </p>
        </motion.div>

        {/* Lead doctors */}
        <div className="mb-12 grid gap-10 md:grid-cols-2">
          {DOCTORS.map(({ name, role, highlight, qual, img, bio }, i) => (
            <motion.div key={name} {...fade(i * 0.1)}>
              <Card className="group overflow-hidden border border-stone-200 bg-white shadow-md hover:shadow-2xl transition-all duration-500 rounded-2xl">
                
                <div className="flex flex-col sm:flex-row">
                  
                  {/* Image */}
                  <div className="relative h-72 w-full shrink-0 overflow-hidden sm:h-auto sm:w-52">
                    <Image 
                      src={img} 
                      alt={name} 
                      fill 
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <CardContent className="flex flex-col justify-center p-7">
                    
                    {/* Gold line */}
                    <div className="mb-2 h-[2px] w-12 bg-amber-500" />

                    <h3 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {name}
                    </h3>

                    <p className="text-sm font-semibold text-amber-700">
                      {role}
                    </p>

                    {/* Founder badge */}
                    {highlight && (
                      <span className="mt-1 inline-block w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                        {highlight}
                      </span>
                    )}

                    <p className="mt-2 text-sm text-stone-500">
                      {qual}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      {bio}
                    </p>

                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Associate */}
        <motion.div {...fade(0.2)} className="mx-auto max-w-xl">
          <Card className="group overflow-hidden border border-stone-200 bg-white shadow-md hover:shadow-xl transition-all duration-500 rounded-2xl">
            <div className="flex flex-row">
              <div className="relative h-44 w-32 shrink-0 overflow-hidden sm:h-auto sm:w-36">
                <Image
                  src={ASSOC.img}
                  alt={ASSOC.name}
                  fill
                  sizes="(max-width: 640px) 128px, 144px"
                  className="bg-stone-100 object-contain object-center sm:bg-transparent sm:object-cover sm:object-top transition-transform duration-700 sm:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent sm:from-black/30" />
              </div>

              <CardContent className="flex flex-col justify-center p-5 sm:p-7">
                <div className="mb-2 h-[2px] w-10 bg-amber-500" />
                <h3 className="text-xl font-bold text-stone-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {ASSOC.name}
                </h3>
                <p className="text-sm font-semibold text-amber-700">{ASSOC.role}</p>
                <p className="mt-1 text-sm text-stone-500">{ASSOC.qual}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{ASSOC.bio}</p>
              </CardContent>
            </div>
          </Card>
        </motion.div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   WHY CHOOSE US
══════════════════════════════════════════ */
const WHY = [
  { icon: Shield, title: "Expert Certified Team", desc: "BPT, MBBS & MS Ortho qualified specialists with years of rehabilitation experience." },
  { icon: Heart, title: "Personalized Plans", desc: "Every patient gets a custom treatment protocol tailored to their exact condition and goals." },
  { icon: Home, title: "Home Visit Service", desc: "Can't travel? We come to you. Home physiotherapy across Dehri, Sasaram & Rohtas." },
  { icon: Award, title: "4.9★ Google Rated", desc: "42 verified Google reviews. Patients call us humble, professional and highly effective." },
  { icon: Clock, title: "Flexible Timing", desc: "Mon–Sun, 10 AM–8 PM. Flexible slots for busy professionals and senior patients." },
  { icon: Trophy, title: "5000+ Recoveries", desc: "Thousands of successful outcomes across knee, back, neuro, sports & paediatric cases." },
];

function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-stone-900 py-24 text-white">
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,119,6,0.12), transparent)" }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fade()} className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">Why People Trust Us?</p>
          <h2 className="text-4xl font-bold md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Advanced Physiotherapy Care Trusted<br />Across Dehri on Sone
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-stone-400">
            Whether it&apos;s chronic pain, slip disc, knee pain, paralysis, stroke recovery, or sports injuries — our focus is not only pain relief but restoring mobility, confidence, and quality of life through modern rehabilitation techniques.
          </p>
          <p className="mx-auto mt-4 text-sm font-semibold tracking-wide text-amber-400/90">
            Expert Care • Personalized Treatment • Faster Recovery
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} {...fade(i * 0.07)}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600/20 ring-1 ring-amber-500/30">
                  <Icon className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="mb-2 font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-stone-400">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════ */
const TESTIMONIALS = [
  { name: "Ravi Raj", role: "Local Guide, Dehri", text: "Just a magical treatment. Hope all of you get the best treatment from this best clinic in Dehri.", rating: 5 },
  { name: "Aditya Kumar", role: "Patient", text: "I am very happy with the care at Samarth Clinic. My pain has improved a lot and my mobility has also increased. I appreciate the quality of care here.", rating: 5 },
  { name: "Sapna Verma", role: "Patient", text: "The team at Samarth Clinic is very professional and supportive. Their treatment for my back pain has been extremely effective. Definitely recommend.", rating: 5 },
  { name: "Rajesh Sharma", role: "Patient", text: "Wonderful experience. Comprehensive rehabilitation services have helped me a lot. I am very grateful for their dedication and expertise.", rating: 5 },
  { name: "Priya Singh", role: "Patient, Rohtas", text: "Excellent physiotherapy! Dr. Prem Prakash is very knowledgeable and caring. Clean, professional clinic. Highly recommended in Dehri!", rating: 5 },
  { name: "Amit Gupta", role: "Patient", text: "Outstanding service. The doctor explains everything clearly. My shoulder pain is completely gone after the treatment. Best clinic in Dehri.", rating: 5 },
];

function Testimonials() {
  return (
    <section className="bg-amber-50/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fade()} className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">Patient Reviews</p>
          <h2 className="text-4xl font-bold text-stone-900 md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>What Our Patients Say</h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
            <span className="ml-2 font-semibold text-stone-700">4.9 / 5 · 42 Google Reviews</span>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ name, role, text, rating }, i) => (
            <motion.div key={name} {...fade(i * 0.07)}>
              <Card className="h-full border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Quote className="mb-4 h-8 w-8 text-amber-200" />
                  <p className="mb-5 text-sm leading-relaxed text-stone-600 italic">"{text}"</p>
                  <div className="flex items-center gap-3 border-t border-stone-100 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-sm">{name[0]}</div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">{name}</p>
                      <p className="text-xs text-stone-500">{role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">{[...Array(rating)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CONTACT / MAP
══════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fade()} className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">Visit Us</p>
          <h2 className="text-4xl font-bold text-stone-900 md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Find Samarth Clinic in Dehri</h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div {...fade()} className="space-y-5">
            {[
              { icon: MapPin, label: "Address", value: "Canal Rd, Rajputana Mohalla, Dehri on Sone, Rohtas, Bihar 821307", href: "https://maps.app.goo.gl/3Ey94eDkMNvhsrQf7", cta: "Get Directions →" },
              { icon: Phone, label: "Phone / WhatsApp", value: "+91 70041 19766", href: "tel:+917004119766", cta: "Call Now →" },
              { icon: Mail, label: "Email", value: "Samarthclinic.info@gmail.com", href: "mailto:Samarthclinic.info@gmail.com", cta: "Send Email →" },
              { icon: Clock, label: "Working Hours", value: "Monday – Saturday: 10:00 AM – 8:00 PM  |  Sunday: Closed" },
            ].map(({ icon: Icon, label, value, href, cta }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 hover:border-amber-300 transition-colors">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100"><Icon className="h-5 w-5 text-amber-700" /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">{label}</p>
                  <p className="mt-1 text-stone-800">{value}</p>
                  {href && cta && <a href={href} className="mt-1 text-sm font-medium text-amber-700 hover:underline">{cta}</a>}
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-gradient-to-r from-stone-900 to-amber-950 p-6 text-white">
              <p className="mb-1 text-xs uppercase tracking-widest text-amber-400">Emergency Contact</p>
              <p className="mb-4 text-stone-300">Available for urgent physiotherapy cases across Dehri & Rohtas.</p>
              <div className="flex gap-3">
                <a href="tel:+917004119766" className="rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold hover:bg-amber-500 transition-colors">📞 Call</a>
                <a href="https://wa.me/917004119766" target="_blank" rel="noopener noreferrer" className="rounded-full border border-emerald-500/50 bg-emerald-900/40 px-5 py-2.5 text-sm font-semibold text-emerald-300 hover:bg-emerald-800/50 transition-colors">WhatsApp</a>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.15)}>
            <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14391.825675144675!2d85.1406895!3d25.6125392!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4d8ce94d30763c1b!2sSamarth%20Clinic!5e0!3m2!1sen!2sin!4v1700992427448!5m2!1sen!2sin"
                width="100%" height="420" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Samarth Clinic Location - Best Physiotherapy in Dehri on Sone Bihar" />
            </div>
            <p className="mt-3 text-center text-sm text-stone-500">📍 Samarth Clinic — Canal Rd, Rajputana Mohalla, Dehri on Sone, Bihar</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function HomePage() {
  const [bookOpen, setBookOpen] = useState(false);
  return (
    <>
      {/* Hidden SEO content */}
      <div style={{ display: "none" }} aria-hidden="true">
        Physiotherapy in Dehri · Physiotherapist Dehri on Sone · Physiotherapy Rohtas Bihar · Best physiotherapy clinic Dehri ·
        Knee pain treatment Dehri · Back pain relief Dehri · Neuro rehabilitation Dehri · Home physiotherapy Dehri ·
        Sports injury treatment Dehri · Stroke rehabilitation Bihar · TENS IFT therapy Dehri · Samarth Clinic Dehri ·
        Dr Prem Prakash physiotherapist · Occupational therapy Dehri · Speech therapy Dehri · Paediatric physiotherapy Rohtas
      </div>

      <div className="min-h-screen" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <Header />
        <main>
          <Hero />
          <Services onBook={() => setBookOpen(true)} />
          <Team />
          <WhyUs />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsApp />
        <AppointmentModal open={bookOpen} onOpenChange={setBookOpen} />
      </div>
    </>
  );
}