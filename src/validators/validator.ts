import { Request, Response } from "express";
import { validationResult } from "express-validator";

export function validateRequest(request: Request, response: Response) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
}
