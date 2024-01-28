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

  if (selectedflower.isSelectedForDelete) {
    throw new Error("Flower not found!");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    createSale = await FlowerManagment.create([payload], { session }); //creating sales on fales management db

    const newQuantity = selectedflower?.quantity - payload.quantitySold; // calculating new quantity

    selectedflower.quantity = newQuantity;

    if (newQuantity <= 0 && selectedflower?.isSelectedForDelete !== undefined) {
      selectedflower.isSelectedForDelete = true;
    }

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

const todaysSalesHistory = async () => {
  // Calculate the start and end of today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const result = await FlowerManagment.aggregate([
    {
      $match: {
        saleDate: { $gte: todayStart, $lte: todayEnd },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$totalAmount" },
        totalQuantity: { $sum: "$quantitySold" },
        bestSeller: { $max: "$sellerUserId" },
        bestProduct: { $max: "$productId" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "bestSeller",
        foreignField: "_id",
        as: "bestSellerDetails",
      },
    },
    {
      $lookup: {
        from: "flowers",
        localField: "bestProduct",
        foreignField: "_id",
        as: "bestProductDetails",
      },
    },
    {
      $project: {
        "bestSellerDetails.password": 0,
      },
    },
  ]);

  return result;
};

const lastWeekSalesHistory = async () => {
  // Calculate the date 7 days ago
  const last7DaysDate = new Date();
  last7DaysDate.setDate(last7DaysDate.getDate() - 7);
  const result = await FlowerManagment.aggregate([
    {
      $match: {
        saleDate: { $gte: last7DaysDate },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$totalAmount" },
        totalQuantity: { $sum: "$quantitySold" },
        bestSeller: { $max: "$sellerUserId" },
        bestProduct: { $max: "$productId" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "bestSeller",
        foreignField: "_id",
        as: "bestSellerDetails",
      },
    },
    {
      $lookup: {
        from: "flowers",
        localField: "bestProduct",
        foreignField: "_id",
        as: "bestProductDetails",
      },
    },
    {
      $project: {
        "bestSellerDetails.password": 0,
      },
    },
  ]);

  return result;
};

const monthAndYearlySalesHistory = async (payload: Record<string, unknown>) => {
  const inputYear = payload.year as number; // Specify the desired year

  const result = await FlowerManagment.aggregate([
    {
      $match: {
        saleDate: {
          $gte: new Date(inputYear, 0, 1),
          $lte: new Date(inputYear, 11, 31, 23, 59, 59, 999),
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$saleDate" },
        },
        totalAmount: { $sum: "$totalAmount" },
        totalQuantity: { $sum: "$quantitySold" },
        bestSeller: { $max: "$sellerUserId" },
        bestProduct: { $max: "$productId" },
      },
    },
    {
      $group: {
        _id: null,
        monthlyData: { $push: "$$ROOT" },
        totalYearlyAmount: { $sum: "$totalAmount" },
        totalYearlyQuantity: { $sum: "$totalQuantity" },
        bestYearlySeller: { $max: "$bestSeller" },
        bestYearlyProduct: { $max: "$bestProduct" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "bestYearlySeller",
        foreignField: "_id",
        as: "bestYearlySellerDetails",
      },
    },
    {
      $lookup: {
        from: "flowers",
        localField: "bestYearlyProduct",
        foreignField: "_id",
        as: "bestYearlyProductDetails",
      },
    },
    {
      $addFields: {
        monthNames: [
          "",
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
    },
    {
      $project: {
        _id: 0,
        monthlyData: {
          $map: {
            input: "$monthlyData",
            as: "monthData",
            in: {
              month: {
                $arrayElemAt: ["$monthNames", "$$monthData._id.month"],
              },
              totalAmount: "$$monthData.totalAmount",
              totalQuantity: "$$monthData.totalQuantity",
              bestSeller: {
                _id: "$$monthData.bestSeller",
                username: {
                  $arrayElemAt: ["$bestYearlySellerDetails.username", 0],
                },
              },
              bestProduct: { $arrayElemAt: ["$bestYearlyProductDetails", 0] },
            },
          },
        },
        totalYearlyAmount: 1,
        totalYearlyQuantity: 1,
        bestYearlySeller: {
          _id: "$bestYearlySeller",
          username: { $arrayElemAt: ["$bestYearlySellerDetails.username", 0] },
        },
        bestYearlyProduct: { $arrayElemAt: ["$bestYearlyProductDetails", 0] },
      },
    },
    {
      $addFields: {
        clientInput: payload,
      },
    },
  ]);

  return result;
};

export const FlowerManagmentServices = {
  salesManagement,
  todaysSalesHistory,
  lastWeekSalesHistory,
  monthAndYearlySalesHistory,
};
