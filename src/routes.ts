import { Request, Response, Router } from "express";
import { googleBooksController } from "./controllers/google-books.controller";
import { authController } from "./controllers/auth.controller";
import { registerValidator } from "./validators/register.validator";
import { loginValidator } from "./validators/login.validator";
import { authMiddleware } from "./middleware/auth";
import { shelfMiddleware } from "./middleware/shelf";
import shelfController from "./controllers/shelf.controller";
import {
  addShelfBookValidator,
  createShelfValidator,
  deleteShelfValidator,
  updateShelfValidator,
} from "./validators/shelf.validator";
import { bookController } from "./controllers/book.controller";
import { validateReqMiddleware } from "./validators/validator";
import { bookMiddleware } from "./middleware/book";
import { verifyEmailValidator } from "./validators/verify-email-validator";
import { redisLimitHandler } from "./middleware/redis-limit";

const routes = Router();

routes.get('/v1/working', redisLimitHandler, (req: Request, res: Response) => {
  console.log('sadhjasjkhdkhajsdkjhsa')
  return res.json('deu boa')
})

routes.get(
  "/v1/books/search",
  authMiddleware,
  googleBooksController.getBooksByTerm
);

routes.post(
  "/v1/user",
  validateReqMiddleware(registerValidator),
  authController.register
);

routes.post(
  "/v1/login",
  validateReqMiddleware(loginValidator),
  authController.login
);

routes.get(
  '/v1/verify-email/:code',
  authMiddleware,
  validateReqMiddleware(verifyEmailValidator),
  authController.verifyEmail
)

routes.post(
  "/v1/shelf",
  authMiddleware,
  validateReqMiddleware(createShelfValidator),
  shelfController.create
);

routes.post(
  "/v1/shelf/:shelfId",
  authMiddleware,
  validateReqMiddleware(updateShelfValidator),
  shelfMiddleware,
  shelfController.update
);

routes.delete(
  "/v1/shelf/:shelfId",
  authMiddleware,
  validateReqMiddleware(deleteShelfValidator),
  shelfMiddleware,
  shelfController.deleteShelf
);

routes.get(
  "/v1/shelf/:shelfId/books",
  authMiddleware,
  shelfMiddleware,
  shelfController.getShelfBooks
);

routes.post(
  "/v1/book/shelf",
  authMiddleware,
  validateReqMiddleware(addShelfBookValidator),
  shelfMiddleware,
  bookController.addBookShelf
);

routes.delete(
  "/v1/book/shelf",
  authMiddleware,
  shelfMiddleware,
  bookMiddleware,
  bookController.removeBookShelf
);

export default routes;
