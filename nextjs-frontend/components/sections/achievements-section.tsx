"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Clock, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AchievementsSection() {
  const mainStats = [
    {
      icon: Users,
      number: "4500+",
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
    <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-teal-50">
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
            Our Achievements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Milestones & Recognition
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence has earned us recognition and trust from our patients and community.
          </p>
        </motion.div>

        {/* Main Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 ${
                      stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      stat.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                      stat.color === 'green' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-800 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-600">
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Be Part of Our Success Story
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of satisfied patients who have experienced our exceptional care.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <CheckCircle className="h-6 w-6" />
              <span>Your recovery is our achievement</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}