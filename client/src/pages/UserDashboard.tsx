import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { getUserId, getAuthHeaders } from "@/lib/authUtils";

// Types for our data
interface Appointment {
  _id: string;
  date: string;
  time: string;
  doctor: {
    _id: string;
    full_name: string;
    email: string;
  };
  issue: string;
  status: "pending" | "confirmed" | "cancelled" | "scheduled" | "completed";
  visitType: "clinic" | "home";
  createdAt: string;
}

interface Medication {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
  _id?: string;
}

interface Prescription {
  _id: string;
  prescriptionText: string;
  doctor: {
    _id: string;
    full_name: string;
    email: string;
  };
  dateIssued: string;
  paymentStatus: "pending" | "paid";
  paymentAmount: number;
  notes?: string;
  medications?: Medication[];
  diagnosis?: string;
  shareableId?: string;
  shareableUrl?: string;
  expiryDate?: string;
}

const UserDashboard: React.FC = () => {
  const userId = getUserId();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState({
    appointments: true,
    prescriptions: true,
  });
  const [error, setError] = useState({ appointments: "", prescriptions: "" });
  const [activeTab, setActiveTab] = useState<"appointments" | "prescriptions">(
    "appointments"
  );
  const [userName, setUserName] = useState<string>("Patient");

  useEffect(() => {
    // If no userId is found, redirect to signup
    if (!userId) {
      toast.error("Please sign in to access this page");
      window.location.href = "/sign-up";
      return;
    }

    // If user is authenticated but not a regular user, redirect to home
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "user") {
      toast("This page is for patients only", {
        description: "Redirecting to home page",
      });
      window.location.href = "/";
    }
  }, [userId]);

  // Helper to get authorization headers
  const getAuthenticationHeaders = useCallback(async () => {
    const headers = getAuthHeaders();
    if (!headers.Authorization) {
      throw new Error("No active session");
    }
    return headers;
  }, []);

  // Memoized data fetching functions
  const fetchAppointments = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading((prev) => ({ ...prev, appointments: true }));
      setError((prev) => ({ ...prev, appointments: "" }));

      // Get auth headers
      const headers = await getAuthenticationHeaders();

      // Get user-specific appointments
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/booking/user/${userId}`,
        { headers }
      );
      setAppointments(response.data);
    } catch (err: any) {
      console.error("Error fetching appointments:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to load appointments";
      setError((prev) => ({
        ...prev,
        appointments: errorMessage,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, appointments: false }));
    }
  }, [userId, getAuthenticationHeaders]);

  const fetchPrescriptions = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading((prev) => ({ ...prev, prescriptions: true }));
      setError((prev) => ({ ...prev, prescriptions: "" }));

      // Get auth headers
      const headers = await getAuthenticationHeaders();

      // Get user-specific prescriptions
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/user/${userId}`,
        { headers }
      );
      setPrescriptions(response.data);
    } catch (err: any) {
      console.error("Error fetching prescriptions:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to load prescriptions";
      setError((prev) => ({
        ...prev,
        prescriptions: errorMessage,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, prescriptions: false }));
    }
  }, [userId, getAuthenticationHeaders]);

  // Fetch user details to get the name
  const fetchUserDetails = useCallback(async () => {
    if (!userId) return;

    try {
      const headers = await getAuthenticationHeaders();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/${userId}`,
        { headers }
      );

      if (response.data && response.data.full_name) {
        setUserName(response.data.full_name.split(" ")[0] || "Patient");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      // Fallback to default name if there's an error
      // Using stored name from localStorage as backup
      const storedName = localStorage.getItem("full_name");
      if (storedName) {
        setUserName(storedName.split(" ")[0]);
      }
    }
  }, [userId, getAuthenticationHeaders]);

  // Load data when component mounts or user changes
  useEffect(() => {
    if (userId) {
      fetchAppointments();
      fetchPrescriptions();
      fetchUserDetails();
    }
  }, [userId, fetchAppointments, fetchPrescriptions]);

  // Format date helper
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  // Status color functions
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  }, []);

  const getPaymentStatusColor = useCallback((status: string) => {
    return status === "paid"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  }, []);

  // Handle tab switching
  const handleTabChange = useCallback(
    (tab: "appointments" | "prescriptions") => {
      setActiveTab(tab);
    },
    []
  );

  // Computed data for summary cards
  const summaryData = useMemo(
    () => ({
      totalAppointments: appointments.length,
      upcomingAppointments: appointments.filter(
        (a) =>
          a.status !== "cancelled" &&
          a.status !== "completed" &&
          new Date(a.date) >= new Date()
      ).length,
      totalPrescriptions: prescriptions.length,
      pendingPayments: prescriptions.filter(
        (p) => p.paymentStatus === "pending"
      ).length,
    }),
    [appointments, prescriptions]
  );

  // Function to download prescription as PDF
  const handleDownloadPrescription = useCallback((shareableId: string) => {
    window.open(`/prescription/share/${shareableId}`, "_blank");
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {userName}
        </h1>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          Go Back
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Appointments
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {summaryData.totalAppointments}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-semibold text-gray-900">
                {summaryData.upcomingAppointments}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Prescriptions</p>
              <p className="text-2xl font-semibold text-gray-900">
                {summaryData.totalPrescriptions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-500 mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Payments
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {summaryData.pendingPayments}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "appointments"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => handleTabChange("appointments")}
        >
          My Appointments
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "prescriptions"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => handleTabChange("prescriptions")}
        >
          My Prescriptions
        </button>
      </div>

      {/* Content Area */}
      {activeTab === "appointments" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              My Appointments
            </h2>
          </div>

          {loading.appointments ? (
            <div className="p-6 flex justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                      <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : error.appointments ? (
            <div className="p-6 text-center">
              <div className="text-red-500 mb-2">{error.appointments}</div>
              <button
                onClick={fetchAppointments}
                className="text-sm px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No appointments found
              </h3>
              <p className="text-gray-500">
                You don't have any appointments scheduled yet.
              </p>
              <button
                onClick={() => (window.location.href = "/appointment")}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Book an Appointment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {formatDate(appointment.date)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{appointment.time}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium">
                        {appointment.doctor?.full_name || "Not assigned"}
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Visit Type</p>
                      <p className="font-medium capitalize">
                        {appointment.visitType}
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Issue</p>
                      <p className="text-sm line-clamp-2">
                        {appointment.issue}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "prescriptions" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              My Prescriptions
            </h2>
          </div>

          {loading.prescriptions ? (
            <div className="p-6 flex justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                      <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : error.prescriptions ? (
            <div className="p-6 text-center">
              <div className="text-red-500 mb-2">{error.prescriptions}</div>
              <button
                onClick={fetchPrescriptions}
                className="text-sm px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          ) : prescriptions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No prescriptions found
              </h3>
              <p className="text-gray-500">
                You don't have any prescriptions issued yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {prescriptions.map((prescription) => (
                <div
                  key={prescription._id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
                >
                  <div
                    className={`px-4 py-3 border-b ${
                      prescription.paymentStatus === "paid"
                        ? "bg-green-50"
                        : "bg-yellow-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {formatDate(prescription.dateIssued)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(
                          prescription.paymentStatus
                        )}`}
                      >
                        {prescription.paymentStatus === "paid"
                          ? "Paid"
                          : `₹${prescription.paymentAmount} - Due`}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium">
                        {prescription.doctor?.full_name || "Unknown Doctor"}
                      </p>
                    </div>
                    {prescription.diagnosis && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-500">Diagnosis</p>
                        <p className="font-medium">{prescription.diagnosis}</p>
                      </div>
                    )}
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Prescription</p>
                      <p className="text-sm line-clamp-3">
                        {prescription.prescriptionText}
                      </p>
                    </div>
                    {prescription.medications &&
                      prescription.medications.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-500">Medications</p>
                          <ul className="list-disc list-inside text-sm pl-2">
                            {prescription.medications
                              .slice(0, 2)
                              .map((med, idx) => (
                                <li key={idx} className="line-clamp-1">
                                  {med.name}
                                  {med.dosage && ` - ${med.dosage}`}
                                  {med.frequency && ` (${med.frequency})`}
                                </li>
                              ))}
                            {prescription.medications.length > 2 && (
                              <li>
                                +{prescription.medications.length - 2} more...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    <div className="mt-4 pt-4 border-t flex justify-end">
                      {/* {prescription.paymentStatus === "pending" && (
                        <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm mr-2">
                          Pay Now
                        </button>
                      )} */}
                      {prescription.shareableId && (
                        <button
                          onClick={() =>
                            handleDownloadPrescription(
                              prescription.shareableId || ""
                            )
                          }
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                        >
                          View/Download
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
