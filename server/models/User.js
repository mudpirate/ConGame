import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide the value"],
    },
    email: {
      type: String,
      required: [true, "Provide the value"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provide the value"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["owner", "user"],
      default: "user",
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
