import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
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
  dateIssued: string;
  notes: string;
  expiryDate: string | null;
  paymentStatus: "pending" | "paid";
  paymentAmount: number | null;
  shareableUrl?: string;
  patientHistory?: string;
  treatmentPlan?: string;
  followUpDate?: string | null;
}

const DEFAULT_MEDICATION: Medication = {
  name: "",
  dosage: "",
  frequency: "",
  duration: "",
  instructions: "",
};

const Prescriptions = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<
    Prescription[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
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

        // Check if valid data was returned
        if (patientsRes.data && Array.isArray(patientsRes.data)) {
          setPatients(patientsRes.data);
        } else {
          console.error("Invalid patients data format:", patientsRes.data);
          setPatients([]);
        }

        if (prescriptionsRes.data && Array.isArray(prescriptionsRes.data)) {
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

    if (!selectedPatient) {
      toast("Validation Error", {
        description: "Please select a patient.",
      });
      return;
    }

    // Validate medications if any are entered
    if (medications.length > 0) {
      const hasIncompleteMedication = medications.some(
        (med) => med.name && (!med.dosage || !med.frequency || !med.duration)
      );

      if (hasIncompleteMedication) {
        toast("Validation Error", {
          description:
            "Please complete all medication fields (dosage, frequency, duration).",
        });
        return;
      }
    }

    // Filter out empty medications
    const validMedications = medications.filter(
      (med) => med.name.trim() !== ""
    );

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

      const appointmentId = await fetchAppointmentId(userId!, selectedPatient);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/create/${userId}`,
        {
          patientId: selectedPatient,
          prescriptionText,
          medications: validMedications,
          diagnosis,
          notes,
          patientHistory,
          treatmentPlan,
          paymentAmount: paymentAmount ? parseFloat(paymentAmount) : null,
          expiryDate: expiryDate ? expiryDate.toISOString() : null,
          followUpDate: followUpDate ? followUpDate.toISOString() : null,
          appointmentId: appointmentId || null,
        },
        config
      );

      toast("Success", {
        description: "Prescription created successfully!",
      });

      // Reset form
      setSelectedPatient("");
      setPrescriptionText("");
      setDiagnosis("");
      setNotes("");
      setPatientHistory("");
      setTreatmentPlan("");
      setMedications([DEFAULT_MEDICATION]);
      setPaymentAmount("");
      setExpiryDate(undefined);
      setFollowUpDate(undefined);

      // Set the shareable URL
      setShareableUrl(window.location.origin + response.data.shareableUrl);

      // Refresh prescriptions list with auth token
      const updatedPrescriptions = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}`,
        config
      );
      setPrescriptions(updatedPrescriptions.data);
      setFilteredPrescriptions(updatedPrescriptions.data);
    } catch (error: any) {
      console.error("Error creating prescription:", error);

      // Improved error handling
      if (error.response) {
        if (error.response.status === 401) {
          toast("Authentication Error", {
            description: "Your session has expired. Please log in again.",
          });
        } else if (error.response.status === 403) {
          toast("Permission Error", {
            description: "You don't have permission to create prescriptions.",
          });
        } else {
          toast("Error", {
            description: `Failed to create prescription: ${
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
    }
  };

  const handlePrint = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsPrintDialogOpen(true);
  };

  const printPrescription = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && selectedPrescription) {
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Medical Prescription</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
            .logo { font-weight: bold; font-size: 24px; }
            .doctor-info { margin-bottom: 20px; }
            .patient-info { margin-bottom: 20px; border: 1px solid #ccc; padding: 10px; }
            .prescription { margin-bottom: 20px; }
            .medications { margin-bottom: 20px; }
            .med-item { margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 5px; }
            .footer { margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center; }
            .date { text-align: right; margin-bottom: 20px; }
            .rx-symbol { font-size: 24px; margin-right: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            @media print {
              body { margin: 0; padding: 15px; }
              .no-print { display: none; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Physiotherapy Clinic</div>
            <div class="date">Date: ${new Date(
              selectedPrescription.dateIssued
            ).toLocaleDateString()}</div>
          </div>
          
          <div class="doctor-info">
            <p><strong>Doctor:</strong> Dr. ${
              selectedPrescription.patient?.full_name || "Unknown"
            }</p>
          </div>
          
          <div class="patient-info">
            <p><strong>Patient:</strong> ${
              selectedPrescription.patient?.full_name || "Unknown"
            }</p>
            <p><strong>Email:</strong> ${
              selectedPrescription.patient?.email || "Unknown"
            }</p>
          </div>
          
          ${
            selectedPrescription.diagnosis
              ? `<div class="diagnosis">
            <p><strong>Diagnosis:</strong> ${selectedPrescription.diagnosis}</p>
          </div>`
              : ""
          }
          
          <div class="prescription">
            <h3><span class="rx-symbol">℞</span> Prescription</h3>
            ${
              selectedPrescription.prescriptionText
                ? `<p>${selectedPrescription.prescriptionText.replace(
                    /\n/g,
                    "<br>"
                  )}</p>`
                : ""
            }
          </div>
          
          ${
            selectedPrescription.medications &&
            selectedPrescription.medications.length > 0
              ? `<div class="medications">
              <h3>Medications</h3>
              <table>
                <thead>
                  <tr>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Special Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  ${selectedPrescription.medications
                    .map(
                      (med) => `
                    <tr>
                      <td>${med.name}</td>
                      <td>${med.dosage}</td>
                      <td>${med.frequency}</td>
                      <td>${med.duration}</td>
                      <td>${med.instructions || "-"}</td>
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
            selectedPrescription.treatmentPlan
              ? `<div class="treatment-plan">
            <h3>Treatment Plan</h3>
            <p>${selectedPrescription.treatmentPlan.replace(/\n/g, "<br>")}</p>
          </div>`
              : ""
          }
          
          ${
            selectedPrescription.notes
              ? `<div class="notes">
            <h3>Additional Notes</h3>
            <p>${selectedPrescription.notes.replace(/\n/g, "<br>")}</p>
          </div>`
              : ""
          }
          
          ${
            selectedPrescription.followUpDate
              ? `<div class="follow-up">
            <h3>Follow-up Date</h3>
            <p>${new Date(
              selectedPrescription.followUpDate
            ).toLocaleDateString()}</p>
          </div>`
              : ""
          }
          
          <div class="footer">
            <p>This prescription is valid until: ${
              selectedPrescription.expiryDate
                ? new Date(selectedPrescription.expiryDate).toLocaleDateString()
                : "Not specified"
            }</p>
            <p>Doctor's Signature: _______________________</p>
          </div>
          
          <button class="no-print" onclick="window.print()">Print Prescription</button>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
    }

    setIsPrintDialogOpen(false);
  };

  const copyShareableLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast("Link Copied", {
      description: "Shareable link copied to clipboard!",
    });
  };

  const getPatientDetails = (patientId: string) => {
    return patients.find((patient) => patient._id === patientId);
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medical Prescriptions</h1>
        <Badge variant="outline" className="px-3 py-1 text-sm bg-blue-50">
          Doctor Portal
        </Badge>
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
                Clinical Prescription Builder
              </CardTitle>
              <CardDescription>
                Create a detailed prescription with medications, diagnosis, and
                treatment plan
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
                    Patient Information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="patient">Select Patient</Label>
                    <Select
                      value={selectedPatient}
                      onValueChange={(value) => {
                        setSelectedPatient(value);
                        // Auto-populate any patient history if available
                        const selectedPatientDetails = getPatientDetails(value);
                        if (selectedPatientDetails) {
                          // You could fetch previous history here if needed
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.length > 0 ? (
                          patients.map((patient) => (
                            <SelectItem key={patient._id} value={patient._id}>
                              {patient.full_name}
                              {patient.appointmentDate
                                ? ` (Last visit: ${new Date(
                                    patient.appointmentDate
                                  ).toLocaleDateString()})`
                                : " (No appointment date)"}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            {loading
                              ? "Loading patients..."
                              : "No patients with appointments"}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedPatient && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <h4 className="text-sm font-medium text-slate-600 mb-2">
                        Selected Patient Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {(() => {
                          const patientDetails =
                            getPatientDetails(selectedPatient);
                          return patientDetails ? (
                            <>
                              <div>
                                <span className="font-medium">Name:</span>{" "}
                                {patientDetails.full_name}
                              </div>
                              <div>
                                <span className="font-medium">Email:</span>{" "}
                                {patientDetails.email}
                              </div>
                              {patientDetails.phoneNumber && (
                                <div>
                                  <span className="font-medium">Phone:</span>{" "}
                                  {patientDetails.phoneNumber}
                                </div>
                              )}
                              {patientDetails.appointmentDate && (
                                <div>
                                  <span className="font-medium">
                                    Last Visit:
                                  </span>{" "}
                                  {new Date(
                                    patientDetails.appointmentDate
                                  ).toLocaleDateString()}
                                </div>
                              )}
                            </>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  )}
                </div>

                <Accordion
                  type="single"
                  collapsible
                  defaultValue="diagnosis"
                  className="w-full"
                >
                  <AccordionItem value="diagnosis">
                    <AccordionTrigger className="text-base font-medium">
                      Diagnosis & Clinical Assessment
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 mt-2">
                        <div className="space-y-2">
                          <Label htmlFor="diagnosis">Diagnosis</Label>
                          <Textarea
                            id="diagnosis"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            placeholder="Enter patient diagnosis..."
                            className="min-h-[80px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="patientHistory">
                            Patient History
                          </Label>
                          <Textarea
                            id="patientHistory"
                            value={patientHistory}
                            onChange={(e) => setPatientHistory(e.target.value)}
                            placeholder="Enter relevant patient history..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="medications">
                    <AccordionTrigger className="text-base font-medium">
                      Medications
                    </AccordionTrigger>
                    <AccordionContent>
                      {medications.map((medication, index) => (
                        <div
                          key={index}
                          className="mb-4 p-4 border rounded-md bg-slate-50 relative"
                        >
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveMedication(index)}
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </Button>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div className="space-y-2">
                              <Label htmlFor={`med-name-${index}`}>
                                Medication Name
                              </Label>
                              <Input
                                id={`med-name-${index}`}
                                value={medication.name}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Medication name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`med-dosage-${index}`}>
                                Dosage
                              </Label>
                              <Input
                                id={`med-dosage-${index}`}
                                value={medication.dosage}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    index,
                                    "dosage",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. 500mg, 10ml"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div className="space-y-2">
                              <Label htmlFor={`med-frequency-${index}`}>
                                Frequency
                              </Label>
                              <Input
                                id={`med-frequency-${index}`}
                                value={medication.frequency}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    index,
                                    "frequency",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. Twice daily, Every 8 hours"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`med-duration-${index}`}>
                                Duration
                              </Label>
                              <Input
                                id={`med-duration-${index}`}
                                value={medication.duration}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    index,
                                    "duration",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. 7 days, 2 weeks"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`med-instructions-${index}`}>
                                Special Instructions
                              </Label>
                              <Input
                                id={`med-instructions-${index}`}
                                value={medication.instructions}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    index,
                                    "instructions",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. Take with food"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddMedication}
                        className="mt-2"
                      >
                        <PlusCircleIcon className="h-4 w-4 mr-2" />
                        Add Another Medication
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="treatment">
                    <AccordionTrigger className="text-base font-medium">
                      Treatment Plan & Additional Information
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 mt-2">
                        <div className="space-y-2">
                          <Label htmlFor="prescription">
                            Additional Prescription Text
                          </Label>
                          <Textarea
                            id="prescription"
                            value={prescriptionText}
                            onChange={(e) =>
                              setPrescriptionText(e.target.value)
                            }
                            placeholder="Enter any additional prescription details not covered by medication list..."
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="treatmentPlan">Treatment Plan</Label>
                          <Textarea
                            id="treatmentPlan"
                            value={treatmentPlan}
                            onChange={(e) => setTreatmentPlan(e.target.value)}
                            placeholder="Enter treatment plan details, including recommended physical therapy exercises, care instructions, etc."
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Additional physician notes or comments..."
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="dates">
                    <AccordionTrigger className="text-base font-medium">
                      Payment & Scheduling
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                        <div className="space-y-2">
                          <Label htmlFor="payment">Payment Amount</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5">$</span>
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

                        <div className="space-y-2">
                          <Label htmlFor="followUp">Follow-up Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
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

                        <div className="space-y-2">
                          <Label htmlFor="expiry">
                            Prescription Expiry Date
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !expiryDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {expiryDate
                                  ? format(expiryDate, "PPP")
                                  : "Set expiry date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={expiryDate}
                                onSelect={setExpiryDate}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="pt-4 border-t">
                  <Button type="submit" className="w-full md:w-auto">
                    Create Prescription
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <Card className="border-t-4 border-t-blue-500">
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
                                  ${prescription.paymentAmount}
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handlePrint(prescription)}
                                >
                                  <PrinterIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    copyShareableLink(
                                      window.location.origin +
                                        `/prescription/share/${prescription.shareableUrl}`
                                    )
                                  }
                                >
                                  <CopyIcon className="h-4 w-4" />
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
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
                                              Amount: $
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
            <Button onClick={printPrescription}>
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
