import { Book } from "@prisma/client";

export interface BookRepository {
    findUnique(whereFields: object): Promise<Book | null>
}