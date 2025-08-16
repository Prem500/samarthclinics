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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon, AlertCircle, Check, ArrowRight, Phone, MessageCircle, X, Loader } from "lucide-react";
import { format, addDays } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { authAxios } from "@/lib/authUtils";
import { buildApiUrl } from "@/lib/urlUtils";
import { motion } from "framer-motion";

// Define the Doctor interface
interface Doctor {
  _id: string;
  full_name: string;
  email: string;
  phoneNumber?: string;
}

// Define the Prescription interface
interface Prescription {
  _id: string;
  prescriptionText: string;
  medications: any[];
  diagnosis: string;
  patient: {
    _id: string;
    full_name: string;
    email: string;
  };
  dateIssued: string;
  notes: string;
  expiryDate: string | null;
  paymentStatus: "pending" | "paid";
  paymentAmount: number | null;
  shareableId?: string;
  patientHistory?: string;
  treatmentPlan?: string;
  followUpDate?: string | null;
}

const Appointment = () => {
  // State variables
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<Doctor | null>(null);
  
  // Prescription tracking for revisits
  const [_patientPrescriptions, setPatientPrescriptions] = useState<Prescription[]>([]);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
  const [latestPrescription, setLatestPrescription] = useState<Prescription | null>(null);
  const [isRevisit, setIsRevisit] = useState(false);

  // User information
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { isSignedIn, userId } = useAuth();

  // Available appointment times
  const AVAILABLE_TIMES = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];
  
  const [selectedTime, setSelectedTime] = useState("10:00");
  
  // We'll use the buildApiUrl utility instead of direct URL construction

  // Set initial values and fetch necessary data
  useEffect(() => {
    // Fetch doctors list from API to get Dr. Prem's ID
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          buildApiUrl('role/doctors')
        );

        // Find Dr. Prem and set as selected doctor
        const drPrem = response.data.find(
          (doc: Doctor) => doc.full_name && doc.full_name.includes("Prem")
        );

        if (drPrem) {
          setSelectedDoctor(drPrem._id);
          setDoctorInfo(drPrem);
        } else if (response.data.length > 0) {
          // If Dr. Prem not found, use the first doctor in the list
          setSelectedDoctor(response.data[0]._id);
          setDoctorInfo(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setErrorMessage("Failed to fetch doctors. Please check if the server is running.");
      }
    };
    fetchDoctors();

    // Set default date to tomorrow
    let nextDay = addDays(new Date(), 1);
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
        buildApiUrl(`auth/${userId}`)
      );
      if (response.data) {
        setFullName(response.data.full_name || "");
        setPhoneNumber(response.data.phoneNumber || "");
        setAge(response.data.age?.toString() || "");
        setAddress(response.data.address || "");
        setEmail(response.data.email || ""); // Add email to state
        
        // After fetching user details, check if they have any prescriptions
        if (response.data._id) {
          fetchPatientPrescriptions(response.data._id);
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  
  // Fetch patient's prescription history
  const fetchPatientPrescriptions = async (patientId: string) => {
    try {
      setLoadingPrescriptions(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No authentication token available");
        setLoadingPrescriptions(false);
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      // Fetch prescriptions for this patient
      const response = await axios.get(
        buildApiUrl(`prescription/user/${patientId}`),
        config
      );
      
      if (response.data && Array.isArray(response.data)) {
        // Sort prescriptions by date, newest first
        const sortedPrescriptions = [...response.data].sort((a, b) => 
          new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime()
        );
        
        console.log(`Found ${sortedPrescriptions.length} prescriptions for patient ${patientId}`);
        setPatientPrescriptions(sortedPrescriptions);
        
        // If there are prescriptions, set the latest one and mark as revisit
        if (sortedPrescriptions.length > 0) {
          const latest = sortedPrescriptions[0];
          console.log("Latest prescription:", latest._id, "dated:", new Date(latest.dateIssued).toLocaleDateString());
          setLatestPrescription(latest);
          setIsRevisit(true);
        }
      }
    } catch (error) {
      console.error("Error fetching patient prescriptions:", error);
    } finally {
      setLoadingPrescriptions(false);
    }
  };

  // Handle phone call
  const handlePhoneCall = () => {
    if (doctorInfo?.phoneNumber) {
      window.open(`tel:${doctorInfo.phoneNumber}`, '_self');
    }
  };

  // Handle WhatsApp message
  const handleWhatsApp = () => {
    if (doctorInfo?.phoneNumber) {
      const message = "Hello sir, maine abhi appointment book kiya hai, kripya confirm karein";
      const whatsappUrl = `https://wa.me/${doctorInfo.phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  // Close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage("");
    // Reset form
    setSelectedDoctor("");
    setSelectedDate(undefined);
    setSelectedTime("10:00"); // Reset to default time
    if (!isSignedIn) {
      setFullName("");
      setPhoneNumber("");
      setAge("");
      setAddress("");
      setEmail("");
    }
    // Navigate to home
    navigate("/");
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !fullName.trim() ||
      !phoneNumber.trim() ||
      !age.trim() ||
      !address.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (!selectedDoctor) {
      toast.error("No doctor selected. Please try refreshing the page.");
      return;
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[0-9]{10,12}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      toast.error("Please enter a valid phone number (10-12 digits)");
      return;
    }

    // Validate age
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      toast.error("Please enter a valid age between 1 and 120");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(""); // Clear any previous errors

      const bookingData = {
        doctor: selectedDoctor,
        date: format(selectedDate as Date, "yyyy-MM-dd"),
        time: selectedTime, // Using selected time from the time picker
        // Include user ID only if authenticated
        ...(isSignedIn && userId ? { user: userId } : {}),
        // Include user details
        full_name: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        age: ageNum,
        address: address.trim(),
        email: email.trim() || undefined, // Only send email if provided
      };

      console.log("Sending booking data:", bookingData);

      const response = await authAxios.post(
        buildApiUrl('booking/create'),
        bookingData
      );

      if (response.status === 201) {
        // If this is a revisit and we have a previous prescription, 
        // redirect to prescriptions page with the prescription ID
        if (isRevisit && latestPrescription) {
          toast.success("Appointment booked successfully! Loading previous prescription...");
          
          // Navigate to prescriptions with edit parameter and other patient details
          console.log("Redirecting to prescriptions with existing prescription:", latestPrescription._id);
          navigate(`/prescriptions?edit=${latestPrescription._id}&patientId=${latestPrescription.patient._id}&patientName=${encodeURIComponent(fullName)}&patientEmail=${encodeURIComponent(email)}&patientPhone=${encodeURIComponent(phoneNumber)}&patientAge=${age}&patientAddress=${encodeURIComponent(address)}&appointmentId=${response.data._id}`);
          
          return; // Skip showing success modal
        }
        
        // Normal flow for new patients
        setSuccessMessage("Appointment booked successfully!");
        setShowSuccessModal(true); // Show the success modal instead of toast
      }
    } catch (error: any) {
      console.error("Error booking appointment:", error);
      const errorMsg = error.response?.data?.message || "Failed to book appointment. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      
      // Handle specific error cases
      if (error.response?.status === 409) {
        if (errorMsg.includes("phone number already exists")) {
          toast.error("This phone number is already registered. Please use a different number or contact support.");
        } else if (errorMsg.includes("already have a booking")) {
          toast.error("You already have a booking with this doctor on this date and time.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 overflow-hidden">
      {/* Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="mb-4 sm:mb-6 bg-red-50 border-red-200 shadow-sm">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
            <AlertTitle className="text-red-800 font-medium text-sm sm:text-base">
              Error
            </AlertTitle>
            <AlertDescription className="text-red-700 text-xs sm:text-sm">
              {errorMessage}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      {/* Revisit Notification */}
      {isRevisit && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="mb-4 sm:mb-6 bg-blue-50 border-blue-200 shadow-sm">
            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <AlertTitle className="text-blue-800 font-medium text-sm sm:text-base">
              Welcome Back
            </AlertTitle>
            <AlertDescription className="text-blue-700 text-xs sm:text-sm">
              We found your previous prescription from {latestPrescription ? format(new Date(latestPrescription.dateIssued), "PPP") : "a previous visit"}. After booking, you'll be able to continue with your existing treatment plan.
              {loadingPrescriptions && <Loader className="inline-block ml-2 h-3 w-3 animate-spin" />}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-t-4 border-t-[#3a9efd] overflow-hidden bg-white">
          {/* Card Header */}
          <CardHeader className="bg-gradient-to-r from-[#e9f5ff] to-white border-b pb-4 sm:pb-6 px-4 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-[#3a9efd] p-2 sm:p-3 rounded-lg text-white">
                <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl text-[#2d405f]">
                  Book Appointment
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-[#5a6a85]">
                  Book appointment with Dr. Prem
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="pt-4 sm:pt-8 px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7">
              {" "}
              {/* Date Selection */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-[#2d405f] mb-2 sm:mb-4">
                  Select an appointment date
                </h3>

                {/* Calendar */}
                <div className="border-2 rounded-xl p-2 sm:p-4 md:p-6 bg-white overflow-auto shadow-sm">
                  <div className="max-w-full overflow-auto bg-white">
                    {" "}
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      className="mx-auto scale-[0.85] sm:scale-100 bg-white text-[#2d405f] dark:bg-white dark:text-[#2d405f]"
                      classNames={{
                        months: "bg-white dark:bg-white",
                        month: "bg-white dark:bg-white",
                        caption:
                          "text-[#2d405f] bg-white dark:text-[#2d405f] dark:bg-white",
                        caption_label:
                          "text-[#2d405f] font-medium bg-white dark:text-[#2d405f] dark:bg-white",
                        nav: "bg-white dark:bg-white",
                        nav_button:
                          "bg-white text-[#3a9efd] hover:bg-[#e9f5ff] hover:text-[#3a9efd] dark:bg-white dark:text-[#3a9efd]",
                        nav_button_previous:
                          "text-[#3a9efd] bg-white dark:text-[#3a9efd] dark:bg-white",
                        nav_button_next:
                          "text-[#3a9efd] bg-white dark:text-[#3a9efd] dark:bg-white",
                        table: "bg-white dark:bg-white",
                        head_row: "bg-white dark:bg-white",
                        head_cell:
                          "text-[#5a6a85] bg-white dark:text-[#5a6a85] dark:bg-white",
                        row: "bg-white dark:bg-white",
                        cell: "bg-white dark:bg-white",
                        day: "bg-white text-[#2d405f] hover:bg-[#e9f5ff] hover:text-[#3a9efd] dark:bg-white dark:text-[#2d405f]",
                        day_selected:
                          "bg-blue-400 text-blue-500 hover:bg-[#3a9efd] hover:text-blue-500 dark:bg-blue-400 dark:text-blue-500 border border-blue-500 dark:border-blue-500",
                        day_today:
                          "border border-[#3a9efd] text-[#3a9efd] bg-white dark:border-[#3a9efd] dark:text-[#3a9efd] dark:bg-white",
                        day_outside:
                          "text-gray-300 bg-white dark:text-gray-300 dark:bg-white",
                        day_disabled:
                          "text-gray-300 bg-white dark:text-gray-300 dark:bg-white",
                        day_hidden: "invisible bg-white dark:bg-white",
                      }}
                      style={{
                        backgroundColor: "white",
                        color: "#2d405f",
                      }}
                    />
                  </div>{" "}
                  {/* Quick Date Selection */}
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center bg-white">
                    {[1, 2, 3, 4].map((day) => {
                      const date = addDays(new Date(), day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`py-1 sm:py-2 px-2 sm:px-4 rounded-full flex flex-col items-center transition-all ${
                            selectedDate &&
                            format(selectedDate, "yyyy-MM-dd") ===
                              format(date, "yyyy-MM-dd")
                              ? "bg-[#3a9efd] text-white hover:bg-[#2b8fe9] dark:text-white"
                              : "bg-[#e9f5ff] text-[#3a9efd] hover:bg-[#d0e7fb] dark:text-[#3a9efd] dark:bg-[#e9f5ff]"
                          }`}
                          style={{
                            color:
                              selectedDate &&
                              format(selectedDate, "yyyy-MM-dd") ===
                                format(date, "yyyy-MM-dd")
                                ? "white"
                                : "#3a9efd",
                            backgroundColor:
                              selectedDate &&
                              format(selectedDate, "yyyy-MM-dd") ===
                                format(date, "yyyy-MM-dd")
                                ? "#3a9efd"
                                : "#e9f5ff",
                          }}
                        >
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: "inherit",
                            }}
                          >
                            {format(date, "EEE")}
                          </span>
                          <span
                            className="text-sm sm:text-lg font-semibold"
                            style={{
                              color: "inherit",
                            }}
                          >
                            {format(date, "d")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <>
                    <div className="mt-4 mb-2">
                      <h4 className="text-base font-semibold text-[#2d405f]">Select appointment time</h4>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-3">
                        {AVAILABLE_TIMES.map((time) => {
                          const displayTime = Number(time.split(":")[0]) >= 12 
                            ? `${Number(time.split(":")[0]) === 12 ? 12 : Number(time.split(":")[0]) - 12}:${time.split(":")[1]} PM` 
                            : `${time} AM`;
                          
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 px-3 rounded-md transition-all ${
                                selectedTime === time
                                  ? "bg-[#3a9efd] text-white font-medium"
                                  : "bg-[#e9f5ff] text-[#3a9efd] hover:bg-[#d0e7fb]"
                              }`}
                            >
                              {displayTime}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Date and Time confirmation */}
                    <div className="bg-[#f0f7fc] p-3 sm:p-4 rounded-lg flex items-center gap-2 sm:gap-3 text-sm sm:text-base mt-3">
                      <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#3a9efd] flex-shrink-0" />
                      <p className="truncate">
                        Selected date:{" "}
                        <span className="font-medium">
                          {format(selectedDate, "EEEE")}
                        </span>
                        , {format(selectedDate, "PPP")} at{" "}
                        <span className="font-medium">
                          {Number(selectedTime.split(":")[0]) >= 12 
                            ? `${Number(selectedTime.split(":")[0]) === 12 ? 12 : Number(selectedTime.split(":")[0]) - 12}:${selectedTime.split(":")[1]} PM` 
                            : `${selectedTime} AM`}
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
              {/* Contact Information */}
              <div className="space-y-3 sm:space-y-5">
                <h3 className="text-lg sm:text-xl font-semibold text-[#2d405f] mb-2 sm:mb-4">
                  Your details
                </h3>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 bg-[#f0f7fc] p-4 sm:p-5 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label
                        htmlFor="full_name"
                        className="text-[#5a6a85] text-xs sm:text-sm"
                      >
                        Full Name *
                      </Label>
                      <input
                        id="full_name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2 sm:p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd] text-sm bg-white"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="age"
                        className="text-[#5a6a85] text-xs sm:text-sm dark:text-[#5a6a85]"
                      >
                        Age *
                      </Label>
                      <input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full p-2 sm:p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd] text-sm bg-white"
                        placeholder="Enter your age"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="address"
                      className="text-[#5a6a85] text-xs sm:text-sm"
                    >
                      Address *
                    </Label>
                    <input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 sm:p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd] text-sm bg-white"
                      placeholder="Enter your address"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="phoneNumber"
                      className="text-[#5a6a85] text-xs sm:text-sm"
                    >
                      Phone Number *
                    </Label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-2 sm:p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd] text-sm bg-white"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-[#5a6a85] text-xs sm:text-sm"
                    >
                      Email (Optional)
                    </Label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 sm:p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a9efd] text-sm bg-white"
                      placeholder="Enter your email (if you have one)"
                    />
                  </div>
                </div>
              </div>
              {/* Appointment Summary */}
              <div className="bg-[#f0f7fc] p-3 sm:p-5 rounded-lg space-y-2 sm:space-y-3">
                <h4 className="font-medium text-base sm:text-lg text-[#2d405f]">
                  Your Appointment Summary
                </h4>

                <div className="flex items-start gap-2">
                  <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#3a9efd] mt-0.5" />
                  <div>
                    <p className="text-xs text-[#5a6a85]">Date & Time</p>
                    <p className="font-medium text-[#2d405f]">
                      {selectedDate
                        ? `${format(selectedDate, "PPP")} at ${
                            Number(selectedTime.split(":")[0]) >= 12 
                            ? `${Number(selectedTime.split(":")[0]) === 12 ? 12 : Number(selectedTime.split(":")[0]) - 12}:${selectedTime.split(":")[1]} PM` 
                            : `${selectedTime} AM`
                          }`
                        : "Please select a date and time"}
                    </p>
                  </div>
                </div>
              </div>{" "}
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full universal-button py-3 sm:py-4 px-4 sm:px-6 
                  flex items-center justify-center gap-2 sm:gap-3
                  shadow-md hover:shadow-lg active:transform active:translate-y-0.5
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
                disabled={
                  isSubmitting ||
                  !selectedDate ||
                  !fullName.trim() ||
                  !phoneNumber.trim() ||
                  !age.trim() ||
                  !address.trim()
                }
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <span className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    Book Appointment
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                )}
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Success Modal */}
      {showSuccessModal && doctorInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm mx-auto max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-3 sm:p-4 rounded-t-2xl sticky top-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-white bg-opacity-25 p-1.5 sm:p-2 rounded-full">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold">Appointment Confirmed!</h3>
                </div>
                <button 
                  onClick={closeSuccessModal} 
                  className="text-white hover:text-gray-200 transition-colors p-1.5 rounded-full hover:bg-white hover:bg-opacity-20"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
              <div className="text-center mb-3 sm:mb-4">
                <p className="text-sm sm:text-base text-gray-800 font-medium mb-2 sm:mb-3">
                  Your appointment has been successfully booked!
                </p>
                <div className="bg-blue-100 p-2.5 sm:p-3 rounded-lg border border-blue-300">
                  <p className="text-xs sm:text-sm text-blue-900 font-medium">
                    <span className="font-semibold">Doctor:</span> Dr. {doctorInfo.full_name}
                  </p>
                  <p className="text-xs sm:text-sm text-blue-900 mt-1">
                    <span className="font-semibold">Date:</span> {selectedDate ? format(selectedDate, "EEE, MMM d, yyyy") : ""}
                  </p>
                  <p className="text-xs sm:text-sm text-blue-900 mt-1">
                    <span className="font-semibold">Time:</span> {
                      Number(selectedTime.split(":")[0]) >= 12 
                      ? `${Number(selectedTime.split(":")[0]) === 12 ? 12 : Number(selectedTime.split(":")[0]) - 12}:${selectedTime.split(":")[1]} PM` 
                      : `${selectedTime} AM`
                    }
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              {doctorInfo.phoneNumber ? (
                <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-gray-100 rounded-lg border border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-2 text-center text-xs sm:text-sm">
                    Contact Dr. {doctorInfo.full_name}
                  </h4>
                  <p className="text-xs text-gray-700 text-center mb-2 sm:mb-3">
                    Phone: <span className="font-mono font-semibold text-blue-800">{doctorInfo.phoneNumber}</span>
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={handlePhoneCall}
                      className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-3 px-3 rounded-lg flex items-center justify-center gap-2 transition-all font-medium text-sm shadow-sm hover:shadow-md active:scale-95 min-h-[44px]"
                    >
                      <Phone className="h-4 w-4" />
                      Call Now
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white py-3 px-3 rounded-lg flex items-center justify-center gap-2 transition-all font-medium text-sm shadow-sm hover:shadow-md active:scale-95 min-h-[44px]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-amber-100 rounded-lg border border-amber-300">
                  <h4 className="font-semibold text-amber-900 mb-2 text-center text-xs sm:text-sm">
                    Contact Information
                  </h4>
                  <p className="text-xs text-amber-800 text-center">
                    Dr. {doctorInfo.full_name} will contact you directly to confirm your appointment.
                  </p>
                </div>
              )}

              {/* Instructions */}
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-3">
                  Dr. {doctorInfo.full_name} will contact you shortly to confirm your appointment.
                </p>
                <button
                  onClick={closeSuccessModal}
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2.5 px-5 rounded-lg transition-all font-medium text-sm shadow-sm hover:shadow-md active:scale-95 min-h-[44px]"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
