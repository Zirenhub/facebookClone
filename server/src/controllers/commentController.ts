import { IUserRequest } from '../middleware/jwtAuth';
import { Response } from 'express';
import CommentModel from '../models/comment';

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

export const replyToComment = (req: IUserRequest, res: Response) => {
  // todo
};
