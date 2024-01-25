import mongoose from "mongoose";
import { IFlowerSales } from "./flowerManagment.interface";
import { FlowerManagment } from "./flowerManagment.model";
import { Flower } from "../flowerCrud/flower.model";

const salesManagement = async (payload: IFlowerSales) => {
  let createSale;

  const selectedflower = await Flower.findById(payload.productId);

  if (!selectedflower) {
    throw new Error("Flower not found!");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    createSale = await FlowerManagment.create([payload], { session }); //creating sales on fales management db

    const newQuantity = selectedflower?.quantity - payload.quantitySold; // calculating new quantity
    selectedflower.quantity = newQuantity;

    await Flower.findByIdAndUpdate(selectedflower.id, selectedflower, {
      new: true,
      runValidators: true,
      session, // update flower with new quantity
    });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new Error("Failed to create sales!");
  }

  return createSale;
};

const salesHistory = async (payload: Record<string, unknown>) => {
  const field = `$${payload.field}`;
  // console.log(payload.field, { field }); week dayOfMonth month year

  const result = await FlowerManagment.aggregate([
    {
      $group: {
        _id: { [field]: "$saleDate" },
        totalSales: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  return result;
};

export const FlowerManagmentServices = {
  salesManagement,
  salesHistory,
};
