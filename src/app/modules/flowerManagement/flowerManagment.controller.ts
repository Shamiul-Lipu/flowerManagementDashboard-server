import catchAsync from "../../utils/catchAsync";
import { FlowerManagmentServices } from "./flowerManagment.service";

const salesManagement = catchAsync(async (req, res) => {
  const result = await FlowerManagmentServices.salesManagement(req.body);

  res.json({
    sucess: true,
    statusCode: 200,
    message: "Sales created successfully",
    data: result,
  });
});

const salesHistory = catchAsync(async (req, res) => {
  const result = await FlowerManagmentServices.salesHistory(req.body);

  res.json({
    sucess: true,
    statusCode: 200,
    message: "Sales history retrieved successfully",
    data: result,
  });
});

export const FlowerManagmentControllers = {
  salesManagement,
  salesHistory,
};
