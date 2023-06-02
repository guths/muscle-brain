import { PrismaAuthorRepository } from "../../repositories/prisma/prisma.author.repository";
import { PrismaBookCategoryRepository } from "../../repositories/prisma/prisma.book-category.repository";
import { PrismaBookRepository } from "../../repositories/prisma/prisma.book.repository";
import { PrismaPublisherRepository } from "../../repositories/prisma/prisma.publisher.repository";
import { CreateBookDto } from "../../dto/book.dto";
import { BookService } from "./book.service";
import prisma from "../../lib/Prisma/Prisma";

describe("Book service Test", () => {
  beforeEach(async () => {
    await prisma.book.deleteMany();
    await prisma.bookCategory.deleteMany();
    await prisma.publisher.deleteMany();
    await prisma.author.deleteMany();
  });

  it("should create a book", async () => {
    const bookService = new BookService(
      new PrismaBookRepository(),
      new PrismaPublisherRepository(),
      new PrismaAuthorRepository(),
      new PrismaBookCategoryRepository()
    );

    const bookDto = {
      title: "Senhor das moscas",
      authors: ["Jonathan Guths", "Valmyr Grosskopf"],
      average_rating: 5,
      description: "Integration test",
      publisher_name: "Guilherme Oldoni",
      page_count: 10,
      language: "EN",
      category_names: ["Horror", "Fiction"],
      main_category: "Integration test",
      published_date: new Date(),
      google_book_id: "TESTE",
    } as CreateBookDto;

    const book = await bookService.createBook(bookDto);

    expect(book.id).not.toBeNull();

    const categories = await prisma.categoriesOnBooks.findMany({
      where: {
        book_id: book.id,
      },
    });

    expect(categories.length).toBe(2);

    const authors = await prisma.authorsOnBooks.findMany({
      where: {
        book_id: book.id,
      },
    });

    expect(authors.length).toBe(2);
  });

  it('should create book with existed authors and categories without errors', async () => {
    const bookService = new BookService(
        new PrismaBookRepository(),
        new PrismaPublisherRepository(),
        new PrismaAuthorRepository(),
        new PrismaBookCategoryRepository()
      );
  
      const bookDto = {
        title: "Senhor das moscas",
        authors: ["Jonathan Guths", "Valmyr Grosskopf"],
        average_rating: 5,
        description: "Integration test",
        publisher_name: "Guilherme Oldoni",
        page_count: 10,
        language: "EN",
        category_names: ["Horror", "Fiction"],
        main_category: "Integration test",
        published_date: new Date(),
        google_book_id: "TESTE",
      } as CreateBookDto;
  
      const book = await bookService.createBook(bookDto);
  
      expect(book.id).not.toBeNull();

      const bookDtoTwo = {
        title: "Senhor das moscas 2",
        authors: ["Jonathan Guths", "Valmyr Grosskopf"],
        average_rating: 5,
        description: "Integration test",
        publisher_name: "Guilherme Oldoni",
        page_count: 10,
        language: "EN",
        category_names: ["Horror", "Fiction"],
        main_category: "Integration test",
        published_date: new Date(),
        google_book_id: "TESTE2",
      } as CreateBookDto;
  
      const bookTwo = await bookService.createBook(bookDtoTwo);

      expect(book.id).not.toBeNull();
  })
});
