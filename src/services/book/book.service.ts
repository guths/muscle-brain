import { Author, Book, BookCategory } from "@prisma/client";
import { CreateBookDto } from "../../dto/book.dto";
import { AuthorRepository } from "../../repositories/author.repository";
import { BookCategoryRepository } from "../../repositories/book-category.repository";
import { PublisherRepository } from "../../repositories/publisher.repository";
import { BookRepository } from "../../repositories/book.repository";
import { NotFound } from "../../lib/Errors/errors";

export class BookService {
  constructor(
    private bookRepository: BookRepository,
    private publisherRepository: PublisherRepository,
    private authorRepository: AuthorRepository,
    private bookCategoryRepository: BookCategoryRepository
  ) {}

  public async createBook(createBookDto: CreateBookDto): Promise<Book> {
    let authors: Array<Author>;
    authors = [];

    let bookCategories: Array<BookCategory>;
    bookCategories = [];

    let publisher = await this.publisherRepository.findFirst({
      name: createBookDto.publisher_name,
    });

    if (!publisher) {
      publisher = await this.publisherRepository.create({
        name: createBookDto.publisher_name,
      });
    }

    for (let authorName of createBookDto.authors) {
      let author = await this.authorRepository.findFirst({
        name: authorName,
      });

      if (!author) {
        author = await this.authorRepository.create({
          name: authorName,
        });
      }

      authors.push(author);
    }

    if (createBookDto.category_names) {
      for (let bookCategoryName of createBookDto.category_names) {
        let bookCategory = await this.bookCategoryRepository.findFirst({
          name: bookCategoryName,
        });

        if (!bookCategory) {
          bookCategory = await this.bookCategoryRepository.create({
            name: bookCategoryName,
          });
        }
        
        bookCategories.push(bookCategory);
      }
    }

    const authorArray = authors.map((author) => {
      return {
        author: {
          connect: {
            id: author.id,
          },
        },
      };
    });

    const categoriesBooksArray = bookCategories.map((bookCategory) => {
      return {
        book_category: {
          connect: {
            id: bookCategory.id,
          },
        },
      };
    });

    const createdBook = await this.bookRepository.create({
      google_book_id: createBookDto.google_book_id,
      title: createBookDto.title,
      published_date: createBookDto.published_date,
      description: createBookDto.description,
      page_count: createBookDto.page_count,
      main_category: createBookDto.main_category,
      average_rating: createBookDto.average_rating,
      image_link_small: createBookDto.image_link_small,
      image_link_medium: createBookDto.image_link_medium,
      image_link_large: createBookDto.image_link_large,
      language: createBookDto.language,
      list_price_amount: createBookDto.list_price_amount,
      list_price_currency: createBookDto.list_price_currency,
      publisher: {
        connect: {
          id: publisher.id,
        },
      },
      authors: authorArray
        ? {
            create: authorArray,
          }
        : undefined,
      categories_books: categoriesBooksArray
        ? {
            create: categoriesBooksArray,
          }
        : undefined,
    });

    return createdBook;
  }

  public async findBookById(bookid: number): Promise<Book> {
    const book = await this.bookRepository.findUnique({
      id: bookid,
    });

    if (!book) {
      throw new NotFound("Book not found");
    }

    return book;
  }
}
