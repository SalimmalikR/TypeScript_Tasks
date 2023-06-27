import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user';
import CustomError from '../utils/cuserr';

interface AuthenticatedRequest extends Request {
    email: string;
}

const updateUser: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        const email = req.body.email;
        const emailid = req.email;

        if (emailid !== email) {
            const err = new CustomError(403, 'Unauthorized to update user data from server');
            return next(err);
        }

        const user = await User.findByPk(id);

        if (!user) {
            const err = new CustomError(404, 'User not found');
            return next(err);
        }

        user.username = username;
        user.password = password ? await bcrypt.hash(password, 10) : user.password;

        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (error: any) {
        const err = new CustomError(500, error.message);
        return next(err);
    }
};

export default updateUser;
