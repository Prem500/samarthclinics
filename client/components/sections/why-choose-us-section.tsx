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
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Shield,
      title: "Expert Care",
      description:
        "Highly qualified physiotherapists with years of experience in rehabilitation and pain management.",
    },
    {
      icon: Heart,
      title: "Personalized Treatment",
      description:
        "Customized treatment plans tailored to your specific condition and recovery goals.",
    },
    {
      icon: Users,
      title: "Holistic Approach",
      description:
        "Comprehensive care that addresses not just symptoms but the root cause of your condition.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description:
        "Track record of successful treatments with high patient satisfaction rates.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description:
        "Convenient appointment times that fit your busy schedule, including evening slots.",
    },
    {
      icon: Stethoscope,
      title: "Modern Equipment",
      description:
        "State-of-the-art physiotherapy equipment and latest treatment techniques.",
    },
  ];

  const stats = [
    {
      number: "4500+",
      label: "Happy Clients",
      description: "Successfully treated patients",
    },
    {
      number: "2+",
      label: "Years Experience",
      description: "In physiotherapy practice",
    },
    {
      number: "100%",
      label: "Satisfaction",
      description: "Patient satisfaction rate",
    },
  ];

  const benefits = [
    "Comprehensive assessment and diagnosis",
    "Evidence-based treatment approaches",
    "Regular progress monitoring and adjustments",
    "Patient education and home exercise programs",
    "Affordable and transparent pricing",
    "Comfortable and hygienic clinic environment",
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-clinical text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Why Choose Samarth Clinic?
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-teal-50/95 md:text-xl">
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
          className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
                <Card className="h-full border-white/15 bg-white/[0.07] text-white shadow-none ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.12] hover:ring-white/25">
                  <CardContent className="p-7 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                      <IconComponent className="h-8 w-8 text-gold-light" />
                    </div>
                    <h3 className="mb-3 font-heading text-xl font-semibold">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-teal-50/90">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats and Benefits Section */}
        <div className="grid items-start gap-14 lg:grid-cols-2">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-center font-heading text-2xl font-semibold md:text-left md:text-3xl">
              Our Achievements
            </h3>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/10 px-3 py-5 text-center ring-1 ring-white/15 backdrop-blur-sm sm:px-4"
                >
                  <div className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-xs text-teal-100/85 sm:text-sm">
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
            <h3 className="mb-8 text-center font-heading text-2xl font-semibold md:text-left md:text-3xl">
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
                  className="flex items-start gap-4 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <CheckCircle className="h-4 w-4 text-gold-light" />
                  </span>
                  <span className="leading-relaxed text-teal-50/95">{benefit}</span>
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
          className="mt-16 rounded-3xl border border-white/20 bg-white/[0.06] p-8 text-center shadow-premium backdrop-blur-md md:p-12"
        >
          <Target className="mx-auto mb-6 h-14 w-14 text-gold-light opacity-95" />
          <h3 className="mb-4 font-heading text-2xl font-semibold md:text-3xl">
            Ready to Experience the Difference?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-teal-50/95">
            Join hundreds of satisfied patients who have experienced exceptional
            care and successful recovery at Samarth Clinic.
          </p>
          <div className="text-lg font-semibold text-white">
            Book your appointment today and start your journey to better health!
          </div>
        </motion.div>
      </div>
    </section>
  );
}
