import { Schema } from "mongoose";
import { IFlowerSales } from "./flowerManagment.interface";
import { model } from "mongoose";

const flowerManagmentSchema = new Schema<IFlowerSales>(
  {
    sellerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, " Product Id is required"],
      ref: "Flower",
    },
    buyer: { type: String, required: [true, "Buyer name is requred"] },
    saleDate: { type: Date, required: [true, "date is required"] },
    quantitySold: {
      type: Number,
      required: [true, "Sold Quantity is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Sold Quantity is required"],
    },
    purchesPoints: {
      type: Number,
    },
    redeemPurchesPointsUsed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const FlowerManagment = model<IFlowerSales>(
  "Sales",
  flowerManagmentSchema
);
