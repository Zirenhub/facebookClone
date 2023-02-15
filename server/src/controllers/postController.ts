import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { IUserRequest } from '../middleware/jwtAuth';
import PostModel from '../models/post';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

const cloudinary = require('cloudinary').v2;

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (
  CLOUDINARY_CLOUD_NAME &&
  CLOUDINARY_API_KEY &&
  CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
}

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
      if (!req.file) {
        throw Error('File must be included.');
      }
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
      const extension = path
        .extname(req.file.originalname)
        .toLocaleLowerCase();
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
      const { background, content } = req.body;
      const backgrounds = [
        'post-bg-one',
        'post-bg-two',
        'post-bg-three',
        'post-bg-four',
        null,
      ];
      if (!backgrounds.includes(background)) {
        throw Error('Post background is not valid.');
      }
      if (background && content.length > 250) {
        throw Error('Post content is too big for a background.');
      }
      return true;
    }
    throw Error('Post is invalid.');
  }),
  body('audience')
    .trim()
    .escape()
    .notEmpty()
    .custom((value) => {
      const audiences = ['friends', 'public'];
      if (!audiences.includes(value)) {
        throw Error('Post audience has to be friends or public.');
      }
      return true;
    }),
  async (req: IUserRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
        message: null,
      });
    }
    const author: Types.ObjectId = req.user._id;
    const { content, audience, background, type } = req.body;

    try {
      let newPost;
      if (type === 'image' && req['file']) {
        const imagePath = req['file'].path;
        const image = await cloudinary.uploader.upload(imagePath);

        newPost = new PostModel({
          author,
          audience,
          content,
          image: image.url,
        });
      } else {
        newPost = new PostModel({
          author,
          audience,
          content,
          background,
        });
      }

      await newPost.save();
      return res.json({
        status: 'success',
        data: newPost,
        message: null,
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

export const getPost = async (req: IUserRequest, res: Response) => {
  const id = req.params.id;
  const post = await PostModel.findById(id);
  if (post) {
    // get comments
    // get likes
    // respond with post including comments and likes
  } else {
    return res.status(400).json({
      status: 'error',
      errors: null,
      message: 'Post was not found.',
    });
  }
};

export const likePost = [
  body('reaction').custom((value) => {
    const reactions = ['laugh', 'heart', 'like'];
    if (!reactions.includes(value)) {
      throw Error('Reaction value is not valid.');
    }
    return true;
  }),

  async (req: IUserRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }

      const id = req.params.id;
      const reaction = req.body.reaction;
      const post = await PostModel.findById(id);
      if (!post) {
        return res.status(400).json({
          status: 'error',
          errors: null,
          message: 'Post was not found.',
        });
      }
      const hasReacted = post.reactions.find((reaction) => {
        return reaction.author.toString() === req.user._id;
      });
      if (hasReacted) {
        hasReacted.type = reaction;
      } else {
        post.reactions.push({ author: req.user._id, type: reaction });
      }

      await post.save();
      return res.json({
        status: 'success',
        data: null,
        message: null,
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

export const unlikePost = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const id = req.params.id;
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'Post was not found.',
      });
    }
    const reaction = post.reactions.find(
      (reaction) => reaction.author.toString() === req.user._id
    );
    if (!reaction) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'Like was not found.',
      });
    }
    post.reactions.remove(reaction._id);
    await post.save();
    return res.json({
      status: 'success',
      data: null,
      message: null,
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      errors: null,
      message: err.message,
    });
  }
};
