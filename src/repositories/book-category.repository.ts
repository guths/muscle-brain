import { BookCategory } from "@prisma/client";

export interface CreateBookCategoryData {
    name: string;
}

export interface BookCategoryRepository {
    create(createBookCategoryData: CreateBookCategoryData): Promise<BookCategory>
    findUnique(whereFields: object): Promise<BookCategory | null>
}