import mongoose from "mongoose";

const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
  },
});

const prescriptionSchema = new Schema(
  {
    prescriptionText: {
      type: String,
    },
    medications: {
      type: [medicationSchema],
      default: [],
    },
    diagnosis: {
      type: String,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    physicalExaminer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    investigation: {
      type: String,
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
    dateIssued: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
    shareableId: {
      type: String,
      unique: true,
      sparse: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    paymentDate: {
      type: Date,
    },
    paymentAmount: {
      type: Number,
    },
    patientHistory: {
      type: String,
    },
    treatmentPlan: {
      type: String,
    },
    followUpDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
