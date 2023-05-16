import { Book } from "@prisma/client";

export interface BookRepository {
    create(createBookData: object): Promise<Book>
    findUnique(whereFields: object): Promise<Book | null>
    findFirst(whereFields: object): Promise<Book | null> 
}