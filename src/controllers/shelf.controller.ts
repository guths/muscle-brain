import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../validators/validator";
import { PrismaUserRepository } from "../repositories/prisma/prisma.user.repository";
import { PrismaShelfRepository } from "../repositories/prisma/prisma.shelf.repository";
import { ShelfService } from "../services/shelf/shelf.service";
import ResponseHelper from "../lib/HttpResponse/ResponseHelper";

class ShelfController {
  async create(request: Request, response: Response, next: NextFunction) {
    validateRequest(request, response);

    const userRepository = new PrismaUserRepository();
    const shelfRepository = new PrismaShelfRepository();

    const shelfService = new ShelfService(shelfRepository, userRepository);

    try {
      const createdShelf = await shelfService.createShelf(
        request.body.name,
        request.body.user_id
      );

      return ResponseHelper.created(response, createdShelf);
    } catch (e) {
      next(e);
    }
  }
}

const shelfController = new ShelfController();

export default shelfController;
