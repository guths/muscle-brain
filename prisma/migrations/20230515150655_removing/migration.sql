/*
  Warnings:

  - You are about to drop the column `genre_id` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_genre_id_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "genre_id",
ALTER COLUMN "average_rating" DROP NOT NULL;

-- DropTable
DROP TABLE "Genre";
