import catchAsync from "../../utils/catchAsync";
import { FlowerServices } from "./flower.service";

const getAllFlower = catchAsync(async (req, res) => {
  const result = await FlowerServices.getAllFlower();
  // console.log("req", req.user);
  res.json({
    sucess: true,
    statusCode: 201,
    message: "All Flower retrived successfully",
    data: result,
  });
});

const addFlower = catchAsync(async (req, res) => {
  const result = await FlowerServices.addFlower(req.body);
  // console.log("req", req.user);
  res.json({
    sucess: true,
    statusCode: 201,
    message: "Flower added successfully",
    data: result,
  });
});

const updateFlower = catchAsync(async (req, res) => {
  const { flowerId } = req.params;
  // console.log(req.params, req.body);
  const result = await FlowerServices.updateFlower(flowerId, req.body);

  res.json({
    success: true,
    statusCode: 200,
    message: "Flower updated successfully",
    data: result,
  });
});

const deleteFlower = catchAsync(async (req, res) => {
  const { flowerId } = req.params;
  await FlowerServices.deleteFlower(flowerId);

  res.json({
    success: true,
    statusCode: 200,
    message: "Flower deleted successfully",
    data: null,
  });
});

const deleteAllFlower = catchAsync(async (req, res) => {
  await FlowerServices.deleteAllFlower();

  res.json({
    success: true,
    statusCode: 200,
    message: "Deleted all flower successfully",
    data: null,
  });
});

export const FlowerControllers = {
  getAllFlower,
  addFlower,
  updateFlower,
  deleteFlower,
  deleteAllFlower,
};
