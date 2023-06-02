import { NextFunction, Request, Response } from "express";
import { BookShelfDto } from "../dto/book-shelf.dto";
import { validateRequest } from "../validators/validator";
import { PrismaBookRepository } from "../repositories/prisma/prisma.book.repository";
import { PrismaPublisherRepository } from "../repositories/prisma/prisma.publisher.repository";
import { PrismaAuthorRepository } from "../repositories/prisma/prisma.author.repository";
import { PrismaBookCategoryRepository } from "../repositories/prisma/prisma.book-category.repository";
import { BookShelfService } from "../services/book-shelf/book-shelf.service";
import { PrismaShelfRepository } from "../repositories/prisma/prisma.shelf.repository";
import { PrismaUserRepository } from "../repositories/prisma/prisma.user.repository";
import ResponseHelper from "../lib/HttpResponse/ResponseHelper";
import { PrismaBookShelfRepository } from "../repositories/prisma/prisma.book-shelf.repository";

class BookController {
  public async addBookShelf(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    validateRequest(request, response);

    const bookShelfDto = {
      google_book_id: request.body.google_book_id,
      shelf_id: request.body.shelf_id,
    } as BookShelfDto;
            
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
      const book = await bookShelfService.addBookInShelf(bookShelfDto);

      return ResponseHelper.ok(response, book);
    } catch (e) {
      next(e);
    }
  }

  public async removeBookShelf(
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
      await bookShelfService.removeBookShelf(
        request.body.book_id,
        request.body.shelf_id,
      );

      return ResponseHelper.deleted(response);
    } catch (e) {
      next(e);
    }
  }
}

const bookController = new BookController();

export { bookController };
