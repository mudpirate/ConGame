import mongoose from "mongoose";
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ✅ fixed capitalization
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);
export default Booking;
