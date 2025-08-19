import { Booking } from "../models/booking.js";
import Prescription from "../models/prescription.js";
import User from "../models/user.js";
import crypto from "crypto";
import mongoose from "mongoose";

export const getPrescriptions = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Auth Verification
    const user = await User.findById(userId).select("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is a doctor
    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // Finding all prescriptions for the doctor
    const prescriptions = await Prescription.find({
      doctor: user.id,
    })
      .populate("patient", "full_name email")
      .sort({ dateIssued: -1 });

    return res.status(200).json(prescriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPrescription = async (req, res) => {
  const {
    prescriptionText,
    medications,
    diagnosis,
    patientId,
    notes,
    paymentAmount,
    expiryDate,
    appointmentId,
    patientHistory,
    treatmentPlan,
    followUpDate,
    physicalExaminer,
    investigation,
    vitals,
    complaints,
    tests,
  } = req.body;
  try {
    const { id: userId } = req.params;

    // Auth Verification
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is a doctor
    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // Validate and filter medications - only include medications with at least a name
    const validMedications = (medications || []).filter(med => 
      med && med.name && med.name.trim() !== ""
    );

    // Generate unique shareable ID
    const shareableId = crypto.randomBytes(10).toString("hex");

    // Validate ObjectIds
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
    
    // Create Prescriptions based on userID
    const prescription = await Prescription.create({
      doctor: user.id,
      prescriptionText,
      medications: validMedications,
      diagnosis: diagnosis || "",
      patient: isValidObjectId(patientId) ? patientId : user.id, // fallback to doctor's id
      notes: notes || "",
      expiryDate: expiryDate || null,
      paymentAmount: paymentAmount || null,
      appointment: appointmentId && isValidObjectId(appointmentId) ? appointmentId : null,
      shareableId,
      patientHistory: patientHistory || "",
      treatmentPlan: treatmentPlan || "",
      followUpDate: followUpDate || null,
      physicalExaminer: physicalExaminer && isValidObjectId(physicalExaminer) ? physicalExaminer : null,
      investigation: investigation || "",
      vitals: vitals || "",
      complaints: complaints || "",
      tests: tests || "",
    });

    // update prescription details in the user's prescriptions array
    await user.updateOne({
      $push: { prescriptions: prescription._id },
    });

    res.status(201).json({
      message: "Prescription created successfully",
      prescription,
      shareableUrl: `/prescription/share/${shareableId}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientPaymentStatus = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { patientId } = req.params;

    // Auth Verification
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify role of the user
    const user = await User.findById(userId).select("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is a doctor
    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // Check if patientId is a valid ObjectId
    const prescriptions = await Prescription.find({
      doctor: userId,
      patient: patientId,
    });

    // Check if prescriptions exist for the patient
    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this patient" });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { prescriptionId } = req.params;
    const { paymentStatus, paymentDate, paymentAmount } = req.body;

    // Auth Verification
    if (!userId) {
      console.log("Unauthorized: No userId in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("role");

    // Check if user is a doctor
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "doctor") {
      console.log("Forbidden - user role is not doctor:", user.role);
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // Find all prescriptions by the id
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Update the payment status in the prescription
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      prescriptionId,
      {
        paymentStatus,
        paymentDate:
          paymentDate || (paymentStatus === "paid" ? new Date() : null),
        paymentAmount,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Payment status updated successfully",
      prescription: updatedPrescription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientsWithAppointments = async (req, res) => {
  try {
    const { id: userId } = req.params;

    // Enhanced logging for debugging
    console.log("User ID from request:", userId);
    console.log(
      "Authorization header:",
      req.headers.authorization ? "Present" : "Missing"
    );

    // Auth Verification
    if (!userId) {
      console.log(
        "Unauthorized: No userId in request for getPatientsWithAppointments"
      );
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate the user exists and is a doctor
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is a doctor
    if (user.role !== "doctor") {
      console.log("Forbidden - user role is not doctor:", user.role);
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // Find patients who have appointments with the doctor
    // Using .lean() for better performance
    const bookings = await Booking.find({ doctor: user.id })
      .sort({ date: -1 })
      .lean();

    console.log(`Found ${bookings.length} bookings for doctor ${userId}`);

    if (!bookings || bookings.length === 0) {
      // Return empty array instead of 404 error
      console.log("No bookings found for doctor ID:", userId);
      return res.status(200).json([]);
    }

    // Get unique patient IDs from bookings
    const uniquePatientIds = [
      ...new Set(bookings.map((booking) => booking.user.toString())),
    ];
    console.log(`Found ${uniquePatientIds.length} unique patients`);

    // Fetch all patient details in a single query
    const allPatients = await User.find({
      _id: { $in: uniquePatientIds },
    })
      .select("_id full_name email phoneNumber")
      .lean();

    // Create a map for quick lookup
    const patientsMap = {};
    allPatients.forEach((patient) => {
      patientsMap[patient._id.toString()] = patient;
    });

    // Map latest booking for each patient
    const latestBookingByPatient = {};
    bookings.forEach((booking) => {
      const patientId = booking.user.toString();
      if (
        !latestBookingByPatient[patientId] ||
        new Date(booking.date) >
          new Date(latestBookingByPatient[patientId].date)
      ) {
        latestBookingByPatient[patientId] = booking;
      }
    });

    // Combine patient details with their latest appointment info
    const patientsWithAppointments = uniquePatientIds
      .map((patientId) => {
        const patient = patientsMap[patientId];
        const latestBooking = latestBookingByPatient[patientId];

        if (!patient) {
          console.log(
            `Warning: Patient with ID ${patientId} not found in database`
          );
          return null;
        }

        return {
          _id: patient._id,
          full_name: patient.full_name,
          email: patient.email,
          phoneNumber: patient.phoneNumber,
          appointmentDate: latestBooking?.date || null,
          appointmentTime: latestBooking?.time || null,
          appointmentStatus: latestBooking?.status || null,
        };
      })
      .filter(Boolean); // Remove any null entries

    console.log(
      `Returning ${patientsWithAppointments.length} patients with appointment details`
    );

    res.status(200).json(patientsWithAppointments);
  } catch (error) {
    console.log("Error in getPatientsWithAppointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPrescriptionByShareableId = async (req, res) => {
  try {
    const { shareableId } = req.params;

    const prescription = await Prescription.findOne({ shareableId })
      .populate("doctor", "full_name email")
      .populate("patient", "full_name");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPrescriptions = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find prescriptions where the user is the patient
    const prescriptions = await Prescription.find({ patient: userId })
      .populate({
        path: "doctor",
        select: "full_name email _id",
        model: "User",
      })
      .sort({ dateIssued: -1 });

    // Return empty array if no prescriptions found (instead of error)
    if (!prescriptions || prescriptions.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(prescriptions);
  } catch (error) {
    console.log("Error in getUserPrescriptions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
