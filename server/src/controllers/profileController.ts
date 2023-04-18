import { Response } from 'express';
import mongoose from 'mongoose';
import { IUserRequest } from '../middleware/jwtAuth';
import ProfileModel from '../models/profile';
import FriendModel from '../models/friend';
import PostModel from '../models/post';
import getFriendsIds from '../utils/getFriendsIds';

export const getProfile = async (
  req: IUserRequest,
  res: Response
) => {
  const id = req.params.id;
  try {
    const profile = await ProfileModel.findById(id);
    if (!profile) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: "Profile doesn't exist",
      });
    }

    let friendStatus = null;

    if (id !== req.user._id) {
      // profile is trying to befriend me, or im trying to befriend profile?
      const request = await FriendModel.findOne({
        profile: [id, req.user._id],
        friend: [id, req.user._id],
      });

      if (request) {
        friendStatus = request.toObject();
      }
    }

    return res.json({
      status: 'success',
      data: { ...profile.toObject(), friendStatus },
      message: null,
    });
  } catch (err: any) {
    res.status(404).json({
      status: 'error',
      errors: null,
      message: err.message,
    });
  }
};

export const sendRequest = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const user = req.user._id;
    const requestedProfile = req.params.id;

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(requestedProfile)) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Invalid ID',
      });
    }

    // check if the requested id is the same as the user iq
    if (user === requestedProfile) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You cannot send a friend request to yourself',
      });
    }

    // check if the profile exits
    const profile = await ProfileModel.findById(requestedProfile);
    if (!profile) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: "Profile doesn't exist",
      });
    }

    // check if a request send to the user already exists,
    // if a request already exists, no point in sending a request back, user should instead accept or reject the available request.
    // the user can't send a second request to follow if one is already send to a profile anyway due to unique indexes.
    const request = await FriendModel.findOne({
      profile: req.user._id,
      friend: requestedProfile,
    });

    if (request?.status === 'Pending') {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'A request already exists',
      });
    } else if (request?.status === 'Accepted') {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You are already friends',
      });
    }

    // save request
    const friend = await FriendModel.create({
      profile: requestedProfile,
      friend: user,
    });
    return res.json({
      status: 'success',
      data: friend,
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

export const getRequests = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const requests = await FriendModel.find({
      profile: req.user._id,
      status: 'Pending',
    }).populate('friend');

    return res.json({
      status: 'success',
      data: requests,
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

export const acceptRequest = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const requestID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(requestID)) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Invalid ID',
      });
    }

    const request = await FriendModel.findById(requestID);

    if (!request) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Invalid request ID',
      });
    }

    if (request.status === 'Accepted') {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You are already friends',
      });
    }

    // if the user is not owner of the request, or is not the receiver of the request throw error.
    if (
      req.user._id !== request.profile.toString() &&
      req.user.id !== request.friend.toString()
    ) {
      return res.status(403).json({
        status: 'error',
        errors: null,
        message: 'Unauthorized',
      });
    }

    request.status = 'Accepted';
    await request.save();

    return res.json({
      status: 'success',
      data: request,
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

export const rejectRequest = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const requestID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(requestID)) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Invalid ID',
      });
    }

    const request = await FriendModel.findById(requestID);

    if (!request) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: 'Invalid request ID',
      });
    }

    // check if request status is not pending and if its not throw error?
    // doesn't seem necessary as you can unfriend a friend any time
    // and rejecting is basically just chaning status from pending to declined
    // while unfrending is changing status from accepted to declined

    // if the user is not owner of the request, or is not the receiver of the request throw error.
    if (
      req.user._id !== request.profile.toString() &&
      req.user._id !== request.friend.toString()
    ) {
      return res.status(403).json({
        status: 'error',
        errors: null,
        message: 'Unauthorized',
      });
    }

    await request.deleteOne();

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

export const getFriends = async (
  req: IUserRequest,
  res: Response
) => {
  try {
    const friends = await getFriendsIds(req.user._id);
    const populatedFriends = await ProfileModel.find({
      _id: { $in: friends },
    });
    return res.json({
      status: 'success',
      data: populatedFriends,
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

export const getPosts = async (req: IUserRequest, res: Response) => {
  try {
    const cursor = parseInt(req.query.cursor as string) || 0;
    const limit = 3;

    const id = req.params.id;
    const posts = await PostModel.find({ author: id })
      .sort({ createdAt: -1 })
      .skip(cursor)
      .limit(limit)
      .populate('author');

    let nextCursor: number | null = cursor + posts.length;

    if (posts.length < limit) {
      nextCursor = null;
    }

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
