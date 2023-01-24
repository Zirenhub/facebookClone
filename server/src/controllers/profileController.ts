import { Response } from 'express';
import { Types } from 'mongoose';
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
    res.status(400).json({
      status: 'error',
      errors: err,
      message: null,
    });
  }
};
