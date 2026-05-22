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
      number: "5000+",
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
    "5000+ patients treated with successful outcomes",
    "Pioneer in innovative rehabilitation techniques for faster recovery",
    "98% patient satisfaction rate based on reviews",
    "Specialized in multiple physiotherapy disciplines"
  ];

  const teamMembers = [
    {
      name: "Dr. Prem Prakash",
      role: "Senior Physiotherapist",
      qualification: "BPT · 5+ Years Experience · Founder & Director",
      image: "/servicesimages/drprem.jpeg",
      description:
        "Certified in Manual Therapy and Neuro Developmental Technique (Neurology department AIIMS, New Delhi). Pioneer of advanced rehabilitation in Dehri on Sone.",
    },
    {
      name: "Dr. Sushil Kamal",
      role: "Consultant Orthopaedic",
      qualification: "MBBS (Kolkata) · MS Ortho (Delhi)",
      image: "/servicesimages/susheelkamalorthopedicsurgeon.jpeg",
      description:
        "Orthopedic surgeon with expertise in pain management, joint replacement, spinal disorders, fractures & post-surgical rehabilitation. Trained in Delhi's top institutions.",
    },
    {
      name: "Dr. Nitish Singh",
      role: "Physiotherapist",
      qualification: "BPT · GNSU",
      image: "/servicesimages/nitishkumarphysiotherapist.jpeg",
      description:
        "Specialist in musculoskeletal physiotherapy, Neuromuscular physio care with manual and electrotherapy.",
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden border-t border-clinical-200/40 bg-gradient-to-b from-clinical-50/80 to-background">
      <div className="pointer-events-none absolute inset-0 bg-mesh-light opacity-50" />
      <div className="relative mx-auto max-w-7xl container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="premium-badge mb-5">About Us</span>
          <h2 className="mb-5 font-heading text-3xl font-semibold tracking-tight text-clinical-950 md:text-4xl">
            Our Story & Mission
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-clinical-600">
            Dedicated to providing exceptional physiotherapy and rehabilitation services
            with a commitment to your health and well-being.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl font-semibold text-clinical-950 md:text-3xl">
              About Our History
            </h3>

            <div className="prose prose-lg max-w-none text-clinical-600 prose-p:leading-relaxed">
              <p>
                Samarth Clinic has been serving our community in the field of physiotherapy 
                for over 5 years, with dedication and commitment to enhancing the well-being 
                of our patients. Our journey has been one of continuous growth, innovation, 
                and unwavering patient-centered care.
              </p>
              
              <p>
                Founded in 2022 by Dr. Prem Prakash, a skilled and compassionate physiotherapist, 
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
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-clinical-700">{achievement}</span>
                </motion.div>
              ))}
            </div>

            <Button size="lg" asChild className="mt-6 rounded-full px-8 font-semibold shadow-premium">
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
            <div className="relative overflow-hidden rounded-3xl shadow-premium-lg ring-1 ring-clinical-200/80">
              <Image
                src="/servicesimages/clinic interior.jpg"
                alt="Samarth Clinic Interior"
                width={600}
                height={400}
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-clinical-950/40 to-transparent" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
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
                    <Card className="border-clinical-200/80 p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium">
                      <CardContent className="p-0">
                        <div className={`mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                          stat.color === 'blue' ? 'bg-primary/10 text-primary' :
                          stat.color === 'teal' ? 'bg-cyan-50 text-cyan-700' :
                          'bg-emerald-50 text-emerald-700'
                        }`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="mb-1 font-heading text-2xl font-semibold text-clinical-950">
                          {stat.number}
                        </div>
                        <div className="text-xs text-clinical-600 sm:text-sm">
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
          className="mb-12 text-center"
        >
          <h3 className="mb-4 font-heading text-2xl font-semibold text-clinical-950 md:text-3xl">
            Meet Our Expert Team
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-clinical-600">
            Our qualified medical professionals are dedicated to providing
            the highest quality care with expertise and compassion.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group h-full overflow-hidden border-clinical-200/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-lg">
                <div className="relative flex h-80 items-center justify-center bg-gradient-to-br from-clinical-100 via-white to-primary/5 p-4">
                  <div className="relative mx-auto h-full w-full max-w-xs">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-2xl object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-clinical-950/10 to-transparent" />
                </div>
                <CardContent className="p-6 text-center">
                  <h4 className="mb-2 font-heading text-xl font-semibold text-clinical-950">
                    {member.name}
                  </h4>
                  <p className="mb-1 font-medium text-primary">
                    {member.role}
                  </p>
                  <p className="mb-4 text-sm text-clinical-500">
                    {member.qualification}
                  </p>
                  <p className="text-sm leading-relaxed text-clinical-600">
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