import { Request, NextFunction, Response } from "express";
import { BookService } from "../services/book/book.service";
import { PrismaBookRepository } from "../repositories/prisma/prisma.book.repository";
import { PrismaPublisherRepository } from "../repositories/prisma/prisma.publisher.repository";
import { PrismaAuthorRepository } from "../repositories/prisma/prisma.author.repository";
import { PrismaBookCategoryRepository } from "../repositories/prisma/prisma.book-category.repository";
import { errorHandler } from "../lib/Errors/error.handler";

const bookMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const bookId = request.body.book_id
    ? request.body.book_id
    : request.params.bookId;

  const bookService = new BookService(
    new PrismaBookRepository(),
    new PrismaPublisherRepository(),
    new PrismaAuthorRepository(),
    new PrismaBookCategoryRepository()
  );

  try {
    await bookService.findBookById(bookId);
  } catch (e) {
    errorHandler(e, request, response, next);
  }

  next();
};

export { bookMiddleware };
