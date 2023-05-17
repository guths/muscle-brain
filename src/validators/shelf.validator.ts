import { check, param } from "express-validator";

const createShelfValidator = [
  check("name").trim().not().isEmpty().withMessage("Shelf name is required"),
];

const updateShelfValidator = [
  check("name").trim().not().isEmpty().withMessage("Shelf name is required"),
  param("shelfId").exists().isNumeric().withMessage("Shelf id route param is required"),
];

const deleteShelfValidator = [
  param("bookId").exists().withMessage("Book id route param is required"),
];

export { createShelfValidator, updateShelfValidator, deleteShelfValidator };
