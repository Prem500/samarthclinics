import { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Get In Touch with Samarth Clinic",
  description:
    "Contact Samarth Clinic for appointments, inquiries, or emergency consultations. Find our location, phone number, email, and working hours.",
  keywords: [
    "contact samarth clinic",
    "physiotherapy appointment",
    "clinic location",
    "phone number",
    "dehri physiotherapy",
  ],
};

const headingFont = { fontFamily: "'Cormorant Garamond', serif" };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 py-20 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent" />
        <div className="mx-auto max-w-7xl container-padding text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl" style={headingFont}>
            Get In Touch
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-amber-100/90">
            We&apos;re here to help you on your journey to better health. Contact us for appointments, inquiries, or any
            questions about our physiotherapy services.
          </p>
        </div>
      </section>

      <main>
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl container-padding">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="mb-4 text-3xl font-bold text-stone-900" style={headingFont}>
                    Contact Information
                  </h2>
                  <p className="text-lg text-stone-600">
                    Reach out to us through any of the following methods. We&apos;re always ready to assist you.
                  </p>
                </div>

                <Card className="border-stone-200 transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-amber-100 p-3">
                        <MapPin className="h-6 w-6 text-amber-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-xl font-semibold text-stone-900">Clinic Address</h3>
                        <p className="mb-4 text-stone-600">
                          Canal Road, Near Sunil Bose
                          <br />
                          Dehri, Bihar, India
                        </p>
                        <Button variant="outline" size="sm" className="border-stone-300 hover:border-amber-600 hover:text-amber-700" asChild>
                          <a
                            href="https://www.google.com/maps/dir//Physiotherapy+%26+Rehabilitation+Center+%7C+Samarth+Clinic+I+Dr+Prem+Prakash,+Canal+Rd,+Rajputana+Mohalla,+Dehri,+Bihar+821307/@24.9229161,84.1472434,14.11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x398daf007d3ea459:0x46361466f3d9fa30!2m2!1d84.1773499!2d24.9071756?entry=ttu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Navigation className="h-4 w-4" />
                            Get Directions
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-stone-200 transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-amber-100 p-3">
                        <Phone className="h-6 w-6 text-amber-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-xl font-semibold text-stone-900">Phone Number</h3>
                        <p className="mb-4 text-stone-600">Available for appointments and emergencies</p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button variant="outline" size="sm" className="border-stone-300 hover:border-amber-600 hover:text-amber-700" asChild>
                            <a href="tel:+917004119766" className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              +91 7004119766
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="border-stone-300 hover:border-amber-600 hover:text-amber-700" asChild>
                            <a
                              href="https://wa.me/917004119766?text=Hello%20Doctor,%20I%20would%20like%20to%20book%20an%20appointment"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <MessageCircle className="h-4 w-4" />
                              WhatsApp
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-stone-200 transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-amber-100 p-3">
                        <Mail className="h-6 w-6 text-amber-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-xl font-semibold text-stone-900">Email Address</h3>
                        <p className="mb-4 text-stone-600">Send us your queries and we&apos;ll respond promptly</p>
                        <Button variant="outline" size="sm" className="border-stone-300 hover:border-amber-600 hover:text-amber-700" asChild>
                          <a href="mailto:Samarthclinic.info@gmail.com" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Samarthclinic.info@gmail.com
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-stone-200 transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-amber-100 p-3">
                        <Clock className="h-6 w-6 text-amber-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-xl font-semibold text-stone-900">Working Hours</h3>
                        <div className="space-y-2 text-stone-600">
                          <div className="flex justify-between">
                            <span>Monday - Saturday</span>
                            <span className="font-medium">10:00 AM - 8:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span className="font-medium text-stone-500">Closed</span>
                          </div>
                        </div>
                        <div className="mt-4 rounded-lg bg-amber-50 p-3">
                          <p className="text-sm text-amber-900">
                            <strong>Note:</strong> We&apos;re available for emergency consultations outside regular hours.
                            Please call or WhatsApp for urgent cases.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="h-full overflow-hidden border-stone-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-stone-900">
                      <MapPin className="h-5 w-5 text-amber-700" />
                      Find Us on Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative min-h-[500px] h-96 lg:h-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3793.9!2d84.1773499!3d24.9071756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398daf007d3ea459%3A0x46361466f3d9fa30!2sPhysiotherapy%20%26%20Rehabilitation%20Center%20%7C%20Samarth%20Clinic%20I%20Dr%20Prem%20Prakash!5e0!3m2!1sen!2sin!4v1747650000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Samarth Clinic Location"
                        className="rounded-b-lg"
                      />
                      <div className="absolute top-4 left-4 rounded-lg bg-white/90 p-3 shadow-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 animate-pulse rounded-full bg-amber-600" />
                          <span className="text-sm font-medium text-stone-900">Samarth Clinic</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-stone-50">
          <div className="mx-auto max-w-4xl container-padding">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-3xl font-bold text-stone-900 md:text-4xl" style={headingFont}>
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-stone-600">Common questions about our services and appointments</p>
            </div>

            <div className="space-y-6">
              <Card className="border-stone-200">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-stone-900">How do I book an appointment?</h3>
                  <p className="text-stone-600">
                    You can book an appointment by calling us at +91 7004119766, sending a WhatsApp message, or using our
                    online booking form on the homepage. We&apos;ll confirm your appointment within a few hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-stone-200">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-stone-900">What should I bring to my first appointment?</h3>
                  <p className="text-stone-600">
                    Please bring any relevant medical reports, X-rays, MRI scans, or previous treatment records. Also bring
                    a list of current medications and wear comfortable clothing that allows easy movement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-stone-200">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-stone-900">How long does a typical session last?</h3>
                  <p className="text-stone-600">
                    A typical physiotherapy session lasts 15-40 minutes, depending on your condition and treatment plan.
                    Your first consultation may take longer as it includes a comprehensive assessment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white">
          <div className="mx-auto max-w-7xl container-padding">
            <Card className="border-amber-800/30 bg-white/10 text-white backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Phone className="mx-auto mb-4 h-12 w-12 opacity-90 text-amber-400" />
                <h3 className="mb-2 text-2xl font-bold" style={headingFont}>
                  Need Immediate Assistance?
                </h3>
                <p className="mx-auto mb-6 max-w-2xl text-amber-100/90">
                  For urgent physiotherapy consultations or emergency cases, don&apos;t hesitate to contact us directly.
                  We&apos;re here to help when you need it most.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white bg-amber-600 text-white hover:bg-white hover:text-stone-900"
                    asChild
                  >
                    <a href="tel:+917004119766">Call Now: +91 7004119766</a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-stone-900"
                    asChild
                  >
                    <a
                      href="https://wa.me/917004119766?text=Hello%20Doctor,%20I%20need%20urgent%20consultation"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Emergency
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
