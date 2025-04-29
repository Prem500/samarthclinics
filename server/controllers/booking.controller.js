import { Booking } from "../models/booking.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const GetBookings = async (req, res) => {
  const { id } = req.params;

  try {
    let doctorId;

    // Check if the id is a MongoDB ObjectId (doctor's MongoDB ID directly)
    if (mongoose.Types.ObjectId.isValid(id)) {
      doctorId = id;
    } else {
      // If it's not a valid ObjectId, try to find by email or other identifier if needed
      return res.status(400).json({ message: "Invalid doctor ID format" });
    }

    // Always fully populate the user field to ensure consistent data format
    const bookings = await Booking.find({ doctor: doctorId })
      .populate({
        path: "user",
        select: "full_name email phoneNumber _id",
        model: "User",
      })
      .sort({ date: -1, time: -1 });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error in GetBookings:", error);
    res.status(500).json({ message: error.message });
  }
};

export const GetBooking = async (req, res) => {
  const { id } = req.params;

  try {
    // Populate user details here too for consistency
    const booking = await Booking.findById(id).populate({
      path: "user",
      select: "full_name email phoneNumber _id",
      model: "User",
    });

    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const GetUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find all bookings for this specific user
    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "doctor",
        select: "full_name email _id",
        model: "User",
      })
      .sort({ date: -1, time: -1 });

    if (!bookings || bookings.length === 0) {
      return res.status(200).json([]); // Return empty array instead of 404 error
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error in GetUserBookings:", error);
    res.status(500).json({ message: error.message });
  }
};

export const CreateBooking = async (req, res) => {
  const {
    date,
    time,
    doctor,
    issue,
    visitType,
    email,
    phoneNumber,
    full_name,
    user,
  } = req.body;

  try {
    let userId;

    if (user) {
      // If an authenticated user is booking
      userId = user;
    } else if (email) {
      // For non-authenticated users, check if the email exists in our system
      let existingUser = await User.findOne({ email });

      if (existingUser) {
        // Use existing user
        userId = existingUser._id;

        // Update user info if new data is provided
        if (full_name || phoneNumber) {
          const updateData = {};
          if (full_name) updateData.full_name = full_name;
          if (phoneNumber) updateData.phoneNumber = phoneNumber;

          await User.findByIdAndUpdate(userId, updateData);
        }
      } else {
        // Create a new user without password (non-authenticated)
        const newUser = new User({
          email,
          full_name,
          phoneNumber,
          role: "user", // Default role
        });

        const savedUser = await newUser.save();
        userId = savedUser._id;
      }
    } else {
      return res.status(400).json({ message: "Email is required for booking" });
    }

    // Create the booking with the user ID
    const newBooking = new Booking({
      date,
      time,
      user: userId,
      doctor,
      issue,
      visitType,
    });

    await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(409).json({ message: error.message });
  }
};

export const UpdateBooking = async (req, res) => {
  const { id } = req.params;
  const booking = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No booking with id: ${id}`);

    const updatedBooking = await Booking.findByIdAndUpdate(id, booking, {
      new: true,
    }).populate({
      path: "user",
      select: "full_name email phoneNumber _id",
      model: "User",
    });

    res.json(updatedBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const DeleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No booking with id: ${id}`);

    await Booking.findByIdAndDelete(id);

    res.json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const slotAvailability = async (req, res) => {
  const { date, time, doctorId } = req.body;
  if (!doctorId) {
    return res.status(400).json({ message: "Doctor ID is required" });
  }

  try {
    const booking = await Booking.findOne({ doctor: doctorId, date, time });

    if (!booking) {
      return res.status(200).json({ message: "Slot is available" });
    }

    res.status(409).json({ message: "Slot is not available" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getBookingId = async (req, res) => {
  const { userId, doctorId } = req.params;
  try {
    const booking = await Booking.findOne({
      user: userId,
      doctor: doctorId,
    });

    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }

    const bookingId = booking._id.toString(); // Convert ObjectId to string
    res.status(200).json({ bookingId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
