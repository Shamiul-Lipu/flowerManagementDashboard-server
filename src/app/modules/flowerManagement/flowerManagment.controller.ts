import catchAsync from "../../utils/catchAsync";
import { FlowerManagmentServices } from "./flowerManagment.service";

const salesManagement = catchAsync(async (req, res) => {
  const result = await FlowerManagmentServices.salesManagement(req.body);
  // console.log(req.body);
  res.json({
    sucess: true,
    statusCode: 200,
    message: "Sales created successfully",
    data: result,
  });
});

const todaysSalesHistory = catchAsync(async (req, res) => {
  const result = await FlowerManagmentServices.todaysSalesHistory();

  res.json({
    sucess: true,
    statusCode: 200,
    message: "Todays Sales history retrieved successfully",
    data: result,
  });
});
const lastWeekSalesHistory = catchAsync(async (req, res) => {
  const result = await FlowerManagmentServices.lastWeekSalesHistory();

  res.json({
    sucess: true,
    statusCode: 200,
    message: "Last weeks Sales history retrieved successfully",
    data: result,
  });
});
const monthAndYearlySalesHistory = catchAsync(async (req, res) => {
  const result = await FlowerManagmentServices.monthAndYearlySalesHistory(
    req.params
  );

  res.json({
    sucess: true,
    statusCode: 200,
    message: "This years Monthly Sales history retrieved successfully",
    data: result,
  });
});

const memberPurchesPoints = catchAsync(async (req, res) => {
  const result = await FlowerManagmentServices.memberPurchesPoints(req.user);

  res.json({
    sucess: true,
    statusCode: 200,
    message: "User Purchase point retrieved successfully",
    data: result,
  });
});

const getMyPurchesHistory = catchAsync(async (req, res) => {
  const result = await FlowerManagmentServices.getMyPurchesHistory(req.user);

  res.json({
    sucess: true,
    statusCode: 200,
    message: "My purches history retrieved successfully",
    data: result,
  });
});

export const FlowerManagmentControllers = {
  salesManagement,
  todaysSalesHistory,
  lastWeekSalesHistory,
  monthAndYearlySalesHistory,
  memberPurchesPoints,
  getMyPurchesHistory,
};
