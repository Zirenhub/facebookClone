import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const currentYear = new Date().getFullYear();

export async function login(req: Request, res: Response) {
  res.json({ status: 'success', data: null, message: null });
}

export const signup = [
  body('firstName').notEmpty().trim().escape(),
  body('lastName').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password')
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  body('birthday.day').notEmpty().trim().escape().isLength({ min: 1, max: 31 }),
  body('birthday.month')
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 1, max: 12 }),
  body('birthday.year')
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 1900, max: currentYear }),
  body('gender')
    .notEmpty()
    .trim()
    .escape()
    .custom((value) => {
      if (value !== 'male' || value !== 'female' || value !== 'custom') {
        return Promise.reject('Gender is not valid.');
      }
    }),
  body('customGender')
    .trim()
    .escape()
    .custom((value, { req, location, path }) => {
      if (req.body.gender === 'custom' && !value) {
        return Promise.reject('Custom gender must be provided.');
      }
    }),

  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 'error', errors: errors.array(), message: null });
    }

    res.json({ status: 'success', data: null, message: null });
  },
];
