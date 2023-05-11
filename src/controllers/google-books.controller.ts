import { NextFunction, Request, Response } from "express";
import GoogleBooksService from "../services/google-books-api/GoogleBooksService";
import ResponseHelper from "../lib/HttpResponse/ResponseHelper";
import { UnprocessableEntity } from "../lib/Errors/errors";

class GoogleBooksController {
  async getBooksByTerm(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      let { terms, orderBy } = request.query;

      if (!terms) {
        throw new UnprocessableEntity("Terms query string are required");
      }

      const googleBooksService = new GoogleBooksService();

      const googleBookApiResponse = await googleBooksService.getBookByTerms(
        terms as string,
        orderBy as string
      );

      return ResponseHelper.ok(response, googleBookApiResponse);
    } catch (e) {
      next(e);
    }
  }
}

const googleBooksController = new GoogleBooksController();

export { googleBooksController };
