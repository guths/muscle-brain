import { Book } from "@prisma/client";
import { BookRepository } from "../book.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaBookRepository implements BookRepository {
  findFirst(whereFields: object): Promise<Book | null> {
    return prisma.book.findFirst({
      where: whereFields
    })
  }
  create(createBookData: any): Promise<Book> {
    return prisma.book.create({
        data: createBookData
    })
  }
  findUnique(whereFields: object): Promise<Book | null> {
    return prisma.book.findUnique({
      where: whereFields,
    });
  }
}
