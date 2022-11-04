const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = async (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong! please try Again Later",
  };
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "castError") {
    customError.msg = `No item with matching id '${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `Value entered for  ${Object.keys(
      err.keyValue
    )} field already exists ,please choose a different value`;
  }
  res.status(customError.statusCode).json({ msg: customError.msg });
};
module.exports = errorHandlerMiddleware;
