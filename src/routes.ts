import { Router } from "express";
import { googleBooksController } from "./controllers/google-books.controller";
import { authController } from "./controllers/auth.controller";
import { registerValidator } from "./validators/register.validator";
import { loginValidator } from "./validators/login.validator";
import { authMiddleware } from "./middleware/auth";

const routes = Router();

routes.get('/v1/books/search', authMiddleware, googleBooksController.getBooksByTerm);
routes.post('/v1/user', registerValidator, authController.register);
routes.post('/v1/login', loginValidator, authController.login)

export default routes;