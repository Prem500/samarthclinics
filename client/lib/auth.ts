import axios from "axios";
import { buildApiUrl } from "./utils";

// Auth token management
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem("token");
  // Simple validation to ensure the token at least looks like a JWT
  if (token && token.split(".").length === 3) {
    return token;
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const getUserRole = () => {
  if (typeof window === 'undefined') return null;
  const role = localStorage.getItem("userRole");
  // Default to 'user' if role is not set but user is authenticated
  return role || (isAuthenticated() ? "user" : null);
};

export const getUserId = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem("userId");
};

export const getUserEmail = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem("email");
};

export const setUserData = ({
  token,
  userId,
  email,
  role,
  fullName,
}: {
  token: string;
  userId: string;
  email: string;
  role?: string | null;
  fullName?: string;
}) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("email", email);
  if (role) {
    localStorage.setItem("userRole", role);
  }
  if (fullName) {
    localStorage.setItem("fullName", fullName);
  }
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("userRole");
  localStorage.removeItem("fullName");
  window.location.href = "/";
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Axios instance with auth headers
export const authAxios = axios.create();

// Add auth token to every request
authAxios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Token expired or invalid - log out user
        console.log(
          "Authentication failed:",
          error.response.data.message || "Session expired"
        );
        logout();
      } else if (error.response.status === 403) {
        // Permission issue but token is valid
        console.log("Permission denied:", error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const loginDoctor = async (email: string, password: string) => {
  const response = await axios.post(buildApiUrl('auth/doctor/login'), {
    email,
    password
  });
  
  if (response.data && response.data.token) {
    setUserData({
      token: response.data.token,
      userId: response.data.user.id,
      email: response.data.user.email,
      role: "doctor",
      fullName: response.data.user.full_name || ""
    });
  }
  
  return response.data;
};

export const registerDoctor = async (userData: {
  full_name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}) => {
  const response = await axios.post(buildApiUrl('auth/doctor/register'), {
    ...userData,
    role: "doctor"
  });
  
  if (response.data && response.data.token) {
    setUserData({
      token: response.data.token,
      userId: response.data.user.id,
      email: response.data.user.email,
      role: "doctor",
      fullName: response.data.user.full_name || ""
    });
  }
  
  return response.data;
};

export const verifyAdminPassword = async (adminPassword: string) => {
  const response = await axios.post(buildApiUrl('auth/admin-firewall'), {
    adminPassword
  });
  return response.data;
};