import Appointment from "@/components/Appointment";
import DoctorAppointments from "@/components/DoctorAppointments";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { isAuthenticated, authAxios } from "@/lib/authUtils";

const Appointments = ({ homepage = false }: { homepage?: boolean }) => {
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const [role, setRole] = React.useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    setIsSignedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    // Set default role based on localStorage data
    if (userId && email) {
      setRole("user");
    } else if (isSignedIn) {
      setRole("doctor");
    }

    // Attempt to fetch the actual role from the server
    if (userId) {
      fetchRole();
    } else {
      setIsLoading(false);
    }
  }, [userId, email, isSignedIn]);

  const fetchRole = async () => {
    setIsLoading(true);
    try {
      // Use authAxios instead of regular axios to include authentication headers
      const res = await authAxios.get(
        `${import.meta.env.VITE_BACKEND_URL}/role/${userId}`
      );

      if (res.data.role) {
        setRole(res.data.role);
        // Also store role in localStorage for persistence
        localStorage.setItem("userRole", res.data.role);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching role:", error);

      // More specific error handling
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else if (error.response.status === 404) {
          setError("User information not found. Please log in again.");
        } else {
          setError(
            `Error: ${
              error.response.data.message || "Unable to verify user role"
            }`
          );
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
      setIsLoading(false);
    }
  };

  // Force component re-render when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUserId = localStorage.getItem("userId");
      if (currentUserId !== userId) {
        window.location.reload(); // Reload to apply changes
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userId]);

  // If this is the homepage view and user is a doctor, don't render anything
  if (homepage && role === "doctor") {
    return null;
  }

  // Show loading state
  if (isLoading) {
    return (
      <section id="appointments" className="py-5 bg-gray-50">
        <div className="container text-center">
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="ml-4 text-lg text-gray-600">
              Loading your appointments...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if there was a problem
  if (error) {
    return (
      <section id="appointments" className="py-5 bg-gray-50">
        <div className="container">
          <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-red-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-500 text-lg mt-4">{error}</p>
            </div>
            <button
              onClick={() => fetchRole()}
              className="w-full py-3 px-4 bg-primary text-white rounded hover:bg-primary-dark transition duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="appointments"
      className={`py-10 ${homepage ? "bg-gray-50" : ""}`}
    >
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="section-title text-3xl font-bold text-gray-800 mb-2">
            {homepage ? "Book an Appointment" : "Your Appointments"}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="section-subtitle text-gray-600 max-w-xl mx-auto">
            {homepage
              ? "Schedule your next consultation with our expert physiotherapists"
              : "View, schedule and manage your appointments with our clinic"}
          </p>
        </div>

        {homepage && !userId && (
          <div className="max-w-md mx-auto mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  You'll be asked to provide your information to complete the
                  booking process.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={homepage ? "bg-white rounded-lg shadow-md p-6" : ""}>
          {homepage || role === "user" || role === null ? (
            <Appointment />
          ) : (
            role === "doctor" && <DoctorAppointments />
          )}
        </div>
      </div>
    </section>
  );
};

export default Appointments;
