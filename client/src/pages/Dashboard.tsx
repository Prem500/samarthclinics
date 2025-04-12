import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { getUserId, getAuthHeaders } from "@/lib/authUtils";

// Types for our data
interface Appointment {
  _id: string;
  date: string;
  time: string;
  user: {
    _id: string;
    full_name: string;
    email: string;
  };
  issue: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

interface Prescription {
  _id: string;
  prescriptionText: string;
  patient: {
    _id: string;
    full_name: string;
    email: string;
  };
  dateIssued: string;
  paymentStatus: "pending" | "paid";
  paymentAmount: number;
  notes?: string;
  expiryDate?: string;
}

const Dashboard: React.FC = () => {
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

  useEffect(() => {
    // If no userId is found, redirect to signup
    if (!userId) {
      toast.error("Please sign in to access this page");
      window.location.href = "/sign-up";
      return;
    }

    // If user is authenticated but not a doctor, redirect to home
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "doctor") {
      toast("Only Doctors are allowed to view this page", {
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

      // Try MongoDB ID first - for doctors
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/booking/${userId}`,
        { headers }
      );
      setAppointments(response.data);
    } catch (err: any) {
      console.error("Error fetching appointments:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to load appointments";
      console.log("Error details:", errorMessage);
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

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}`,
        { headers }
      );
      console.log("Prescriptions data:", response.data);
      setPrescriptions(response.data);
    } catch (err: any) {
      console.error("Error fetching prescriptions:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to load prescriptions";
      console.log("Error details:", errorMessage);
      setError((prev) => ({
        ...prev,
        prescriptions: errorMessage,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, prescriptions: false }));
    }
  }, [userId, getAuthenticationHeaders]);

  // Load data when component mounts or user changes
  useEffect(() => {
    if (userId) {
      console.log("Fetching data for user:", userId);
      fetchAppointments();
      fetchPrescriptions();
    }
  }, [userId, fetchAppointments, fetchPrescriptions]);

  // Format date helper - memoize for performance
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  // Memoized status color functions
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  }, []);

  const getPaymentStatusColor = useCallback((status: string) => {
    return status === "paid"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  }, []);

  // Handle appointment status update
  const handleAppointmentUpdate = useCallback(
    async (appointmentId: string, status: "confirmed" | "cancelled") => {
      try {
        const headers = await getAuthenticationHeaders();

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/booking/update/${appointmentId}`,
          { status },
          { headers }
        );

        // Refresh appointments after update
        fetchAppointments();
      } catch (err) {
        console.error("Error updating appointment:", err);
        alert("Failed to update appointment status");
      }
    },
    [getAuthenticationHeaders, fetchAppointments]
  );

  // Handle prescription payment update
  const handlePaymentUpdate = useCallback(
    async (prescriptionId: string) => {
      try {
        const headers = await getAuthenticationHeaders();

        await axios.patch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/prescription/${userId}/payment/${prescriptionId}`,
          {
            paymentStatus: "paid",
            paymentDate: new Date().toISOString(),
          },
          { headers }
        );

        // Refresh prescriptions after update
        fetchPrescriptions();
      } catch (err) {
        console.error("Error updating payment:", err);
        alert("Failed to update payment status");
      }
    },
    [getAuthenticationHeaders, fetchPrescriptions, userId]
  );

  // Derived data for summary cards - memoized
  const summaryData = useMemo(
    () => ({
      totalAppointments: appointments.length,
      confirmedAppointments: appointments.filter(
        (a) => a.status === "confirmed"
      ).length,
      totalPrescriptions: prescriptions.length,
      pendingPayments: prescriptions.filter(
        (p) => p.paymentStatus === "pending"
      ).length,
    }),
    [appointments, prescriptions]
  );

  // Handle tab switching
  const handleTabChange = useCallback(
    (tab: "appointments" | "prescriptions") => {
      setActiveTab(tab);
    },
    []
  );

  // Function to retry data loading
  const handleRetry = useCallback(() => {
    if (activeTab === "appointments") {
      fetchAppointments();
    } else {
      fetchPrescriptions();
    }
  }, [activeTab, fetchAppointments, fetchPrescriptions]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Doctor Dashboard
        </h1>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className=""
        >
          Go Back
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
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

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {summaryData.confirmedAppointments}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
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

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
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
          Appointments
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "prescriptions"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => handleTabChange("prescriptions")}
        >
          Prescriptions
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            {activeTab === "appointments"
              ? "Recent Appointments"
              : "Recent Prescriptions"}
          </h2>
          <button
            onClick={handleRetry}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {/* Appointments Tab Content */}
        {activeTab === "appointments" && (
          <>
            {loading.appointments ? (
              <div className="p-6 flex justify-center">
                <div className="animate-pulse space-y-4 w-full">
                  <div className="h-2.5 bg-gray-200 rounded-full w-3/4 mb-2.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2.5"></div>
                </div>
              </div>
            ) : error.appointments ? (
              <div className="p-6 text-center">
                <div className="text-red-500 mb-4">{error.appointments}</div>
                <button
                  onClick={fetchAppointments}
                  className="rounded bg-blue-500 text-white px-4 py-2"
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
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(appointment.date)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.time}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {appointment.user?.full_name || "Unknown"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {appointment.user?.email || "No email"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {appointment.issue}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-blue-600 hover:text-blue-900 mr-3"
                            onClick={() =>
                              (window.location.href = `/appointments`)
                            }
                          >
                            View
                          </button>
                          {appointment.status === "pending" && (
                            <>
                              <button
                                className="text-green-600 hover:text-green-900 mr-3"
                                onClick={() =>
                                  handleAppointmentUpdate(
                                    appointment._id,
                                    "confirmed"
                                  )
                                }
                              >
                                Confirm
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() =>
                                  handleAppointmentUpdate(
                                    appointment._id,
                                    "cancelled"
                                  )
                                }
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Prescriptions Tab Content */}
        {activeTab === "prescriptions" && (
          <>
            {loading.prescriptions ? (
              <div className="p-6 flex justify-center">
                <div className="animate-pulse space-y-4 w-full">
                  <div className="h-2.5 bg-gray-200 rounded-full w-3/4 mb-2.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full w-full mb-2.5"></div>
                </div>
              </div>
            ) : error.prescriptions ? (
              <div className="p-6 text-center">
                <div className="text-red-500 mb-4">{error.prescriptions}</div>
                <button
                  onClick={fetchPrescriptions}
                  className="rounded bg-blue-500 text-white px-4 py-2"
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
                  You haven't created any prescriptions yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prescription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {prescriptions.map((prescription) => (
                      <tr key={prescription._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(prescription.dateIssued)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {prescription.patient?.full_name || "Unknown"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {prescription.patient?.email || "No email"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {prescription.prescriptionText}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(
                              prescription.paymentStatus
                            )}`}
                          >
                            {prescription.paymentStatus
                              .charAt(0)
                              .toUpperCase() +
                              prescription.paymentStatus.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ₹
                            {prescription.paymentAmount
                              ? prescription.paymentAmount.toFixed(2)
                              : "0.00"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-blue-600 hover:text-blue-900 mr-3"
                            onClick={() =>
                              (window.location.href = "/prescriptions")
                            }
                          >
                            View
                          </button>
                          {prescription.paymentStatus === "pending" && (
                            <button
                              className="text-green-600 hover:text-green-900"
                              onClick={() =>
                                handlePaymentUpdate(prescription._id)
                              }
                            >
                              Mark Paid
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
