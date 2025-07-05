import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gameSchema = new Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Game = model("Game", gameSchema);
export default Game;
