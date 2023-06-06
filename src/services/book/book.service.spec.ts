import { PrismaAuthorRepository } from "../../repositories/prisma/prisma.author.repository";
import { PrismaBookCategoryRepository } from "../../repositories/prisma/prisma.book-category.repository";
import { PrismaBookRepository } from "../../repositories/prisma/prisma.book.repository";
import { PrismaPublisherRepository } from "../../repositories/prisma/prisma.publisher.repository";
import { CreateBookDto } from "../../dto/book.dto";
import { BookService } from "./book.service";
import prisma from "../../lib/Prisma/Prisma";
import { Conflit, NotFound } from "../../lib/Errors/errors";

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

const bookService = new BookService(
  new PrismaBookRepository(),
  new PrismaPublisherRepository(),
  new PrismaAuthorRepository(),
  new PrismaBookCategoryRepository()
);

describe("Book service Test", () => {
  beforeEach(async () => {
    await prisma.book.deleteMany();
    await prisma.bookCategory.deleteMany();
    await prisma.publisher.deleteMany();
    await prisma.author.deleteMany();
  });

  it("should return book by id", async () => {
    const createdBook = await bookService.createBook(bookDto);

    const book = await bookService.findBookById(createdBook.id);

    expect(book.id).toEqual(createdBook.id);
  });

  it("should return not found exceptin when return book by id", async () => {
    expect(async () => await bookService.findBookById(100)).rejects.toThrow(
      new NotFound("Book not found")
    );
  });

  it("should create a book", async () => {
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

  it("should create book with existed authors and categories without errors", async () => {
    const book = await bookService.createBook(bookDto);

    expect(book.id).not.toBeNull();

    const bookTwo = await bookService.createBook(bookDtoTwo);

    expect(bookTwo.id).not.toBeNull();
  });

  it("should throw conflict error when google book id already exists", async () => {
    const book = await bookService.createBook(bookDto);

    expect(book.id).not.toBeNull();

    expect(async () => await bookService.createBook(bookDto)).rejects.toThrow(
      new Conflit("This book already been stored")
    );
  });
});
