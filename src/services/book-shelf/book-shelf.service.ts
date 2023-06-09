import { BookShelfDto } from "../../dto/book-shelf.dto";
import { ShelfService } from "../shelf/shelf.service";
import { CreateBookDto } from "../../dto/book.dto";
import {
  Forbidden,
  NotFound,
  UnprocessableEntity,
} from "../../lib/Errors/errors";
import { AuthorRepository } from "../../repositories/author.repository";
import { BookCategoryRepository } from "../../repositories/book-category.repository";
import { BookRepository } from "../../repositories/book.repository";
import { PublisherRepository } from "../../repositories/publisher.repository";
import { ShelfRepository } from "../../repositories/shelf.repository";
import { BookService } from "../book/book.service";
import GoogleBooksService from "../google-books-api/google-book.service";
import { UserRepository } from "../../repositories/user.repository";
import { BookShelfRepository } from "../../repositories/book-shelf.repository";

export class BookShelfService {
  constructor(
    private bookRepository: BookRepository,
    private shelfRepository: ShelfRepository,
    private publisherRepository: PublisherRepository,
    private authorRepository: AuthorRepository,
    private bookCategoryRepository: BookCategoryRepository,
    private userRepository: UserRepository,
    private bookShelfRepository: BookShelfRepository
  ) {}

  public async addBookInShelf(bookShelfDto: BookShelfDto) {
    const shelfService = new ShelfService(
      this.shelfRepository,
      this.userRepository
    );

    const shelf = await this.shelfRepository.findUnique({
      id: bookShelfDto.shelf_id,
    });

    if (!shelf) {
      throw new NotFound("Shelf not found");
    }

    const book = await this.bookRepository.findUnique({
      google_book_id: bookShelfDto.google_book_id,
    });

    if (!book) {
      throw new NotFound("Book not found");
    }

    if (book && shelf) {
      const relationExists = await this.bookShelfRepository.findFirst({
        book_id: book.id,
        shelf_id: shelf.id,
      });

      if (relationExists) {
        throw new UnprocessableEntity("This book already have this shelf.");
      }

      await shelfService.updateShelf({
        id: shelf.id,
        user_id: shelf.user_id,
        books: {
          create: [
            {
              book: {
                connect: {
                  id: book.id,
                },
              },
            },
          ],
        },
      });

      return book;
    }

    const googleBookService = new GoogleBooksService();
    const googleBookResponse = await googleBookService.getBookById(
      bookShelfDto.google_book_id
    );

    const createBookDto = {
      google_book_id: googleBookResponse.id,
      title: googleBookResponse.volumeInfo.title,
      publisher_name: googleBookResponse.volumeInfo.publisher,
      published_date: new Date(googleBookResponse.volumeInfo.publishedDate),
      description: googleBookResponse.volumeInfo.description,
      page_count: googleBookResponse.volumeInfo.pageCount,
      image_link_small: googleBookResponse.volumeInfo.imageLinks.smallThumbnail,
      image_link_medium: googleBookResponse.volumeInfo.imageLinks.medium,
      image_link_large: googleBookResponse.volumeInfo.imageLinks.large,
      language: googleBookResponse.volumeInfo.language,
      list_price_amount: googleBookResponse.saleInfo.listPrice?.amount,
      list_price_currency: googleBookResponse.saleInfo.listPrice?.currencyCode,
      category_names: googleBookResponse.volumeInfo?.categories,
      authors: googleBookResponse.volumeInfo.authors,
    } as CreateBookDto;

    const bookService = new BookService(
      this.bookRepository,
      this.publisherRepository,
      this.authorRepository,
      this.bookCategoryRepository
    );

    const createdBook = await bookService.createBook(createBookDto);

    if (!createdBook) {
      throw new UnprocessableEntity("The book was not created with success");
    }

    await this.shelfRepository.update(
      {
        id: bookShelfDto.shelf_id,
      },
      {
        books: {
          create: [
            {
              book: {
                connect: {
                  id: createdBook.id,
                },
              },
            },
          ],
        },
      }
    );

    return createdBook;
  }

  public async removeBookShelf(
    bookId: number,
    shelfId: number
  ): Promise<boolean> {
    const relationExists = await this.bookShelfRepository.findFirst({
      book_id: bookId,
      shelf_id: shelfId,
    });

    if (!relationExists) {
      throw new UnprocessableEntity("This book is not in shelf");
    }

    const deletedCount = await this.bookShelfRepository.deleteMany({
      book_id: bookId,
      shelf_id: shelfId,
    });

    if (deletedCount["count"] > 0) {
      return true;
    }

    return false;
  }

  public async getShelfBooks(shelfId: number) {
    const books = await this.shelfRepository.findUnique(
      {
        id: shelfId,
      },
      {
        books: {
          include: {
            book: true,
          },
        },
      }
    );

    return books;
  }
}
