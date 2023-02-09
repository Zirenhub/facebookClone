import { Response } from 'express';
import { IUserRequest } from '../middleware/jwtAuth';
import PostModel from '../models/post';
import getFriendsIds from '../utils/getFriendsIds';

export const getTimeline = async (req: IUserRequest, res: Response) => {
  try {
    const friends = await getFriendsIds(req.user._id);
    const populatedPosts = await PostModel.find({
      author: { $in: friends },
    });
    const formatedPosts = populatedPosts.map((post) => {
      if (post.image) {
        return {
          ...post,
          image: post.image.data.toBase64(),
        };
      } else {
        return {
          ...post,
        };
      }
    });
    return res.json({
      status: 'success',
      data: formatedPosts,
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
