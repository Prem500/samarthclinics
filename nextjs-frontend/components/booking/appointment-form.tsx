"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Phone, MapPin, CheckCircle, Loader } from "lucide-react";
import { format, addDays } from "date-fns";
import { authAxios } from "@/lib/auth";
import { buildApiUrl } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

interface Doctor {
  _id: string;
  full_name: string;
  email: string;
  phoneNumber?: string;
}

export default function AppointmentForm() {
  const { isSignedIn, userId } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    address: "",
    date: "",
    time: "10:00",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<Doctor | null>(null);

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", 
    "18:00", "19:00", "20:00"
  ];

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = addDays(new Date(), 1);
    setFormData(prev => ({
      ...prev,
      date: format(tomorrow, "yyyy-MM-dd")
    }));

    // Fetch doctor information
    fetchDoctorInfo();

    // Pre-fill user details if authenticated
    if (isSignedIn && userId) {
      fetchUserDetails();
    }
  }, [isSignedIn, userId]);

  const fetchDoctorInfo = async () => {
    try {
      const response = await authAxios.get(buildApiUrl('role/doctors'));
      const drPrem = response.data.find(
        (doc: Doctor) => doc.full_name && doc.full_name.includes("Prem")
      );
      
      if (drPrem) {
        setDoctorInfo(drPrem);
      } else if (response.data.length > 0) {
        setDoctorInfo(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await authAxios.get(buildApiUrl(`auth/${userId}`));
      if (response.data) {
        setFormData(prev => ({
          ...prev,
          name: response.data.full_name || "",
          phone: response.data.phoneNumber || "",
          email: response.data.email || "",
          age: response.data.age?.toString() || "",
          address: response.data.address || ""
        }));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.age.trim() || !formData.address.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    if (!formData.date) {
      setError("Please select a date");
      return;
    }

    if (!doctorInfo) {
      setError("No doctor available. Please try again later.");
      return;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10,12}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setError("Please enter a valid phone number (10-12 digits)");
      return;
    }

    // Validate age
    const ageNum = parseInt(formData.age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError("Please enter a valid age between 1 and 120");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const bookingData = {
        doctor: doctorInfo._id,
        date: formData.date,
        time: formData.time,
        ...(isSignedIn && userId ? { user: userId } : {}),
        full_name: formData.name.trim(),
        phoneNumber: formData.phone.trim(),
        age: ageNum,
        address: formData.address.trim(),
        email: formData.email.trim() || undefined,
        message: formData.message.trim() || undefined
      };

      const response = await authAxios.post(buildApiUrl('booking/create'), bookingData);

      if (response.status === 201) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          age: "",
          address: "",
          date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
          time: "10:00",
          message: ""
        });
      }
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      const errorMsg = error.response?.data?.message || "Failed to book appointment. Please try again.";
      setError(errorMsg);
      
      if (error.response?.status === 409) {
        if (errorMsg.includes("phone number already exists")) {
          setError("This phone number is already registered. Please use a different number or contact support.");
        } else if (errorMsg.includes("already have a booking")) {
          setError("You already have a booking with this doctor on this date and time.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card className="shadow-xl border-t-4 border-t-green-500">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Appointment Booked Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Your appointment has been confirmed. We'll contact you shortly to confirm the details.
          </p>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800">
                <strong>Date:</strong> {format(new Date(formData.date), "PPP")}<br />
                <strong>Time:</strong> {formData.time}<br />
                <strong>Doctor:</strong> {doctorInfo?.full_name || "Dr. Prem Prakash"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setSuccess(false)}
                className="btn-secondary-outline"
              >
                Book Another Appointment
              </button>
              <a href={`tel:${doctorInfo?.phoneNumber || "+917004119766"}`} className="btn-primary-medical">
                Call Clinic
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-t-4 border-t-blue-600">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Book Appointment
        </CardTitle>
        <CardDescription className="text-blue-100">
          Fill in your details to schedule your visit with Dr. Prem Prakash
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                name="age"
                required
                min="1"
                max="120"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Your age"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Your address"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time *
              </label>
              <select
                name="time"
                required
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              placeholder="Tell us about your condition or any specific requirements"
            />
          </div>

          <button
            type="submit"
            className="btn-primary-medical w-full py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Booking Appointment...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Book Appointment
              </div>
            )}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}