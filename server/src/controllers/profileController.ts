import { Response } from 'express';
import mongoose from 'mongoose';
import { IUserRequest } from '../middleware/jwtAuth';
import ProfileModel from '../models/profile';

export const getProfile = async (req: IUserRequest, res: Response) => {
  const id = req.params.id;
  try {
    const profile = await ProfileModel.findById(id);
    if (profile) {
      return res.json({
        status: 'success',
        data: profile.toObject(),
        message: null,
      });
    }
    throw new Error("Profile doesn't exist");
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 'error', errors: 'Invalid ID', message: null });
    }

    if (req.user._id === id) {
      return res
        .status(400)
        .json({
          status: 'error',
          errors: 'You cannot follow yourself',
          message: null,
        });
    }

    const profile = await ProfileModel.findById(id);
    if (profile) {
    }
    throw new Error("Profile doesn't exist");
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errors: err,
      message: null,
    });
  }
};
