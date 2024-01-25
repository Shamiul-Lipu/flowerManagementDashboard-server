import { Query } from "mongoose";

export type TQueryObj = {
  [key: string]: unknown;
  page?: string;
  limit?: string;
  searchTerm?: string;
  fields?: string;
  sortBy?: string;
  sortOrder?: string;
};

export const sortMinMaxQuery = <T>(
  filteredQuery: Query<T[], T>,
  query: TQueryObj
) => {
  // Price
  if (query?.minPrice) {
    filteredQuery = filteredQuery.find({ price: { $gte: query.minPrice } });
  }

  if (query.maxPrice !== undefined) {
    filteredQuery = filteredQuery.find({ price: { $lte: query.maxPrice } });
  }

  // Size
  if (query.minSize !== undefined) {
    filteredQuery = filteredQuery.find({ size: { $gte: query.minSize } });
  }

  if (query.maxSize !== undefined) {
    filteredQuery = filteredQuery.find({ size: { $lte: query.maxSize } });
  }

  // Sorting logic
  // console.log(query);

  const allowedSortFields = ["name", "price", "size"];
  const { sortBy, sortOrder } = query;

  if (sortBy && allowedSortFields.includes(sortBy)) {
    const sortCriteria: Record<string, number> = {};
    sortCriteria[sortBy] = sortOrder === "desc" ? -1 : 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const castedSortCriteria: any = sortCriteria;
    filteredQuery = filteredQuery.sort(castedSortCriteria);
  }

  return filteredQuery;
};
