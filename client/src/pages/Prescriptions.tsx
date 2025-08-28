import React, { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "sonner";
import { useSearchParams } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import {
  CalendarIcon,
  CopyIcon,
  ShareIcon,
  FileTextIcon,
  PlusCircleIcon,
  XCircleIcon,
  ClipboardCheckIcon,
  SearchIcon,
  PrinterIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "../components/ui/calendar";
import { cn } from "../lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { fetchAppointmentId } from "@/lib/handler";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface Patient {
  _id: string;
  full_name: string;
  email: string;
  phoneNumber?: string;
  appointmentCount: number;
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentStatus?: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Prescription {
  _id: string;
  prescriptionText: string;
  medications: Medication[];
  diagnosis: string;
  patient: {
    _id: string;
    full_name: string;
    email: string;
  };
  doctor: {
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
  physicalExaminer?: {
    _id: string;
    full_name: string;
  } | null;
  investigation?: string;
  vitals?: string;
  complaints?: string;
  tests?: string;
  appointment?: string;
}

const DEFAULT_MEDICATION: Medication = {
  name: "",
  dosage: "",
  frequency: "",
  duration: "",
  instructions: "",
};

const Prescriptions = () => {
  const [searchParams] = useSearchParams();
  const [_doctors, setDoctors] = useState<any[]>([]);
  const [physicalExaminer, setPhysicalExaminer] = useState<string>("");
  const [investigation, setInvestigation] = useState<string>("");
  const [_patients, setPatients] = useState<Patient[]>([]);
  const [vitals, setVitals] = useState<string>("");
  const [complaints, setComplaints] = useState<string>("");
  const [tests, setTests] = useState<string>("");
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<
    Prescription[]
  >([]);
  const [loading, setLoading] = useState(true);
  

  
  // Get URL parameters for pre-populating patient data
  const patientIdFromUrl = searchParams.get("patientId");
  const patientNameFromUrl = searchParams.get("patientName");
  const patientEmailFromUrl = searchParams.get("patientEmail");
  const patientPhoneFromUrl = searchParams.get("patientPhone");
  const patientAgeFromUrl = searchParams.get("patientAge");
  const patientAddressFromUrl = searchParams.get("patientAddress");
  const appointmentIdFromUrl = searchParams.get("appointmentId");
  const doctorIdFromUrl = searchParams.get("doctorId");
  const editPrescriptionId = searchParams.get("edit");
  
  // Debug URL parameters when edit mode is detected
  if (editPrescriptionId) {
    console.log("=== URL PARAMETERS FOR EDIT ===");
    console.log("editPrescriptionId from URL:", editPrescriptionId);
    console.log("patientIdFromUrl:", patientIdFromUrl);
    console.log("doctorIdFromUrl:", doctorIdFromUrl);
    console.log("Current URL:", window.location.href);
    console.log("All search params:", Object.fromEntries(searchParams));
  }
  

  const [prescriptionText, setPrescriptionText] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [patientHistory, setPatientHistory] = useState<string>("");
  const [treatmentPlan, setTreatmentPlan] = useState<string>("");
  const [medications, setMedications] = useState<Medication[]>([
    DEFAULT_MEDICATION,
  ]);
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(undefined);
  const [shareableUrl, setShareableUrl] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [patientPrescriptions, setPatientPrescriptions] = useState<Prescription[]>([]);
  const [loadingPatientHistory, setLoadingPatientHistory] = useState(false);

  const { userId } = useAuth();
  const isLoaded = true; // Since our authentication state is immediately available

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get token from local storage - add this to ensure auth
        const token = localStorage.getItem("token");

        if (!token) {
          toast("Authentication Error", {
            description: "You need to be logged in to access this page.",
          });
          setLoading(false);
          return;
        }

        // Configure axios with authorization headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [patientsRes, prescriptionsRes] = await Promise.all([
          await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/prescription/${userId}/patients-with-appointments`,
            config
          ),
          await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}`,
            config
          ),
        ]);
        
        // Make sure we get the doctor's name for display
        if (!localStorage.getItem("fullName")) {
          try {
            const doctorRes = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/auth/${userId}`,
              config
            );
            if (doctorRes.data && doctorRes.data.full_name) {
              localStorage.setItem("fullName", doctorRes.data.full_name);
            }
          } catch (err) {
            console.error("Could not fetch doctor name:", err);
          }
        }

        // Check if valid data was returned
        if (patientsRes.data && Array.isArray(patientsRes.data)) {
          setPatients(patientsRes.data);
        } else {
          console.error("Invalid patients data format:", patientsRes.data);
          setPatients([]);
        }

        if (prescriptionsRes.data && Array.isArray(prescriptionsRes.data)) {
          console.log("=== LOADED PRESCRIPTIONS ===");
          console.log("Number of prescriptions:", prescriptionsRes.data.length);
          console.log("Prescriptions data:", prescriptionsRes.data);
          prescriptionsRes.data.forEach((prescription, index) => {
            console.log(`Prescription ${index + 1}:`, {
              id: prescription._id,
              patient: prescription.patient,
              doctor: prescription.doctor,
              dateIssued: prescription.dateIssued
            });
          });
          
          setPrescriptions(prescriptionsRes.data);
          setFilteredPrescriptions(prescriptionsRes.data);
        } else {
          console.error(
            "Invalid prescriptions data format:",
            prescriptionsRes.data
          );
          setPrescriptions([]);
          setFilteredPrescriptions([]);
        }

        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error);

        // More detailed error handling
        if (error.response) {
          if (error.response.status === 401) {
            toast("Authentication Error", {
              description: "Your session has expired. Please log in again.",
            });
          } else if (error.response.status === 403) {
            toast("Permission Error", {
              description: "You don't have permission to access this resource.",
            });
          } else {
            toast("Error", {
              description: `Failed to load data: ${
                error.response.data?.message || "Unknown error"
              }`,
            });
          }
        } else {
          toast("Connection Error", {
            description:
              "Failed to connect to the server. Please check your internet connection.",
          });
        }

        setLoading(false);
      }
    };

    if (isLoaded && userId) {
      fetchData();
    }
  }, [userId, isLoaded]);

  // Fetch doctors for physical examiner dropdown
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/role/doctors`
        );

        if (response.data && Array.isArray(response.data)) {
          setDoctors(response.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    if (isLoaded) {
      fetchDoctors();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPrescriptions(prescriptions);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = prescriptions.filter(
        (prescription) =>
          prescription.patient.full_name
            .toLowerCase()
            .includes(lowerCaseSearch) ||
          prescription.diagnosis?.toLowerCase().includes(lowerCaseSearch) ||
          prescription.prescriptionText?.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredPrescriptions(filtered);
    }
  }, [searchTerm, prescriptions]);

  // Save patient details from URL parameters
  useEffect(() => {
    // Check if we have at least patient name
    if (patientNameFromUrl) {
      // Save patient details from URL parameters - this is crucial for the printout
      const patientDetails = {
        _id: patientIdFromUrl || `temp-${Date.now()}`,
        full_name: patientNameFromUrl || "",
        email: patientEmailFromUrl || "",
        phoneNumber: patientPhoneFromUrl || "",
        age: patientAgeFromUrl || "",
        address: patientAddressFromUrl || ""
      };
      
      // Save these details to localStorage for use in prescription
      localStorage.setItem('currentPatientDetails', JSON.stringify(patientDetails));
    }
  }, [patientNameFromUrl, patientIdFromUrl, patientEmailFromUrl, patientPhoneFromUrl, patientAgeFromUrl, patientAddressFromUrl]);

  // Fetch patient prescription history when patient is pre-selected from URL
  useEffect(() => {
    if (patientIdFromUrl && !loading) {
      fetchPatientPrescriptionHistory(patientIdFromUrl);
      
      // Only try to fetch more details if we're missing key information
      if (!patientNameFromUrl || !patientEmailFromUrl) {
        const fetchPatientDetails = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) return;
            
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            
            // Try different API endpoints until we find one that works
            try {
              const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/user/${patientIdFromUrl}`,
                config
              );
              
              if (response.data) {
                // Merge with existing patient details
                const localPatientDetails = JSON.parse(localStorage.getItem('currentPatientDetails') || '{}');
                const mergedData = {...localPatientDetails, ...response.data};
                localStorage.setItem('currentPatientDetails', JSON.stringify(mergedData));
              }
            } catch (e) {
              // Attempt alternative endpoint - but don't log errors  
              try {
                const response = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/auth/${patientIdFromUrl}`,
                  config
                );
                
                if (response.data) {
                  // Merge with existing patient details
                  const localPatientDetails = JSON.parse(localStorage.getItem('currentPatientDetails') || '{}');
                  const mergedData = {...localPatientDetails, ...response.data};
                  localStorage.setItem('currentPatientDetails', JSON.stringify(mergedData));
                }
              } catch (e2) {
                // If all attempts fail, we still have the URL parameters
              }
            }
          } catch (error) {
            // Silently continue with URL parameter data
          }
        };
        
        fetchPatientDetails();
      }
    }
  }, [patientIdFromUrl, patientNameFromUrl, patientEmailFromUrl, patientPhoneFromUrl, patientAgeFromUrl, patientAddressFromUrl, loading]);

  // Load existing prescription data when in edit mode
  useEffect(() => {
    const fetchPrescriptionForEdit = async () => {
      if (!editPrescriptionId) return;
      
      console.log("=== EDITING PRESCRIPTION ===");
      console.log("Edit Prescription ID:", editPrescriptionId);
      console.log("Edit Prescription ID type:", typeof editPrescriptionId);
      console.log("Edit Prescription ID length:", editPrescriptionId.length);
      console.log("Current User ID:", userId);
      console.log("Doctor ID from URL:", doctorIdFromUrl);
      console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
      console.log("Is valid ObjectId format:", /^[0-9a-fA-F]{24}$/.test(editPrescriptionId));
      
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          console.log("No token found");
          toast("Authentication Error", {
            description: "You need to be logged in to access this page.",
          });
          setLoading(false);
          return;
        }
        
        // Test basic connectivity to backend
        console.log("Testing backend connectivity...");
        try {
          const healthCheck = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/health`).catch(() => {
            console.log("Health check endpoint not available, continuing anyway...");
          });
          if (healthCheck) {
            console.log("Backend is reachable");
          }
        } catch (e) {
          console.log("Backend connectivity test failed, but continuing...");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch the specific prescription by ID
        // Use correct endpoint with auth token
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/prescription/single/${editPrescriptionId}`;
        console.log("Fetching prescription from:", apiUrl);
        console.log("Config headers:", config.headers);
        
        // Try direct approach first with proper auth
        let response;
        try {
          response = await axios.get(apiUrl, config);
          console.log("Direct API call successful!");
          console.log("Response status:", response.status);
          console.log("Response data:", response.data);
        } catch (directError) {
          console.log("Direct approach failed:", directError);
          console.log("Error status:", (directError as any).response?.status);
          console.log("Error details:", (directError as any).response?.data || (directError as Error).message);
          
          // If the single prescription endpoint failed, try fallback approach
          if ((directError as any).response?.status === 404) {
            console.log("Prescription not found via single endpoint, trying fallback...");
            
            try {
              const allPrescriptionsResponse = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}`,
                config
              );
              
              console.log("Fallback response status:", allPrescriptionsResponse.status);
              
              if (allPrescriptionsResponse.data && Array.isArray(allPrescriptionsResponse.data)) {
                const foundPrescription = allPrescriptionsResponse.data.find(
                  p => p._id?.toString() === editPrescriptionId
                );
                
                if (foundPrescription) {
                  console.log("Found prescription via fallback:", foundPrescription._id);
                  response = { data: foundPrescription, status: 200 };
                } else {
                  console.log("Prescription not found in doctor's prescriptions");
                  throw new Error("The prescription you're trying to edit was not found. It may have been deleted or you may not have permission to edit it.");
                }
              } else {
                throw new Error("Unable to retrieve prescriptions list");
              }
            } catch (fallbackError) {
              console.log("Fallback approach also failed:", fallbackError);
              throw new Error("Unable to load prescription for editing. Please try again or contact support.");
            }
          } else {
            // For other errors (network, auth, etc.), throw the original error
            throw directError;
          }
        }

        const prescriptionData = response.data;
        
        // Try to fetch detailed patient info (optional - don't fail if this doesn't work)
        if (prescriptionData?.patient?._id) {
          try {
            console.log("Attempting to fetch patient details...");
            const patientResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/auth/${prescriptionData.patient._id}`,
              config
            );
            // Store detailed patient info for use in the prescription
            if (patientResponse.data) {
              console.log("Patient details fetched successfully");
              localStorage.setItem('currentPatientDetails', JSON.stringify(patientResponse.data));
            }
          } catch (patientError) {
            console.log("Could not fetch additional patient details, continuing with prescription data:", patientError);
            // Store basic patient info from prescription instead
            if (prescriptionData.patient) {
              console.log("Using patient data from prescription");
              localStorage.setItem('currentPatientDetails', JSON.stringify(prescriptionData.patient));
            }
          }
        }
        
        if (prescriptionData) {
          // Populate all form fields with existing data
          setPrescriptionText(prescriptionData.prescriptionText || "");
          setDiagnosis(prescriptionData.diagnosis || "");
          setNotes(prescriptionData.notes || "");
          setPatientHistory(prescriptionData.patientHistory || "");
          setTreatmentPlan(prescriptionData.treatmentPlan || "");
          setMedications(prescriptionData.medications?.length > 0 
            ? prescriptionData.medications 
            : [DEFAULT_MEDICATION]);
          setPaymentAmount(prescriptionData.paymentAmount ? prescriptionData.paymentAmount.toString() : "");
          setPhysicalExaminer(prescriptionData.physicalExaminer?._id || "");
          setInvestigation(prescriptionData.investigation || "");
          setVitals(prescriptionData.vitals || "");
          setComplaints(prescriptionData.complaints || "");
          setTests(prescriptionData.tests || "");
          
          // Handle dates
          if (prescriptionData.expiryDate) {
            setExpiryDate(new Date(prescriptionData.expiryDate));
          }
          
          if (prescriptionData.followUpDate) {
            setFollowUpDate(new Date(prescriptionData.followUpDate));
          }

          toast("Prescription loaded for editing", {
            description: "You can now update the prescription details.",
          });
        }
      } catch (error: any) {
        console.error("Error fetching prescription for edit:", error);
        console.error("Error response:", error.response);
        console.error("Error config:", error.config);
        
        let errorMessage = "Failed to load prescription for editing. Please try again.";
        
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = "Prescription not found. It may have been deleted.";
          } else if (error.response.status === 401) {
            errorMessage = "Authentication error. Please log in again.";
          } else if (error.response.data?.details) {
            errorMessage = `Error: ${error.response.data.details}`;
          } else if (error.response.data?.message) {
            errorMessage = `Error: ${error.response.data.message}`;
          }
        } else if (error.message && error.message.includes("Network Error")) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (error.message) {
          errorMessage = `Error: ${error.message}`;
        }
        
        toast("Error", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    if (editPrescriptionId) {
      fetchPrescriptionForEdit();
    }
  }, [editPrescriptionId]);



  const handleAddMedication = () => {
    setMedications([...medications, { ...DEFAULT_MEDICATION }]);
  };

  const handleRemoveMedication = (index: number) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  const handleMedicationChange = (
    index: number,
    field: keyof Medication,
    value: string
  ) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value,
    };
    setMedications(updatedMedications);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for patient name or ID from URL - if either exists, we can proceed
    if (!patientIdFromUrl && !patientNameFromUrl) {
      toast("Validation Error", {
        description: "No patient selected. Please go back to the dashboard and click 'Write Prescription' on a specific appointment.",
      });
      return;
    }
    
    // Use patientId if available, otherwise let the server handle patient creation from patient details
    const effectivePatientId = patientIdFromUrl;

    // Only validate medications that have a name entered
    if (medications.length > 0) {
      // Filter out empty medication entries first
      const namedMedications = medications.filter(med => med.name.trim() !== "");
      
      // No validation needed if all medications are empty
      if (namedMedications.length === 0) {
        // Continue with empty medications array
      }
    }

    // Filter out empty medications and ensure all fields are strings
    const validMedications = medications
      .filter((med) => med.name && med.name.trim() !== "")
      .map((med) => ({
        name: med.name.trim(),
        dosage: med.dosage?.trim() || "",
        frequency: med.frequency?.trim() || "",
        duration: med.duration?.trim() || "",
        instructions: med.instructions?.trim() || "",
      }));

    // Require either prescription text or at least one medication
    if (!prescriptionText && validMedications.length === 0) {
      toast("Validation Error", {
        description:
          "Please enter either prescription text or at least one medication.",
      });
      return;
    }

    try {
      // Get token from local storage for authentication
      const token = localStorage.getItem("token");

      if (!token) {
        toast("Authentication Error", {
          description: "You need to be logged in to create prescriptions.",
        });
        return;
      }

      // Configure axios with authorization headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Use appointmentId from URL if available
      let appointmentId = appointmentIdFromUrl;
      
      // Only try to fetch appointment ID if we have a valid patient ID (not a temp one)
      if (!appointmentId && !editPrescriptionId && patientIdFromUrl && patientIdFromUrl.indexOf('temp-') !== 0) {
        try {
          appointmentId = await fetchAppointmentId(userId!, patientIdFromUrl);
        } catch (err) {
          console.log("Could not fetch appointment ID, continuing without it");
          // Continue without appointment ID
        }
      }

      let savedResponse;
      
      try {
        // If we're editing an existing prescription
        if (editPrescriptionId) {
          // Update existing prescription - match the server endpoint format
          console.log("Updating prescription with ID:", editPrescriptionId);
          console.log("URL format:", `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}/update/${editPrescriptionId}`);
          console.log("Doctor ID:", userId);
          
          // Use the current user's ID for the update endpoint (backend now allows any doctor to edit)
          savedResponse = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}/update/${editPrescriptionId}`,
            {
              prescriptionText: prescriptionText || "",
              medications: validMedications,
              diagnosis: diagnosis || "",
              notes: notes || "",
              patientHistory: patientHistory || "",
              treatmentPlan: treatmentPlan || "",
              paymentAmount: paymentAmount ? parseFloat(paymentAmount) : null,
              expiryDate: expiryDate ? expiryDate.toISOString() : null,
              followUpDate: followUpDate ? followUpDate.toISOString() : null,
              physicalExaminer: physicalExaminer || null,
              investigation: investigation || "",
              vitals: vitals || "",
              complaints: complaints || "",
              tests: tests || "",
            },
            config
          );
          
          if (savedResponse && savedResponse.status === 200) {
            toast("Success", {
              description: "Prescription updated successfully!",
            });
          }
        } else {
          // Create new prescription - using the correct endpoint format from backend
          console.log("Creating prescription with endpoint: /prescription/create/" + userId);
          
          // Exactly match the fields used in createPrescription controller
          const serverData = {
            patientId: effectivePatientId,
            prescriptionText: prescriptionText || "",
            medications: validMedications,
            diagnosis: diagnosis || "",
            notes: notes || "",
            patientHistory: patientHistory || "",
            treatmentPlan: treatmentPlan || "",
            paymentAmount: paymentAmount ? parseFloat(paymentAmount) : null,
            expiryDate: expiryDate ? expiryDate.toISOString() : null,
            followUpDate: followUpDate ? followUpDate.toISOString() : null,
            appointmentId: appointmentIdFromUrl || appointmentId || null,
            physicalExaminer: physicalExaminer || null,
            investigation: investigation || "",
            vitals: vitals || "",
            complaints: complaints || "",
            tests: tests || "",
            doctorId: doctorIdFromUrl || userId, // Make sure the doctor ID is properly passed
            // Patient details for creating user record if needed
            patientName: patientNameFromUrl || "",
            patientEmail: patientEmailFromUrl || "",
            patientPhone: patientPhoneFromUrl || "",
            patientAge: patientAgeFromUrl || "",
            patientAddress: patientAddressFromUrl || "",
          };
          
          savedResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/prescription/create/${userId}`,
            serverData,
            config
          );
          
          // Only show success message here if we get a valid response
          if (savedResponse && savedResponse.status === 201) {
            toast("Success", {
              description: "Prescription created successfully!",
            });
          }
        }
        
        // Set the shareable URL if provided in response
        if (savedResponse && savedResponse.data && savedResponse.data.shareableUrl) {
          setShareableUrl(window.location.origin + savedResponse.data.shareableUrl);
        } else if (savedResponse && savedResponse.data && savedResponse.data.shareableId) {
          setShareableUrl(window.location.origin + `/prescription/share/${savedResponse.data.shareableId}`);
        }
        
        // Reset form
        setPrescriptionText("");
        setDiagnosis("");
        setNotes("");
        setPatientHistory("");
        setTreatmentPlan("");
        setMedications([DEFAULT_MEDICATION]);
        setPaymentAmount("");
        setExpiryDate(undefined);
        setFollowUpDate(undefined);
        setVitals("");
        setComplaints("");
        setTests("");

        // Clear URL parameters after successful operation
        window.history.replaceState({}, document.title, "/prescriptions");

        // Refresh prescriptions list with auth token
        const updatedPrescriptions = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}`,
          config
        );
        setPrescriptions(updatedPrescriptions.data);
        setFilteredPrescriptions(updatedPrescriptions.data);
        
      } catch (apiError) {
        console.error("API call failed:", apiError);
        throw apiError; // Re-throw for the outer catch block to handle
      }
    } catch (error: any) {
      console.error(`Error ${editPrescriptionId ? 'updating' : 'creating'} prescription:`, error);
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      console.error("Error request:", error.request);
      console.error("Error config:", error.config);
      
      // Log important data to help debug API calls
      if (editPrescriptionId) {
        console.log("Update API URL:", `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}/update/${editPrescriptionId}`);
        console.log("Current User ID (Doctor):", userId);
        console.log("Prescription ID:", editPrescriptionId);
        console.log("Update request data:", {
          prescriptionText: prescriptionText || "",
          medications: validMedications,
          diagnosis: diagnosis || "",
          notes: notes || ""
        });
      }

      // Improved error handling with more detailed messages
      if (error.response) {
        if (error.response.status === 401) {
          toast("Authentication Error", {
            description: "Your session has expired. Please log in again.",
          });
        } else if (error.response.status === 403) {
          toast("Permission Error", {
            description: `You don't have permission to ${editPrescriptionId ? 'update' : 'create'} prescriptions.`,
          });
        } else if (error.response.status === 400) {
          // Validation error
          toast("Validation Error", {
            description: error.response.data?.details || "Please check the prescription form fields.",
          });
        } else if (error.response.status === 409) {
          // Conflict error
          toast("Conflict Error", {
            description: error.response.data?.details || "This prescription conflicts with an existing one.",
          });
        } else if (error.response.status === 404) {
          // Not found error
          toast("Not Found Error", {
            description: error.response.data?.details || error.response.data?.message || "The requested resource was not found.",
          });
        } else {
          // Any other server error
          toast("Error", {
            description: `Failed to ${editPrescriptionId ? 'update' : 'create'} prescription: ${
              error.response.data?.details || error.response.data?.message || "Unknown error"
            }`,
          });
        }
      } else {
        toast("Connection Error", {
          description:
            "Failed to connect to the server. Please check your internet connection.",
        });
      }
    }
  };

  const handlePrint = (prescription: Prescription) => {
    try {
      console.log("handlePrint called for prescription:", prescription?._id);
      setSelectedPrescription(prescription);
      setIsPrintDialogOpen(true);
    } catch (error) {
      console.error("Error in handlePrint:", error);
      // Show toast error instead of crashing
      toast("Error", {
        description: "Could not prepare prescription for printing. Please try again.",
      });
    }
  };

  const printPrescription = () => {
    try {
      console.log("printPrescription called, selectedPrescription:", selectedPrescription?._id);
      const printWindow = window.open("", "_blank");
      if (printWindow && selectedPrescription) {
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Physiotherapy Prescription</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .clinic-name { font-weight: bold; font-size: 24px; }
            .clinic-info { font-size: 14px; color: #555; }
            .doctor-info { margin-bottom: 10px; padding: 5px; background-color: #f0f7ff; border-radius: 5px; }
            .patient-info { margin-bottom: 20px; padding: 10px; background-color: #f9f9f9; border-radius: 5px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; margin-bottom: 5px; border-bottom: 1px solid #eee; padding-bottom: 3px; }
            .section-content { padding: 5px 0; }
            .medications { margin-bottom: 20px; }
            .med-table { width: 100%; border-collapse: collapse; }
            .med-table td, .med-table th { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            .signature-area { margin-top: 40px; display: flex; justify-content: flex-end; }
            .signature-line { width: 200px; border-top: 1px solid #000; text-align: center; padding-top: 5px; }
            .date { text-align: right; font-size: 14px; color: #555; }
            @media print {
              body { margin: 0; padding: 15px; }
              .no-print { display: none; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="clinic-name">Samarth Clinics</div>
              <div class="clinic-info">Physiotherapy & Rehabilitation</div>
            </div>
            <div class="date">Date: ${new Date(
              selectedPrescription.dateIssued
            ).toLocaleDateString()}</div>
          </div>
          
          <div class="doctor-info">
            <p><strong>Doctor:</strong> ${
              selectedPrescription.physicalExaminer ? `Dr. ${selectedPrescription.physicalExaminer.full_name}` : 
              selectedPrescription.doctor ? `Dr. ${selectedPrescription.doctor.full_name}` : "Dr. "
            }</p>
          </div>
          
          <div class="patient-info">
            <p><strong>Patient Name:</strong> ${
              selectedPrescription.patient?.full_name || "Unknown"
            }</p>
            <p><strong>Email:</strong> ${
              selectedPrescription.patient?.email || "Unknown"
            }</p>
            <p><strong>Phone:</strong> ${
              JSON.parse(localStorage.getItem('currentPatientDetails') || '{}').phoneNumber || 
              JSON.parse(localStorage.getItem('currentPatientDetails') || '{}').patientPhone || 
              "Not provided"
            }</p>
            <p><strong>Age:</strong> ${
              JSON.parse(localStorage.getItem('currentPatientDetails') || '{}').age || 
              JSON.parse(localStorage.getItem('currentPatientDetails') || '{}').patientAge || 
              "Not provided"
            }</p>
            <p><strong>Address:</strong> ${
              JSON.parse(localStorage.getItem('currentPatientDetails') || '{}').address || 
              JSON.parse(localStorage.getItem('currentPatientDetails') || '{}').patientAddress || 
              "Not provided"
            }</p>
          </div>
          
          ${
            selectedPrescription.vitals
              ? `<div class="section">
            <div class="section-title">Vitals</div>
            <div class="section-content">${selectedPrescription.vitals.replace(/\n/g, "<br>") || "Not specified"}</div>
          </div>`
              : ""
          }

          ${
            selectedPrescription.complaints
              ? `<div class="section">
            <div class="section-title">Complaints</div>
            <div class="section-content">${selectedPrescription.complaints.replace(/\n/g, "<br>") || "Not specified"}</div>
          </div>`
              : ""
          }

          ${
            selectedPrescription.tests
              ? `<div class="section">
            <div class="section-title">Tests</div>
            <div class="section-content">${selectedPrescription.tests.replace(/\n/g, "<br>") || "Not specified"}</div>
          </div>`
              : ""
          }
          
          <div class="section">
            <div class="section-title">Diagnosis</div>
            <div class="section-content">${selectedPrescription.diagnosis || "Not specified"}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Treatment Plan</div>
            <div class="section-content">${selectedPrescription.treatmentPlan ? selectedPrescription.treatmentPlan.replace(/\n/g, "<br>") : "Not specified"}</div>
          </div>
          
          ${
            selectedPrescription.medications &&
            selectedPrescription.medications.length > 0
              ? `<div class="section">
              <div class="section-title">Medications</div>
              <table class="med-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  ${selectedPrescription.medications
                    .map(
                      (med) => `
                    <tr>
                      <td>${med.name || "-"}</td>
                      <td>${med.dosage || "-"}</td>
                      <td>${med.frequency || "-"}</td>
                      <td>${med.duration || "-"}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>`
              : ""
          }
          
          ${
            selectedPrescription.prescriptionText
              ? `<div class="section">
            <div class="section-title">Additional Instructions</div>
            <div class="section-content">${selectedPrescription.prescriptionText.replace(/\n/g, "<br>")}</div>
          </div>`
              : ""
          }
          
          ${
            selectedPrescription.notes
              ? `<div class="section">
            <div class="section-title">Notes</div>
            <div class="section-content">${selectedPrescription.notes.replace(/\n/g, "<br>")}</div>
          </div>`
              : ""
          }
          
          <div class="section">
            <div class="section-title">Follow-up</div>
            <div class="section-content">${
            selectedPrescription.followUpDate
                ? `Follow-up on: ${new Date(selectedPrescription.followUpDate).toLocaleDateString()}`
                : "No follow-up scheduled"
            }</div>
          </div>
          
          <div class="signature-area">
            <div>
              <div class="signature-line">Doctor's Signature</div>
            </div>
          </div>
          
          <button class="no-print" onclick="window.print()">Print Prescription</button>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
    } else {
      console.error("Cannot open print window or no prescription selected");
      toast("Error", {
        description: "Could not open print window. Please try again.",
      });
    }

    setIsPrintDialogOpen(false);
  } catch (error) {
    console.error("Error in printPrescription:", error);
    toast("Error", {
      description: "Could not print prescription. Please try again.",
    });
    setIsPrintDialogOpen(false);
  }
};

  const copyShareableLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast("Link Copied", {
      description: "Shareable link copied to clipboard!",
    });
  };

  const handlePaymentUpdate = async (prescriptionId: string) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}/payment/${prescriptionId}`,
        {
          paymentStatus: "paid",
          paymentDate: new Date().toISOString(),
        },
        config
      );

      toast("Success", {
        description: "Payment status updated successfully!",
      });

      // Refresh prescriptions list
      const updatedPrescriptions = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}`,
        config
      );
      setPrescriptions(updatedPrescriptions.data);
      setFilteredPrescriptions(updatedPrescriptions.data);
    } catch (error: any) {
      console.error("Error updating payment status:", error);
      toast("Error", {
        description: "Failed to update payment status",
      });
    }
  };

  // Get patient details from localStorage instead of using this function
  // const getPatientDetails = (patientId: string) => {
  //   return patients.find((patient) => patient._id === patientId);
  // };

  const fetchPatientPrescriptionHistory = async (patientId: string) => {
    try {
      setLoadingPatientHistory(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/user/${patientId}`,
        config
      );

      if (response.data && Array.isArray(response.data)) {
        setPatientPrescriptions(response.data);
      } else {
        setPatientPrescriptions([]);
      }
    } catch (error) {
      console.error("Error fetching patient prescription history:", error);
      setPatientPrescriptions([]);
    } finally {
      setLoadingPatientHistory(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medical Prescriptions</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Back to Dashboard
          </Button>
          <Badge variant="outline" className="px-3 py-1 text-sm bg-blue-50">
            Doctor Portal
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="create" className="px-6">
            <FileTextIcon className="h-4 w-4 mr-2" />
            Create Prescription
          </TabsTrigger>
          <TabsTrigger value="view" className="px-6">
            <ClipboardCheckIcon className="h-4 w-4 mr-2" />
            Manage Prescriptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="text-2xl">
                {editPrescriptionId ? 'Edit Physiotherapy Prescription' : 'Physiotherapy Prescription'}
              </CardTitle>
              <CardDescription>
                {editPrescriptionId 
                  ? 'Update this prescription with any necessary changes'
                  : 'Create a simple prescription sheet with essential details'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {shareableUrl && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="font-semibold text-green-700 mb-2">
                    Prescription Created Successfully!
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-green-600 truncate flex-1">
                      {shareableUrl}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyShareableLink(shareableUrl)}
                    >
                      <CopyIcon className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(shareableUrl, "_blank")}
                    >
                      <ShareIcon className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-md border">
                  <h3 className="font-medium mb-3 text-slate-800">
                    Patient & Doctor Information
                  </h3>
                  {patientNameFromUrl ? (
                    <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-blue-700">
                        <strong>Patient:</strong> {patientNameFromUrl}
                        {appointmentIdFromUrl && (
                          <span className="ml-2 text-blue-600">
                            (Appointment ID: {appointmentIdFromUrl})
                          </span>
                        )}
                      </p>
                      
                      <p className="text-sm text-blue-700 mt-1">
                        <strong>Doctor:</strong> Dr. {localStorage.getItem("fullName") || ""}
                      </p>
                      
                      {/* Show all available patient details */}
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        {patientEmailFromUrl && (
                          <p className="text-blue-700"><strong>Email:</strong> {patientEmailFromUrl}</p>
                        )}
                        {patientPhoneFromUrl && (
                          <p className="text-blue-700"><strong>Phone:</strong> {patientPhoneFromUrl}</p>
                        )}
                        {patientAgeFromUrl && (
                          <p className="text-blue-700"><strong>Age:</strong> {patientAgeFromUrl}</p>
                        )}
                        {patientAddressFromUrl && (
                          <p className="text-blue-700"><strong>Address:</strong> {patientAddressFromUrl}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-700">
                        <strong>No patient selected.</strong> Please go back to the dashboard and click "Write Prescription" on a specific appointment.
                      </p>
                    </div>
                  )}

                  {/* Patient Prescription History */}
                  {patientIdFromUrl && (
                    <>
                      {loadingPatientHistory ? (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-600">Loading prescription history...</p>
                        </div>
                      ) : patientPrescriptions.length > 0 ? (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-slate-600 mb-2">
                            Previous Prescriptions ({patientPrescriptions.length})
                          </h5>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {patientPrescriptions.map((prescription) => (
                              <div
                                key={prescription._id}
                                className="p-2 bg-blue-50 border border-blue-200 rounded text-xs"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="font-medium">
                                      {new Date(prescription.dateIssued).toLocaleDateString()}
                                    </span>
                                    {prescription.diagnosis && (
                                      <span className="ml-2 text-blue-600">
                                        - {prescription.diagnosis}
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault(); // Prevent default browser behavior
                                      e.stopPropagation(); // Stop event bubbling
                                      console.log("View button clicked for prescription:", prescription._id);
                                      setSelectedPrescription(prescription);
                                      setIsPrintDialogOpen(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-800 text-xs"
                                  >
                                    View
                                  </button>
                                </div>
                                {prescription.prescriptionText && (
                                  <p className="mt-1 text-gray-600 line-clamp-2">
                                    {prescription.prescriptionText}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-600">No previous prescriptions found for this patient.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Vitals Section */}
                <div className="bg-slate-50 p-4 rounded-md border mt-4">
                  <h3 className="font-medium mb-3 text-slate-800">
                    Vitals
                  </h3>
                  <div className="space-y-2">
                    <Textarea
                      id="vitals"
                      value={vitals}
                      onChange={(e) => setVitals(e.target.value)}
                      placeholder="Enter patient vitals (bp, diabetes, etc)..."
                      className="min-h-[60px]"
                    />
                  </div>
                </div>

                <div className="p-6 bg-white border-2 border-gray-200 rounded-md shadow-sm">
                  <div className="flex justify-between border-b pb-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Physiotherapy Prescription</h3>
                      <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold">Samarth Clinics</h3>
                      <p className="text-sm text-gray-500">Physiotherapy & Rehabilitation</p>
                    </div>
                  </div>

                  {/* Main Prescription Content */}
                  <div className="space-y-4">
                    {/* Complaints Section */}
                    <div className="space-y-2">
                      <Label htmlFor="complaints" className="text-base font-semibold">Complaints</Label>
                      <Textarea
                        id="complaints"
                        value={complaints}
                        onChange={(e) => setComplaints(e.target.value)}
                        placeholder="Enter patient complaints..."
                        className="min-h-[80px]"
                      />
                    </div>

                    {/* Tests Section */}
                    <div className="space-y-2">
                      <Label htmlFor="tests" className="text-base font-semibold">Tests</Label>
                      <Textarea
                        id="tests"
                        value={tests}
                        onChange={(e) => setTests(e.target.value)}
                        placeholder="Enter patient tests..."
                        className="min-h-[80px]"
                      />
                    </div>
                    
                    {/* Diagnosis Section */}
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis" className="text-base font-semibold">Diagnosis</Label>
                      <Textarea
                        id="diagnosis"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        placeholder="Enter patient diagnosis..."
                        className="min-h-[80px]"
                      />
                    </div>

                    {/* Treatment Plan */}
                    <div className="space-y-2">
                      <Label htmlFor="treatmentPlan" className="text-base font-semibold">Treatment Plan</Label>
                      <Textarea
                        id="treatmentPlan"
                        value={treatmentPlan}
                        onChange={(e) => setTreatmentPlan(e.target.value)}
                        placeholder="Enter treatment plan details, recommended physical therapy exercises, etc."
                        className="min-h-[100px]"
                      />
                    </div>

                    {/* Medications - Simplified */}
                    <div>
                      <Label className="text-base font-semibold mb-2 block">Medications</Label>
                      {medications.map((medication, index) => (
                        <div key={index} className="mb-3 p-3 border rounded-md relative flex flex-wrap items-center gap-2">
                          <Input
                            className="flex-1 min-w-[200px]"
                            value={medication.name}
                            onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                            placeholder="Medication name"
                          />
                          <Input
                            className="w-[120px]"
                            value={medication.dosage}
                            onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                            placeholder="Dosage"
                          />
                          <Input
                            className="w-[150px]"
                            value={medication.frequency}
                            onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)}
                            placeholder="Frequency"
                          />
                          <Input
                            className="w-[120px]"
                            value={medication.duration}
                            onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
                            placeholder="Duration"
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveMedication(index)}
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddMedication}
                        className="mt-1"
                        size="sm"
                      >
                        <PlusCircleIcon className="h-4 w-4 mr-1" />
                        Add Medication
                      </Button>
                    </div>

                    {/* Additional Prescription Text */}
                    <div className="space-y-2">
                      <Label htmlFor="prescription" className="text-base font-semibold">Additional Instructions</Label>
                      <Textarea
                        id="prescription"
                        value={prescriptionText}
                        onChange={(e) => setPrescriptionText(e.target.value)}
                        placeholder="Enter any additional prescription details..."
                        className="min-h-[80px]"
                      />
                    </div>

                    {/* Notes Section */}
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-base font-semibold">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Additional notes or instructions..."
                        className="min-h-[80px]"
                      />
                    </div>

                    {/* Bottom Section - Follow-up and Payment in a single row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                      <div>
                        <Label htmlFor="followUp" className="text-sm font-medium block mb-2">Follow-up Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full md:w-[200px] justify-start text-left font-normal",
                                !followUpDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {followUpDate
                                ? format(followUpDate, "PPP")
                                : "Schedule follow-up"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={followUpDate}
                              onSelect={setFollowUpDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="text-right">
                        <Label htmlFor="payment" className="text-sm font-medium block mb-2">Payment Amount</Label>
                        <div className="relative inline-block w-[150px]">
                          <span className="absolute left-3 top-2.5">₹</span>
                          <Input
                            id="payment"
                            type="number"
                            step="0.01"
                            min="0"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            placeholder="0.00"
                            className="pl-7"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Doctor Signature Line */}
                    <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end">
                      <div className="text-center w-[200px]">
                        <div className="border-b border-black mb-1 h-8"></div>
                        <p className="text-sm">Doctor's Signature</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button type="submit" className="w-full md:w-auto">
                    {editPrescriptionId ? 'Update Prescription' : 'Create Prescription'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <Card className="border-t-4 border-t-blue-500 mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="text-2xl">Prescription Records</CardTitle>
                <div className="relative w-full md:w-64">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search prescriptions..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-4">Loading prescriptions...</p>
              ) : filteredPrescriptions.length === 0 ? (
                <div className="text-center py-10 border rounded-md bg-slate-50">
                  <p className="text-gray-500">No prescriptions found</p>
                  {searchTerm && (
                    <p className="text-sm text-gray-400 mt-1">
                      Try a different search term or clear your search
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Issued Date</TableHead>
                          <TableHead>Diagnosis</TableHead>
                          <TableHead>Follow-up</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPrescriptions.map((prescription) => (
                          <TableRow key={prescription._id}>
                            <TableCell className="font-medium">
                              {prescription.patient.full_name}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                prescription.dateIssued
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {prescription.diagnosis
                                ? prescription.diagnosis.length > 30
                                  ? `${prescription.diagnosis.substring(
                                      0,
                                      30
                                    )}...`
                                  : prescription.diagnosis
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {prescription.followUpDate
                                ? new Date(
                                    prescription.followUpDate
                                  ).toLocaleDateString()
                                : "-"}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  prescription.paymentStatus === "paid"
                                    ? "default"
                                    : "outline"
                                }
                              >
                                {prescription.paymentStatus === "paid"
                                  ? "Paid"
                                  : "Pending"}
                              </Badge>
                              {prescription.paymentAmount && (
                                <span className="ml-2 text-sm">
                                  ₹{prescription.paymentAmount}
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log("Print button clicked for:", prescription._id);
                                    handlePrint(prescription);
                                  }}
                                >
                                  <PrinterIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    copyShareableLink(
                                      window.location.origin +
                                        `/prescription/share/${prescription.shareableId}`
                                    )
                                  }
                                >
                                  <CopyIcon className="h-4 w-4" />
                                </Button>
                                {prescription.paymentStatus === "pending" && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handlePaymentUpdate(prescription._id)
                                    }
                                    className="text-green-600 hover:text-green-800"
                                  >
                                    <svg
                                      className="h-4 w-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </Button>
                                )}
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log("View details clicked");
                                      }}
                                    >
                                      <SearchIcon className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Prescription Details
                                      </DialogTitle>
                                      <DialogDescription>
                                        Issued on:{" "}
                                        {new Date(
                                          prescription.dateIssued
                                        ).toLocaleDateString()}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md bg-slate-50">
                                        <div>
                                          <h4 className="font-medium mb-1">
                                            Patient
                                          </h4>
                                          <p>
                                            {prescription.patient.full_name}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {prescription.patient.email}
                                          </p>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-1">
                                            Date Information
                                          </h4>
                                          <p>
                                            <span className="text-sm text-gray-500">
                                              Created:
                                            </span>{" "}
                                            {new Date(
                                              prescription.dateIssued
                                            ).toLocaleDateString()}
                                          </p>
                                          {prescription.expiryDate && (
                                            <p>
                                              <span className="text-sm text-gray-500">
                                                Valid until:
                                              </span>{" "}
                                              {new Date(
                                                prescription.expiryDate
                                              ).toLocaleDateString()}
                                            </p>
                                          )}
                                          {prescription.followUpDate && (
                                            <p>
                                              <span className="text-sm text-gray-500">
                                                Follow-up:
                                              </span>{" "}
                                              {new Date(
                                                prescription.followUpDate
                                              ).toLocaleDateString()}
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      {prescription.vitals && (
                                        <div>
                                          <h4 className="font-medium">
                                            Vitals
                                          </h4>
                                          <p className="mt-1 p-3 border rounded whitespace-pre-line">
                                            {prescription.vitals}
                                          </p>
                                        </div>
                                      )}

                                      {prescription.complaints && (
                                        <div>
                                          <h4 className="font-medium">
                                            Complaints
                                          </h4>
                                          <p className="mt-1 p-3 border rounded whitespace-pre-line">
                                            {prescription.complaints}
                                          </p>
                                        </div>
                                      )}

                                      {prescription.tests && (
                                        <div>
                                          <h4 className="font-medium">
                                            Tests
                                          </h4>
                                          <p className="mt-1 p-3 border rounded whitespace-pre-line">
                                            {prescription.tests}
                                          </p>
                                        </div>
                                      )}

                                      {prescription.diagnosis && (
                                        <div>
                                          <h4 className="font-medium">
                                            Diagnosis
                                          </h4>
                                          <p className="mt-1 p-3 border rounded">
                                            {prescription.diagnosis}
                                          </p>
                                        </div>
                                      )}

                                      {prescription.medications &&
                                        prescription.medications.length > 0 && (
                                          <div>
                                            <h4 className="font-medium mb-2">
                                              Medications
                                            </h4>
                                            <div className="border rounded overflow-x-auto">
                                              <Table>
                                                <TableHeader>
                                                  <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>
                                                      Dosage
                                                    </TableHead>
                                                    <TableHead>
                                                      Frequency
                                                    </TableHead>
                                                    <TableHead>
                                                      Duration
                                                    </TableHead>
                                                    <TableHead>
                                                      Instructions
                                                    </TableHead>
                                                  </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                  {prescription.medications.map(
                                                    (med, index) => (
                                                      <TableRow key={index}>
                                                        <TableCell>
                                                          {med.name}
                                                        </TableCell>
                                                        <TableCell>
                                                          {med.dosage}
                                                        </TableCell>
                                                        <TableCell>
                                                          {med.frequency}
                                                        </TableCell>
                                                        <TableCell>
                                                          {med.duration}
                                                        </TableCell>
                                                        <TableCell>
                                                          {med.instructions ||
                                                            "-"}
                                                        </TableCell>
                                                      </TableRow>
                                                    )
                                                  )}
                                                </TableBody>
                                              </Table>
                                            </div>
                                          </div>
                                        )}

                                      {prescription.prescriptionText && (
                                        <div>
                                          <h4 className="font-medium">
                                            Prescription Text
                                          </h4>
                                          <p className="mt-1 p-3 border rounded whitespace-pre-line">
                                            {prescription.prescriptionText}
                                          </p>
                                        </div>
                                      )}

                                      {prescription.treatmentPlan && (
                                        <div>
                                          <h4 className="font-medium">
                                            Treatment Plan
                                          </h4>
                                          <p className="mt-1 p-3 border rounded whitespace-pre-line">
                                            {prescription.treatmentPlan}
                                          </p>
                                        </div>
                                      )}

                                      {prescription.notes && (
                                        <div>
                                          <h4 className="font-medium">
                                            Additional Notes
                                          </h4>
                                          <p className="mt-1 p-3 border rounded whitespace-pre-line">
                                            {prescription.notes}
                                          </p>
                                        </div>
                                      )}

                                      <div className="flex justify-between items-center pt-3 border-t">
                                        <div>
                                          <Badge
                                            variant={
                                              prescription.paymentStatus ===
                                              "paid"
                                                ? "default"
                                                : "outline"
                                            }
                                          >
                                            {prescription.paymentStatus ===
                                            "paid"
                                              ? "Paid"
                                              : "Payment Pending"}
                                          </Badge>
                                          {prescription.paymentAmount && (
                                            <span className="ml-2">
                                              Amount: ₹
                                              {prescription.paymentAmount}
                                            </span>
                                          )}
                                        </div>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            handlePrint(prescription)
                                          }
                                        >
                                          <PrinterIcon className="h-4 w-4 mr-1" />
                                          Print
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Manage Prescriptions Section - Group prescriptions by patient */}
          <Card className="border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle className="text-2xl">Manage Prescriptions</CardTitle>
              <CardDescription>
                View and manage prescriptions by patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-4">Loading patient prescriptions...</p>
              ) : filteredPrescriptions.length === 0 ? (
                <div className="text-center py-10 border rounded-md bg-slate-50">
                  <p className="text-gray-500">No prescriptions found</p>
                </div>
              ) : (
                <>
                  {/* Group prescriptions by patient */}
                  {(() => {
                    // Create a map of patient ID to their prescriptions
                    const patientPrescriptionsMap = new Map();
                    
                    // Group prescriptions by patient
                    filteredPrescriptions.forEach(prescription => {
                      const patientId = prescription.patient._id;
                      if (!patientPrescriptionsMap.has(patientId)) {
                        patientPrescriptionsMap.set(patientId, {
                          patient: prescription.patient,
                          prescriptions: []
                        });
                      }
                      patientPrescriptionsMap.get(patientId).prescriptions.push(prescription);
                    });
                    
                    // Convert map to array and sort
                    const patientGroups = Array.from(patientPrescriptionsMap.values())
                      .map(group => ({
                        ...group,
                        // Sort prescriptions by date, newest first
                        prescriptions: group.prescriptions.sort(
                          (a: Prescription, b: Prescription) => new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime()
                        )
                      }));
                    
                    // Render each patient group
                    return patientGroups.map(group => (
                      <div key={group.patient._id} className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">{group.patient.full_name}</h3>
                          <Badge className="bg-blue-600">{group.prescriptions.length} Prescriptions</Badge>
                        </div>
                        
                        <div className="space-y-3">
                          {group.prescriptions.map((prescription: Prescription, index: number) => (
                            <div 
                              key={prescription._id} 
                              className={`p-4 rounded-lg border ${index === 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      variant={index === 0 ? "default" : "outline"} 
                                      className={index === 0 ? "bg-green-600" : ""}
                                    >
                                      {index === 0 ? "Latest Version" : `Version ${group.prescriptions.length - index}`}
                                    </Badge>
                                    <span className="text-sm text-gray-500">
                                      {new Date(prescription.dateIssued).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="font-medium mt-2">
                                    {prescription.diagnosis || "No diagnosis"}
                                  </p>
                                </div>
                                
                                <div className="flex gap-2">
                                                                    <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      // Debug: log the prescription data before editing
                                      console.log("=== CLICKING EDIT ===");
                                      console.log("Prescription ID:", prescription._id);
                                      console.log("Prescription ID type:", typeof prescription._id);
                                      console.log("Prescription ID toString():", prescription._id?.toString());
                                      console.log("Patient ID:", prescription.patient?._id);
                                      console.log("Patient Name:", prescription.patient?.full_name);
                                      console.log("Doctor ID:", prescription.doctor?._id);
                                      console.log("Is valid ObjectId format:", /^[0-9a-fA-F]{24}$/.test(prescription._id?.toString() || ''));
                                      console.log("Full Prescription Object:", prescription);
                                      
                                      // Ensure we have fresh token
                                      const token = localStorage.getItem("token");
                                      if (!token) {
                                        toast("Authentication Error", {
                                          description: "You need to be logged in to edit prescriptions.",
                                        });
                                        return;
                                      }
                                      
                                      // Open edit with this prescription
                                      // Build URL with all necessary parameters
                                      const editUrl = new URL("/prescriptions", window.location.origin);
                                      
                                      // Add essential parameters - ensure proper string conversion
                                      const prescriptionId = prescription._id?.toString() || prescription._id;
                                      const patientId = prescription.patient?._id?.toString() || prescription.patient?._id;
                                      // Use current user ID instead of prescription's doctor ID for better compatibility
                                      const currentUserId = userId;
                                      
                                      console.log("Adding to URL - prescriptionId:", prescriptionId);
                                      console.log("Adding to URL - patientId:", patientId);
                                      console.log("Adding to URL - currentUserId:", currentUserId);
                                      console.log("Original prescription doctor:", prescription.doctor?._id);
                                      
                                      editUrl.searchParams.append("edit", prescriptionId);
                                      editUrl.searchParams.append("patientId", patientId);
                                      editUrl.searchParams.append("doctorId", currentUserId || "");
                                      
                                      // Add patient details - only if they exist
                                      if (prescription.patient.full_name) {
                                        editUrl.searchParams.append("patientName", prescription.patient.full_name);
                                      }
                                      if (prescription.patient.email) {
                                        editUrl.searchParams.append("patientEmail", prescription.patient.email);
                                      }
                                      
                                      console.log("Navigating to:", editUrl.toString());
                                      window.location.href = editUrl.toString();
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handlePrint(prescription)}
                                  >
                                    <PrinterIcon className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Prescription details */}
                              {prescription.medications && prescription.medications.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-sm font-medium text-gray-700 mb-1">
                                    Medications:
                                  </p>
                                  <div className="text-sm text-gray-600">
                                    {prescription.medications.map((med: Medication, i: number) => (
                                      <span key={i} className="inline-block mr-2 mb-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                        {med.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {prescription.treatmentPlan && (
                                <div className="mt-2 text-sm text-gray-600">
                                  <span className="font-medium text-gray-700">Treatment: </span>
                                  {prescription.treatmentPlan.length > 100
                                    ? `${prescription.treatmentPlan.substring(0, 100)}...`
                                    : prescription.treatmentPlan}
                                </div>
                              )}
                              
                              {prescription.notes && (
                                <div className="mt-2 text-sm text-gray-600">
                                  <span className="font-medium text-gray-700">Notes: </span>
                                  {prescription.notes.length > 100
                                    ? `${prescription.notes.substring(0, 100)}...`
                                    : prescription.notes}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Print Dialog */}
      <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Print Prescription</DialogTitle>
            <DialogDescription>
              Prepare to print this prescription
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              You are about to print a prescription for{" "}
              {selectedPrescription?.patient?.full_name}.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              A new window will open with a printer-friendly version.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPrintDialogOpen(false)}
            >
              Cancel
            </Button>
                      <Button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Print dialog confirm button clicked");
            printPrescription();
          }}>
            <PrinterIcon className="h-4 w-4 mr-2" />
            Print
          </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Prescriptions;
