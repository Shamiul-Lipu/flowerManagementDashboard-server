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

  const caseInsensitiveQueryObj: Record<string, unknown> = {};
  Object.keys(queryObj).forEach((key) => {
    caseInsensitiveQueryObj[key] = new RegExp(queryObj[key] as string, "i");
  });

  modelQuery = modelQuery.find(caseInsensitiveQueryObj);

  return modelQuery;
};
