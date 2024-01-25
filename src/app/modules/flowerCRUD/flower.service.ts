import { filter } from "../../utils/filter";
import { sortMinMaxQuery } from "../../utils/sortMaxMinQuery";
import { IFlower } from "./flower.interface";
import { Flower } from "./flower.model";
import { Types } from "mongoose";

const getAllFlower = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  let filteredQuery = filter(Flower.find(), queryObj);

  // Pagination
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 100;
  const startIndex = (page - 1) * limit;

  filteredQuery = filteredQuery.skip(startIndex).limit(limit);

  // Apply sorting, min, and max using sortMinMaxQuery
  filteredQuery = sortMinMaxQuery(filteredQuery, query);

  // Execute the final query
  const totalResults = await Flower.countDocuments(filteredQuery);
  const results = await filteredQuery.exec();

  return {
    results,
    meta: {
      page,
      limit,
      total: totalResults,
    },
  };
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

const bulkDeleteFlower = async (arrOfFlowersId: Types.ObjectId[]) => {
  const result = await Flower.deleteMany({ _id: { $in: arrOfFlowersId } });
  return result;
};

export const FlowerServices = {
  getAllFlower,
  addFlower,
  updateFlower,
  deleteFlower,
  bulkDeleteFlower,
};
