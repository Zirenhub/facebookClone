import { Response } from 'express';
import { IUserRequest } from '../middleware/jwtAuth';
import PostModel from '../models/post';
import getFriendsIds from '../utils/getFriendsIds';

export const getTimeline = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const friends = await getFriendsIds(req.user._id);
    const posts = await PostModel.find({
      $or: [{ author: { $in: friends } }, { author: req.user._id }],
    }).populate('author');

    return res.json({
      status: 'success',
      data: posts,
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
