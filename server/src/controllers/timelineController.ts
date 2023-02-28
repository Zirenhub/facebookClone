import { Response } from 'express';
import { IUserRequest } from '../middleware/jwtAuth';
import PostModel from '../models/post';
import getFriendsIds from '../utils/getFriendsIds';

export const getTimeline = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const cursor = parseInt(req.query.cursor as string) || 0;
    const limit = 3;

    const friends = await getFriendsIds(req.user._id);
    const posts = await PostModel.find({
      $or: [{ author: { $in: friends } }, { author: req.user._id }],
    })
      .sort({ createdAt: -1 })
      .skip(cursor)
      .limit(limit)
      .populate('author');

    const nextCursor = cursor + posts.length;

    return res.json({
      status: 'success',
      data: { posts, nextCursor },
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
