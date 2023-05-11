import { NextFunction, Request, Response } from "express";
import { JwtService } from "../services/auth/token/jwt.service";
import { BadRequest, Forbidden, Unauthorized } from "../lib/Errors/errors";

const authMiddleware = (
  request: any,
  response: Response,
  next: NextFunction
) => {
  if (!request.headers.authorization) {
    throw new Forbidden("A Bearer token must be provided to be auth");
  }

  const jwtService = new JwtService();

  const token = jwtService.getJwtToken(request.headers.authorization);

  try {
    const decoded = jwtService.verify(token);
    request.user = decoded;
  } catch (e) {
    throw new Unauthorized("User are unauthorized");
  }

  next();
};


export {authMiddleware}
