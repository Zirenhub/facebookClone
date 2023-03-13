import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Server } from 'socket.io';
import { IUserRequest } from '../middleware/jwtAuth';
import MessageModel from '../models/message';

export const postMessage = (io: Server) => [
  body('message')
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Comment can't be empty")
    .isLength({ min: 1, max: 250 })
    .withMessage(
      "Message length can't be larger than 250 characters"
    ),

  async (req: IUserRequest, res: Response) => {
    try {
      // check if sender and receiver are friends first.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }

      const { receiver, message } = req.body;

      const newMessage = new MessageModel({
        sender: req.user._id,
        receiver,
        message,
      });

      await newMessage.save();

      io.to(receiver).emit('receiveMessage', newMessage.toObject());

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
  },
];
