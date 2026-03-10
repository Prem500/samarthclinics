import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import AchievementsSection from "@/components/sections/achievements-section";
import ServicesSection from "@/components/sections/services-section";
import AboutSection from "@/components/sections/about-section";
import WhyChooseUsSection from "@/components/sections/why-choose-us-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSection from "@/components/sections/contact-section";
import WhatsAppWidget from "@/components/ui/whatsapp-widget";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <AchievementsSection />
        <ServicesSection />
        <AboutSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}