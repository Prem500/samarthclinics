"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  const stats = [
    {
      icon: Users,
      number: "4500+",
      label: "Happy Clients",
      color: "blue"
    },
    {
      icon: Clock,
      number: "5+",
      label: "Years Experience",
      color: "teal"
    },
    {
      icon: Award,
      number: "100%",
      label: "Satisfaction Rate",
      color: "green"
    }
  ];

  const achievements = [
    "4500+ patients treated with successful outcomes",
    "Pioneer in innovative rehabilitation techniques for faster recovery",
    "98% patient satisfaction rate based on reviews",
    "Specialized in multiple physiotherapy disciplines"
  ];

  const teamMembers = [
    {
      name: "Dr. Prem Prakash",
      role: "Senior Physiotherapist",
      qualification: "Bachelor in Physiotherapy",
      image: "/images/premprofile.jpg",
      description: "With over 5 years of experience, Dr. Prem Prakash specializes in home physiotherapy, speech therapy, occupational therapy, neuro rehabilitation and specialized physiotherapy services."
    },
    {
      name: "Dr. Nikita Chauhan", 
      role: "Consultant Physiotherapist",
      qualification: "BPT, MPT",
      image: "/images/doctor-2.jpg",
      description: "Dr Nikita Chauhan specializes in occupational therapy, speech therapy, neuro rehabilitation and comprehensive patient education and counselling."
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
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
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Story & Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dedicated to providing exceptional physiotherapy and rehabilitation services 
            with a commitment to your health and well-being.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              About Our History
            </h3>
            
            <div className="prose prose-lg text-gray-600">
              <p>
                Samarth Clinic has been serving our community in the field of physiotherapy 
                for over 5 years, with dedication and commitment to enhancing the well-being 
                of our patients. Our journey has been one of continuous growth, innovation, 
                and unwavering patient-centered care.
              </p>
              
              <p>
                Founded in 2020 by Dr. Prem Prakash, a skilled and compassionate physiotherapist, 
                Samarth Clinic was established with the vision of providing high-quality 
                rehabilitation care to individuals of all ages. Dr. Prem Prakash aimed to 
                create a welcoming and supportive environment where patients could heal, 
                regain their strength, and enjoy a better quality of life.
              </p>
              
              <p>
                Over the years, we have expanded our services and expertise, building a 
                multidisciplinary team that includes licensed physiotherapists, rehabilitation 
                specialists, and support staff. Our practice has grown in both size and 
                reputation, establishing a track record of excellence in addressing a wide 
                range of musculoskeletal and neurological conditions.
              </p>
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </motion.div>
              ))}
            </div>

            <Button size="lg" asChild className="mt-6">
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </motion.div>

          {/* Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/servicesimages/clinic interior.jpg"
                alt="Samarth Clinic Interior"
                width={600}
                height={400}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center p-4 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-3 ${
                          stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                          stat.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Meet Our Expert Team
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our qualified medical professionals are dedicated to providing 
            the highest quality care with expertise and compassion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-80 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center p-4">
                  <div className="relative w-full h-full max-w-xs mx-auto">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 font-medium mb-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {member.qualification}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}