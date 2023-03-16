import { IUserRequest } from '../middleware/jwtAuth';
import { Response } from 'express';
import CommentModel from '../models/comment';
import { body, validationResult } from 'express-validator';

export const likeComment = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'Comment was not found.',
      });
    }

    const myReaction = comment.reactions.find(
      (r) => r.author.toString() === req.user._id
    );
    if (myReaction) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You already liked this comment.',
      });
    }

    comment.reactions.push({ author: req.user._id, type: 'like' });
    await comment.save();

    return res.json({
      status: 'success',
      data: comment.reactions.find((r) => {
        return r.author.toString() === req.user._id;
      }),
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

export const unlikeComment = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'Comment was not found.',
      });
    }

    const myReaction = comment.reactions.find(
      (r) => r.author.toString() === req.user._id
    );
    if (!myReaction) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'Like was not found.',
      });
    }

    comment.reactions.remove(myReaction._id);
    await comment.save();

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

export const replyToComment = [
  body('comment')
    .trim()
    .notEmpty()
    .withMessage("Comment can't be empty")
    .isLength({ min: 1, max: 250 })
    .withMessage(
      "Comment length can't be larger than 250 characters"
    ),

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

      const { postID, comment } = req.body;
      const parentComment = await CommentModel.findById(
        req.params.id
      );
      if (!parentComment) {
        return res.status(400).json({
          status: 'error',
          errors: null,
          message: 'Parent comment was not found.',
        });
      }

      const newComment = await new CommentModel({
        author: req.user._id,
        post: postID,
        parent: parentComment._id,
        content: comment,
      }).populate('author');

      await newComment.save();

      parentComment.replies += 1;
      await parentComment.save();

      return res.json({
        status: 'success',
        data: newComment,
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

export const getReplies = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const replies = await CommentModel.find({
      parent: req.params.id,
    }).populate('author');

    return res.json({
      status: 'success',
      data: replies,
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
