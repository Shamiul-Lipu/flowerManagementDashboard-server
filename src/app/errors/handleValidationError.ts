/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorValues = Object.values(err.errors);
  const issues: any = [];

  const statusCode = 400;
  const message = "Validation Error";

  errorValues.forEach((errObj) => {
    issues.push({
      path: errObj.path,
      message: errObj.message,
    });
  });

  const errorStr = issues
    ?.map((issue: any) => issue.message)
    ?.map((str: any) => `${str}`)
    .join(". ")
    .toLowerCase();

  const errorMessage = errorStr || err?.message.toLowerCase();

  //   console.log(errorMess);

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails: { issues: errorValues, name: err?.name },
  };
};

export default handleValidationError;
