import mongoose from "mongoose";

const handleDuplicateError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;
  const message = "Duplicate Entry";

  const matches = err.message.match(/"(.*?)"/);
  const errorMessage = `Duplicate value for ${matches![1]}`;

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails: err,
  };
};

export default handleDuplicateError;
