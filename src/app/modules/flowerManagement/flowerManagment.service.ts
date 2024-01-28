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
  const inputYear = payload.year as number;

  // Calculate the start and end of the specified year
  const yearStart = new Date(inputYear, 0, 1);
  const yearEnd = new Date(inputYear + 1, 0, 0);
  yearEnd.setHours(23, 59, 59, 999);

  const result = await FlowerManagment.aggregate([
    {
      $match: {
        saleDate: { $gte: yearStart, $lte: yearEnd },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$saleDate" },
          month: { $month: "$saleDate" },
        },
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
      $addFields: {
        month: "$_id.month",
      },
    },
    {
      $addFields: {
        monthName: {
          $switch: {
            branches: [
              { case: { $eq: ["$month", 1] }, then: "January" },
              { case: { $eq: ["$month", 2] }, then: "February" },
              { case: { $eq: ["$month", 3] }, then: "March" },
              { case: { $eq: ["$month", 4] }, then: "April" },
              { case: { $eq: ["$month", 5] }, then: "May" },
              { case: { $eq: ["$month", 6] }, then: "June" },
              { case: { $eq: ["$month", 7] }, then: "July" },
              { case: { $eq: ["$month", 8] }, then: "August" },
              { case: { $eq: ["$month", 9] }, then: "September" },
              { case: { $eq: ["$month", 10] }, then: "October" },
              { case: { $eq: ["$month", 11] }, then: "November" },
              { case: { $eq: ["$month", 12] }, then: "December" },
            ],
            default: "InvalidMonth",
          },
        },
      },
    },
    // Group by year and month name for the total yearly sales
    {
      $group: {
        _id: { year: "$_id.year", monthName: "$monthName" },
        monthlyData: { $push: "$$ROOT" },
        totalYearlyAmount: { $sum: "$totalAmount" },
        totalYearlyQuantity: { $sum: "$totalQuantity" },
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

// const monthAndYearlySalesHistory = async () => {
//   // Specify the desired year
//   const inputYear = 2023; // Change this to the desired year

//   // Calculate the start and end of the specified year
//   const yearStart = new Date(inputYear, 0, 1);
//   const yearEnd = new Date(inputYear + 1, 0, 0);
//   yearEnd.setHours(23, 59, 59, 999);
//   const result = await FlowerManagment.aggregate([
//     {
//       $match: {
//         saleDate: { $gte: yearStart, $lte: yearEnd },
//       },
//     },
//     {
//       $group: {
//         _id: {
//           year: { $year: "$saleDate" },
//           month: { $month: "$saleDate" },
//         },
//         totalAmount: { $sum: "$totalAmount" },
//         totalQuantity: { $sum: "$quantitySold" },
//         bestSeller: { $max: "$sellerUserId" },
//         bestProduct: { $max: "$productId" },
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "bestSeller",
//         foreignField: "_id",
//         as: "bestSellerDetails",
//       },
//     },
//     {
//       $lookup: {
//         from: "flowers",
//         localField: "bestProduct",
//         foreignField: "_id",
//         as: "bestProductDetails",
//       },
//     },
//     {
//       $project: {
//         "bestSellerDetails.password": 0,
//       },
//     },
//     // Group by year for the total yearly sales
//     {
//       $group: {
//         _id: "$_id.year",
//         monthlyData: { $push: "$$ROOT" },
//         totalYearlyAmount: { $sum: "$totalAmount" },
//         totalYearlyQuantity: { $sum: "$totalQuantity" },
//       },
//     },
//   ]);

//   return result;
// };
