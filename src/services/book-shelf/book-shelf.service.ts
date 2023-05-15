import { BookShelfDto } from "../../dto/book-shelf.dto";
import { ShelfService } from "../shelf/shelf.service";
import { CreateBookDto } from "../../dto/book.dto";
import { Forbidden, NotFound } from "../../lib/Errors/errors";
import { AuthorRepository } from "../../repositories/author.repository";
import { BookCategoryRepository } from "../../repositories/book-category.repository";
import { BookRepository } from "../../repositories/book.repository";
import { GenreRepository } from "../../repositories/genre.repository";
import { PublisherRepository } from "../../repositories/publisher.repository";
import { ShelfRepository } from "../../repositories/shelf.repository";
import { BookService } from "../book/book.service";
import GoogleBooksService from "../google-books-api/google-book.service";
import { UserRepository } from "../../repositories/user.repository";

export class BookShelfService {
  constructor(
    private bookRepository: BookRepository,
    private shelfRepository: ShelfRepository,
    private publisherRepository: PublisherRepository,
    private authorRepository: AuthorRepository,
    private bookCategoryRepository: BookCategoryRepository,
    private userRepository: UserRepository
  ) {}

  public async addBookInShelf(bookShelfDto: BookShelfDto) {
    const book = await this.bookRepository.findUnique({
      google_book_id: bookShelfDto.google_book_id,
    });

    const shelfService = new ShelfService(this.shelfRepository, this.userRepository);

    const shelf = await this.shelfRepository.findUnique({
      id: bookShelfDto.shelf_id,
    });

    if (!shelf) {
      throw new NotFound("The shelf id provided does not exist");
    }

    if (shelf.user_id !== bookShelfDto.user_id) {
      throw new Forbidden("User is trying to add book in another user shelf");
    }

    if (book) {
      return await shelfService.updateShelf({
        id: shelf.id,
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
      })      
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
    }

    return await this.shelfRepository.update(
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
  }
}
