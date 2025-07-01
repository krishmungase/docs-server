import logger from "../config/logger.js";
import { HttpError } from "http-errors";

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  const statusCode = error.statusCode || error.status || 500;

  res.status(statusCode).json({
    errors: [
      {
        type: error.name || "InternalServerError",
        msg: error.message || "Something went wrong",
        path: "",
        location: "",
      },
    ],
  });
};

export default errorHandler;
