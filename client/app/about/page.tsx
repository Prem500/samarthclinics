"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Heart } from "lucide-react";
import Image from "next/image";

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

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative bg-gradient-to-br from-blue-600 to-teal-600 py-20 text-white">
        <div className="mx-auto max-w-7xl container-padding text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            About Samarth Clinic & Physiotherapy Rehabilitation Centre
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-blue-100">
            Physiotherapy • Neuro Rehab • Pain Management • Speech Therapy • Occupational Therapy • Advanced Rehabilitation
          </p>
        </div>
      </section>

      <main>
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-4xl container-padding">
            <div className="prose prose-lg mx-auto max-w-none space-y-6 text-gray-600">
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

        <section className="section-padding bg-gray-50">
          <div className="mx-auto max-w-4xl container-padding">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Areas of Expertise</h2>
            <div className="space-y-3">
              {expertise.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-4xl container-padding">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Commitment to Excellence</h2>
            <div className="space-y-3">
              {commitment.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="mx-auto max-w-4xl container-padding grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <Target className="mb-4 h-10 w-10 text-blue-600" />
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Our Vision</h2>
              <p className="leading-relaxed text-gray-600">
                To become a trusted center for advanced physiotherapy, rehabilitation, speech therapy, and occupational
                therapy, delivering compassionate care, innovative treatments, and meaningful recovery outcomes.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <Heart className="mb-4 h-10 w-10 text-teal-600" />
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="leading-relaxed text-gray-600">
                To help individuals overcome pain, improve mobility, enhance communication skills, regain functional
                independence, and achieve a healthier life through evidence-based physiotherapy and multidisciplinary
                rehabilitation services.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl container-padding">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Meet Our Expert Team</h2>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <Card key={index} className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="relative flex h-80 items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100 p-4">
                    <div className="relative mx-auto h-full w-full max-w-xs">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-lg object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h4 className="mb-2 text-xl font-semibold text-gray-900">{member.name}</h4>
                    <p className="mb-1 font-medium text-blue-600">{member.role}</p>
                    <p className="mb-4 text-sm text-gray-500">{member.qualification}</p>
                    <p className="text-sm leading-relaxed text-gray-600">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="mx-auto max-w-4xl container-padding text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Samarth Clinic & Physiotherapy Rehabilitation Centre
            </h2>
            <p className="mb-6 text-lg text-blue-100">
              Physiotherapy • Neuro Rehab • Pain Management • Speech Therapy • Occupational Therapy • Advanced
              Rehabilitation
            </p>
            <p className="text-xl font-medium text-white">
              Helping People Recover Faster, Move Better, Communicate Stronger, and Live More Independently.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/917004119766?text=Hello%2C%20I%20would%20like%20to%20connect%20with%20Samarth%20Clinic."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
              >
                Chat on WhatsApp
              </a>
              <a
                href="/contact"
                className="rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-blue-50 hover:text-blue-700"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
