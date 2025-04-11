import express from "express";
import cors from "cors";
import { connectMongoDb } from "./lib/mongodb.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authRoute from "./routes/auth.route.js";
import roleRoute from "./routes/role.route.js";
import prescriptionRoute from "./routes/prescription.route.js";
import bookingRoute from "./routes/booking.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/role", roleRoute);
app.use("/api/prescription", prescriptionRoute);
app.use("/api/booking", bookingRoute);

app.listen(3000, () => {
  connectMongoDb();
  console.log("Server is running on port 3000");
});
