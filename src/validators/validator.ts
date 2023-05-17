import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function validateRequest(request: Request, response: Response) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
}

export const validateReqMidleware = (schemas: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(schemas.map((schema: any) => schema.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  };
};
