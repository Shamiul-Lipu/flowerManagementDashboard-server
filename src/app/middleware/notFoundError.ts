import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: "API Not Found!",
    errorMessage: `Route Not Found for ${req.originalUrl}`,
    errorDetails: "",
    stack: "",
  });
};

export default notFoundError;
