import { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Get In Touch with Samarth Clinic",
  description: "Contact Samarth Clinic for appointments, inquiries, or emergency consultations. Find our location, phone number, email, and working hours.",
  keywords: ["contact samarth clinic", "physiotherapy appointment", "clinic location", "phone number", "dehri physiotherapy"],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're here to help you on your journey to better health. Contact us for appointments, 
            inquiries, or any questions about our physiotherapy services.
          </p>
        </div>
      </section>

      <main>
        {/* Contact Information Section */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Contact Information
                  </h2>
                  <p className="text-lg text-gray-600">
                    Reach out to us through any of the following methods. We're always ready to assist you.
                  </p>
                </div>

                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Clinic Address
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Nahar Road, Near Sunil Bose<br />
                          Dehri, Bihar, India
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <a 
                            href="https://maps.app.goo.gl/3Ey94eDkMNvhsrQf7" 
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

                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Phone Number
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Available for appointments and emergencies
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href="tel:+917004119766"
                              className="flex items-center gap-2"
                            >
                              <Phone className="h-4 w-4" />
                              +91 7004119766
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
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

                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Email Address
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Send us your queries and we'll respond promptly
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <a 
                            href="mailto:Samarthclinic.info@gmail.com"
                            className="flex items-center gap-2"
                          >
                            <Mail className="h-4 w-4" />
                            Samarthclinic.info@gmail.com
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Working Hours
                        </h3>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex justify-between">
                            <span>Monday - Saturday</span>
                            <span className="font-medium">9:00 AM - 8:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span className="font-medium text-red-600">Closed</span>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            <strong>Note:</strong> We're available for emergency consultations outside regular hours. 
                            Please call or WhatsApp for urgent cases.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <div>
                <Card className="h-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Find Us on Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative h-96 lg:h-full min-h-[500px]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14391.825675144675!2d85.1406895!3d25.6125392!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4d8ce94d30763c1b!2sSamarth%20Clinic!5e0!3m2!1sen!2sin!4v1700992427448!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Samarth Clinic Location"
                        className="rounded-b-lg"
                      />
                      
                      {/* Map Overlay */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-900">
                            Samarth Clinic
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-4xl mx-auto container-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our services and appointments
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How do I book an appointment?
                  </h3>
                  <p className="text-gray-600">
                    You can book an appointment by calling us at +91 7004119766, sending a WhatsApp message, 
                    or using our online booking form on the homepage. We'll confirm your appointment within a few hours.
                  </p>
                </CardContent>
              </Card>

             
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What should I bring to my first appointment?
                  </h3>
                  <p className="text-gray-600">
                    Please bring any relevant medical reports, X-rays, MRI scans, or previous treatment records. 
                    Also bring a list of current medications and wear comfortable clothing that allows easy movement.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How long does a typical session last?
                  </h3>
                  <p className="text-gray-600">
                    A typical physiotherapy session lasts 15-40 minutes, depending on your condition and treatment plan. 
                    Your first consultation may take longer as it includes a comprehensive assessment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Emergency Contact Banner */}
        <section className="section-padding bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto container-padding">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <Phone className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                  For urgent physiotherapy consultations or emergency cases, 
                  don't hesitate to contact us directly. We're here to help when you need it most.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-blue-600 text-white hover:bg-white hover:text-red-600"
                    asChild
                  >
                    <a href="tel:+917004119766">
                      Call Now: +91 7004119766
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-blue-600  text-white hover:bg-white hover:text-red-600"
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