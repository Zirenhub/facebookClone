import { Response } from 'express';
import mongoose from 'mongoose';
import { IUserRequest } from '../middleware/jwtAuth';
import ProfileModel from '../models/profile';
import FollowModel from '../models/follow';

export const getProfile = async (req: IUserRequest, res: Response) => {
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
    return res.json({
      status: 'success',
      data: profile.toObject(),
      message: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      errors: err,
      message: null,
    });
  }
};

export const followProfile = async (req: IUserRequest, res: Response) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 'error', errors: null, message: 'Invalid ID' });
    }

    // check if the requested id is the same as the user iq
    if (req.user._id === id) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You cannot follow yourself',
      });
    }

    // check if the profile exits
    const profile = await ProfileModel.findById(id);
    if (!profile) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: "Profile doesn't exist",
      });
    }

    const follower = req.user._id;
    const followed = profile._id;

    // check if the requested id is not already being followed
    const follow = await FollowModel.findOne({ follower, followed });
    if (follow) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You are already following this profile',
      });
    }

    // save follow
    const newFollow = new FollowModel({
      follower,
      followed,
    });
    await newFollow.save();
    return res.json({
      status: 'success',
      data: newFollow.toObject(),
      message: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errors: err,
      message: null,
    });
  }
};

export const followersProfile = async (req: IUserRequest, res: Response) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 'error', errors: null, message: 'Invalid ID' });
    }

    const followers = await FollowModel.countDocuments({ followed: id });

    return res.json({
      status: 'success',
      data: followers,
      message: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errors: err,
      message: null,
    });
  }
};
