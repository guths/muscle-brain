import { BookShelfDto } from "../../dto/book-shelf.dto";
import { Forbidden, NotFound } from "../../lib/Errors/errors";
import { BookRepository } from "../../repositories/book.repository";
import { ShelfRepository } from "../../repositories/shelf.repository";
import GoogleBooksService from "../google-books-api/google-book.service";

export class BookShelfService {
    constructor(private bookRepository: BookRepository, private shelfRepository: ShelfRepository) { }

    public async addBookInShelf(bookShelfDto: BookShelfDto) {
        const book = await this.bookRepository.findUnique({
            google_book_id: bookShelfDto.google_book_id
        });

        const shelf = await this.shelfRepository.findUnique({
            id: bookShelfDto.shelf_id
        })

        if (!shelf) {
            throw new NotFound('The shelf id provided does not exist');
        }

        if (shelf.user_id !== bookShelfDto.user_id) {
            throw new Forbidden('User is trying to add book in another user shelf');
        }

        if (book) {
            this.shelfRepository.update({
                id: bookShelfDto.shelf_id
            }, {
                books: {
                    connect: {
                        id: book.id
                    }
                }
            });

            return;
        }

        const googleBookService = new GoogleBooksService();
        const googleBookResponse = await googleBookService.getBookById(bookShelfDto.google_book_id);

        


    }
}