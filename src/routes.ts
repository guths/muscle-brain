import { Router } from "express";
import { googleBooksController } from "./controllers/google-books.controller";
import { authController } from "./controllers/auth.controller";
import { registerValidator } from "./validators/register.validator";
import { loginValidator } from "./validators/login.validator";
import { authMiddleware } from "./middleware/auth";
import { shelfMiddleware } from "./middleware/shelf";
import shelfController from "./controllers/shelf.controller";
import { createShelfValidator, deleteShelfValidator, updateShelfValidator } from "./validators/shelf.validator";
import { bookController } from "./controllers/book.controller";

const routes = Router();

routes.get(
  "/v1/books/search",
  authMiddleware,
  googleBooksController.getBooksByTerm
);

routes.post("/v1/user", registerValidator, authController.register);
routes.post("/v1/login", loginValidator, authController.login);

routes.post(
  "/v1/shelf",
  authMiddleware,
  shelfMiddleware,
  createShelfValidator,
  shelfController.create
);

routes.post(
  "/v1/shelf/:bookId",
  authMiddleware,
  shelfMiddleware,
  updateShelfValidator,
  shelfController.update
);

routes.delete(
  "/v1/shelf/:bookId",
  authMiddleware,
  shelfMiddleware,
  deleteShelfValidator,
  shelfController.deleteShelf
);

routes.post(
  "/v1/book/shelf",
  authMiddleware,
  shelfMiddleware,
  bookController.addBookShelf
)

routes.delete(
  "/v1/book/shelf",
  authMiddleware,
  shelfMiddleware,
  bookController.removeBookShelf
)

export default routes;
