import { Book } from "@prisma/client";
import { BookRepository } from "../book.repository";
import prisma from "../../lib/Prisma/Prisma";

export class PrismaBookRepository implements BookRepository {
    findUnique(whereFields: object): Promise<Book | null> {
        return prisma.book.findUnique({
            where: whereFields
        })
    }
}