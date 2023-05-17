import { NextFunction, Request, Response } from "express";
import { Forbidden, NotFound } from "../lib/Errors/errors";
import { ShelfService } from "../services/shelf/shelf.service";
import { PrismaShelfRepository } from "../repositories/prisma/prisma.shelf.repository";
import { PrismaUserRepository } from "../repositories/prisma/prisma.user.repository";
import { errorHandler } from "../lib/Errors/error.handler";

export const shelfMiddleware = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const shelfService = new ShelfService(
    new PrismaShelfRepository(),
    new PrismaUserRepository()
  );

  

  try {
    const shelf = await shelfService.findShelfById(
      Number(request.params.shelfId)
    );

    if (shelf?.user_id !== request.user.user_id) {
      throw new Forbidden("This shelf belongs to another user");
    }
  } catch (e) {
    errorHandler(e, request, response, next);
  }

  next();
};
