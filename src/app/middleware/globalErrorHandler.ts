import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { handleCastError } from "../errors/handleCastErrors";
import handleZodError from "../errors/handleZodError";
import { ZodError } from "zod";
import handleValidationError from "../errors/handleValidationError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleUnauthorizedError from "../errors/handleUnauthorizedError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err?.message || "Something went wrong!";
  let errorMessage = "" || "Something went wrong!";
  let errorDetails;
  let stack;

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = simplifiedError?.errorDetails;
    stack = err?.stack;
  } else if (err instanceof mongoose.Error.ValidationError) {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = simplifiedError?.errorDetails;
    stack = err?.stack;
  } else if (err?.code && err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = simplifiedError?.errorDetails;
    stack = err?.stack;
  } else if (
    err instanceof mongoose.Error.CastError ||
    err?.name === "CastError"
  ) {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = simplifiedError?.errorDetails;
    stack = err?.stack;
  } else if (message === "Unauthorized Access") {
    const simplifiedError = handleUnauthorizedError();
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = simplifiedError?.errorDetails;
    stack = null;
  } else if (err instanceof Error) {
    errorMessage = "Error!";
    errorDetails = err;
    stack = err?.stack;
  }

  // The response for all errors
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    // MyError: err,
    stack,
  });
};

export default globalErrorHandler;
