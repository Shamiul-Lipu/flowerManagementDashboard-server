import mongoose from "mongoose";

export const handleCastError = (err: mongoose.Error.CastError) => {
  const statusCode = 400;
  const message = "Invalid ID";
  const errorMessage = `${err?.value} is not a valid ID!`;

  const match = err?.stringValue.match(/"([^"]+)"/);

  const stringValue = match && match[1];

  //   const modifiedMessage = err?.message.replace(/\\"/gi, " ");
  //   console.log(modifiedMessage);

  const matched = err?.message.match(/"([^"]+)"/);
  const modifiedMessage = matched
    ? `Cast to ObjectId failed for value '${matched[1]}' (type string) at path '_id' for model '${err.model.modelName}'`
    : "";

  // TODO : sent one err message or modifiedMessage

  const errorDetails = {
    ...err,
    stringValue: stringValue,
    name: "CastError",
    // message: err.message,
    message: modifiedMessage,
  };

  return {
    statusCode,
    message,
    errorMessage,
    errorDetails,
  };
};
