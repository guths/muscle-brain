import { BookCategory } from "@prisma/client";
import {
  CreateBookCategoryData,
  BookCategoryRepository,
} from "../book-category.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaBookCategoryRepository implements BookCategoryRepository {
  create(
    createBookCategoryData: CreateBookCategoryData
  ): Promise<BookCategory> {
    return prisma.bookCategory.create({
      data: createBookCategoryData,
    });
  }
  findUnique(whereFields: object): Promise<BookCategory | null> {
    return prisma.bookCategory.findUnique({
      where: whereFields,
    });
  }

  findFirst(whereFields: object): Promise<BookCategory | null> {
    return prisma.publisher.findFirst({
      where: whereFields,
    });
  }
}
