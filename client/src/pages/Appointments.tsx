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
      <section id="appointments" className="py-3 sm:py-5 bg-gray-50">
        <div className="container text-center px-3">
          <div className="flex justify-center items-center p-4 sm:p-8">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
            <p className="ml-3 sm:ml-4 text-base sm:text-lg text-gray-600">
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
      <section id="appointments" className="py-3 sm:py-5 bg-gray-50">
        <div className="container px-3">
          <div className="max-w-xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
            <div className="text-center mb-3 sm:mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto"
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
              <p className="text-red-500 text-base sm:text-lg mt-3 sm:mt-4">
                {error}
              </p>
            </div>
            <button
              onClick={() => fetchRole()}
              className="w-full py-2 sm:py-3 px-4 bg-primary text-white rounded hover:bg-primary-dark transition duration-300 flex items-center justify-center text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
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
      className={`py-5 sm:py-10 ${homepage ? "bg-gray-50" : ""}`}
    >
      <div className="container px-3">
        <div
          className={
            homepage
              ? "bg-white rounded-lg shadow-md p-2 sm:p-6 overflow-hidden"
              : ""
          }
        >
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
