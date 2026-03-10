"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
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
      icon: Activity,
      title: "Physiotherapy",
      description: "Comprehensive physiotherapy services: pain relief, rehabilitation and wellness, tailored for your better health and mobility.",
      color: "blue",
      image: "/images/img_44.webp"
    },
    {
      icon: Home,
      title: "Home Physiotherapy",
      description: "Convenient physiotherapy services at your home: personalized care in the comfort of your own space for optimal recovery.",
      color: "teal",
      image: "/images/img_22.jpg"
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
          image: "/images/img_22.jpg"
        },
        {
          title: "Family Support Programs",
          description: "Comprehensive support and education for families dealing with rehabilitation needs.",
          image: "/images/img_44.webp"
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
          image: "/images/img_555.jpg"
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
          image: "/servicesimages/Occupational Therapy samarth clinics dehri on sone.webp"
        },
        {
          title: "Sports Physiotherapy",
          description: "Performance enhancement and injury prevention programs for athletes and active individuals.",
          image: "/images/img_44.webp"
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
    <section id="services" className="section-padding bg-white">
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
            Why Visit Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Specialized Treatment Areas
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {mainServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group overflow-hidden">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className={`absolute top-4 right-4 inline-flex items-center justify-center w-12 h-12 rounded-full ${
                      service.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      service.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                      service.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
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
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Specialized Physiotherapy Services
          </h3>
          
          <div className="space-y-12">
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {category.category}
                    </h4>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service, serviceIndex) => (
                      <motion.div
                        key={serviceIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-6">
                            <h5 className="text-lg font-semibold text-gray-900 mb-3">
                              {service.title}
                            </h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
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
          className="text-center bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <Stethoscope className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Recovery Journey?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our expert physiotherapists are here to help you achieve optimal health 
            and mobility. Book your consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white text-blue-600 border-white hover:bg-blue-50 hover:text-blue-700 px-8 font-semibold"
              onClick={openModal}
            >
              Book Appointment
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white text-blue-600 border-white hover:bg-blue-50 hover:text-blue-700 px-8 font-semibold"
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