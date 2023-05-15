import { NextFunction, Request, Response } from "express";
import { BookShelfDto } from "../dto/book-shelf.dto";
import { validateRequest } from "../validators/validator";
import { BookService } from "../services/book/book.service";
import { PrismaBookRepository } from "../repositories/prisma/prisma.book.repository";
import { PrismaPublisherRepository } from "../repositories/prisma/prisma.publisher.repository";
import { PrismaAuthorRepository } from "../repositories/prisma/prisma.author.repository";
import { PrismaBookCategoryRepository } from "../repositories/prisma/prisma.book-category.repository";
import { BookShelfService } from "../services/book-shelf/book-shelf.service";
import { PrismaShelfRepository } from "../repositories/prisma/prisma.shelf.repository";

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
      user_id: request.body.user_id,
    } as BookShelfDto;

    const bookShelfService = new BookShelfService(
      new PrismaBookRepository(),
      new PrismaShelfRepository(),
      new PrismaPublisherRepository(),
      new PrismaAuthorRepository(),
      new PrismaBookCategoryRepository()
    );

    const book = await bookShelfService.addBookInShelf(bookShelfDto);
  }
}

const bookController = new BookController();

export { bookController };
