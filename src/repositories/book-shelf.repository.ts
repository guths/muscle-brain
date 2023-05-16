import { BooksOnShelves } from "@prisma/client";

export interface BookShelfRepository {
  findFirst(whereFields: object): Promise<BooksOnShelves | null>;
  deleteMany(whereFields: object): Promise<object>
}
