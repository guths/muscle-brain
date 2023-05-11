import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../validators/validator";
import { PrismaUserRepository } from "../repositories/prisma/prisma.user.repository";
import { PrismaShelfRepository } from "../repositories/prisma/prisma.shelf.repository";
import { ShelfService } from "../services/shelf/shelf.service";
import ResponseHelper from "../lib/HttpResponse/ResponseHelper";
import { UpdateShelfData } from "../repositories/shelf.repository";

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

  async update(request: any, response: Response, next: NextFunction) {
    validateRequest(request, response);
    const userRepository = new PrismaUserRepository();
    const shelfRepository = new PrismaShelfRepository();
    const shelfService = new ShelfService(shelfRepository, userRepository);
    const updateShelfData = {
      user_id: request.user.user_id,
      name: request.body.name,
      id: Number(request.params.bookId),
    } as UpdateShelfData;

    try {
      const updatedShelf = await shelfService.updateShelf(updateShelfData);

      return ResponseHelper.ok(response, updatedShelf);
    } catch (e) {
      next(e);
    }
  }

  async deleteShelf(request: Request, response: Response, next: NextFunction) {
    validateRequest(request, response);
    const userRepository = new PrismaUserRepository();
    const shelfRepository = new PrismaShelfRepository();
    const shelfService = new ShelfService(shelfRepository, userRepository);

    try {
      const deletedShelf = await shelfService.deleteShelf(
        Number(request.params.bookId)
      );
      console.log(deletedShelf);
      return ResponseHelper.deleted(response);
    } catch (e) {
      next(e);
    }
  }
}

const shelfController = new ShelfController();

export default shelfController;
