import { Query } from "mongoose";

export const filter = <T>(
  modelQuery: Query<T[], T>,
  queryObj: Record<string, unknown>
) => {
  const excludedFiedls = [
    "page",
    "limit",
    "searchTerm",
    "sortBy",
    "sortOrder",
    "minPrice",
    "maxPrice",
    "minSize",
    "maxSize",
  ];

  excludedFiedls.forEach((query) => delete queryObj[query]);

  modelQuery = modelQuery.find(queryObj);

  return modelQuery;
};
