import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CredentialsModel from '../models/credentials';
import ProfileModel from '../models/profile';
import { IUserRequest } from '../middleware/jwtAuth';
import mongoose from 'mongoose';

const currentYear = new Date().getFullYear();

export const login = [
  body('email')
    .normalizeEmail()
    .trim()
    .escape()
    .isEmail()
    .withMessage('Email is invalid.'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }

      const { email, password } = req.body;
      const user = await CredentialsModel.findOne({ email });

      if (!user) {
        return res.status(403).json({
          status: 'error',
          errors: null,
          message: 'User not found.',
        });
      }

      const checkPassword = bcrypt.compareSync(
        password,
        user.password
      );

      if (checkPassword) {
        const profile = await ProfileModel.findById(user.profile);
        if (!profile) {
          return res.status(403).json({
            status: 'error',
            errors: null,
            message: 'Profile not found.',
          });
        }
        const token = jwt.sign(
          profile.toObject(),
          process.env.JWT_SECRET!,
          {
            expiresIn: '1h',
          }
        );
        res.cookie('token', token, {
          httpOnly: true,
        });

        return res.json({
          status: 'success',
          data: profile.toObject(),
          message: null,
        });
      }
      return res.status(403).json({
        status: 'error',
        errors: null,
        message: 'Wrong password.',
      });
    } catch (err: any) {
      res.status(500).json({
        status: 'error',
        errors: null,
        message: err.message,
      });
    }
  },
];

export const logout = (req: IUserRequest, res: Response) => {
  res.clearCookie('token');
  return res.json({ status: 'success', data: null, message: null });
};

export const signup = [
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Wrong email format.')
    .normalizeEmail()
    .custom(async (value) => {
      return CredentialsModel.exists({ email: value }).then(
        (user) => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        }
      );
    }),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  body('birthday')
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage('Invalid date.')
    .custom((value: Date) => {
      const day = value.getDate();
      const month = value.getMonth();
      const year = value.getFullYear();

      if (day < 1 || day > 31) {
        return Promise.reject('Birthday day is not valid.');
      }
      if (month < 0 || month > 11) {
        return Promise.reject('Birthday month is not valid.');
      }
      if (year < 1900 || year > currentYear) {
        return Promise.reject('Birthday year is not valid.');
      }
      return true;
    }),
  body('gender')
    .notEmpty()
    .trim()
    .custom((value) => {
      if (
        value !== 'male' &&
        value !== 'female' &&
        value !== 'custom'
      ) {
        return Promise.reject('Gender is not valid.');
      }
      return true;
    }),
  body('customGender')
    .trim()
    .custom((value, { req, location, path }) => {
      if (req.body.gender === 'custom' && value === '') {
        return Promise.reject('Custom gender must be provided.');
      }
      return true;
    }),

  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }
      const {
        firstName,
        lastName,
        email,
        password,
        gender,
        customGender,
      } = req.body.firstName;
      const birthday: Date = req.body.birthday;

      function assignGender() {
        return gender === 'custom' ? customGender : gender;
      }

      const newProfile = new ProfileModel({
        firstName,
        lastName,
        birthday,
        gender: assignGender(),
      });
      const newUser = new CredentialsModel({
        email,
        password,
        profile: newProfile._id,
      });

      const session = await mongoose.startSession();
      session.startTransaction();

      await newProfile.save({ session });
      await newUser.save({ session });

      await session.commitTransaction();

      res
        .status(201)
        .json({ status: 'success', data: null, message: null });
    } catch (err: any) {
      res.status(500).json({
        status: 'error',
        errors: null,
        message: err.message,
      });
    }
  },
];

export const me = async (req: IUserRequest, res: Response) => {
  res.json({ status: 'success', data: req.user, message: null });
};
