"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Clock, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AchievementsSection() {
  const mainStats = [
    {
      icon: Users,
      number: "5000+",
      label: "Patients Treated",
      description: "Successfully treated patients with various conditions",
      color: "blue"
    },
    {
      icon: Clock,
      number: "5+",
      label: "Years Experience",
      description: "Years of dedicated physiotherapy service",
      color: "teal"
    },
    {
      icon: Award,
      number: "100%",
      label: "Satisfaction Rate",
      description: "Patient satisfaction and recovery rate",
      color: "green"
    },
    {
      icon: Trophy,
      number: "15+",
      label: "Specializations",
      description: "Different treatment specializations offered",
      color: "purple"
    }
  ];


  return (
    <section className="section-padding relative overflow-hidden bg-mesh-light">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(15,118,110,0.06),transparent)]" />
      <div className="relative mx-auto max-w-7xl container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="premium-badge mb-5">Our Achievements</span>
          <h2 className="mb-5 font-heading text-3xl font-semibold tracking-tight text-clinical-950 md:text-4xl">
            Milestones & Recognition
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-clinical-600">
            Our commitment to excellence has earned us recognition and trust from our patients and community.
          </p>
        </motion.div>

        {/* Main Statistics */}
        <div className="mb-16 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {mainStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group border-0 bg-white/85 p-6 text-center shadow-premium ring-1 ring-clinical-200/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                  <CardContent className="p-0">
                    <div className={`mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner-soft ring-1 ring-black/[0.04] transition-transform duration-300 group-hover:scale-[1.03] ${
                      stat.color === 'blue' ? 'bg-primary/10 text-primary' :
                      stat.color === 'teal' ? 'bg-cyan-50 text-cyan-700' :
                      stat.color === 'green' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-violet-50 text-violet-700'
                    }`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="mb-2 font-heading text-3xl font-semibold tracking-tight text-clinical-950 md:text-4xl">
                      {stat.number}
                    </div>
                    <div className="mb-2 text-base font-semibold text-clinical-800">
                      {stat.label}
                    </div>
                    <div className="text-sm leading-relaxed text-clinical-600">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>


        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-clinical p-8 text-white shadow-premium-lg md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="relative">
              <h3 className="mb-4 font-heading text-2xl font-semibold md:text-3xl">
                Be Part of Our Success Story
              </h3>
              <p className="mb-6 text-lg text-white/90 md:text-xl">
                Join thousands of satisfied patients who have experienced our exceptional care.
              </p>
              <div className="flex items-center justify-center gap-2 text-lg text-white/95">
                <CheckCircle className="h-6 w-6 shrink-0 text-gold-light" />
                <span>Your recovery is our achievement</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}