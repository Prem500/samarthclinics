import { Metadata } from "next";
import DoctorAuthForm from "@/components/auth/doctor-auth-form";

export const metadata: Metadata = {
  title: "Doctor Authentication - Samarth Clinic",
  description: "Secure login and registration portal for doctors and medical professionals at Samarth Clinic.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DoctorAuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <DoctorAuthForm />
    </div>
  );
}