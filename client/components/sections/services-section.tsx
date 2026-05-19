"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Home, 
  Users, 
  Target, 
  Stethoscope,
  Brain,
  Bone,
  MessageSquare,
  Hand
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAppointmentModal } from "@/hooks/use-appointment-modal";

export default function ServicesSection() {
  const { openModal, AppointmentModal } = useAppointmentModal();
  
  const mainServices = [
    {
      icon: Home,
      title: "Home Physiotherapy",
      description: "Convenient physiotherapy services at your home: personalized care in the comfort of your own space for optimal recovery.",
      color: "teal",
      image: "/servicesimages/physiotherapyathome.jpg"
    },
    {
      icon: Brain,
      title: "Neurological Rehabilitation",
      description: "Comprehensive neurological rehabilitation programs for brain and spinal cord injuries, focusing on functional recovery.",
      color: "purple",
      image: "/servicesimages/neurological rehabilitation samarth clinics dehri on sone.png"
    },
    {
      icon: Hand,
      title: "Occupational Therapy",
      description: "Specialized occupational therapy: helping you regain independence in daily activities and improve quality of life.",
      color: "green",
      image: "/servicesimages/Occupational Therapy samarth clinics dehri on sone.webp"
    }
  ];

  const specializedServices = [
    {
      category: "Home & Community Care",
      icon: Home,
      services: [
        {
          title: "Home Physiotherapy",
          description: "Convenient physiotherapy services delivered at your home with personalized care and comfort.",
          image: "/servicesimages/physiotherapyathome.jpg"
        },
        {
          title: "Family Support Programs",
          description: "Comprehensive support and education for families dealing with rehabilitation needs.",
          image: "/servicesimages/samarth clinic dehri on sone occupational therapy.jpg"
        }
      ]
    },
    {
      category: "Communication & Therapy Services",
      icon: MessageSquare,
      services: [
        {
          title: "Speech Therapy",
          description: "Professional speech therapy services to improve communication skills, speech clarity and language development.",
          image: "/servicesimages/speechtherapy.jpg"
        },
        {
          title: "Occupational Therapy",
          description: "Specialized occupational therapy helping you regain independence in daily activities and improve quality of life.",
          image: "/servicesimages/samarth clinic dehri on sone occupational therapy.jpg"
        }
      ]
    },
    {
      category: "Neurological Rehabilitation",
      icon: Brain,
      services: [
        {
          title: "Neuro Rehabilitation",
          description: "Comprehensive neurological rehabilitation programs for brain and spinal cord injuries, focusing on functional recovery.",
          image: "/servicesimages/neurological rehabilitation samarth clinics dehri on sone.png"
        },
        {
          title: "Stroke Rehabilitation",
          description: "Treatments and exercises specifically designed to restore movement and functional abilities after stroke.",
          image: "/servicesimages/neurological rehabilitation samarth clinics dehri on sone.png"
        },
        {
          title: "Neurological Condition Management",
          description: "Support and management for Parkinson's, Multiple Sclerosis and other neurological conditions.",
          image: "/servicesimages/neurological rehabilitation samarth clinics dehri on sone.png"
        }
      ]
    },
    {
      category: "Specialized Physiotherapy",
      icon: Bone,
      services: [
        {
          title: "Orthopedic Physiotherapy",
          description: "Specialized treatment for bone, muscle and joint injuries and conditions, improving your mobility and quality of life.",
          image: "/servicesimages/Orthopedic_Rehabilitation.jpg"
        },
        {
          title: "Sports Physiotherapy",
          description: "Performance enhancement and injury prevention programs for athletes and active individuals.",
          image: "/servicesimages/sportsrehabilitation.jpg"
        },
        {
          title: "Pediatric Physiotherapy",
          description: "Specialized care for children with developmental delays and motor skill challenges.",
          image: "/servicesimages/samarth clinic dehri on sone occupational therapy.jpg"
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="services" className="section-padding relative border-t border-clinical-200/50 bg-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh-light opacity-60" />
      <div className="relative mx-auto max-w-7xl container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="premium-badge mb-5">Why Visit Us</span>
          <h2 className="mb-5 font-heading text-3xl font-semibold tracking-tight text-clinical-950 md:text-4xl">
            Specialized Treatment Areas
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-clinical-600">
            We provide comprehensive physiotherapy and rehabilitation services
            tailored to your specific needs and conditions.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {mainServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group h-full overflow-hidden border-0 shadow-premium ring-1 ring-clinical-200/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-lg">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-clinical-950/75 via-clinical-900/20 to-transparent" />
                    <div className={`absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg ring-2 ring-white/90 backdrop-blur-sm ${
                      service.color === 'blue' ? 'bg-white/95 text-primary' :
                      service.color === 'teal' ? 'bg-white/95 text-cyan-700' :
                      service.color === 'purple' ? 'bg-white/95 text-violet-700' :
                      'bg-white/95 text-emerald-700'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>

                  <CardHeader className="pb-4 text-center">
                    <CardTitle className="font-heading text-xl font-semibold text-clinical-950">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center leading-relaxed text-clinical-600">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Specialized Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="mb-12 text-center font-heading text-2xl font-semibold tracking-tight text-clinical-950 md:text-3xl">
            Specialized Physiotherapy Services
          </h3>

          <div className="space-y-14">
            {specializedServices.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-heading text-xl font-semibold text-clinical-950">
                      {category.category}
                    </h4>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {category.services.map((service, serviceIndex) => (
                      <motion.div
                        key={serviceIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="h-full border-clinical-200/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium-lg">
                          <CardContent className="p-6">
                            <div className="mb-4 h-px w-10 bg-gradient-to-r from-primary to-transparent" />
                            <h5 className="mb-3 font-heading text-lg font-semibold text-clinical-950">
                              {service.title}
                            </h5>
                            <p className="text-sm leading-relaxed text-clinical-600">
                              {service.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-clinical p-8 text-center text-white shadow-premium-lg md:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <Stethoscope className="relative mx-auto mb-6 h-16 w-16 text-white/90" />
          <h3 className="relative mb-4 font-heading text-2xl font-semibold md:text-3xl">
            Ready to Start Your Recovery Journey?
          </h3>
          <p className="relative mx-auto mb-8 max-w-2xl text-lg text-teal-50/95">
            Our expert physiotherapists are here to help you achieve optimal health
            and mobility. Book your consultation today.
          </p>
          <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/90 bg-white px-8 font-semibold text-primary shadow-lg hover:bg-teal-50 hover:text-primary"
              onClick={openModal}
            >
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/90 bg-white px-8 font-semibold text-primary shadow-lg hover:bg-teal-50 hover:text-primary"
              asChild
            >
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </div>
        </motion.div>
        
        {/* Appointment Modal */}
        <AppointmentModal />
      </div>
    </section>
  );
}