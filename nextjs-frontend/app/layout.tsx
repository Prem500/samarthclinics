import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Samarth Clinic - Best Physiotherapy Clinic in Dehri",
    template: "%s | Samarth Clinic"
  },
  description: "Professional physiotherapy and rehabilitation services in Dehri. Expert treatment for joint pain, sports injuries, neurological conditions, and post-operative care by Dr. Prem Prakash.",
  keywords: [
    "physiotherapy",
    "rehabilitation", 
    "Dehri",
    "joint pain",
    "sports injury",
    "neurological therapy",
    "post-operative care",
    "Dr. Prem Prakash",
    "Samarth Clinic"
  ],
  authors: [{ name: "Samarth Clinic" }],
  creator: "Samarth Clinic",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samarthclinics.com",
    siteName: "Samarth Clinic",
    title: "Samarth Clinic - Best Physiotherapy Clinic in Dehri",
    description: "Professional physiotherapy and rehabilitation services in Dehri. Expert treatment for joint pain, sports injuries, neurological conditions, and post-operative care.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Samarth Clinic - Physiotherapy & Rehabilitation Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samarth Clinic - Best Physiotherapy Clinic in Dehri",
    description: "Professional physiotherapy and rehabilitation services in Dehri.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        poppins.variable
      )}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}