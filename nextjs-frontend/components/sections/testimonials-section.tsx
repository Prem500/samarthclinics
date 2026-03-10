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
    <section className="section-padding bg-gray-50">
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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What Our Patients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Quote className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 text-center mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Patient Info */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
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
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Trusted by Patients Across Dehri
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5.0</div>
                <div className="flex justify-center gap-1 mb-2">
                  {renderStars(5)}
                </div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">4500+</div>
                <div className="text-gray-600">Happy Patients</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
            
            <p className="text-gray-600 mt-6">
              Join our growing community of satisfied patients who have experienced 
              exceptional physiotherapy care and successful recovery.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}