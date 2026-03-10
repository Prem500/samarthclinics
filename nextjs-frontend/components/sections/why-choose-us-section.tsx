"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Heart, 
  Users, 
  Award, 
  Clock, 
  Stethoscope,
  Target,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Shield,
      title: "Expert Care",
      description: "Highly qualified physiotherapists with years of experience in rehabilitation and pain management.",
      color: "blue"
    },
    {
      icon: Heart,
      title: "Personalized Treatment",
      description: "Customized treatment plans tailored to your specific condition and recovery goals.",
      color: "red"
    },
    {
      icon: Users,
      title: "Holistic Approach",
      description: "Comprehensive care that addresses not just symptoms but the root cause of your condition.",
      color: "green"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Track record of successful treatments with high patient satisfaction rates.",
      color: "purple"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Convenient appointment times that fit your busy schedule, including evening slots.",
      color: "orange"
    },
    {
      icon: Stethoscope,
      title: "Modern Equipment",
      description: "State-of-the-art physiotherapy equipment and latest treatment techniques.",
      color: "teal"
    }
  ];

  const stats = [
    {
      number: "4500+",
      label: "Happy Clients",
      description: "Successfully treated patients"
    },
    {
      number: "2+",
      label: "Years Experience",
      description: "In physiotherapy practice"
    },
    {
      number: "100%",
      label: "Satisfaction",
      description: "Patient satisfaction rate"
    }
  ];

  const benefits = [
    "Comprehensive assessment and diagnosis",
    "Evidence-based treatment approaches",
    "Regular progress monitoring and adjustments",
    "Patient education and home exercise programs",
    "Affordable and transparent pricing",
    "Comfortable and hygienic clinic environment"
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-blue-600 to-teal-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose Samarth Clinic?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose us for expert physiotherapy, chiropractic and alignment services, 
            where personalized care, holistic approach and cutting-edge techniques 
            ensure your wellness and pain relief.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats and Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center lg:text-left">
              Our Achievements
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-blue-200">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center lg:text-left">
              What You Get
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="bg-white/20 p-1 rounded-full mt-1">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-blue-100 leading-relaxed">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
        >
          <Target className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Experience the Difference?
          </h3>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied patients who have experienced exceptional 
            care and successful recovery at Samarth Clinic.
          </p>
          <div className="text-lg font-semibold">
            Book your appointment today and start your journey to better health!
          </div>
        </motion.div>
      </div>
    </section>
  );
}