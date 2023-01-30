import { Response } from 'express';
import mongoose from 'mongoose';
import { IUserRequest } from '../middleware/jwtAuth';
import ProfileModel from '../models/profile';
import FriendModel from '../models/friend';

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

export const sendRequest = async (req: IUserRequest, res: Response) => {
  try {
    const user = req.user._id;
    const requestID = new mongoose.Types.ObjectId(req.params.id);

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(requestID)) {
      return res
        .status(404)
        .json({ status: 'error', errors: null, message: 'Invalid ID' });
    }

    // check if the requested id is the same as the user iq
    if (user === requestID) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You cannot send a friend request to yourself',
      });
    }

    // check if the profile exits
    const profile = await ProfileModel.findById(requestID);
    if (!profile) {
      return res.status(404).json({
        status: 'error',
        errors: null,
        message: "Profile doesn't exist",
      });
    }

    // check if a request already exists
    const request = await FriendModel.findOne({
      profile: user,
      friend: requestID,
    });
    if (request) {
      return res.status(400).json({
        status: 'error',
        errors: null,
        message: 'You are already send a friend request to this profile',
      });
    }

    // save request
    const friend = await FriendModel.create({
      profile: requestID,
      friend: user,
    });
    return res.json({
      status: 'success',
      data: friend,
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

export const getRequests = async (req: IUserRequest, res: Response) => {
  try {
    const requests = await FriendModel.find({
      profile: req.user._id,
      friend: { $ne: req.user._id },
      status: 'Pending',
    }).populate('friend');

    return res.json({
      status: 'success',
      data: requests,
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

export const acceptRequest = async (req: IUserRequest, res: Response) => {
  try {
    const requestID = new mongoose.Types.ObjectId(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(requestID)) {
      return res
        .status(404)
        .json({ status: 'error', errors: null, message: 'Invalid ID' });
    }
    const request = await FriendModel.findByIdAndUpdate(
      requestID,
      { status: 'Accepted' },
      { new: true }
    );

    return res.json({
      status: 'success',
      data: request,
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

export const rejectRequest = async (req: IUserRequest, res: Response) => {
  try {
    const requestID = new mongoose.Types.ObjectId(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(requestID)) {
      return res
        .status(404)
        .json({ status: 'error', errors: null, message: 'Invalid ID' });
    }
    const request = await FriendModel.findByIdAndUpdate(
      requestID,
      { status: 'Declined' },
      { new: true }
    );

    return res.json({
      status: 'success',
      data: request,
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
