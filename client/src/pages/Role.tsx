import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getUserId } from "@/lib/authUtils";

const Role = () => {
  const userId = getUserId();
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const fetchRole = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/role/${userId}`
    );

    console.log(res);

    if (res.data.role) {
      toast("Role already exists");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const handleDoctorClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/role/update`,
        {
          id: userId,
          role: "doctor",
          email,
        }
      );

      if (response.status === 200) {
        console.log("Role updated successfully");
        toast("Role updated successfully");
        window.location.href = "/appointments";
      } else {
        console.error("Failed to update role");
        toast("Failed to update role");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePatientClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/role/update`,
        {
          id: userId,
          role: "user",
          email,
        }
      );

      if (response.status === 200) {
        console.log("Role updated successfully");
        toast("Role updated successfully");
        window.location.href = "/appointments";
      } else {
        console.error("Failed to update role");
        toast("Failed to update role");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold py-4">Pick Your Role</h1>
      <div className="flex items-center justify-center gap-2">
        <span
          onClick={handleDoctorClick}
          className="border border-blue-600 p-6 hover:bg-blue-500 text-blue-500 hover:text-white rounded cursor-pointer"
        >
          Doctor
        </span>
        <span
          onClick={handlePatientClick}
          className="border border-blue-600 p-6 hover:bg-blue-500 text-blue-500 hover:text-white rounded cursor-pointer"
        >
          Patient
        </span>
      </div>
    </div>
  );
};

export default Role;
