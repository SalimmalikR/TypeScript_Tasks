import { Request, Response, NextFunction } from 'express';
import userService from '../services/create_users_services';
import CustomError from '../utils/cuserr';

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const newUser = await userService.createUser(username, email, password);

    res.status(201).json({
      statuscode: 200,
      status: 'success',
      message: 'User created successfully',
      userdata: newUser,
    });
  } catch (error: any) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

export default createUser;
