import { NextFunction, Request, Response } from "express";
import { Forbidden } from "../lib/Errors/errors";

export const shelfMiddleware = (request: any, response: Response, next: NextFunction) => {
  const shelfUserId = request.body.user_id;
  const authenticatedUserId = request.user.user_id;

  if(shelfUserId !== authenticatedUserId) {
    throw new Forbidden('A shelf can not be create with another User ID');
  }

  next();
}