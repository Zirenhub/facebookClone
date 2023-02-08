import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { IUserRequest } from '../middleware/jwtAuth';
import PostModel from '../models/post';
import path from 'path';

export const createPost = [
  body('content')
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Post can't be empty")
    .isLength({ min: 1, max: 450 })
    .withMessage("Post length can't be larger than 450 characters"),
  body('type').custom((value, { req }) => {
    if (value === 'image') {
      const { mimetype, size } = req.file;

      // Array of allowed files
      const array_of_allowed_files = ['png', 'jpeg', 'jpg'];
      const array_of_allowed_file_types = [
        'image/png',
        'image/jpeg',
        'image/jpg',
      ];
      // Allowed file size in mb
      const allowed_file_size = 2;
      // Get the extension of the uploaded file
      const extension = path.extname(req.file.originalname).toLocaleLowerCase();
      // Check if the uploaded file is allowed
      if (
        !array_of_allowed_files.includes(
          extension.slice(1, extension.length)
        ) ||
        !array_of_allowed_file_types.includes(mimetype)
      ) {
        throw Error('Invalid file');
      }

      if (size / (1024 * 1024) > allowed_file_size) {
        throw Error('File too large');
      }
      return true;
    } else if (value === 'default') {
      const { background } = req.body;
      if (background) {
        const { content } = req.body;
        if (content.length > 250) {
          throw Error('Post content is too big for a background.');
        }
      }
      return true;
    }
  }),
  body('audience')
    .trim()
    .escape()
    .notEmpty()
    .custom((value) => {
      if (value !== 'friends' && value !== 'public') {
        throw Error('Post audience has to be friends or public.');
      }
      return true;
    }),
  async (req: IUserRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 'error', errors: errors.array(), message: null });
    }
    const author: Types.ObjectId = req.user._id;
    const { content, audience, background, image, type } = req.body;

    if (type === 'default') {
      // save default post.
    } else if (type === 'image') {
      const image = req.file;
      console.log(content, image);
    }

    try {
      // todo
    } catch (err) {
      res.status(400).json({
        status: 'error',
        errors: err,
        message: null,
      });
    }
  },
];

export const getPost = async (req: IUserRequest, res: Response) => {
  const id = req.params.id;
  const post = await PostModel.findById(id);
  if (post) {
    // get comments
    // get likes
    // respond with post including comments and likes
  } else {
    res.status(400).json({
      status: 'error',
      errors: [{ msg: 'Invalid Post' }],
      message: null,
    });
  }
};
