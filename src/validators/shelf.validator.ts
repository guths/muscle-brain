import { check, param } from "express-validator";

const createShelfValidator = [
  check("name").trim().not().isEmpty().withMessage("Shelf name is required"),
  check("user_id")
    .notEmpty()
    .withMessage("Shelf user_id is required")
    .isNumeric()
    .withMessage("User id must be a numeric"),
];

const updateShelfValidator = [
  check("name").trim().not().isEmpty().withMessage("Shelf name is required"),
  param("bookId").exists().withMessage("Book id route param is required"),
  check("user_id")
    .notEmpty()
    .withMessage("Shelf user_id is required")
    .isNumeric()
    .withMessage("User id must be a numeric"),
];

const deleteShelfValidator = [
  param("bookId").exists().withMessage("Book id route param is required"),
  check("user_id")
    .not()
    .isEmpty()
    .withMessage("Shelf user_id is required")
    .isNumeric()
    .withMessage("User id must be a numeric"),
];

export { createShelfValidator, updateShelfValidator, deleteShelfValidator };
