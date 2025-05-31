import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CalendarIcon,
  Clock,
  AlertCircle,
  Check,
  MapPin,
  Home,
  UserRound,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { format, addDays, isWeekend } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { authAxios } from "@/lib/authUtils";
import { motion } from "framer-motion";

// // Add custom CSS for the booking button
// const buttonStyles = `
//   .booking-button {
//     background-color: #ff3333 !important;
//     color: white !important;
//     font-weight: bold !important;
//     font-size: 18px !important;
//     padding: 16px 30px !important;
//     border-radius: 8px !important;
//     border: 2px solid #ff3333 !important;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
//     margin-top: 20px !important;
//     text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3) !important;
//     position: relative !important;
//     z-index: 10 !important;
//   }

//   .booking-button:hover {
//     background-color: #e60000 !important;
//     transform: translateY(-2px) !important;
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3) !important;
//   }

//   .booking-button:active {
//     transform: translateY(1px) !important;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
//   }

//   .booking-button:disabled {
//     background-color: #ff9999 !important;
//     border-color: #ff9999 !important;
//     color: white !important;
//     cursor: not-allowed !important;
//     opacity: 0.8 !important;
//   }

//   .booking-button span {
//     color: white !important;
//     font-weight: bold !important;
//   }
// `;

// Define the Doctor interface
interface Doctor {
  _id: string;
  full_name: string;
  email: string;
}

