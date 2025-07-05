import express from "express";
import protect from "../middleware/auth.js";
import {
  checkAvailabilityOfGame,
  createBooking,
  getUserBookings,
  getOwnerBookings,
  changeBookingStatus,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", protect, checkAvailabilityOfGame);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user-bookings", protect, getUserBookings);
bookingRouter.get("/owner-bookings", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;
