import { BooksOnShelves } from "@prisma/client";

export interface BookShelfRepository {
  findFirst(whereFields: object): Promise<BooksOnShelves | null>;
}
