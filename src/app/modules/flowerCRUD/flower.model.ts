import { Schema, model } from "mongoose";
import { IFlower } from "./flower.interface";

const flowerSchema = new Schema<IFlower>(
  {
    name: { type: String, required: [true, "name is required"] },
    description: { type: String, required: [true, "description is required"] },
    uses: { type: String, required: [true, "uses is required"] },
    price: { type: Number, require: [true, "price is required"] },
    quantity: { type: Number, require: [true, "quantity is required"] },
    bloomDate: { type: String, required: [true, "bloomDate is required"] },
    color: { type: String, required: [true, "color is required"] },
    category: { type: String, required: [true, "category is required"] },
    fragrance: { type: String, required: [true, "fragrance is required"] },
    size: { type: Number, require: [true, "size is required"] },
    bloomingSeason: {
      type: String,
      required: [true, "bloomingSeason is required"],
    },
    origin: { type: String, required: [true, "origin is required"] },
    rating: { type: Number, require: [true, "rating is required"] },
  },
  { timestamps: true }
);

export const Flower = model<IFlower>("Flower", flowerSchema);
