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

const addShelfBookValidator = [
  check("google_book_id").trim().notEmpty().withMessage('google_book_id is required'),
  check("shelf_id").isNumeric().notEmpty().withMessage('shelf_id is required')
]

export { createShelfValidator, updateShelfValidator, deleteShelfValidator, addShelfBookValidator };
