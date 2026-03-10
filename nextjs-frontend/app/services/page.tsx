"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Heart, 
  Home, 
  MessageSquare, 
  Stethoscope,
  Brain,
  Bone,
  Users,
  CheckCircle,
  Hand
} from "lucide-react";
import Link from "next/link";
import { useAppointmentModal } from "@/hooks/use-appointment-modal";

export default function ServicesPage() {
  const { openModal, AppointmentModal } = useAppointmentModal();
  const mainServices = [
    {
      icon: Activity,
      title: "Physiotherapy",
      description: "Comprehensive physiotherapy services: pain relief, rehabilitation and wellness, tailored for your better health and mobility.",
      features: ["Manual therapy", "Exercise prescription", "Pain management", "Mobility restoration"]
    },
    {
      icon: Home,
      title: "Home Physiotherapy",
      description: "Convenient physiotherapy services at your home: personalized care in the comfort of your own space for optimal recovery.",
      features: ["Home visits", "Personalized care", "Convenient scheduling", "Familiar environment"]
    },
    {
      icon: Brain,
      title: "Neurological Rehabilitation",
      description: "Comprehensive neurological rehabilitation programs for brain and spinal cord injuries, focusing on functional recovery.",
      features: ["Brain injury recovery", "Spinal cord rehabilitation", "Functional restoration", "Neuroplasticity training"]
    },
    {
      icon: Hand,
      title: "Occupational Therapy",
      description: "Specialized occupational therapy: helping you regain independence in daily activities and improve quality of life.",
      features: ["Daily living skills", "Independence training", "Adaptive techniques", "Workplace rehabilitation"]
    }
  ];

  const specializedServices = [
    {
      category: "Orthopedic Physiotherapy",
      icon: Bone,
      description: "Specialized treatment for musculoskeletal conditions and injuries",
      services: [
        {
          title: "Joint Rehabilitation",
          description: "Comprehensive treatment for joint injuries and conditions affecting knees, hips, shoulders, and other joints."
        },
        {
          title: "Post-Surgical Rehabilitation", 
          description: "Structured recovery programs following orthopedic surgeries to restore function and mobility."
        },
        {
          title: "Shoulder Rehabilitation",
          description: "Targeted treatment for shoulder conditions including rotator cuff injuries and frozen shoulder."
        },
        {
          title: "Spinal Care",
          description: "Treatment for back pain, disc problems, and spinal alignment issues."
        }
      ]
    },
    {
      category: "Neurological Physiotherapy",
      icon: Brain,
      description: "Specialized care for neurological conditions and recovery",
      services: [
        {
          title: "Neuro Rehabilitation",
          description: "Comprehensive neurological rehabilitation programs for brain and spinal cord injuries, focusing on functional recovery."
        },
        {
          title: "Stroke Rehabilitation",
          description: "Comprehensive programs to restore movement and function after stroke."
        },
        {
          title: "Neurological Condition Management",
          description: "Support for Parkinson's, Multiple Sclerosis, and other neurological conditions."
        },
        {
          title: "Balance and Coordination Training",
          description: "Programs to improve balance, coordination, and prevent falls."
        }
      ]
    },
    {
      category: "Sports Physiotherapy",
      icon: Users,
      description: "Performance enhancement and injury prevention for athletes",
      services: [
        {
          title: "Sports Injury Rehabilitation",
          description: "Specialized treatment for sports-related injuries and safe return to activity."
        },
        {
          title: "Performance Enhancement",
          description: "Programs to optimize athletic performance and prevent injuries."
        },
        {
          title: "Sport-Specific Training",
          description: "Conditioning programs tailored for specific sports and activities."
        }
      ]
    },
    {
      category: "Pediatric Physiotherapy",
      icon: Heart,
      description: "Specialized care for children and developmental conditions",
      services: [
        {
          title: "Developmental Therapy",
          description: "Support for children with developmental delays and motor skill challenges."
        },
        {
          title: "Pediatric Neurological Care",
          description: "Specialized treatment for children with cerebral palsy and neurological conditions."
        },
        {
          title: "Postural Correction",
          description: "Programs to address postural issues and promote healthy development."
        }
      ]
    },
    {
      category: "Communication & Therapy Services",
      icon: MessageSquare,
      description: "Specialized therapy services for communication and daily living skills",
      services: [
        {
          title: "Speech Therapy",
          description: "Professional speech therapy services to improve communication skills, speech clarity and language development."
        },
        {
          title: "Occupational Therapy",
          description: "Specialized occupational therapy helping you regain independence in daily activities and improve quality of life."
        }
      ]
    }
  ];

  const treatmentApproach = [
    "Comprehensive assessment and diagnosis",
    "Evidence-based treatment techniques",
    "Personalized treatment plans",
    "Regular progress monitoring",
    "Patient education and home programs",
    "Collaborative care approach"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Physiotherapy Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive rehabilitation and physiotherapy services designed to restore 
            your health, mobility, and quality of life.
          </p>
        </div>
      </section>

      <main>
        {/* Main Services Section */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Core Treatment Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our primary physiotherapy services designed to address a wide range 
                of conditions and promote optimal health.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {mainServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="h-full hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <IconComponent className="h-8 w-8 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl text-gray-900">
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Specialized Services Section */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Specialized Treatment Programs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Advanced physiotherapy programs tailored for specific conditions and patient needs.
              </p>
            </div>

            <div className="space-y-16">
              {specializedServices.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <div key={categoryIndex}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {category.category}
                        </h3>
                        <p className="text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.services.map((service, serviceIndex) => (
                        <Card key={serviceIndex} className="h-full hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
                              {service.title}
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {service.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Treatment Approach Section */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Treatment Approach
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We believe in a comprehensive, patient-centered approach to physiotherapy 
                  that addresses not just symptoms but the root cause of your condition.
                </p>
                
                <div className="space-y-4">
                  {treatmentApproach.map((approach, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{approach}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 text-center">
                <Stethoscope className="h-20 w-20 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Personalized Care Plans
                </h3>
                <p className="text-gray-600 mb-6">
                  Every patient receives a customized treatment plan designed specifically 
                  for their condition, goals, and lifestyle.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">1-on-1</div>
                    <div className="text-gray-600">Personal Attention</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-teal-600 mb-1">Custom</div>
                    <div className="text-gray-600">Treatment Plans</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto container-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Begin Your Treatment?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our expert physiotherapists are ready to help you achieve your health 
              and mobility goals. Schedule your consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 border-white hover:bg-blue-50 hover:text-blue-700 font-semibold" onClick={openModal}>
                Book Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Appointment Modal */}
      <AppointmentModal />
    </div>
  );
}