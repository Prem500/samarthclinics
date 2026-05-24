"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, User } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ravi Raj",
      role: "Local Guide",
      rating: 5,
      text: "Just a magical treatment. Hope all of you get the best treatment from this best clinic.",
      image: "/images/User-1.png"
    },
    {
      name: "Aditya Kumar", 
      role: "Patient",
      rating: 5,
      text: "I am very happy with the care at Samarth Clinic. My pain has improved a lot and my mobility has also increased. I appreciate the quality of care here.",
      image: "/images/User-2.png"
    },
    {
      name: "Sapna Verma",
      role: "Patient", 
      rating: 5,
      text: "The team at Samarth Clinic is very professional and supportive. Their treatment for my back pain has been extremely effective. I definitely recommend their services.",
      image: "/images/User-3.png"
    },
    {
      name: "Rajesh Sharma",
      role: "Patient",
      rating: 5,
      text: "My experience at Samarth Clinic has been wonderful. Their comprehensive rehabilitation services have helped me a lot in recovering from injury. I am very grateful for their dedication and expertise.",
      image: "/images/User-4.png"
    },
    {
      name: "Priya Singh",
      role: "Patient",
      rating: 5,
      text: "Excellent physiotherapy treatment! Dr. Prem Prakash is very knowledgeable and caring. The clinic environment is clean and professional. Highly recommended!",
      image: "/images/person1.jpg"
    },
    {
      name: "Amit Gupta",
      role: "Patient", 
      rating: 5,
      text: "Outstanding service and treatment. The staff is friendly and the doctor explains everything clearly. My shoulder pain is completely gone after the treatment.",
      image: "/images/person2.jpg"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? "text-yellow-400 fill-current" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="section-padding relative border-t border-clinical-200/50 bg-gradient-to-b from-clinical-50/90 to-background">
      <div className="pointer-events-none absolute inset-0 bg-mesh-light opacity-40" />
      <div className="relative mx-auto max-w-7xl container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="premium-badge mb-5">Testimonials</span>
          <h2 className="mb-5 font-heading text-3xl font-semibold tracking-tight text-clinical-950 md:text-4xl">
            What Our Patients Say
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-clinical-600">
            Hear from our satisfied patients about their recovery journey and
            experience with our physiotherapy services.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative h-full overflow-hidden border-0 shadow-premium ring-1 ring-clinical-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/40 opacity-90 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-7">
                  {/* Quote Icon */}
                  <div className="mb-5 flex justify-center">
                    <div className="rounded-2xl bg-primary/10 p-3 ring-1 ring-primary/15">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-5 flex justify-center gap-0.5">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="mb-6 text-center italic leading-relaxed text-clinical-700">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Patient Info */}
                  <div className="flex items-center justify-center gap-3 border-t border-clinical-200/60 pt-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clinical-100 ring-2 ring-white">
                      <User className="h-5 w-5 text-clinical-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-heading font-semibold text-clinical-950">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-clinical-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-4xl rounded-3xl border border-clinical-200/80 bg-white/90 p-8 shadow-premium-lg ring-1 ring-clinical-100/50 backdrop-blur-sm md:p-10">
            <h3 className="mb-8 font-heading text-2xl font-semibold text-clinical-950">
              Trusted by Patients Across Dehri
            </h3>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 font-heading text-3xl font-semibold text-primary">5.0</div>
                <div className="mb-2 flex justify-center gap-0.5">
                  {renderStars(5)}
                </div>
                <div className="text-sm text-clinical-600">Average Rating</div>
              </div>

              <div className="text-center">
                <div className="mb-2 font-heading text-3xl font-semibold text-cyan-700">5000+</div>
                <div className="text-sm text-clinical-600">Happy Patients</div>
              </div>

              <div className="text-center">
                <div className="mb-2 font-heading text-3xl font-semibold text-emerald-700">98%</div>
                <div className="text-sm text-clinical-600">Success Rate</div>
              </div>
            </div>

            <p className="mt-8 text-clinical-600">
              Join our growing community of satisfied patients who have experienced
              exceptional physiotherapy care and successful recovery.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}