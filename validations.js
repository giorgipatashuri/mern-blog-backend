import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'emailshia problema').isEmail(),
  body('password', 'parolshia problema').isLength({ min: 5 }),
  body('fullName', 'saxelshia problema').isLength({ min: 5 }),
  body('imgURL').optional().isURL(),
];
export const loginValidation = [
  body('email', 'emailshia problema').isEmail(),
  body('password', 'parolshia problema').isLength({ min: 5 }),
];
export const postCreateValidaiton = [
  body('title').isLength({ min: 3 }).isString(),
  body('text').isLength({ min: 5 }).isString(),
  body('tags').optional().isArray(),
  body('imgURL').optional().isString(),
];
