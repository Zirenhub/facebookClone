import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CredentialsModel from '../models/credentials';
import ProfileModel from '../models/profile';
import { IUserRequest } from '../middleware/jwtAuth';
import { IProfile } from '../interfaces/IProfile';

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
    .escape()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 'error', errors: errors.array(), message: null });
    }
    const email: string = req.body.email;
    const password: string = req.body.password;
    const user = await CredentialsModel.findOne({ email })
      .populate<{
        profile: IProfile;
      }>('profile')
      .lean();

    if (!user) {
      return res.status(403).json({
        status: 'error',
        errors: [{ msg: "User doesn't exist." }],
        message: null,
      });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (checkPassword) {
      const token = jwt.sign(user.profile, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
      res.cookie('token', token, {
        httpOnly: true,
      });
      return res.json({ status: 'success', data: null, message: null });
    } else {
      res.status(403).json({
        status: 'error',
        errors: [{ msg: 'Wrong password' }],
        message: null,
      });
    }
  },
];

export const signup = [
  body('firstName').notEmpty().trim().escape(),
  body('lastName').notEmpty().trim().escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .custom(async (value) => {
      return CredentialsModel.exists({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  body('password')
    .trim()
    .escape()
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
    .escape()
    .custom((value) => {
      if (value !== 'male' && value !== 'female' && value !== 'custom') {
        return Promise.reject('Gender is not valid.');
      }
      return true;
    }),
  body('customGender')
    .trim()
    .escape()
    .custom((value, { req, location, path }) => {
      if (req.body.gender === 'custom' && value === '') {
        return Promise.reject('Custom gender must be provided.');
      }
      return true;
    }),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 'error', errors: errors.array(), message: null });
    }
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const birthday: Date = req.body.birthday;
    const gender: string = req.body.gender;
    const customGender: string = req.body.customGender;

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

    try {
      await newProfile.save();
      await newUser.save();
      res.status(201).json({ status: 'success', data: null, message: null });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        errors: [err],
        message: 'Something went wrong.',
      });
    }
  },
];

export const me = async (req: IUserRequest, res: Response) => {
  res.json({ status: 'success', data: req.user, message: null });
};
