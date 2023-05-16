import { BooksOnShelves } from "@prisma/client";
import { BookShelfRepository } from "../book-shelf.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaBookShelfRepository implements BookShelfRepository {
  findFirst(whereFields: object): Promise<BooksOnShelves | null> {
    return prisma.booksOnShelves.findFirst({
      where: whereFields,
    });
  }

  deleteMany(whereFields: object): Promise<object> {
    return prisma.booksOnShelves.deleteMany({
      where: whereFields,
    });
  }
}
