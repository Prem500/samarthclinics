"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Clock, Heart, Target } from "lucide-react";
import Image from "next/image";
import { useAppointmentModal } from "@/hooks/use-appointment-modal";

export default function AboutPage() {
  const { openModal, AppointmentModal } = useAppointmentModal();
  const stats = [
    { icon: Users, number: "4500+", label: "Happy Clients" },
    { icon: Clock, number: "5+", label: "Years Experience" },
    { icon: Award, number: "100%", label: "Satisfaction Rate" },
  ];

  const achievements = [
    "4500+ patients treated with successful outcomes",
    "Pioneer in innovative rehabilitation techniques for faster recovery", 
    "100% patient satisfaction rate based on reviews",
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
        "Orthopedic surgeon with expertise in joint replacement, spinal disorders, fractures & post-surgical rehabilitation. Trained in Delhi's top institutions.",
    },
    {
      name: "Dr. Nitish Singh",
      role: "Physiotherapist",
      qualification: "BPT · NGU",
      image: "/servicesimages/nitishkumarphysiotherapist.jpeg",
      description:
        "Specialist in musculoskeletal physiotherapy, TENS/IFT therapy & patient rehabilitation programs.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with empathy, understanding, and genuine care for their well-being."
    },
    {
      icon: Target,
      title: "Excellence in Treatment",
      description: "We strive for the highest standards in physiotherapy treatment and patient outcomes."
    },
    {
      icon: Users,
      title: "Patient-Centered Approach",
      description: "Every treatment plan is customized to meet the individual needs and goals of our patients."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Samarth Clinic
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Dedicated to providing exceptional physiotherapy and rehabilitation services 
            with a commitment to your health and well-being since 2020.
          </p>
        </div>
      </section>

      <main>
        {/* Our Story Section */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Our Story & History
                </h2>
                
                <div className="prose prose-lg text-gray-600 space-y-4">
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

                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                    <div className="text-center">
                      <Heart className="h-20 w-20 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Serving with patience and satisfaction</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <Card key={index} className="text-center p-4">
                        <CardContent className="p-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-3">
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
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These values guide everything we do and shape the care we provide to our patients.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-6">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Expert Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our qualified medical professionals are dedicated to providing 
                the highest quality care with expertise and compassion.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
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
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto container-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our growing community of satisfied patients who have experienced 
              exceptional physiotherapy care and successful recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openModal}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
              >
                Book Appointment
              </button>
              <a 
                href="/contact"
                className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50 hover:text-blue-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Contact Us
              </a>
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