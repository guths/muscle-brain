import { check } from "express-validator"

const loginValidator = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("E-mail is required.")
    .isEmail()
    .withMessage("Provided field must be a valid e-mail."),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
]

export {loginValidator}