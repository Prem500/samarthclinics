import express from "express";
import {
  createPrescription,
  getPatientPaymentStatus,
  getPatientsWithAppointments,
  getPrescriptionByShareableId,
  getPrescriptions,
  updatePaymentStatus,
} from "../controllers/prescription.controller.js";
import { verifyToken, isDoctor } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route - no authentication needed
router.get("/share/:shareableId", getPrescriptionByShareableId);

// Protected routes - authentication required
router.use(verifyToken);

// Doctor-only routes
router.post("/create/:id", isDoctor, createPrescription);
router.get(
  "/:id/patients-with-appointments",
  isDoctor,
  getPatientsWithAppointments
);
router.get(
  "/:id/patient/:patientId/payments",
  isDoctor,
  getPatientPaymentStatus
);
router.patch("/:id/payment/:prescriptionId", isDoctor, updatePaymentStatus);
router.get("/:id", isDoctor, getPrescriptions);

export default router;
