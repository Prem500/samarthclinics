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
  FileText,
  ArrowRight,
} from "lucide-react";
import { format, addDays, isWeekend } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { authAxios } from "@/lib/authUtils";
import { motion } from "framer-motion";

// Define the Doctor interface
interface Doctor {
  _id: string;
  full_name: string;
  email: string;
}

const Appointment = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [issue, setIssue] = useState("");
  const [visitType, setVisitType] = useState<"clinic" | "home">("clinic");
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  // New fields for non-authenticated users
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { isSignedIn, userId } = useAuth();

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

  useEffect(() => {
    // Fetch doctors list from API
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/role/doctors`
        );
        console.log(response.data);
        setDoctors(response.data);
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

  useEffect(() => {
    // Check slot availability when doctor, date and time are selected
    if (selectedDoctor && selectedDate && selectedTime) {
      checkSlotAvailability();
    }
  }, [selectedDoctor, selectedDate, selectedTime]);

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

      console.log(response.data);

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

  // Function to determine if the current step is complete and we can move to the next step
  const canProceedToNextStep = (step: number) => {
    switch (step) {
      case 1:
        return Boolean(visitType);
      case 2:
        return selectedDoctor !== "";
      case 3:
        return selectedDate !== undefined;
      case 4:
        return selectedTime !== "" && isSlotAvailable;
      case 5:
        // For step 5, we need to check if all contact fields are filled for non-authenticated users
        if (!isSignedIn) {
          return Boolean(fullName && email && phoneNumber && issue.trim());
        }
        return Boolean(issue.trim());
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 5 && canProceedToNextStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Appointment progress steps
  const steps = [
    { number: 1, label: "Visit Type", icon: <Home className="h-5 w-5" /> },
    {
      number: 2,
      label: "Select Doctor",
      icon: <UserRound className="h-5 w-5" />,
    },
    {
      number: 3,
      label: "Choose Date",
      icon: <CalendarIcon className="h-5 w-5" />,
    },
    { number: 4, label: "Select Time", icon: <Clock className="h-5 w-5" /> },
    {
      number: 5,
      label: "Your Details",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2d405f] mb-3">
          अपॉइंटमेंट बुकिंग
        </h2>
        <p className="text-[#5a6a85] max-w-2xl mx-auto">
          हमारे विशेषज्ञ चिकित्सकों के साथ अपॉइंटमेंट बुक करें। अपनी जरूरतों के
          अनुसार दिन और समय चुनें।
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex min-w-max justify-center items-center gap-1">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex flex-col items-center ${
                  currentStep >= step.number ? "cursor-pointer" : ""
                }`}
                onClick={() => {
                  if (currentStep > step.number) {
                    setCurrentStep(step.number);
                  }
                }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep > step.number
                      ? "bg-[#3a9efd] text-white"
                      : currentStep === step.number
                      ? "bg-[#e9f5ff] text-[#3a9efd] border-2 border-[#3a9efd]"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? "text-[#2d405f]"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-1 ${
                    currentStep > index + 1 ? "bg-[#3a9efd]" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

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
          <CardHeader className="bg-gradient-to-r from-[#e9f5ff] to-white border-b pb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#3a9efd] p-3 rounded-lg text-white">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl text-[#2d405f]">
                  अपॉइंटमेंट बुक करें
                </CardTitle>
                <CardDescription className="text-base text-[#5a6a85]">
                  विशेषज्ञ चिकित्सकों के साथ अपॉइंटमेंट बुक करें
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-7">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-[#2d405f] mb-4">
                    चुनें कि आप कहां मिलना चाहते हैं
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          क्लीनिक में मिलें
                        </h4>
                        <p className="text-[#5a6a85] text-sm">
                          क्लीनिक में आकर परामर्श लें
                        </p>
                      </div>
                    </div>

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
                          घर पर मिलें
                        </h4>
                        <p className="text-[#5a6a85] text-sm">
                          घर पर आकर चिकित्सक से मिलें
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-[#2d405f] mb-4">
                    डॉक्टर चुनें
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {doctors.length > 0 ? (
                      doctors.map((doctor: Doctor) => (
                        <div
                          key={doctor._id}
                          className={`border-2 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all hover:shadow-md ${
                            selectedDoctor === doctor._id
                              ? "border-[#3a9efd] bg-[#e9f5ff]/30"
                              : "border-gray-200"
                          }`}
                          onClick={() => setSelectedDoctor(doctor._id)}
                        >
                          <div
                            className={`w-16 h-16 rounded-full bg-[#3a9efd]/10 overflow-hidden flex items-center justify-center border-2 ${
                              selectedDoctor === doctor._id
                                ? "border-[#3a9efd]"
                                : "border-gray-200"
                            }`}
                          >
                            <UserRound className="h-8 w-8 text-[#3a9efd]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#2d405f]">
                              {doctor.full_name || "Doctor"}
                            </h4>
                            <p className="text-[#5a6a85] text-sm">
                              {doctor.email}
                            </p>
                            <div className="flex items-center text-sm mt-1">
                              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                                Available
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-8 border-2 border-dashed rounded-xl">
                        <p className="text-[#5a6a85]">Loading doctors...</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-[#2d405f] mb-4">
                    तारीख चुनें
                  </h3>

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

                  {selectedDate && (
                    <div className="bg-[#f0f7fc] p-4 rounded-lg flex items-center gap-3">
                      <CalendarIcon className="h-5 w-5 text-[#3a9efd]" />
                      <p>
                        आपने{" "}
                        <span className="font-medium">
                          {format(selectedDate, "EEEE")}
                        </span>
                        , {format(selectedDate, "PPP")} चुना है
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-[#2d405f] mb-4">
                    समय चुनें
                  </h3>

                  <div className="bg-[#f0f7fc] p-4 rounded-lg flex items-center gap-3 mb-5">
                    <CalendarIcon className="h-5 w-5 text-[#3a9efd]" />
                    <p className="font-medium">
                      {selectedDate && format(selectedDate, "EEEE, PPP")}
                    </p>
                  </div>

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

                  {selectedDoctor &&
                    selectedDate &&
                    selectedTime &&
                    !isSlotAvailable && (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-3 mt-4">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-600 text-sm">
                          यह स्लॉट पहले से बुक है। कृपया दूसरा समय चुनें।
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
                          यह स्लॉट उपलब्ध है!
                        </p>
                      </div>
                    )}
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-[#2d405f] mb-4">
                    अपना विवरण और समस्या बताएं
                  </h3>

                  {/* Contact fields for non-authenticated users */}
                  {!isSignedIn && (
                    <div className="space-y-4 mb-6 bg-[#f0f7fc] p-5 rounded-lg">
                      <h4 className="font-medium text-[#2d405f]">
                        संपर्क जानकारी
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="full_name" className="text-[#5a6a85]">
                            पूरा नाम *
                          </Label>
                          <input
                            id="full_name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd]"
                            placeholder="अपना पूरा नाम दर्ज करें"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="phoneNumber"
                            className="text-[#5a6a85]"
                          >
                            फोन नंबर *
                          </Label>
                          <input
                            id="phoneNumber"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd]"
                            placeholder="अपना फोन नंबर दर्ज करें"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-[#5a6a85]">
                          ईमेल *
                        </Label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd]"
                          placeholder="अपना ईमेल पता दर्ज करें"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="issue" className="text-[#5a6a85]">
                      अपनी समस्या का विवरण दें *
                    </Label>
                    <Textarea
                      id="issue"
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      placeholder="अपने लक्षणों या चिंताओं का संक्षिप्त विवरण दें जिसके लिए आप परामर्श चाहते हैं।"
                      rows={8}
                      className="min-h-[200px] resize-none border-slate-300 hover:border-[#3a9efd] focus:ring-1 focus:ring-[#3a9efd] rounded-lg"
                      required
                    />
                  </div>

                  <div className="bg-[#f0f7fc] p-5 rounded-lg space-y-3">
                    <h4 className="font-medium text-[#2d405f]">
                      आपके अपॉइंटमेंट का सारांश
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <UserRound className="h-5 w-5 text-[#3a9efd] mt-0.5" />
                        <div>
                          <p className="text-sm text-[#5a6a85]">डॉक्टर</p>
                          <p className="font-medium text-[#2d405f]">
                            {doctors.find(
                              (doc: Doctor) => doc._id === selectedDoctor
                            )?.full_name || "Doctor"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CalendarIcon className="h-5 w-5 text-[#3a9efd] mt-0.5" />
                        <div>
                          <p className="text-sm text-[#5a6a85]">दिनांक</p>
                          <p className="font-medium text-[#2d405f]">
                            {selectedDate && format(selectedDate, "PPP")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-[#3a9efd] mt-0.5" />
                        <div>
                          <p className="text-sm text-[#5a6a85]">समय</p>
                          <p className="font-medium text-[#2d405f]">
                            {selectedTime}
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
                          <p className="text-sm text-[#5a6a85]">
                            मुलाकात का प्रकार
                          </p>
                          <p className="font-medium text-[#2d405f]">
                            {visitType === "clinic"
                              ? "क्लीनिक में मिलें"
                              : "घर पर मिलें"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      marginTop: "24px",
                      height: "48px",
                      fontSize: "16px",
                      fontWeight: "500",
                      backgroundColor: "#3a9efd",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      borderRadius: "6px",
                      border: "none",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      cursor:
                        isSubmitting ||
                        !isSlotAvailable ||
                        !selectedDoctor ||
                        !selectedDate ||
                        !selectedTime ||
                        !issue.trim() ||
                        (!isSignedIn &&
                          (!fullName.trim() || !email.trim() || !phoneNumber.trim()))
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        isSubmitting ||
                        !isSlotAvailable ||
                        !selectedDoctor ||
                        !selectedDate ||
                        !selectedTime ||
                        !issue.trim() ||
                        (!isSignedIn &&
                          (!fullName.trim() || !email.trim() || !phoneNumber.trim()))
                          ? "0.7"
                          : "1",
                    }}
                    disabled={
                      isSubmitting ||
                      !isSlotAvailable ||
                      !selectedDoctor ||
                      !selectedDate ||
                      !selectedTime ||
                      !issue.trim() ||
                      (!isSignedIn &&
                        (!fullName.trim() || !email.trim() || !phoneNumber.trim()))
                    }
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        प्रोसेसिंग...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        अपॉइंटमेंट बुक करें
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </button>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div
                className={`flex justify-between pt-5 ${
                  currentStep === 5 ? "hidden" : "block"
                }`}
              >
                <button
                  type="button"
                  onClick={prevStep}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    backgroundColor: "#ffffff",
                    color: "#374151",
                    fontWeight: "500",
                    visibility: currentStep === 1 ? "hidden" : "visible",
                    cursor: "pointer",
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedToNextStep(currentStep)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "6px",
                    backgroundColor: "#3a9efd",
                    color: "#ffffff",
                    fontWeight: "500",
                    border: "none",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    cursor: canProceedToNextStep(currentStep)
                      ? "pointer"
                      : "not-allowed",
                    opacity: canProceedToNextStep(currentStep) ? "1" : "0.7",
                  }}
                >
                  Next
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Appointment;
