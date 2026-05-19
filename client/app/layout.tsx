import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: {
    default: "Best Physiotherapy Clinic in Dehri | Samarth Clinic | Dr. Prem Prakash",
    template: "%s | Samarth Clinic — Physiotherapy Dehri",
  },
  description:
    "Top-rated physiotherapy & rehabilitation center in Dehri on Sone, Rohtas, Bihar. Expert treatment for knee pain, back pain, sports injuries, stroke rehab, neuro rehabilitation & home physiotherapy. 4.9★ Google rated. Call +91 7004119766.",
  keywords: [
    "physiotherapy in Dehri",
    "physiotherapist Dehri on Sone",
    "physiotherapy Rohtas Bihar",
    "best physiotherapy clinic Dehri",
    "knee pain treatment Dehri",
    "back pain physiotherapy Dehri",
    "neck pain treatment Dehri",
    "neuro rehabilitation Dehri",
    "stroke rehabilitation Bihar",
    "home physiotherapy Dehri",
    "sports injury treatment Dehri",
    "occupational therapy Dehri",
    "speech therapy Dehri",
    "TENS IFT therapy Dehri",
    "paediatric physiotherapy Rohtas",
    "post surgery rehabilitation Dehri",
    "orthopedic physiotherapy Dehri",
    "Dr Prem Prakash physiotherapist",
    "Samarth Clinic Dehri",
    "physiotherapy canal road Dehri",
    "dry needling Dehri",
    "cupping therapy Dehri",
    "manual therapy Dehri",
  ],
  authors: [{ name: "Dr. Prem Prakash — Samarth Clinic" }],
  creator: "Samarth Clinic",
  metadataBase: new URL("https://samarthclinic.life"),
  alternates: {
    canonical: "https://samarthclinic.life",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://samarthclinic.life",
    siteName: "Samarth Clinic",
    title: "Best Physiotherapy Clinic in Dehri | Samarth Clinic",
    description:
      "4.9★ rated physiotherapy & rehabilitation center in Dehri on Sone, Rohtas, Bihar. Home visits, neuro rehab, knee & back pain, sports injury. Call +91 7004119766.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Samarth Clinic — Best Physiotherapy in Dehri, Bihar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Physiotherapy in Dehri | Samarth Clinic",
    description: "4.9★ physiotherapy & rehabilitation in Dehri on Sone, Rohtas, Bihar. Call +91 7004119766.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: "your-google-verification-code" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Local Business Schema — critical for Google Maps / Local Pack ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Samarth Clinic — Physiotherapy & Rehabilitation Center",
              alternateName: "Samarth Clinic Dehri",
              url: "https://samarthclinic.life",
              logo: "https://samarthclinic.life/logo.png",
              image: "https://samarthclinic.life/og-image.jpg",
              description:
                "Best physiotherapy clinic in Dehri on Sone, Rohtas, Bihar. Expert treatment for knee pain, back pain, neuro rehabilitation, stroke, sports injury & home physiotherapy.",
              telephone: "+917004119766",
              email: "Samarthclinic.info@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Canal Road, Rajputana Mohalla",
                addressLocality: "Dehri on Sone",
                addressRegion: "Bihar",
                postalCode: "821307",
                addressCountry: "IN",
              },
              geo: { "@type": "GeoCoordinates", latitude: 25.6125392, longitude: 85.1406895 },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "10:00", closes: "20:00" },
              ],
              priceRange: "₹₹",
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "42" },
              medicalSpecialty: [
                "Physiotherapy", "Rehabilitation", "Neurological Rehabilitation",
                "Orthopedic Physiotherapy", "Sports Medicine", "Occupational Therapy", "Speech Therapy",
              ],
              hasMap: "https://maps.app.goo.gl/3Ey94eDkMNvhsrQf7",
              sameAs: [
                "https://www.facebook.com/imthepremkumarshah",
                "https://www.instagram.com/dr._prem__prakash",
                "https://youtube.com/@dr.premprakash",
              ],
              founder: { "@type": "Person", name: "Dr. Prem Prakash", jobTitle: "Senior Physiotherapist", qualifications: "Bachelor in Physiotherapy (BPT)" },
            }),
          }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background bg-mesh-light font-sans text-foreground antialiased", inter.variable, poppins.variable)}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}