import { Request, Response, Router } from "express";
import { googleBooksController } from "./controllers/GoogleBooksController";
import { authController } from "./controllers/auth.controller";
import { registerValidator } from "./validators/register.validator";
import { loginValidator } from "./validators/login.validator";

const routes = Router();

routes.get('/v1/books/search', googleBooksController.getBooksByTerm);
routes.post('/v1/user', registerValidator, authController.register);
routes.post('/v1/login', loginValidator, authController.login)

export default routes;