const Appointment = () => {
  // State variables
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [issue, setIssue] = useState("");
  const [visitType, setVisitType] = useState<"clinic" | "home">("clinic");
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // User information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { isSignedIn, userId } = useAuth();

  // Available time slots
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  // Set initial values and fetch necessary data
  useEffect(() => {
    // Fetch doctors list from API to get Dr. Prem's ID
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/role/doctors`
        );

        // Find Dr. Prem and set as selected doctor
        const drPrem = response.data.find(
          (doc: Doctor) => doc.full_name && doc.full_name.includes("Prem")
        );

        if (drPrem) {
          setSelectedDoctor(drPrem._id);
        } else if (response.data.length > 0) {
          // If Dr. Prem not found, use the first doctor in the list
          setSelectedDoctor(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();

    // Set default date to tomorrow if it's not a weekend
    let nextDay = addDays(new Date(), 1);
    while (isWeekend(nextDay)) {
      nextDay = addDays(nextDay, 1);
    }
    setSelectedDate(nextDay);

    // If user is signed in, pre-fill user details
    if (isSignedIn && userId) {
      fetchUserDetails();
    }
  }, [isSignedIn, userId]);

  // Fetch user details if authenticated
  const fetchUserDetails = async () => {
    try {
      const response = await authAxios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/${userId}`
      );
      if (response.data) {
        setFullName(response.data.full_name || "");
        setEmail(response.data.email || "");
        setPhoneNumber(response.data.phoneNumber || "");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Check slot availability when date/time changes
  useEffect(() => {
    if (selectedDoctor && selectedDate && selectedTime) {
      checkSlotAvailability();
    }
  }, [selectedDoctor, selectedDate, selectedTime]);

  // Check if the selected time slot is available
  const checkSlotAvailability = async () => {
    try {
      const response = await authAxios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking/time-slot`,
        {
          doctorId: selectedDoctor,
          date: format(selectedDate as Date, "yyyy-MM-dd"),
          time: selectedTime,
        }
      );
      setIsSlotAvailable(response.data.message === "Slot is available");
    } catch (error) {
      console.error("Error checking availability:", error);
      setIsSlotAvailable(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields for non-authenticated users
    if (!isSignedIn) {
      if (!fullName.trim() || !email.trim() || !phoneNumber.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Basic email validation
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (!selectedTime) {
      toast.error("Please select a time");
      return;
    }

    if (!issue.trim()) {
      toast.error("Please describe your issue");
      return;
    }

    if (!isSlotAvailable) {
      setErrorMessage(
        "Selected slot is not available. Please choose another time."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const bookingData = {
        doctor: selectedDoctor,
        date: format(selectedDate as Date, "yyyy-MM-dd"),
        time: selectedTime,
        issue,
        visitType,
        // Include user ID only if authenticated
        ...(isSignedIn && userId ? { user: userId } : {}),
        // Always include these fields, they'll be used for non-authenticated users
        full_name: fullName,
        email: email,
        phoneNumber: phoneNumber,
      };

      const response = await authAxios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking/create`,
        bookingData
      );

      if (response.status === 201) {
        toast("Appointment booked successfully", {
          description: "Your appointment has been successfully booked.",
        });
        navigate("/");
        setSuccessMessage("Appointment booked successfully!");
      }

      // Reset form
      setSelectedDoctor("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setIssue("");
      if (!isSignedIn) {
        setFullName("");
        setEmail("");
        setPhoneNumber("");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setErrorMessage("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="mb-6 bg-green-50 border-green-200 shadow-sm">
            <Check className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 font-medium">
              Success
            </AlertTitle>
            <AlertDescription className="text-green-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="mb-6 bg-red-50 border-red-200 shadow-sm">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800 font-medium">Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {errorMessage}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-t-4 border-t-[#3a9efd] overflow-hidden">
          {/* Card Header */}
          <CardHeader className="bg-gradient-to-r from-[#e9f5ff] to-white border-b pb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#3a9efd] p-3 rounded-lg text-white">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl text-[#2d405f]">
                  Book Appointment
                </CardTitle>
                <CardDescription className="text-base text-[#5a6a85]">
                  Book appointment with Dr. Prem
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Visit Type Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#2d405f] mb-4">
                  Where would you like to meet?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Clinic Option */}
                  <div
                    className={`border-2 rounded-xl p-6 flex items-center gap-4 cursor-pointer transition-all hover:shadow-md ${
                      visitType === "clinic"
                        ? "border-[#3a9efd] bg-[#e9f5ff]/30"
                        : "border-gray-200"
                    }`}
                    onClick={() => setVisitType("clinic")}
                  >
                    <div
                      className={`p-3 rounded-full ${
                        visitType === "clinic"
                          ? "bg-[#3a9efd] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg text-[#2d405f]">
                        Meet at Clinic
                      </h4>
                      <p className="text-[#5a6a85] text-sm">
                        Come to the clinic for consultation
                      </p>
                    </div>
                  </div>

                  {/* Home Option */}
                  <div
                    className={`border-2 rounded-xl p-6 flex items-center gap-4 cursor-pointer transition-all hover:shadow-md ${
                      visitType === "home"
                        ? "border-[#3a9efd] bg-[#e9f5ff]/30"
                        : "border-gray-200"
                    }`}
                    onClick={() => setVisitType("home")}
                  >
                    <div
                      className={`p-3 rounded-full ${
                        visitType === "home"
                          ? "bg-[#3a9efd] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Home className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg text-[#2d405f]">
                        Meet at Home
                      </h4>
                      <p className="text-[#5a6a85] text-sm">
                        Doctor visits you at home
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Date and Time Selection */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#2d405f] mb-4">
                  When would you like to meet?
                </h3>

                {/* Calendar */}
                <div className="border-2 rounded-xl p-4 md:p-6 bg-white">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date.getDay() === 0 ||
                      date.getDay() === 6
                    }
                    className="mx-auto"
                  />

                  {/* Quick Date Selection */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {[1, 2, 3, 4].map((day) => {
                      const date = addDays(new Date(), day);
                      if (date.getDay() === 0 || date.getDay() === 6)
                        return null;

                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`py-2 px-4 rounded-full flex flex-col items-center transition-all ${
                            selectedDate &&
                            format(selectedDate, "yyyy-MM-dd") ===
                              format(date, "yyyy-MM-dd")
                              ? "bg-[#3a9efd] text-white"
                              : "bg-[#e9f5ff] text-[#3a9efd] hover:bg-[#3a9efd]/20"
                          }`}
                        >
                          <span className="text-xs font-medium">
                            {format(date, "EEE")}
                          </span>
                          <span className="text-lg font-semibold">
                            {format(date, "d")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date confirmation */}
                {selectedDate && (
                  <div className="bg-[#f0f7fc] p-4 rounded-lg flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-[#3a9efd]" />
                    <p>
                      Selected date:{" "}
                      <span className="font-medium">
                        {format(selectedDate, "EEEE")}
                      </span>
                      , {format(selectedDate, "PPP")}
                    </p>
                  </div>
                )}

                {/* Time slots */}
                <div className="mt-6">
                  <h4 className="font-medium text-lg text-[#2d405f] mb-3">
                    Select a time
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`py-3 px-2 rounded-lg flex items-center justify-center gap-2 transition-all border-2 ${
                          selectedTime === time
                            ? "bg-[#3a9efd] text-white border-[#3a9efd]"
                            : "bg-white text-[#2d405f] border-gray-200 hover:border-[#3a9efd] hover:bg-[#e9f5ff]/50"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">{time}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time slot availability messages */}
                {selectedDoctor &&
                  selectedDate &&
                  selectedTime &&
                  !isSlotAvailable && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-3 mt-4">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-600 text-sm">
                        This slot is already booked. Please choose another time.
                      </p>
                    </div>
                  )}

                {selectedDoctor &&
                  selectedDate &&
                  selectedTime &&
                  isSlotAvailable && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3 mt-4">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-green-700 text-sm">
                        This slot is available!
                      </p>
                    </div>
                  )}
              </div>
              {/* Contact Info and Problem Description */}
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-[#2d405f] mb-4">
                  Your details
                </h3>

                {/* Contact fields for non-authenticated users */}
                {!isSignedIn && (
                  <div className="space-y-4 mb-6 bg-[#f0f7fc] p-5 rounded-lg">
                    <h4 className="font-medium text-[#2d405f]">
                      Contact Information
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_name" className="text-[#5a6a85]">
                          Full Name *
                        </Label>
                        <input
                          id="full_name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd]"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phoneNumber" className="text-[#5a6a85]">
                          Phone Number *
                        </Label>
                        <input
                          id="phoneNumber"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd]"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[#5a6a85]">
                        Email *
                      </Label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd]"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Problem description */}
                <div>
                  <Label htmlFor="issue" className="text-[#5a6a85]">
                    Describe your problem *
                  </Label>
                  <Textarea
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Provide a brief description of your symptoms or concerns for which you want consultation."
                    rows={5}
                    className="min-h-[120px] resize-none border-slate-300 hover:border-[#3a9efd] focus:ring-1 focus:ring-[#3a9efd] rounded-lg"
                    required
                  />
                </div>
              </div>
              {/* Appointment Summary */}
              <div className="bg-[#f0f7fc] p-5 rounded-lg space-y-3">
                <h4 className="font-medium text-[#2d405f]">
                  Your Appointment Summary
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <UserRound className="h-5 w-5 text-[#3a9efd] mt-0.5" />
                    <div>
                      <p className="text-sm text-[#5a6a85]">Doctor</p>
                      <p className="font-medium text-[#2d405f]">Dr. Prem</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CalendarIcon className="h-5 w-5 text-[#3a9efd] mt-0.5" />
                    <div>
                      <p className="text-sm text-[#5a6a85]">Date</p>
                      <p className="font-medium text-[#2d405f]">
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Not selected"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-[#3a9efd] mt-0.5" />
                    <div>
                      <p className="text-sm text-[#5a6a85]">Time</p>
                      <p className="font-medium text-[#2d405f]">
                        {selectedTime || "Not selected"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    {visitType === "clinic" ? (
                      <MapPin className="h-5 w-5 text-[#3a9efd] mt-0.5" />
                    ) : (
                      <Home className="h-5 w-5 text-[#3a9efd] mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm text-[#5a6a85]">Visit Type</p>
                      <p className="font-medium text-[#2d405f]">
                        {visitType === "clinic"
                          ? "Meet at Clinic"
                          : "Meet at Home"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  backgroundColor: "#ff3333",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                  padding: "16px 30px",
                  borderRadius: "8px",
                  border: "2px solid #ff3333",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  marginTop: "20px",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                  zIndex: "10",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                }}
                disabled={
                  isSubmitting ||
                  !isSlotAvailable ||
                  !selectedDate ||
                  !selectedTime ||
                  !issue.trim() ||
                  (!isSignedIn &&
                    (!fullName.trim() || !email.trim() || !phoneNumber.trim()))
                }
              >
                {isSubmitting ? (
                  <span
                    style={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></span>
                    Processing...
                  </span>
                ) : (
                  <span
                    style={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "18px",
                    }}
                  >
                    Book Appointment
                    <ArrowRight className="h-6 w-6" />
                  </span>
                )}
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Appointment;
