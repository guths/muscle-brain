import { NextFunction, Request, Response } from "express";
import { getReasonPhrase } from "http-status-codes";
import { GeneralError } from "./errors";
import Logger from "../Logger/Logger";

const errorHandler = (
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let error = {
    status: "error",
    name: getReasonPhrase(500),
    code: 500,
    message: err.message,
  };

  if (err instanceof GeneralError) {
    error = {
      status: "error",
      name: getReasonPhrase(err.getCode()),
      code: err.getCode(),
      message: err.message || getReasonPhrase(err.getCode()),
    };

    Logger.error("API Reponse Error", error);
    return response.status(error.code).json(error);
  }

  Logger.error("API Reponse Critical", error);
  return response.status(error.code).json(error);
};

export { errorHandler };
