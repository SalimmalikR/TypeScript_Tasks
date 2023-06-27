import { Request, Response, NextFunction } from 'express';
import userService from '../services/read_users_services';
import CustomError from '../utils/cuserr';

const readUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            statuscode: 200,
            status: 'success',
            users: users,
        });
    } catch (error: any) {
        const err = new CustomError(500, error.message);
        return next(err);
    }
};

export default readUser;
