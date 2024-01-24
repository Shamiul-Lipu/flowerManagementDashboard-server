import { IFlower } from "./flower.interface";
import { Flower } from "./flower.model";

const getAllFlower = async () => {
  const result = await Flower.find();
  return result;
};

const addFlower = async (payload: IFlower) => {
  const result = await Flower.create(payload);
  return result;
};

const updateFlower = async (id: string, payload: Partial<IFlower>) => {
  const result = await Flower.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFlower = async (id: string) => {
  const result = await Flower.findByIdAndDelete(id);
  return result;
};

const deleteAllFlower = async () => {
  await Flower.collection.drop();
  return null;
};

export const FlowerServices = {
  getAllFlower,
  addFlower,
  updateFlower,
  deleteFlower,
  deleteAllFlower,
};
