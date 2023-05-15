/*
  Warnings:

  - The `list_price_amount` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "list_price_amount",
ADD COLUMN     "list_price_amount" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "BooksOnShelves" (
    "book_id" INTEGER NOT NULL,
    "shelf_id" INTEGER NOT NULL,

    CONSTRAINT "BooksOnShelves_pkey" PRIMARY KEY ("book_id","shelf_id")
);

-- AddForeignKey
ALTER TABLE "BooksOnShelves" ADD CONSTRAINT "BooksOnShelves_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksOnShelves" ADD CONSTRAINT "BooksOnShelves_shelf_id_fkey" FOREIGN KEY ("shelf_id") REFERENCES "Shelf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
