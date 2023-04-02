import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Server } from 'socket.io';
import { IUserRequest } from '../middleware/jwtAuth';
import MessageModel from '../models/message';
import GroupModel from '../models/group';
import GroupMessageModel from '../models/groupMessage';
import getFriendsIds from '../utils/getFriendsIds';

type TUser = {
  __v: number;
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  birthday: string;
  exp?: number;
  ait?: number;
  createdAt: string;
  updatedAt: string;
};

function getUpdatedUser(user: TUser) {
  const userCopy = { ...user };
  if (userCopy.exp) {
    delete userCopy.exp;
  }
  if (userCopy.ait) {
    delete userCopy.ait;
  }
  return userCopy;
}

export const postMessage = (io: Server) => [
  body('message')
    .trim()
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
      const updatedUser = getUpdatedUser(req.user)

      io.to(receiver).emit('receiveMessage', {
        message: {
          ...newMessage.toObject(),
          sender: updatedUser,
        },
      });
      io.to(receiver).emit('notification', {
        type: 'message',
        message: newMessage.message,
        sender: req.user.fullName,
      });

      return res.json({
        status: 'success',
        data: newMessage,
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

export async function getMessages(req: IUserRequest, res: Response) {
  try {
    const id = req.params.id;

    const messages = await MessageModel.find({
      $or: [
        {
          sender: req.user._id,
          receiver: id,
        },
        {
          sender: id,
          receiver: req.user._id,
        },
      ],
    }).populate('sender');

    return res.json({
      status: 'success',
      data: messages,
      message: null,
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      errors: null,
      message: err.message,
    });
  }
}

export const createGroup = [
  body('groupName')
    .trim()
    .escape()
    .isLength({ min: 1, max: 25 })
    .withMessage('Group Name is invalid.'),

  async (req: IUserRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }

      const {
        groupName,
        invited,
      }: { groupName: string; invited: string[] } = req.body;
      if (invited.length > 0) {
        const friends = await getFriendsIds(req.user._id);

        for (const invite of invited) {
          if (!friends.includes(invite)) {
            return res.status(400).json({
              status: 'error',
              errors: null,
              message: 'Invites includes invlaid id.',
            });
          }
        }
      }

      const newGroup = new GroupModel({
        owner: req.user._id,
        name: groupName,
        invited,
      });

      await newGroup.save();
      return res.json({
        status: 'success',
        data: newGroup,
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

export async function getGroups(req: IUserRequest, res: Response) {
  try {
    const groups = await GroupModel.find({
      $or: [{ invited: req.user._id }, { owner: req.user._id }],
    });
    return res.json({
      status: 'success',
      data: groups,
      message: null,
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      errors: null,
      message: err.message,
    });
  }
}

export const sendGroupMessage = (io: Server) => [
  body('messageContent')
    .trim()
    .escape()
    .isLength({ min: 1, max: 255 })
    .withMessage('Message is invalid length.'),

  async (req: IUserRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          errors: errors.array(),
          message: null,
        });
      }

      const { id } = req.params;
      const { messageContent } = req.body;

      const group = await GroupModel.findById(id);

      if (!group) {
        return res.status(400).json({
          status: 'error',
          errors: null,
          message: 'Group is not found.',
        });
      }

      if (group.owner.toString() !== req.user._id) {
        const isMemeber = group.invited.find(
          (i) => i.toString() === req.user._id
        );

        if (!isMemeber) {
          return res.status(401).json({
            status: 'error',
            errors: null,
            message: 'Unauthorized.',
          });
        }
      }

      const message = new GroupMessageModel({
        sender: req.user._id,
        receiver: group._id,
        message: messageContent,
      });

      const savedMessage = await message.save();

      const updatedUser = getUpdatedUser(req.user);

      io.to(group._id.toString()).emit('groupMessage', {
        message: {
          ...savedMessage.toObject(),
          sender: updatedUser,
        },
      });

      // data is null since everyone in the group will get the message using socketio.
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

export async function getGroupMessages(
  req: IUserRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const messages = await GroupMessageModel.find({
      receiver: id,
    }).populate('sender');

    // const updatedMessages = await Promise.all(
    //   messages.map(async (m) => {
    //     let updatedSender = {
    //       _id: req.user._id,
    //       fullName: req.user.fullName,
    //     };
    //     const { sender } = m.toObject();
    //     if (sender !== req.user._id) {
    //       const messageOwner =
    //         await ProfileModel.findById<IDBProfile>(sender);
    //       if (!messageOwner) {
    //         throw new Error('Message owner not found');
    //       }
    //       updatedSender = {
    //         _id: messageOwner._id,
    //         fullName: messageOwner.fullName,
    //       };
    //     }
    //     return { ...m.toObject(), sender: updatedSender };
    //   })
    // );

    return res.json({
      status: 'success',
      data: messages,
      message: null,
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      errors: null,
      message: err.message,
    });
  }
}
