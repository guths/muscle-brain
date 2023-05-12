import { check } from "express-validator"

export const createShelfValidator = () => {
  check('name').trim().not().isEmpty().withMessage('Shelf name is required')
}