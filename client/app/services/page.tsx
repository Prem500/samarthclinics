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
  Hand,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useAppointmentModal } from "@/hooks/use-appointment-modal";

const headingFont = { fontFamily: "'Cormorant Garamond', serif" };

const expertise = [
  "Advanced Physiotherapy & Rehabilitation",
  "Neuro Rehabilitation (Stroke, Paralysis & Neurological Conditions)",
  "Orthopedic & Sports Injury Rehabilitation",
  "Pain Management & Advanced Recovery Solutions",
  "Speech & Language Therapy",
  "Occupational Therapy for Functional Independence",
  "Pediatric & Child Rehabilitation",
  "Home Physiotherapy & Personalized Care",
];

const commitment = [
  "4500+ Recovery Journeys Supported",
  "3+ Years of Dedicated Clinical Experience",
  "Advanced Technology for Faster Recovery & Pain Relief",
  "Multidisciplinary Rehabilitation Approach",
  "Personalized Treatment Plans for Every Individual",
  "Trusted by Families Across Dehri on Sone & Nearby Areas",
];

export default function ServicesPage() {
  const { openModal, AppointmentModal } = useAppointmentModal();

  const mainServices = [
    {
      icon: Activity,
      title: "Physiotherapy",
      description:
        "Comprehensive physiotherapy services: pain relief, rehabilitation and wellness, tailored for your better health and mobility.",
      features: ["Manual therapy", "Exercise prescription", "Pain management", "Mobility restoration"],
    },
    {
      icon: Home,
      title: "Home Physiotherapy",
      description:
        "Convenient physiotherapy services at your home: personalized care in the comfort of your own space for optimal recovery.",
      features: ["Home visits", "Personalized care", "Convenient scheduling", "Familiar environment"],
    },
    {
      icon: Brain,
      title: "Neurological Rehabilitation",
      description:
        "Comprehensive neurological rehabilitation programs for brain and spinal cord injuries, focusing on functional recovery.",
      features: ["Brain injury recovery", "Spinal cord rehabilitation", "Functional restoration", "Neuroplasticity training"],
    },
    {
      icon: Hand,
      title: "Occupational Therapy",
      description:
        "Specialized occupational therapy: helping you regain independence in daily activities and improve quality of life.",
      features: ["Daily living skills", "Independence training", "Adaptive techniques", "Workplace rehabilitation"],
    },
  ];

  const specializedServices = [
    {
      category: "Orthopedic Physiotherapy",
      icon: Bone,
      description: "Specialized treatment for musculoskeletal conditions and injuries",
      services: [
        {
          title: "Joint Rehabilitation",
          description:
            "Comprehensive treatment for joint injuries and conditions affecting knees, hips, shoulders, and other joints.",
        },
        {
          title: "Post-Surgical Rehabilitation",
          description:
            "Structured recovery programs following orthopedic surgeries to restore function and mobility.",
        },
        {
          title: "Shoulder Rehabilitation",
          description:
            "Targeted treatment for shoulder conditions including rotator cuff injuries and frozen shoulder.",
        },
        {
          title: "Spinal Care",
          description: "Treatment for back pain, disc problems, and spinal alignment issues.",
        },
      ],
    },
    {
      category: "Neurological Physiotherapy",
      icon: Brain,
      description: "Specialized care for neurological conditions and recovery",
      services: [
        {
          title: "Neuro Rehabilitation",
          description:
            "Comprehensive neurological rehabilitation programs for brain and spinal cord injuries, focusing on functional recovery.",
        },
        {
          title: "Stroke Rehabilitation",
          description: "Comprehensive programs to restore movement and function after stroke.",
        },
        {
          title: "Neurological Condition Management",
          description: "Support for Parkinson's, Multiple Sclerosis, and other neurological conditions.",
        },
        {
          title: "Balance and Coordination Training",
          description: "Programs to improve balance, coordination, and prevent falls.",
        },
      ],
    },
    {
      category: "Sports Physiotherapy",
      icon: Users,
      description: "Performance enhancement and injury prevention for athletes",
      services: [
        {
          title: "Sports Injury Rehabilitation",
          description: "Specialized treatment for sports-related injuries and safe return to activity.",
        },
        {
          title: "Performance Enhancement",
          description: "Programs to optimize athletic performance and prevent injuries.",
        },
        {
          title: "Sport-Specific Training",
          description: "Conditioning programs tailored for specific sports and activities.",
        },
      ],
    },
    {
      category: "Pediatric Physiotherapy",
      icon: Heart,
      description: "Specialized care for children and developmental conditions",
      services: [
        {
          title: "Developmental Therapy",
          description: "Support for children with developmental delays and motor skill challenges.",
        },
        {
          title: "Pediatric Neurological Care",
          description: "Specialized treatment for children with cerebral palsy and neurological conditions.",
        },
        {
          title: "Postural Correction",
          description: "Programs to address postural issues and promote healthy development.",
        },
      ],
    },
    {
      category: "Communication & Therapy Services",
      icon: MessageSquare,
      description: "Specialized therapy services for communication and daily living skills",
      services: [
        {
          title: "Speech Therapy",
          description:
            "Professional speech therapy services to improve communication skills, speech clarity and language development.",
        },
        {
          title: "Occupational Therapy",
          description:
            "Specialized occupational therapy helping you regain independence in daily activities and improve quality of life.",
        },
      ],
    },
  ];

  const treatmentApproach = [
    "Comprehensive assessment and diagnosis",
    "Evidence-based treatment techniques",
    "Personalized treatment plans",
    "Regular progress monitoring",
    "Patient education and home programs",
    "Collaborative care approach",
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 py-20 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent" />
        <div className="mx-auto max-w-7xl container-padding text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl" style={headingFont}>
            Our Physiotherapy Services
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-amber-100/90">
            Comprehensive rehabilitation and physiotherapy services designed to restore your health, mobility, and
            quality of life.
          </p>
        </div>
      </section>

      <main>
        {/* About */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-4xl container-padding">
            <h2 className="mb-8 text-3xl font-bold text-stone-900 md:text-4xl" style={headingFont}>
              About Samarth Clinic & Physiotherapy Rehabilitation Centre
            </h2>
            <div className="space-y-6 text-stone-600">
              <p>
                For over 4+ years, Samarth Clinic has been dedicated to improving lives through advanced physiotherapy,
                rehabilitation, and patient-centered care. Our mission is to help individuals overcome pain, restore
                mobility, and regain independence through evidence-based treatments and compassionate support.
              </p>
              <p>
                Founded in 2022 by Dr. Prem Prakash, Samarth Clinic was established with a vision to provide high-quality
                physiotherapy, rehabilitation, and multidisciplinary therapy services in a welcoming and supportive
                environment. Since then, we have continuously evolved by integrating modern rehabilitation technologies,
                advanced pain management solutions, and personalized treatment approaches to support faster and long-term
                recovery.
              </p>
              <p>
                Today, Samarth Clinic is recognized for delivering specialized care in Physiotherapy, Pain Management,
                Orthopedic Rehabilitation, Neurological Rehabilitation, Sports Rehabilitation, Speech Therapy,
                Occupational Therapy, Pediatric Rehabilitation, and Advanced Rehabilitation Services.
              </p>
              <p>
                Our approach goes beyond symptom relief — we focus on identifying and treating the root cause of pain,
                movement limitations, and functional challenges, helping individuals improve mobility, independence, and
                overall quality of life.
              </p>
              <p>
                We believe every person deserves personalized care. That&apos;s why every treatment plan is designed
                according to individual needs, recovery goals, and functional improvement.
              </p>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="section-padding bg-stone-50">
          <div className="mx-auto max-w-4xl container-padding">
            <h2 className="mb-8 text-3xl font-bold text-stone-900" style={headingFont}>
              Our Areas of Expertise
            </h2>
            <div className="space-y-3">
              {expertise.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
                  <span className="text-stone-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-4xl container-padding">
            <h2 className="mb-8 text-3xl font-bold text-stone-900" style={headingFont}>
              Our Commitment to Excellence
            </h2>
            <div className="space-y-3">
              {commitment.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
                  <span className="text-stone-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section-padding bg-stone-50">
          <div className="mx-auto max-w-4xl container-padding grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
              <Target className="mb-4 h-10 w-10 text-amber-700" />
              <h2 className="mb-4 text-2xl font-bold text-stone-900" style={headingFont}>
                Our Vision
              </h2>
              <p className="leading-relaxed text-stone-600">
                To become a trusted center for advanced physiotherapy, rehabilitation, speech therapy, and occupational
                therapy, delivering compassionate care, innovative treatments, and meaningful recovery outcomes.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
              <Heart className="mb-4 h-10 w-10 text-amber-700" />
              <h2 className="mb-4 text-2xl font-bold text-stone-900" style={headingFont}>
                Our Mission
              </h2>
              <p className="leading-relaxed text-stone-600">
                To help individuals overcome pain, improve mobility, enhance communication skills, regain functional
                independence, and achieve a healthier life through evidence-based physiotherapy and multidisciplinary
                rehabilitation services.
              </p>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl container-padding">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-stone-900 md:text-4xl" style={headingFont}>
                Core Treatment Services
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-stone-600">
                Our primary physiotherapy services designed to address a wide range of conditions and promote optimal
                health.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {mainServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="h-full border-stone-200 transition-all duration-300 hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-amber-100 p-3">
                          <IconComponent className="h-8 w-8 text-amber-700" />
                        </div>
                        <CardTitle className="text-2xl text-stone-900">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-6 leading-relaxed text-stone-600">{service.description}</p>
                      <div className="space-y-2">
                        <h4 className="mb-3 font-semibold text-stone-900">Key Benefits:</h4>
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 shrink-0 text-amber-600" />
                            <span className="text-sm text-stone-600">{feature}</span>
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

        {/* Specialized Services */}
        <section className="section-padding bg-stone-50">
          <div className="mx-auto max-w-7xl container-padding">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-stone-900 md:text-4xl" style={headingFont}>
                Specialized Treatment Programs
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-stone-600">
                Advanced physiotherapy programs tailored for specific conditions and patient needs.
              </p>
            </div>

            <div className="space-y-16">
              {specializedServices.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <div key={categoryIndex}>
                    <div className="mb-8 flex items-center gap-4">
                      <div className="rounded-full bg-amber-100 p-4">
                        <IconComponent className="h-8 w-8 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-stone-900">{category.category}</h3>
                        <p className="text-stone-600">{category.description}</p>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {category.services.map((service, serviceIndex) => (
                        <Card
                          key={serviceIndex}
                          className="h-full border-stone-200 transition-shadow duration-300 hover:shadow-lg"
                        >
                          <CardContent className="p-6">
                            <h4 className="mb-3 text-lg font-semibold text-stone-900">{service.title}</h4>
                            <p className="text-sm leading-relaxed text-stone-600">{service.description}</p>
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

        {/* Treatment Approach */}
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl container-padding">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-stone-900 md:text-4xl" style={headingFont}>
                  Our Treatment Approach
                </h2>
                <p className="mb-8 text-lg text-stone-600">
                  We believe in a comprehensive, patient-centered approach to physiotherapy that addresses not just
                  symptoms but the root cause of your condition.
                </p>

                <div className="space-y-4">
                  {treatmentApproach.map((approach, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
                      <span className="text-stone-700">{approach}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-stone-100 to-amber-50 p-8 text-center">
                <Stethoscope className="mx-auto mb-6 h-20 w-20 text-amber-700" />
                <h3 className="mb-4 text-2xl font-bold text-stone-900" style={headingFont}>
                  Personalized Care Plans
                </h3>
                <p className="mb-6 text-stone-600">
                  Every patient receives a customized treatment plan designed specifically for their condition, goals,
                  and lifestyle.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg bg-white p-4">
                    <div className="mb-1 text-2xl font-bold text-amber-700">1-on-1</div>
                    <div className="text-stone-600">Personal Attention</div>
                  </div>
                  <div className="rounded-lg bg-white p-4">
                    <div className="mb-1 text-2xl font-bold text-amber-700">Custom</div>
                    <div className="text-stone-600">Treatment Plans</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tagline */}
        <section className="section-padding bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white">
          <div className="mx-auto max-w-4xl container-padding text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl" style={headingFont}>
              Samarth Clinic & Physiotherapy Rehabilitation Centre
            </h2>
            <p className="mb-6 text-lg text-amber-100/90">
              Physiotherapy • Neuro Rehab • Pain Management • Speech Therapy • Occupational Therapy • Advanced
              Rehabilitation
            </p>
            <p className="text-xl font-medium">
              Helping People Recover Faster, Move Better, Communicate Stronger, and Live More Independently.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-stone-100">
          <div className="mx-auto max-w-7xl container-padding text-center">
            <h2 className="mb-6 text-3xl font-bold text-stone-900 md:text-4xl" style={headingFont}>
              Ready to Begin Your Treatment?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-stone-600">
              Our expert physiotherapists are ready to help you achieve your health and mobility goals. Schedule your
              consultation today.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-amber-600 font-semibold text-white hover:bg-amber-700"
                onClick={openModal}
              >
                Book Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-stone-300 text-stone-800 hover:border-amber-600 hover:text-amber-700"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AppointmentModal />
    </div>
  );
}
