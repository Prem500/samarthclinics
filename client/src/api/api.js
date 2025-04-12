import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or get from your auth state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired, etc.)
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem("token");
      // You might want to redirect to login page here
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getUserDetails: (id) => api.get(`/auth/${id}`),
};

// Prescription API
export const prescriptionAPI = {
  getPrescriptions: (doctorId) => api.get(`/prescription/${doctorId}`),
  createPrescription: (doctorId, data) =>
    api.post(`/prescription/create/${doctorId}`, data),
  getPatientsWithAppointments: (doctorId) =>
    api.get(`/prescription/${doctorId}/patients-with-appointments`),
  getPatientPaymentStatus: (doctorId, patientId) =>
    api.get(`/prescription/${doctorId}/patient/${patientId}/payments`),
  updatePaymentStatus: (doctorId, prescriptionId, data) =>
    api.patch(`/prescription/${doctorId}/payment/${prescriptionId}`, data),
  getPrescriptionByShareableId: (shareableId) =>
    axios.get(`${API_BASE_URL}/prescription/share/${shareableId}`), // Public endpoint, no auth needed
};

// Booking API
export const bookingAPI = {
  getBookings: (doctorId) => api.get(`/booking/${doctorId}`),
  getBooking: (id) => api.get(`/booking/single/${id}`),
  createBooking: (data) => api.post("/booking/create", data),
  updateBooking: (id, data) => api.post(`/booking/update/${id}`, data),
  deleteBooking: (id) => api.delete(`/booking/delete/${id}`),
  checkSlotAvailability: (data) => api.post("/booking/time-slot", data),
  getBookingDetails: (doctorId, userId) =>
    api.post(`/booking/${doctorId}/details/${userId}`),
};

// Role API
export const roleAPI = {
  getDoctors: () => axios.get(`${API_BASE_URL}/role/doctors`), // Public endpoint
  updateRole: (data) => api.post("/role/update", data),
  getRole: (id) => api.get(`/role/${id}`),
};
