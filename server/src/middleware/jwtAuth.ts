import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface IUserRequest extends Request {
  user?: any;
}

const jwtAuth = (req: IUserRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie('token');
    res.status(401).json({
      status: 'error',
      errors: [{ msg: 'Unauthorized' }],
      message: null,
    });
  }
};

export { jwtAuth, IUserRequest };
