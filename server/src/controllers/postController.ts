import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { IUserRequest } from '../middleware/jwtAuth';
import PostModel from '../models/post';

export const createPost = [
  body('content').trim().escape().notEmpty().withMessage("Post can't be empty"),
  async (req: IUserRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: 'error', errors: errors.array(), message: null });
    }
    const author: Types.ObjectId = req.user._id;
    const content: string = req.body.content;

    const newPost = new PostModel({
      author,
      content,
    });
    try {
      await newPost.save();
    } catch (err) {
      res.status(400).json({
        status: 'error',
        errors: [{ msg: 'Something went wrong creating post' }],
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
