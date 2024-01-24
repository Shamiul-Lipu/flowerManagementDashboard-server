import { Schema, model } from "mongoose";
import { IFlower } from "./flower.interface";

const flowerSchema = new Schema<IFlower>(
  {
    name: { type: String, required: [true, " is required"] },
    description: { type: String, required: [true, " is required"] },
    uses: { type: String, required: [true, " is required"] },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    bloomDate: { type: String, required: true },
    color: { type: String, required: [true, " is required"] },
    category: { type: String, required: [true, " is required"] },
    fragrance: { type: String, required: [true, " is required"] },
    size: { type: Number, require: true },
    bloomingSeason: { type: String, required: [true, " is required"] },
    origin: { type: String, required: [true, " is required"] },
    rating: { type: Number, require: true },
  },
  { timestamps: true }
);

export const Flower = model<IFlower>("Flower", flowerSchema);
