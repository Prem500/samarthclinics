"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden border-t border-clinical-200/50 bg-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh-light opacity-35" />
      <div className="relative mx-auto max-w-7xl container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="premium-badge mb-5">Get In Touch</span>
          <h2 className="mb-5 font-heading text-3xl font-semibold tracking-tight text-clinical-950 md:text-4xl">
            Visit Our Clinic
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-clinical-600">
            Find us easily in Dehri and get in touch for appointments,
            inquiries, or emergency consultations.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-clinical-200/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-primary/10 p-3 ring-1 ring-primary/20">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-heading text-xl font-semibold text-clinical-950">
                      Clinic Address
                    </h3>
                    <p className="mb-4 text-clinical-600">
                    Canal Road , Near Sunil Bose, Dehri
                    </p>
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <a 
                        href="https://www.google.com/maps/dir//Physiotherapy+%26+Rehabilitation+Center+%7C+Samarth+Clinic+I+Dr+Prem+Prakash,+Canal+Rd,+Rajputana+Mohalla,+Dehri,+Bihar+821307/@24.9229161,84.1472434,14.11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x398daf007d3ea459:0x46361466f3d9fa30!2m2!1d84.1773499!2d24.9071756?entry=ttu" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Navigation className="h-4 w-4" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-clinical-200/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-200/60">
                    <Phone className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-heading text-xl font-semibold text-clinical-950">
                      Phone Number
                    </h3>
                    <p className="mb-4 text-clinical-600">
                      Available for appointments and emergencies
                    </p>
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <a 
                        href="tel:+917004119766"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        +91 7004119766
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-clinical-200/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-violet-50 p-3 ring-1 ring-violet-200/60">
                    <Mail className="h-6 w-6 text-violet-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-heading text-xl font-semibold text-clinical-950">
                      Email Address
                    </h3>
                    <p className="mb-4 text-clinical-600">
                      Send us your queries and we'll respond promptly
                    </p>
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <a 
                        href="mailto:Samarthclinic.info@gmail.com"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Samarthclinic.info@gmail.com
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-clinical-200/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-200/60">
                    <Clock className="h-6 w-6 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-heading text-xl font-semibold text-clinical-950">
                      Working Hours
                    </h3>
                    <div className="space-y-2 text-clinical-600">
                      <div className="flex justify-between">
                        <span>Monday - Saturday</span>
                        <span className="font-medium">9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium text-red-600">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full overflow-hidden border-clinical-200/80 shadow-premium">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-heading text-xl font-semibold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </span>
                  Find Us on Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-96 lg:h-full min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3793.9!2d84.1773499!3d24.9071756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398daf007d3ea459%3A0x46361466f3d9fa30!2sPhysiotherapy%20%26%20Rehabilitation%20Center%20%7C%20Samarth%20Clinic%20I%20Dr%20Prem%20Prakash!5e0!3m2!1sen!2sin!4v1747650000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Samarth Clinic Location"
                    className="rounded-b-lg"
                  />
                  
                  {/* Map Overlay */}
                  <div className="absolute left-4 top-4 rounded-xl border border-clinical-200/80 bg-white/95 p-3 shadow-premium backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]"></div>
                      <span className="text-sm font-semibold text-clinical-950">
                        Samarth Clinic
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Clinic Interior Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="overflow-hidden border-clinical-200/80 shadow-premium-lg">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-2xl font-semibold text-clinical-950">
                Visit Our Modern Clinic
              </CardTitle>
              <p className="mt-2 text-clinical-600">
                Experience our state-of-the-art facilities designed for your comfort and recovery
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                  src="/servicesimages/clinic interior.jpg"
                  alt="Samarth Clinic Interior - Modern Physiotherapy Facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-clinical-950/75 via-clinical-950/15 to-transparent" />
                <div className="absolute bottom-6 left-6 max-w-lg text-white">
                  <h3 className="mb-2 font-heading text-xl font-semibold">Modern Equipment & Comfortable Environment</h3>
                  <p className="text-sm text-white/90">Equipped with the latest physiotherapy equipment for optimal treatment outcomes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Contact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-rose-700 via-rose-600 to-amber-700 text-white shadow-premium-lg">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <CardContent className="relative p-8 text-center sm:p-10">
              <Phone className="mx-auto mb-4 h-12 w-12 text-white/95" />
              <h3 className="mb-2 font-heading text-2xl font-semibold">
                Need Immediate Assistance?
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-rose-50/95">
                For urgent physiotherapy consultations or emergency cases,
                don't hesitate to contact us directly.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/90 bg-white font-semibold text-rose-700 shadow-lg hover:bg-rose-50 hover:text-rose-800"
                  asChild
                >
                  <a href="tel:+917004119766">
                    Call Now: +91 7004119766
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/90 bg-white font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50 hover:text-emerald-800"
                  asChild
                >
                  <a
                    href="https://wa.me/917004119766?text=Hello%20Doctor,%20I%20need%20urgent%20consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Emergency
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}