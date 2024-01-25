import { Schema } from "mongoose";
import { IFlowerSales } from "./flowerManagment.interface";
import { model } from "mongoose";

const flowerManagmentSchema = new Schema<IFlowerSales>({
  sellerUserId: {
    type: Schema.Types.ObjectId,
    required: [true, " Seller User Id is required"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, " Product Id is required"],
  },
  buyer: { type: String, required: [true, "Buyer name is requred"] },
  saleDate: { type: Date, required: [true, "date is required"] },
  quantitySold: { type: Number, required: [true, "Sold Quantity is required"] },
  totalAmount: { type: Number, required: [true, "Sold Quantity is required"] },
});

export const FlowerManagment = model<IFlowerSales>(
  "Sales",
  flowerManagmentSchema
);
