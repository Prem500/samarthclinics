"use client";

import { Home, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WA_PHONE = "917004119766";
const waLink = (text: string) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;

export default function HeroSection() {

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Background with refined cinematic overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(8, 22, 36, 0.55) 0%, rgba(10, 28, 45, 0.75) 40%, rgba(6, 18, 30, 0.88) 100%), url('/images/hero_bg_1.jpg')`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(20,184,166,0.12),transparent)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="mb-6 font-heading text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Best Physiotherapy Clinic in{" "}
            <span className="bg-gradient-to-r from-teal-200 via-cyan-100 to-teal-200 bg-clip-text text-transparent">
              Dehri
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-xl font-light leading-relaxed text-teal-50/95 md:text-2xl">
            Professional rehabilitation services with expert care for joint pain,
            sports injuries, and neurological conditions
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={waLink("Hello, I would like to connect with Samarth Clinic.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-medical inline-flex items-center px-8 py-4 text-base font-semibold shadow-[0_12px_40px_-8px_rgba(15,118,110,0.5)]"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </a>

            <a
              href={waLink("I wanted to know more about home physiotherapy")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border-2 border-white/90 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-primary"
            >
              <Home className="mr-2 h-5 w-5" />
              I Want Home Physiotherapy
            </a>
          </motion.div>
        </motion.div>

        {/* Ambient orbs */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-8 top-24 h-32 w-32 rounded-full bg-teal-400/15 blur-3xl md:left-16"
        />

        <motion.div
          animate={{
            y: [0, 12, 0],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-24 right-8 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl md:right-20"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-1.5 h-2 w-0.5 rounded-full bg-white/70"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
