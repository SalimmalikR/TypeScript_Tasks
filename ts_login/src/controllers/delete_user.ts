import { Request, Response, NextFunction } from 'express';
import userService from '../services/delete_users_services';
import CustomError from '../utils/cuserr';

interface AuthenticatedRequest extends Request {
    email?: string;
}

const deleteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const email = req.body.email;
        const emailid = req.email;

        await userService.deleteUser(id, email);

        res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        const err = new CustomError(500, error.message);
        return next(err);
    }
};

export default deleteUser;
