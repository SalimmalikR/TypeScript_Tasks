import { Request, Response, NextFunction } from 'express';
import userService from '../services/login_services';
import CustomError from '../utils/cuserr';

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const token = await userService.login(email, password);

        res.json({ message: 'Login successful', token: token });
    } catch (error: any) {
        const err = new CustomError(500, error.message);
        return next(err);
    }
};

export default login;
