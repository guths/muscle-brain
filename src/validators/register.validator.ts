import { check } from "express-validator";

const nicknamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]).*$/;

const registerValidator = [
  check("first_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name is required."),
  check("last_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last name is required."),
  check("nickname")
    .trim()
    .not()
    .isEmpty()
    .matches(nicknamePattern)
    .withMessage(
      "The nickname must be 3-16 characters long and can only contain letters, numbers, underscores, and hyphens."
    ),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("E-mail is required.")
    .isEmail()
    .withMessage("Provided field must be a valid e-mail."),
  check("password")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long.")
    .matches(passwordPattern)
    .withMessage(
      "The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
    ),
];

export { registerValidator };
