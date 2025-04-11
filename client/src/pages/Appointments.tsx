import Appointment from "@/components/Appointment";
import DoctorAppointments from "@/components/DoctorAppointments";
import DataForm from "@/components/DataForm";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { isAuthenticated } from "@/lib/authUtils";

const Appointments = () => {
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const [role, setRole] = React.useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const [needsUserInfo, setNeedsUserInfo] = useState(false);

  useEffect(() => {
    // Check authentication status
    setIsSignedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    // Check if user info exists in localStorage
    if (!userId) {
      setNeedsUserInfo(true);
    } else if (userId && email) {
      setRole("user");
      setNeedsUserInfo(false);
    } else if (isSignedIn) {
      console.log(isSignedIn);
      setRole("doctor");
      setNeedsUserInfo(false);
    }
  }, [userId, email, isSignedIn]);

  const fetchRole = async () => {
    if (!userId) {
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/role/${userId}`
      );

      if (res.data.role) {
        setRole(res.data.role);
      } else {
        navigate("/role");
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  useEffect(() => {
    fetchRole();
  }, [userId]);

  // Force component re-render when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUserId = localStorage.getItem("userId");
      if (currentUserId && !userId) {
        setNeedsUserInfo(false);
        window.location.reload(); // Reload to apply changes
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [userId]);

  // Render DataForm if user info is needed
  if (needsUserInfo && !isSignedIn) {
    return (
      <section id="appointments" className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">Book Your Appointment</h2>
            <p className="section-subtitle mb-4">
              Please provide your information to continue
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md px-4">
              <DataForm />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointments" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Your Appointments</h2>
          <p className="section-subtitle">
            Schedule and manage your appointments
          </p>
        </div>
        {role === "user" || role === null ? (
          <Appointment />
        ) : (
          role === "doctor" && <DoctorAppointments />
        )}
      </div>
    </section>
  );
};

export default Appointments;
