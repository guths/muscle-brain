import { check, param } from "express-validator";

const verifyEmailValidator = [
  param("code").exists().withMessage("Code must be provided in URL"),
];

export { verifyEmailValidator };
