import express, { Response } from 'express';
import { IUserRequest } from '../middleware/jwtAuth';
import getFriendsIds from '../utils/getFriendsIds';

const onlineRoute = (onlineUsers: string[]) => {
  const router = express.Router();
  router.get('/', async (req: IUserRequest, res: Response) => {
    try {
      const friends = await getFriendsIds(req.user._id);
      const onlineFriends = onlineUsers.filter((onlineID) => {
        return friends.some(
          (friendID) => friendID.toString() === onlineID
        );
      });

      return res.json({
        status: 'success',
        data: onlineFriends,
        message: null,
      });
    } catch (err: any) {
      res.status(500).json({
        status: 'error',
        errors: null,
        message: err.message,
      });
    }
  });

  return router;
};

export default onlineRoute;
