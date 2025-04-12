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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { authAxios } from "@/lib/authUtils";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [issue, setIssue] = useState("");
  const [visitType, setVisitType] = useState<"clinic" | "home">("clinic");
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
  }, []);

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

    if (!isSignedIn) {
      toast("Please sign in", {
        description: "Please sign in to book an appointment.",
      });
      navigate("/sign-up");
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
      const response = await authAxios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking/create`,
        {
          doctor: selectedDoctor,
          date: format(selectedDate as Date, "yyyy-MM-dd"),
          time: selectedTime,
          user: userId,
          issue,
          visitType,
        }
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
    } catch (error) {
      console.error("Error booking appointment:", error);
      setErrorMessage("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl h-auto mx-auto  px-6">
      {successMessage && (
        <Alert className="mb-6 bg-green-50 border-green-200 shadow-sm">
          <AlertCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800 font-medium">
            Success
          </AlertTitle>
          <AlertDescription className="text-green-700">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert className="mb-6 bg-red-50 border-red-200 shadow-sm">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-800 font-medium">Error</AlertTitle>
          <AlertDescription className="text-red-700">
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            Appointment Details
          </CardTitle>
          <CardDescription className="text-base">
            Fill in the details to book your appointment with our specialists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <Label>Visit Type</Label>
                  <Select
                    value={visitType}
                    onValueChange={(value) =>
                      setVisitType(value as "clinic" | "home")
                    }
                    required
                  >
                    <SelectTrigger className="h-11 border-slate-300 hover:border-primary focus:ring-1 focus:ring-primary">
                      <SelectValue placeholder="Select where to visit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinic">Clinic Visit</SelectItem>
                      <SelectItem value="home">Home Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="doctor"
                    className="text-base mb-1.5 block font-medium"
                  >
                    Select Doctor
                  </Label>
                  <Select
                    value={selectedDoctor}
                    onValueChange={setSelectedDoctor}
                    required
                  >
                    <SelectTrigger className="h-11 border-slate-300 hover:border-primary focus:ring-1 focus:ring-primary">
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor: any) => (
                        <SelectItem key={doctor._id} value={doctor._id}>
                          {doctor.full_name || "undefined"} - {doctor.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base mb-1.5 block font-medium">
                    Select Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-11 border-slate-300 hover:border-primary",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-3 h-5 w-5" />
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 shadow-md border border-slate-200">
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
                        className="rounded-md checked:text-white!important hover:shadow-md"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-base mb-1.5 block font-medium">
                    Select Time
                  </Label>
                  <Select
                    value={selectedTime}
                    onValueChange={setSelectedTime}
                    disabled={!selectedDate}
                    required
                  >
                    <SelectTrigger className="h-11 border-slate-300 hover:border-primary focus:ring-1 focus:ring-primary">
                      <SelectValue placeholder="Select time slot">
                        {selectedTime ? (
                          <div className="flex items-center">
                            <Clock className="mr-3 h-5 w-5" />
                            {selectedTime}
                          </div>
                        ) : (
                          "Select time slot"
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedDoctor &&
                    selectedDate &&
                    selectedTime &&
                    !isSlotAvailable && (
                      <p className="text-red-600 text-sm mt-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        This slot is already booked. Please select another time.
                      </p>
                    )}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label
                    htmlFor="issue"
                    className="text-base mb-1.5 block font-medium"
                  >
                    Describe Your Issue
                  </Label>
                  <Textarea
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Briefly describe your condition or reason for the appointment"
                    rows={8}
                    className="min-h-[200px] resize-none border-slate-300 hover:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 h-12 text-base font-medium transition-all hover:shadow-md"
              disabled={
                isSubmitting ||
                !isSlotAvailable ||
                !selectedDoctor ||
                !selectedDate ||
                !selectedTime
              }
            >
              {isSubmitting ? "Processing..." : "Book Appointment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;
