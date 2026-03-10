"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Visit Our Clinic
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find us easily in Dehri and get in touch for appointments, 
            inquiries, or emergency consultations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Clinic Address
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Nahar Road, Near Sunil Bose, Dehri
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href="https://maps.app.goo.gl/3Ey94eDkMNvhsrQf7" 
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

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Phone Number
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Available for appointments and emergencies
                    </p>
                    <Button variant="outline" size="sm" asChild>
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

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Email Address
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Send us your queries and we'll respond promptly
                    </p>
                    <Button variant="outline" size="sm" asChild>
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

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Working Hours
                    </h3>
                    <div className="space-y-2 text-gray-600">
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
            <Card className="h-full overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Find Us on Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-96 lg:h-full min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14391.825675144675!2d85.1406895!3d25.6125392!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4d8ce94d30763c1b!2sSamarth%20Clinic!5e0!3m2!1sen!2sin!4v1700992427448!5m2!1sen!2sin"
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
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-900">
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
          <Card className="overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Visit Our Modern Clinic
              </CardTitle>
              <p className="text-gray-600 mt-2">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Modern Equipment & Comfortable Environment</h3>
                  <p className="text-sm opacity-90">Equipped with the latest physiotherapy equipment for optimal treatment outcomes</p>
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
          <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">
                Need Immediate Assistance?
              </h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                For urgent physiotherapy consultations or emergency cases, 
                don't hesitate to contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white text-red-600 border-white hover:bg-red-50 hover:text-red-700 font-semibold"
                  asChild
                >
                  <a href="tel:+917004119766">
                    Call Now: +91 7004119766
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white text-green-600 border-white hover:bg-green-50 hover:text-green-700 font-semibold"
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