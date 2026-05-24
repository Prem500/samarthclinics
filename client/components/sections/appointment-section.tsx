"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppointmentForm from "@/components/booking/appointment-form";

export default function AppointmentSection() {
  return (
    <section id="appointments" className="section-padding bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule your consultation with Dr. Prem Prakash for professional physiotherapy treatment
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Appointment Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <AppointmentForm />
          </motion.div>

          {/* Clinic Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="medical-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Dr. Prem Prakash
                    </h3>
                    <p className="text-gray-600 mb-2">Senior Physiotherapist</p>
                    <p className="text-sm text-gray-500">
                      Bachelor in Physiotherapy with 5+ years of experience in 
                      home physiotherapy, speech therapy, occupational therapy and neuro rehabilitation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Clinic Location
                    </h3>
                    <p className="text-gray-600 mb-2">Nahar Road, Near Sunil Bose, Dehri</p>
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href="https://www.google.com/maps/dir//Physiotherapy+%26+Rehabilitation+Center+%7C+Samarth+Clinic+I+Dr+Prem+Prakash,+Canal+Rd,+Rajputana+Mohalla,+Dehri,+Bihar+821307/@24.9229161,84.1472434,14.11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x398daf007d3ea459:0x46361466f3d9fa30!2m2!1d84.1773499!2d24.9071756?entry=ttu" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Working Hours
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card bg-gradient-to-r from-blue-600 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Emergency Contact
                    </h3>
                    <p className="text-blue-100 mb-2">Available for urgent cases</p>
                    <Button variant="outline" size="sm" asChild className="bg-white text-blue-600 border-white hover:bg-blue-50 hover:text-blue-700 font-semibold">
                      <a href="tel:+917004119766">
                        Call +91 7004119766
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}