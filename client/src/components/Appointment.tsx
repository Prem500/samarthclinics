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
import { CalendarIcon, AlertCircle, Check, ArrowRight } from "lucide-react";
import { format, addDays } from "date-fns";
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
  // State variables
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // User information
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { isSignedIn, userId } = useAuth();

  // Fixed time for all appointments
  const DEFAULT_TIME = "10:00";

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
        `${import.meta.env.VITE_BACKEND_URL}/auth/${userId}`
      );
      if (response.data) {
        setFullName(response.data.full_name || "");
        setPhoneNumber(response.data.phoneNumber || "");
        setAge(response.data.age?.toString() || "");
        setAddress(response.data.address || "");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
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

    try {
      setIsSubmitting(true);

      const bookingData = {
        doctor: selectedDoctor,
        date: format(selectedDate as Date, "yyyy-MM-dd"),
        time: DEFAULT_TIME, // Using fixed time for all bookings
        // Include user ID only if authenticated
        ...(isSignedIn && userId ? { user: userId } : {}),
        // Include user details
        full_name: fullName,
        phoneNumber: phoneNumber,
        age: parseInt(age),
        address: address,
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
      if (!isSignedIn) {
        setFullName("");
        setPhoneNumber("");
        setAge("");
        setAddress("");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setErrorMessage("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 overflow-hidden">
      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="mb-4 sm:mb-6 bg-green-50 border-green-200 shadow-sm">
            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            <AlertTitle className="text-green-800 font-medium text-sm sm:text-base">
              Success
            </AlertTitle>
            <AlertDescription className="text-green-700 text-xs sm:text-sm">
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

                {/* Date confirmation */}
                {selectedDate && (
                  <div className="bg-[#f0f7fc] p-3 sm:p-4 rounded-lg flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#3a9efd] flex-shrink-0" />
                    <p className="truncate">
                      Selected date:{" "}
                      <span className="font-medium">
                        {format(selectedDate, "EEEE")}
                      </span>
                      , {format(selectedDate, "PPP")} at 10:00 AM
                    </p>
                  </div>
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
                        ? `${format(selectedDate, "PPP")} at 10:00 AM`
                        : "Please select a date"}
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
    </div>
  );
};

export default Appointment;
