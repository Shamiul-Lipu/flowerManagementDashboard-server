import catchAsync from "../../utils/catchAsync";
import { FlowerServices } from "./flower.service";

const getAllFlower = catchAsync(async (req, res) => {
  const result = await FlowerServices.getAllFlower(req.query);
  const { meta, results } = result;
  res.json({
    sucess: true,
    statusCode: 200,
    message: "All Flower retrieved successfully",
    meta,
    data: results,
  });
});

const addFlower = catchAsync(async (req, res) => {
  const result = await FlowerServices.addFlower(req.body);

  res.json({
    sucess: true,
    statusCode: 201,
    message: "Flower added successfully",
    data: result,
  });
});

const updateFlower = catchAsync(async (req, res) => {
  const { flowerId } = req.params;

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
    statusCode: 202,
    message: "Flower deleted successfully",
    data: null,
  });
});

const bulkDeleteFlower = catchAsync(async (req, res) => {
  await FlowerServices.bulkDeleteFlower(req.body);

  res.json({
    success: true,
    statusCode: 202,
    message: "Flower deleted successfully",
    data: null,
  });
});

export const FlowerControllers = {
  getAllFlower,
  addFlower,
  updateFlower,
  deleteFlower,
  bulkDeleteFlower,
};
