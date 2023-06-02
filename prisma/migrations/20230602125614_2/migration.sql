-- DropForeignKey
ALTER TABLE "AuthorsOnBooks" DROP CONSTRAINT "AuthorsOnBooks_author_id_fkey";

-- DropForeignKey
ALTER TABLE "AuthorsOnBooks" DROP CONSTRAINT "AuthorsOnBooks_book_id_fkey";

-- AddForeignKey
ALTER TABLE "AuthorsOnBooks" ADD CONSTRAINT "AuthorsOnBooks_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorsOnBooks" ADD CONSTRAINT "AuthorsOnBooks_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
