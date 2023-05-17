import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../validators/validator";
import { PrismaUserRepository } from "../repositories/prisma/prisma.user.repository";
import { PrismaShelfRepository } from "../repositories/prisma/prisma.shelf.repository";
import { ShelfService } from "../services/shelf/shelf.service";
import ResponseHelper from "../lib/HttpResponse/ResponseHelper";
import { UpdateShelfData } from "../repositories/shelf.repository";
import { BookShelfService } from "../services/book-shelf/book-shelf.service";
import { PrismaAuthorRepository } from "../repositories/prisma/prisma.author.repository";
import { PrismaBookCategoryRepository } from "../repositories/prisma/prisma.book-category.repository";
import { PrismaBookShelfRepository } from "../repositories/prisma/prisma.book-shelf.repository";
import { PrismaBookRepository } from "../repositories/prisma/prisma.book.repository";
import { PrismaPublisherRepository } from "../repositories/prisma/prisma.publisher.repository";

class ShelfController {
  async create(request: any, response: Response, next: NextFunction) {
    const userRepository = new PrismaUserRepository();
    const shelfRepository = new PrismaShelfRepository();

    const shelfService = new ShelfService(shelfRepository, userRepository);

    try {
      const createdShelf = await shelfService.createShelf(
        request.body.name,
        request.user.user_id
      );

      return ResponseHelper.created(response, createdShelf);
    } catch (e) {
      next(e);
    }
  }

  async update(request: any, response: Response, next: NextFunction) {
    const userRepository = new PrismaUserRepository();
    const shelfRepository = new PrismaShelfRepository();
    const shelfService = new ShelfService(shelfRepository, userRepository);

    const updateShelfData = {
      user_id: request.user.user_id,
      name: request.body.name,
      id: Number(request.params.shelfId),
    } as UpdateShelfData;

    try {
      const updatedShelf = await shelfService.updateShelf(updateShelfData);

      return ResponseHelper.ok(response, updatedShelf);
    } catch (e) {
      next(e);
    }
  }

  async deleteShelf(request: any, response: Response, next: NextFunction) {
    validateRequest(request, response);
    const userRepository = new PrismaUserRepository();
    const shelfRepository = new PrismaShelfRepository();
    const shelfService = new ShelfService(shelfRepository, userRepository);

    try {
      await shelfService.deleteShelf(Number(request.params.bookId));
      return ResponseHelper.deleted(response);
    } catch (e) {
      next(e);
    }
  }

  public async getShelfBooks(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    validateRequest(request, response);

    const bookShelfService = new BookShelfService(
      new PrismaBookRepository(),
      new PrismaShelfRepository(),
      new PrismaPublisherRepository(),
      new PrismaAuthorRepository(),
      new PrismaBookCategoryRepository(),
      new PrismaUserRepository(),
      new PrismaBookShelfRepository()
    );

    try {
      const shelfBooks = await bookShelfService.getShelfBooks(
        Number(request.params.shelfId)
      );

      return ResponseHelper.ok(response, shelfBooks);
    } catch (e) {
      return next(e);
    }
  }
}

const shelfController = new ShelfController();

export default shelfController;
